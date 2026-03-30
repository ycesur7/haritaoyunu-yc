import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamSetup from './components/TeamSetup';
import ScoreBoard from './components/ScoreBoard';
import GuessMap from './components/GuessMap';
import MapillaryViewer from './components/MapillaryViewer';
import { getRandomCountry, getRandomCoordinate } from './data/cities';
import { calculateDistance, calculateScore } from './utils/distance';

const MAX_ROUNDS = 5;
const MAX_RETRIES = 10;
const MAPILLARY_TOKEN = import.meta.env.VITE_MAPILLARY_TOKEN;

export default function App() {
  const [gameState, setGameState] = useState('setup');
  const [teams, setTeams] = useState({ teamA: '', teamB: '' });
  const [scores, setScores] = useState({ A: 0, B: 0 });
  const [currentTeam, setCurrentTeam] = useState('A');
  const [round, setRound] = useState(1);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState(null);

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
        
        const response = await fetch(
          `https://graph.mapillary.com/images?access_token=${MAPILLARY_TOKEN}&fields=id,geometry,thumb_original_url&closeto=${coord.lng},${coord.lat}&limit=1`
        );

        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const image = data.data[0];
          setCurrentLocation({
            imageId: image.id,
            lat: image.geometry.coordinates[1],
            lng: image.geometry.coordinates[0],
            countryName: country.name
          });
          setLoading(false);
          return;
        }

        retries++;
      } catch (error) {
        console.error('Mapillary API hatası:', error);
        retries++;
      }
    }

    alert('Görüntü bulunamadı. Lütfen tekrar deneyin.');
    setLoading(false);
  };

  const handleGuess = (guessLatLng) => {
    if (!currentLocation) return;

    const distance = calculateDistance(
      guessLatLng.lat,
      guessLatLng.lng,
      currentLocation.lat,
      currentLocation.lng
    );

    const points = calculateScore(distance);

    setScores(prev => ({
      ...prev,
      [currentTeam]: prev[currentTeam] + points
    }));

    setLastResult({
      team: currentTeam,
      distance: distance.toFixed(2),
      points,
      actualLocation: { lat: currentLocation.lat, lng: currentLocation.lng },
      countryName: currentLocation.countryName
    });

    setGameState('result');
  };

  const handleNextRound = () => {
    setLastResult(null);
    setCurrentLocation(null);
    
    if (round >= MAX_ROUNDS) {
      setGameState('finished');
      return;
    }

    setCurrentTeam(currentTeam === 'A' ? 'B' : 'A');
    setRound(prev => prev + 1);
    setGameState('playing');
  };

  const handleSkip = () => {
    setCurrentLocation(null);
    fetchRandomLocation();
  };

  const handleRestart = () => {
    setGameState('setup');
    setScores({ A: 0, B: 0 });
    setCurrentTeam('A');
    setRound(1);
    setCurrentLocation(null);
    setLastResult(null);
  };

  if (gameState === 'setup') {
    return (
      <TeamSetup
        onStart={({ teamA, teamB }) => {
          setTeams({ teamA, teamB });
          setGameState('playing');
        }}
      />
    );
  }

  if (gameState === 'finished') {
    const winner = scores.A > scores.B ? teams.teamA : scores.B > scores.A ? teams.teamB : 'Berabere';
    
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
              <div className="text-3xl text-gray-300 mb-2">{teams.teamA}</div>
              <div className="text-6xl font-bold text-blue-400">{scores.A}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-gray-300 mb-2">{teams.teamB}</div>
              <div className="text-6xl font-bold text-purple-400">{scores.B}</div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <ScoreBoard
        teamA={teams.teamA}
        teamB={teams.teamB}
        scoreA={scores.A}
        scoreB={scores.B}
        currentTeam={currentTeam}
        round={round}
      />

      <div className="pt-32 pb-8 px-8">
        {loading && (
          <div className="flex items-center justify-center h-[600px]">
            <div className="text-4xl text-white">Görüntü yükleniyor...</div>
          </div>
        )}

        {gameState === 'playing' && currentLocation && !loading && (
          <div className="relative">
            <div className="mb-6 text-center">
              <h2 className="text-4xl font-bold text-white mb-2">
                Sıra: {currentTeam === 'A' ? teams.teamA : teams.teamB}
              </h2>
              <p className="text-2xl text-gray-300">Bu görüntü nerede çekildi?</p>
            </div>

            <div className="bg-slate-800/50 rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-500/30">
              <MapillaryViewer
                imageId={currentLocation.imageId}
                onError={handleSkip}
              />
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkip}
                className="px-12 py-6 text-2xl font-bold bg-slate-700 hover:bg-slate-600 text-white rounded-2xl shadow-lg"
              >
                ⏭️ Görüntüyü Atla
              </motion.button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {gameState === 'result' && lastResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-800 rounded-3xl p-12 max-w-2xl w-full shadow-2xl border-4 border-accent"
              >
                <h2 className="text-5xl font-bold text-center mb-8 text-accent">
                  Sonuç
                </h2>

                <div className="space-y-6 text-2xl text-gray-200 mb-10">
                  <p><span className="font-bold text-white">Takım:</span> {lastResult.team === 'A' ? teams.teamA : teams.teamB}</p>
                  <p><span className="font-bold text-white">Gerçek Konum:</span> {lastResult.countryName}</p>
                  <p><span className="font-bold text-white">Mesafe:</span> {lastResult.distance} km</p>
                  <p className="text-4xl font-bold text-accent">
                    Kazanılan Puan: {lastResult.points}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextRound}
                  className="w-full py-8 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl shadow-lg"
                >
                  {round >= MAX_ROUNDS ? 'Sonuçları Gör' : 'Sonraki Tur'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {gameState === 'playing' && !loading && (
        <GuessMap
          isExpanded={mapExpanded}
          onToggle={() => setMapExpanded(!mapExpanded)}
          onGuess={handleGuess}
          disabled={gameState !== 'playing'}
        />
      )}
    </div>
  );
}
