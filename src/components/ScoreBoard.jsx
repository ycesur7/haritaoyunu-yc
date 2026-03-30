import { motion } from 'framer-motion';

export default function ScoreBoard({ player1, player2, score1, score2, round }) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border-b-4 border-accent shadow-2xl z-30 p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-3xl text-gray-300">
          <span className="font-bold text-accent">Tur:</span> {round}/5
        </div>

        <div className="flex gap-12">
          <div className="text-center px-8 py-4 rounded-2xl bg-blue-600/40 border-2 border-blue-400">
            <div className="text-xl text-gray-200">{player1}</div>
            <div className="text-5xl font-bold text-blue-300">{score1}</div>
          </div>

          <div className="text-center px-8 py-4 rounded-2xl bg-purple-600/40 border-2 border-purple-400">
            <div className="text-xl text-gray-200">{player2}</div>
            <div className="text-5xl font-bold text-purple-300">{score2}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
