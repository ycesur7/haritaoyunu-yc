import { motion } from 'framer-motion';

export default function ScoreBoard({ player1, player2, score1, score2, round }) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border-b-2 border-accent/30 shadow-xl z-30 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <div className="text-2xl text-gray-300 font-bold">
          <span className="text-accent">Tur:</span> {round}/5
        </div>

        <div className="flex gap-8">
          <div className="text-center px-6 py-2 rounded-xl bg-blue-600/30 border border-blue-400/50">
            <div className="text-lg text-gray-200">{player1}</div>
            <div className="text-4xl font-bold text-blue-300">{score1}</div>
          </div>

          <div className="text-center px-6 py-2 rounded-xl bg-purple-600/30 border border-purple-400/50">
            <div className="text-lg text-gray-200">{player2}</div>
            <div className="text-4xl font-bold text-purple-300">{score2}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
