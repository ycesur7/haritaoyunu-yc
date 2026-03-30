import { motion } from 'framer-motion';

export default function ScoreBoard({ teamA, teamB, scoreA, scoreB, currentTeam, round }) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border-b-4 border-accent shadow-2xl z-30 p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-2xl text-gray-300">
            <span className="font-bold text-accent">Tur:</span> {round}/5
          </div>
        </div>

        <div className="flex gap-12">
          <motion.div
            animate={currentTeam === 'A' ? { scale: 1.1 } : { scale: 1 }}
            className={`text-center px-8 py-4 rounded-2xl ${
              currentTeam === 'A' 
                ? 'bg-blue-600/40 border-4 border-blue-400' 
                : 'bg-slate-700/50 border-2 border-slate-600'
            }`}
          >
            <div className="text-xl text-gray-300">{teamA}</div>
            <div className="text-5xl font-bold text-blue-400">{scoreA}</div>
          </motion.div>

          <motion.div
            animate={currentTeam === 'B' ? { scale: 1.1 } : { scale: 1 }}
            className={`text-center px-8 py-4 rounded-2xl ${
              currentTeam === 'B' 
                ? 'bg-purple-600/40 border-4 border-purple-400' 
                : 'bg-slate-700/50 border-2 border-slate-600'
            }`}
          >
            <div className="text-xl text-gray-300">{teamB}</div>
            <div className="text-5xl font-bold text-purple-400">{scoreB}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
