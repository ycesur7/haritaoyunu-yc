import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayerSetup from './components/PlayerSetup';
import ScoreBoard from './components/ScoreBoard';
import DualMap from './components/DualMap';
import MapillaryViewer from './components/MapillaryViewer';
import ResultScreen from './components/ResultScreen';
import { getRandomCountry, getRandomCoordinate } from './data/cities';
import { calculateDistance, calculateScore } from './utils/distance';
import { playApplause, playSuccess } from './utils/sounds';

const MAX_ROUNDS = 5;
const MAX_RETRIES = 15;
const MAPILLARY_TOKEN = import.meta.env.VITE_MAPILLARY_TOKEN;

export default function App() {
  const [gameState, setGameState] = useState('setup');
  const [players, setPlayers] = useState({ player1: '', player2: '' });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [round, setRound] = useState(1);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMaps, setShowMaps] = useState(false);
  const [guesses, setGuesses] = useState({ player1: null, player2: null });

  useEffect(() => {
    if (gameState === 'playing' && !currentLocation) {
      fetchRandomLocation();
    }
  }, [gameState]);

  const fetchRandomLocation = async () => {
      setLoading(true);
      let retries = 0;

      while (retries < MAX_RETRIES) {
        try {
          const country = getRandomCountry();
          const coord = getRandomCoordinate(country);

          // Mapillary API v4 - bbox kullanarak yakındaki görüntüleri ara
          const radius = 0.05; // ~5km yarıçap
          const bbox = `${coord.lng - radius},${coord.lat - radius},${coord.lng + radius},${coord.lat + radius}`;

          const response = await fetch(
            `https://graph.mapillary.com/images?access_token=${MAPILLARY_TOKEN}&fields=id,geometry,thumb_2048_url&bbox=${bbox}&limit=10`,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          if (!response.ok) {
            console.error('API Response:', response.status, response.statusText);
            retries++;
            continue;
          }

          const data = await response.json();
          console.log('Mapillary response:', data);

          if (data.data && data.data.length > 0) {
            // Rastgele bir görüntü seç
            const image = data.data[Math.floor(Math.random() * data.data.length)];

            setCurrentLocation({
              imageId: image.id,
              lat: image.geometry.coordinates[1],
              lng: image.geometry.coordinates[0],
              countryName: country.name,
              imageUrl: image.thumb_2048_url || null
            });
            setLoading(false);
            setShowMaps(false);
            setGuesses({ player1: null, player2: null });
            return;
          }

          retries++;
        } catch (error) {
          console.error('Mapillary API hatası:', error);
          retries++;
        }
      }

      alert('Görüntü bulunamadı. Yeni görüntü deneniyor...');
      setLoading(false);
      // Tekrar dene
      setTimeout(() => fetchRandomLocation(), 1000);
    };

  const handleGuess = (player, latlng) => {
    setGuesses(prev => ({
      ...prev,
      [player]: latlng
    }));
  };

  const handleShowResults = () => {
    if (!guesses.player1 || !guesses.player2) {
      alert('Her iki oyuncu da tahmin yapmalı!');
      return;
    }

    const distance1 = calculateDistance(
      guesses.player1.lat,
      guesses.player1.lng,
      currentLocation.lat,
      currentLocation.lng
    );

    const distance2 = calculateDistance(
      guesses.player2.lat,
      guesses.player2.lng,
      currentLocation.lat,
      currentLocation.lng
    );

    const points1 = calculateScore(distance1);
    const points2 = calculateScore(distance2);

    setScores(prev => ({
      player1: prev.player1 + points1,
      player2: prev.player2 + points2
    }));

    // Ses efekti çal
    if (distance1 < 100 || distance2 < 100) {
      playApplause();
    } else {
      playSuccess();
    }

    setGameState('result');
  };

  const handleNextRound = () => {
    if (round >= MAX_ROUNDS) {
      setGameState('finished');
      return;
    }

    setRound(prev => prev + 1);
    setCurrentLocation(null);
    setGameState('playing');
  };

  const handleRestart = () => {
    setGameState('setup');
    setScores({ player1: 0, player2: 0 });
    setRound(1);
    setCurrentLocation(null);
    setGuesses({ player1: null, player2: null });
  };

  if (gameState === 'setup') {
    return (
      <PlayerSetup
        onStart={({ player1, player2 }) => {
          setPlayers({ player1, player2 });
          setGameState('playing');
        }}
      />
    );
  }

  if (gameState === 'finished') {
    const winner = scores.player1 > scores.player2 ? players.player1 : 
                   scores.player2 > scores.player1 ? players.player2 : 'Berabere';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800/90 backdrop-blur-lg rounded-3xl p-16 max-w-3xl w-full shadow-2xl text-center"
        >
          <h1 className="text-7xl font-bold mb-8 text-accent">🏆 Oyun Bitti!</h1>
          
          <div className="flex justify-center gap-16 mb-12">
            <div className="text-center">
              <div className="text-3xl text-gray-300 mb-2">{players.player1}</div>
              <div className="text-6xl font-bold text-blue-400">{scores.player1}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-gray-300 mb-2">{players.player2}</div>
              <div className="text-6xl font-bold text-purple-400">{scores.player2}</div>
            </div>
          </div>

          <div className="text-5xl font-bold text-white mb-12">
            {winner === 'Berabere' ? '🤝 Berabere!' : `🎉 Kazanan: ${winner}`}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="px-16 py-8 text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-2xl shadow-lg"
          >
            Yeni Oyun
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'result') {
    return (
      <ResultScreen
        players={players}
        guesses={guesses}
        currentLocation={currentLocation}
        onNext={handleNextRound}
        round={round}
        maxRounds={MAX_ROUNDS}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <ScoreBoard
        player1={players.player1}
        player2={players.player2}
        score1={scores.player1}
        score2={scores.player2}
        round={round}
      />

      <div className="pt-20 pb-8">
        {loading && (
          <div className="flex items-center justify-center h-screen">
            <div className="text-5xl text-white font-bold animate-pulse">🌍 Görüntü yükleniyor...</div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!loading && currentLocation && !showMaps && (
            <motion.div
              key="fullscreen-image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="px-8"
            >
              <div className="text-center mb-8">
                <motion.h2 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-6xl font-bold text-white mb-4 drop-shadow-2xl"
                >
                  🌍 Bu görüntü nerede çekildi?
                </motion.h2>
                <motion.p 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl text-accent font-bold"
                >
                  Tur {round}/{MAX_ROUNDS}
                </motion.p>
              </div>

              <div className="bg-slate-800/50 rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-500/30 mb-8">
                <MapillaryViewer
                  imageId={currentLocation.imageId}
                  accessToken={MAPILLARY_TOKEN}
                  onError={fetchRandomLocation}
                />
              </div>

              <div className="flex justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMaps(true)}
                  className="px-20 py-10 text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-3xl shadow-2xl"
                >
                  🗺️ Tahmin Yap
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchRandomLocation}
                  className="px-12 py-10 text-3xl font-bold bg-slate-700 hover:bg-slate-600 text-white rounded-3xl shadow-xl"
                >
                  ⏭️ Atla
                </motion.button>
              </div>
            </motion.div>
          )}

          {!loading && currentLocation && showMaps && (
            <motion.div
              key="dual-maps"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <DualMap
                players={players}
                currentLocation={currentLocation}
                onGuess={handleGuess}
                guesses={guesses}
                onConfirm={handleShowResults}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
