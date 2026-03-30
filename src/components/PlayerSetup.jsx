import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PlayerSetup({ onStart }) {
  const [player1, setPlayer1] = useState('Oyuncu 1');
  const [player2, setPlayer2] = useState('Oyuncu 2');

  const handleStart = () => {
    onStart({ player1, player2 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800/90 backdrop-blur-lg rounded-3xl p-12 max-w-2xl w-full shadow-2xl border border-purple-500/30"
      >
        <h1 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          GeoDuel
        </h1>
        <p className="text-2xl text-gray-300 text-center mb-12">Konum Tahmin Düellosu</p>

        <div className="space-y-8">
          <div>
            <label className="block text-2xl text-gray-300 mb-3">Oyuncu 1</label>
            <input
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              className="w-full px-6 py-5 text-2xl bg-slate-700 text-white rounded-xl border-2 border-blue-500/50 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-2xl text-gray-300 mb-3">Oyuncu 2</label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className="w-full px-6 py-5 text-2xl bg-slate-700 text-white rounded-xl border-2 border-purple-500/50 focus:border-purple-400 focus:outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="w-full py-8 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl shadow-lg transition-all"
          >
            Oyunu Başlat
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
