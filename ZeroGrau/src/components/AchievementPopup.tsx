
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import {Trophy, X} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface AchievementPopupProps {
  achievement: Achievement | null
  onClose: () => void
}

const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievement, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (achievement) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [achievement])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-orange-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-400/50'
      case 'rare': return 'shadow-blue-400/50'
      case 'epic': return 'shadow-purple-400/50'
      case 'legendary': return 'shadow-yellow-400/50'
      default: return 'shadow-gray-400/50'
    }
  }

  return (
    <AnimatePresence>
      {achievement && (
        <>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
              gravity={0.3}
            />
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50"></div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              >
                <X size={20} className="text-gray-600" />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Trophy icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="mb-6"
                >
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} flex items-center justify-center shadow-2xl ${getRarityGlow(achievement.rarity)}`}>
                    <Trophy size={40} className="text-white" />
                  </div>
                </motion.div>

                {/* Achievement info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Conquista Desbloqueada!
                  </h2>
                  
                  <div className="mb-4">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Rarity badge */}
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white text-sm font-bold uppercase tracking-wide shadow-lg`}>
                    {achievement.rarity}
                  </div>
                </motion.div>

                {/* Celebration text */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <p className="text-lg font-semibold text-indigo-600">
                    🎉 Parabéns! 🎉
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Continue assim para desbloquear mais conquistas!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AchievementPopup
