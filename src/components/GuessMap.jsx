import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet marker icon fix
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

export default function GuessMap({ isExpanded, onToggle, onGuess, disabled }) {
  const [guessPosition, setGuessPosition] = useState(null);

  const handleMapClick = (latlng) => {
    if (disabled) return;
    setGuessPosition(latlng);
  };

  const handleConfirmGuess = () => {
    if (guessPosition) {
      onGuess(guessPosition);
      setGuessPosition(null);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={false}
        animate={isExpanded ? {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50
        } : {
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '400px',
          height: '300px',
          zIndex: 40
        }}
        className="bg-slate-800 rounded-2xl shadow-2xl border-4 border-accent overflow-hidden"
      >
        <div className="relative w-full h-full">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ width: '100%', height: '100%' }}
            zoomControl={isExpanded}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            <MapClickHandler onMapClick={handleMapClick} />
            {guessPosition && (
              <Marker position={[guessPosition.lat, guessPosition.lng]} />
            )}
          </MapContainer>

          <div className="absolute top-4 right-4 flex gap-3 z-[1000]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggle}
              className="px-6 py-4 text-xl bg-slate-700 hover:bg-slate-600 text-white rounded-xl shadow-lg"
            >
              {isExpanded ? '🔽 Küçült' : '🔼 Büyüt'}
            </motion.button>
          </div>

          {guessPosition && !disabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000]"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConfirmGuess}
                className="px-12 py-6 text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-2xl shadow-2xl"
              >
                ✓ Tahmini Onayla
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
