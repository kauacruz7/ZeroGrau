
import React from 'react'
import { motion } from 'framer-motion'
import {Lock} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const BadgeGrid = () => {
  const { badges } = useAppStore()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">🏆 Conquistas</h3>
      
      <div className="grid grid-cols-4 gap-3">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-3 rounded-lg text-center transition-all ${
              badge.unlocked
                ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 border-2 border-yellow-300 dark:border-yellow-600'
                : 'bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600'
            }`}
            title={badge.description}
          >
            {badge.unlocked ? (
              <>
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="text-xs font-medium text-gray-800 dark:text-white">{badge.name}</p>
              </>
            ) : (
              <>
                <Lock className="mx-auto mb-1 text-gray-400 dark:text-gray-500" size={20} />
                <p className="text-xs text-gray-400 dark:text-gray-500">Bloqueado</p>
              </>
            )}
            
            {badge.unlocked && (
              <motion.div
                className="absolute -top-1 -right-1 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default BadgeGrid
