import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

function PlayerMap({ playerName, onGuess, guess, color }) {
  return (
    <div className="relative h-full rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`absolute top-6 left-6 z-[1000] px-10 py-5 rounded-2xl text-4xl font-bold ${color} shadow-2xl`}
      >
        {playerName}
      </motion.div>
      
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        <MapClickHandler onMapClick={onGuess} />
        {guess && (
          <Marker position={[guess.lat, guess.lng]} />
        )}
      </MapContainer>

      {guess && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.6 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000]"
        >
          <div className="px-10 py-5 bg-green-600 text-white text-3xl font-bold rounded-2xl shadow-2xl border-2 border-green-400">
            ✓ Tahmin Yapıldı
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function DualMap({ players, currentLocation, onGuess, guesses, onConfirm, timeLeft, timerActive }) {
  const isTimeRunningOut = timeLeft <= 10;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex flex-col"
    >
      {/* Timer ve Küçük fotoğraf üstte */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center py-6 px-8 bg-slate-900/90 border-b-4 border-accent/50"
      >
        {/* Timer - Sol taraf */}
        {timerActive && (
          <motion.div
            animate={isTimeRunningOut ? {
              scale: [1, 1.15, 1],
              color: ['#fbbf24', '#ef4444', '#fbbf24']
            } : {}}
            transition={{ repeat: isTimeRunningOut ? Infinity : 0, duration: 0.5 }}
            className={`text-6xl font-bold ${isTimeRunningOut ? 'text-red-500' : 'text-accent'} drop-shadow-2xl`}
          >
            ⏱️ {timeLeft}s
          </motion.div>
        )}
        {!timerActive && <div className="w-32"></div>}

        {/* Fotoğraf - Orta */}
        <div className="relative">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-96 h-56 rounded-2xl overflow-hidden border-4 border-accent shadow-2xl"
          >
            {currentLocation.imageUrl ? (
              <img 
                src={currentLocation.imageUrl} 
                alt="Konum" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white text-2xl">
                📷 Görüntü
              </div>
            )}
          </motion.div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute -top-3 -right-3 bg-accent text-slate-900 px-6 py-3 rounded-full text-xl font-bold shadow-xl"
          >
            📍 Referans
          </motion.div>
        </div>

        {/* Boş alan - Sağ taraf (simetri için) */}
        <div className="w-32"></div>
      </motion.div>

      {/* İki harita yan yana */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        <PlayerMap
          playerName={players.player1}
          onGuess={(latlng) => onGuess('player1', latlng)}
          guess={guesses.player1}
          color="bg-blue-600"
        />
        
        <PlayerMap
          playerName={players.player2}
          onGuess={(latlng) => onGuess('player2', latlng)}
          guess={guesses.player2}
          color="bg-purple-600"
        />
      </div>

      {/* Onayla butonu */}
      {guesses.player1 && guesses.player2 && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: [0.8, 1.1, 1]
          }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-[1001]"
        >
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(34, 197, 94, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(34, 197, 94, 0.5)",
                "0 0 40px rgba(34, 197, 94, 0.8)",
                "0 0 20px rgba(34, 197, 94, 0.5)"
              ]
            }}
            transition={{ 
              boxShadow: { repeat: Infinity, duration: 1.5 }
            }}
            onClick={onConfirm}
            className="px-24 py-10 text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-3xl shadow-2xl border-4 border-green-400"
          >
            🎯 Sonuçları Göster
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
