
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {TrendingUp, Target, Award, Users, Calendar, Zap, Star, Trophy, Heart, BookOpen, Brain, Shield, Clock, Flame, ChevronRight, Plus} from 'lucide-react'
import { useAdvancedStore } from '../store/useAdvancedStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const { 
    user, 
    userStats, 
    badges, 
    achievements, 
    challenges,
    moodEntries,
    habits,
    addXP,
    updateStreak
  } = useAdvancedStore()

  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week')
  const [dailyGoals, setDailyGoals] = useState({
    articles: { current: 0, target: 2 },
    quiz: { current: 0, target: 1 },
    mood: { current: 0, target: 1 },
    water: { current: 0, target: 8 }
  })

  // Mock data para gráficos
  const progressData = [
    { name: 'Seg', xp: 120, mood: 4 },
    { name: 'Ter', xp: 150, mood: 5 },
    { name: 'Qua', xp: 80, mood: 3 },
    { name: 'Qui', xp: 200, mood: 4 },
    { name: 'Sex', xp: 180, mood: 5 },
    { name: 'Sáb', xp: 220, mood: 4 },
    { name: 'Dom', xp: 160, mood: 4 }
  ]

  const categoryData = [
    { name: 'Educação', value: 40, color: '#3B82F6' },
    { name: 'Quizzes', value: 25, color: '#10B981' },
    { name: 'Social', value: 20, color: '#F59E0B' },
    { name: 'Bem-estar', value: 15, color: '#EF4444' }
  ]

  const recentBadges = badges?.filter(b => b.unlocked).slice(0, 4) || []
  const todayMood = moodEntries?.[0]?.mood || 0

  const levelProgress = ((userStats?.totalXP || 0) % 1000) / 1000 * 100

  const getGreeting = () => {
    const hour = new Date().getHours()
    const name = user?.name?.split(' ')[0] || 'Usuário'
    
    if (hour < 12) return `Bom dia, ${name}! 🌅`
    if (hour < 18) return `Boa tarde, ${name}! ☀️`
    return `Boa noite, ${name}! 🌙`
  }

  const getMoodEmoji = (mood: number) => {
    const moods = ['😢', '😕', '😐', '😊', '😄']
    return moods[mood - 1] || '😐'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24 pt-4">
      {/* Header de Boas-vindas */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{getGreeting()}</h1>
            <p className="text-gray-600 dark:text-gray-300">Vamos continuar sua jornada hoje!</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Nível {userStats?.level || 1}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{userStats?.totalXP || 0} XP</div>
          </div>
        </div>

        {/* Barra de Progresso do Nível */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progresso do Nível</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(levelProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
            <span>{(userStats?.level || 1) * 1000 - 1000} XP</span>
            <span>{(userStats?.level || 1) * 1000} XP</span>
          </div>
        </div>
      </motion.div>

      {/* Estatísticas Rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={20} />
              <span className="text-sm font-medium">Sequência</span>
            </div>
            <div className="text-2xl font-bold">{userStats?.streak || 0}</div>
            <div className="text-xs opacity-80">dias consecutivos</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Star size={20} />
              <span className="text-sm font-medium">Moedas</span>
            </div>
            <div className="text-2xl font-bold">{userStats?.coins || 0}</div>
            <div className="text-xs opacity-80">para recompensas</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Award size={20} />
              <span className="text-sm font-medium">Conquistas</span>
            </div>
            <div className="text-2xl font-bold">{recentBadges.length}</div>
            <div className="text-xs opacity-80">badges desbloqueadas</div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={20} />
              <span className="text-sm font-medium">Humor Hoje</span>
            </div>
            <div className="text-2xl font-bold">{getMoodEmoji(todayMood)}</div>
            <div className="text-xs opacity-80">
              {todayMood > 0 ? 'registrado' : 'não registrado'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metas Diárias */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Metas de Hoje</h3>
            <Target size={20} className="text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="space-y-4">
            {Object.entries(dailyGoals).map(([key, goal]) => {
              const percentage = (goal.current / goal.target) * 100
              const icons = {
                articles: <BookOpen size={16} />,
                quiz: <Brain size={16} />,
                mood: <Heart size={16} />,
                water: <span>💧</span>
              }
              const labels = {
                articles: 'Artigos lidos',
                quiz: 'Quiz completado',
                mood: 'Humor registrado',
                water: 'Copos de água'
              }

              return (
                <div key={key} className="flex items-center gap-3">
                  <div className="text-indigo-600 dark:text-indigo-400">{icons[key as keyof typeof icons]}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {labels[key as keyof typeof labels]}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                  {percentage >= 100 && (
                    <div className="text-green-500">✓</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Gráfico de Progresso Semanal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 mb-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Progresso Semanal</h3>
            <TrendingUp size={20} className="text-green-600 dark:text-green-400" />
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="xp" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#1d4ed8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">+15%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">vs semana passada</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">1,210</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">XP total</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">7/7</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">dias ativos</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Conquistas Recentes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-6 mb-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Conquistas Recentes</h3>
            <Award size={20} className="text-yellow-500" />
          </div>

          {recentBadges.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {recentBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700"
                >
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{badge.description}</p>
                  {badge.unlockedAt && (
                    <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                      Desbloqueado em {new Date(badge.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Award size={48} className="mx-auto mb-3 opacity-50" />
              <p>Nenhuma conquista ainda</p>
              <p className="text-sm">Continue explorando para desbloquear badges!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Acesso Rápido */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-6 mb-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Acesso Rápido</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700 text-left"
            >
              <BookOpen size={24} className="text-blue-600 dark:text-blue-400 mb-2" />
              <div className="font-semibold text-gray-800 dark:text-gray-100">Ler Artigo</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Expandir conhecimento</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-700 text-left"
            >
              <Brain size={24} className="text-green-600 dark:text-green-400 mb-2" />
              <div className="font-semibold text-gray-800 dark:text-gray-100">Fazer Quiz</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Testar conhecimento</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700 text-left"
            >
              <Heart size={24} className="text-purple-600 dark:text-purple-400 mb-2" />
              <div className="font-semibold text-gray-800 dark:text-gray-100">Registrar Humor</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Como você está?</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4 border border-orange-200 dark:border-orange-700 text-left"
            >
              <Users size={24} className="text-orange-600 dark:text-orange-400 mb-2" />
              <div className="font-semibold text-gray-800 dark:text-gray-100">Comunidade</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Conectar com outros</div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
