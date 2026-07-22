
import React from 'react'
import { motion } from 'framer-motion'
import {Star, Zap} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const XPBar = () => {
  const { progress, getCurrentLevel, getXPProgress } = useAppStore()
  const currentLevel = getCurrentLevel()
  const xpProgress = getXPProgress()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg">
            <Star className="text-white" size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-white">Nível {currentLevel}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{progress.xp} XP</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-orange-500">
          <Zap size={14} />
          <span className="text-sm font-bold">{progress.streak}</span>
        </div>
      </div>
      
      <div className="relative">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
          Próximo nível: {currentLevel + 1}
        </p>
      </div>
    </div>
  )
}

export default XPBar
