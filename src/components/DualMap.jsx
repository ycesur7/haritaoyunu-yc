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

function PlayerMap({ player, playerName, onGuess, guess, color }) {
  return (
    <div className="relative h-full">
      <div className={`absolute top-4 left-4 z-[1000] px-8 py-4 rounded-2xl text-3xl font-bold ${color} shadow-2xl`}>
        {playerName}
      </div>
      
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000]">
          <div className="px-6 py-3 bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg">
            ✓ Tahmin Yapıldı
          </div>
        </div>
      )}
    </div>
  );
}

export default function DualMap({ players, currentLocation, onGuess, guesses, onConfirm }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex flex-col"
    >
      {/* Küçük fotoğraf üstte - referans için */}
      <div className="flex justify-center py-6 bg-slate-900/80">
        <div className="relative">
          <div className="w-80 h-48 rounded-2xl overflow-hidden border-4 border-accent shadow-2xl">
            {currentLocation.imageUrl ? (
              <img 
                src={currentLocation.imageUrl} 
                alt="Konum" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white text-xl">
                📷 Görüntü
              </div>
            )}
          </div>
          <div className="absolute -top-3 -right-3 bg-accent text-slate-900 px-4 py-2 rounded-full text-lg font-bold">
            Referans
          </div>
        </div>
      </div>

      {/* İki harita yan yana */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        <PlayerMap
          player="player1"
          playerName={players.player1}
          onGuess={(latlng) => onGuess('player1', latlng)}
          guess={guesses.player1}
          color="bg-blue-600"
        />
        
        <PlayerMap
          player="player2"
          playerName={players.player2}
          onGuess={(latlng) => onGuess('player2', latlng)}
          guess={guesses.player2}
          color="bg-purple-600"
        />
      </div>

      {/* Onayla butonu */}
      {guesses.player1 && guesses.player2 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[1001]"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="px-20 py-8 text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-3xl shadow-2xl border-4 border-green-400"
          >
            🎯 Sonuçları Göster
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
