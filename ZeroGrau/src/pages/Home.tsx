
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {BookOpen, Brain, Users, Heart, Target, Award, TrendingUp, Shield, Gamepad2, Star, Settings, Play, Zap} from 'lucide-react'
import { useAdvancedStore } from '../store/useAdvancedStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { 
    userStats, 
    badges, 
    challenges, 
    addXP, 
    addCoins,
    updateStreak,
    completeChallenge 
  } = useAdvancedStore()

  const getGreeting = () => {
    const hour = new Date().getHours()
    const name = user?.name?.split(' ')[0] || 'Usuário'
    
    if (hour < 12) return `Bom dia, ${name}! 🌅`
    if (hour < 18) return `Boa tarde, ${name}! ☀️`
    return `Boa noite, ${name}! 🌙`
  }

  const handleQuickAction = (action: string, xp: number, route: string) => {
    addXP(xp)
    addCoins(Math.floor(xp / 2))
    updateStreak()
    toast.success(`🎯 +${xp} XP por ${action}!`)
    navigate(route)
  }

  const handleEmergency = () => {
    toast.success('🆘 Recursos de emergência disponíveis')
    navigate('/wellness')
  }

  const quickActions = [
    {
      id: 'read',
      title: 'Ler Artigo',
      description: 'Aprender algo novo',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      action: () => handleQuickAction('leitura', 20, '/education')
    },
    {
      id: 'quiz',
      title: 'Fazer Quiz',
      description: 'Testar conhecimento',
      icon: Brain,
      color: 'from-green-500 to-green-600',
      action: () => handleQuickAction('quiz', 30, '/quiz')
    },
    {
      id: 'community',
      title: 'Comunidade',
      description: 'Conectar com outros',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      action: () => handleQuickAction('socialização', 15, '/community')
    },
    {
      id: 'wellness',
      title: 'Bem-estar',
      description: 'Cuidar da saúde mental',
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
      action: () => handleQuickAction('autocuidado', 25, '/wellness')
    }
  ]

  const featuredChallenges = challenges?.filter(c => !c.completed).slice(0, 2) || []
  const recentBadges = badges?.filter(b => b.unlocked).slice(0, 3) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24 pt-4">
      {/* Header de Boas-vindas */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-6"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl"
          >
            <span className="text-3xl font-bold text-white">Z</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            {getGreeting()}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-lg"
          >
            Pronto para continuar sua jornada?
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-6"
      >
        <div className="grid grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center"
          >
            <div className="text-2xl font-bold text-indigo-600">{userStats?.level || 1}</div>
            <div className="text-xs text-gray-600">Nível</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center"
          >
            <div className="text-2xl font-bold text-green-600">{userStats?.totalXP || 0}</div>
            <div className="text-xs text-gray-600">XP Total</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center"
          >
            <div className="text-2xl font-bold text-orange-600">{userStats?.streak || 0}</div>
            <div className="text-xs text-gray-600">Sequência</div>
          </motion.button>
        </div>
      </motion.div>

      {/* Ações Rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 mb-6"
      >
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Ações Rápidas</h3>
            <Zap size={24} className="text-yellow-500" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className={`bg-gradient-to-r ${action.color} rounded-xl p-4 text-white shadow-lg`}
              >
                <action.icon size={24} className="mb-2" />
                <div className="font-semibold text-sm">{action.title}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Desafios em Destaque */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-6 mb-6"
      >
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Desafios Ativos</h3>
            <Target size={24} className="text-blue-500" />
          </div>
          
          {featuredChallenges.length > 0 ? (
            <div className="space-y-3">
              {featuredChallenges.map((challenge) => {
                const progress = (challenge.progress / challenge.target) * 100
                
                return (
                  <motion.div
                    key={challenge.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                      <span className="text-sm text-blue-600 font-medium">
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    
                    <div className="text-xs text-gray-600">
                      🏆 {challenge.xpReward} XP + {challenge.coinReward} moedas
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Target size={48} className="mx-auto mb-3 opacity-50" />
              <p>Novos desafios chegando em breve!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Conquistas Recentes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-6 mb-6"
      >
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Conquistas</h3>
            <Award size={24} className="text-yellow-500" />
          </div>
          
          {recentBadges.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recentBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-3 border border-yellow-200 text-center min-w-[80px]"
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-semibold text-gray-800">{badge.name}</div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Award size={48} className="mx-auto mb-3 opacity-50" />
              <p>Continue explorando para desbloquear badges!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Acesso Rápido Adicional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="px-6 mb-6"
      >
        <div className="grid grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleQuickAction('jogos', 15, '/games')}
            className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-4 text-white shadow-lg text-center"
          >
            <Gamepad2 size={20} className="mx-auto mb-1" />
            <div className="font-semibold text-sm">Jogos</div>
            <div className="text-xs opacity-90">Aprenda brincando</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEmergency}
            className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-4 text-white shadow-lg text-center"
          >
            <Shield size={20} className="mx-auto mb-1" />
            <div className="font-semibold text-sm">Emergência</div>
            <div className="text-xs opacity-90">Precisa de ajuda?</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/settings')}
            className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl p-4 text-white shadow-lg text-center"
          >
            <Settings size={20} className="mx-auto mb-1" />
            <div className="font-semibold text-sm">Configurações</div>
            <div className="text-xs opacity-90">Personalizar</div>
          </motion.button>
        </div>
      </motion.div>

      {/* Motivação Diária */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-6 mb-6"
      >
        <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-center">
            <Star size={32} className="mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">Frase do Dia</h3>
            <p className="text-sm opacity-90 italic">
              "Cada pequeno passo que você dá hoje é um investimento no seu futuro. Continue assim!"
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
