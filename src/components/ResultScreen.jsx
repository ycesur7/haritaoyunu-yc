import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { calculateDistance, calculateScore } from '../utils/distance';
import L from 'leaflet';

const actualIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function ResultScreen({ players, guesses, currentLocation, onNext, round, maxRounds }) {
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

  const winner = distance1 < distance2 ? players.player1 : 
                 distance2 < distance1 ? players.player2 : 'Berabere';
  
  const isPlayer1Winner = distance1 < distance2;
  const isPlayer2Winner = distance2 < distance1;

  const center = [
    (guesses.player1.lat + guesses.player2.lat + currentLocation.lat) / 3,
    (guesses.player1.lng + guesses.player2.lng + currentLocation.lng) / 3
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-7xl font-bold text-center mb-12 text-accent drop-shadow-2xl"
        >
          🎯 Tur {round} Sonuçları
        </motion.h1>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ x: -100, opacity: 0, rotate: -5 }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              rotate: 0,
              scale: isPlayer1Winner ? [1, 1.05, 1] : 1
            }}
            transition={{ 
              delay: 0.3,
              scale: { repeat: isPlayer1Winner ? 2 : 0, duration: 0.5 }
            }}
            className={`bg-slate-800/90 rounded-3xl p-10 ${
              isPlayer1Winner 
                ? 'border-4 border-green-500 shadow-2xl shadow-green-500/50' 
                : 'border-2 border-slate-600'
            }`}
          >
            <h3 className="text-4xl font-bold text-blue-400 mb-6">{players.player1}</h3>
            <div className="space-y-4 text-2xl text-gray-200">
              <p><span className="font-bold text-white">Mesafe:</span> {distance1.toFixed(2)} km</p>
              <p><span className="font-bold text-white">Puan:</span> <span className="text-5xl text-accent font-bold">{points1}</span></p>
            </div>
            {isPlayer1Winner && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 text-6xl text-center"
              >
                🏆
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0, rotate: 5 }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              rotate: 0,
              scale: isPlayer2Winner ? [1, 1.05, 1] : 1
            }}
            transition={{ 
              delay: 0.3,
              scale: { repeat: isPlayer2Winner ? 2 : 0, duration: 0.5 }
            }}
            className={`bg-slate-800/90 rounded-3xl p-10 ${
              isPlayer2Winner 
                ? 'border-4 border-green-500 shadow-2xl shadow-green-500/50' 
                : 'border-2 border-slate-600'
            }`}
          >
            <h3 className="text-4xl font-bold text-purple-400 mb-6">{players.player2}</h3>
            <div className="space-y-4 text-2xl text-gray-200">
              <p><span className="font-bold text-white">Mesafe:</span> {distance2.toFixed(2)} km</p>
              <p><span className="font-bold text-white">Puan:</span> <span className="text-5xl text-accent font-bold">{points2}</span></p>
            </div>
            {isPlayer2Winner && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 text-6xl text-center"
              >
                🏆
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/90 rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-purple-500/30"
          style={{ height: '600px' }}
        >
          <MapContainer
            center={center}
            zoom={3}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            
            {/* Gerçek konum - Kırmızı */}
            <Marker position={[currentLocation.lat, currentLocation.lng]} icon={actualIcon}>
              <Popup>
                <div className="text-center font-bold">
                  <div className="text-red-600 text-lg">🎯 Gerçek Konum</div>
                  <div className="text-base">{currentLocation.countryName}</div>
                </div>
              </Popup>
            </Marker>

            {/* Oyuncu 1 tahmini - Mavi */}
            <Marker position={[guesses.player1.lat, guesses.player1.lng]}>
              <Popup>
                <div className="font-bold text-blue-600 text-base">{players.player1}</div>
                <div>{distance1.toFixed(2)} km</div>
              </Popup>
            </Marker>
            <Polyline
              positions={[
                [guesses.player1.lat, guesses.player1.lng],
                [currentLocation.lat, currentLocation.lng]
              ]}
              color="blue"
              weight={3}
              dashArray="10, 10"
            />

            {/* Oyuncu 2 tahmini - Mor */}
            <Marker position={[guesses.player2.lat, guesses.player2.lng]}>
              <Popup>
                <div className="font-bold text-purple-600 text-base">{players.player2}</div>
                <div>{distance2.toFixed(2)} km</div>
              </Popup>
            </Marker>
            <Polyline
              positions={[
                [guesses.player2.lat, guesses.player2.lng],
                [currentLocation.lat, currentLocation.lng]
              ]}
              color="purple"
              weight={3}
              dashArray="10, 10"
            />
          </MapContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.1, 1] }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-6xl font-bold text-white mb-10 drop-shadow-2xl"
          >
            {winner === 'Berabere' ? '🤝 Bu Turda Berabere!' : `🏆 Bu Turu Kazanan: ${winner}`}
          </motion.div>

          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-20 py-8 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl shadow-lg"
          >
            {round >= maxRounds ? '📊 Final Sonuçları' : '➡️ Sonraki Tur'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
