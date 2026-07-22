
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {Shield, AlertTriangle, Phone, MessageCircleDashed as MessageCircle, Heart, Brain, Users, Target, Clock, Star, ChevronRight, Play, Book, Lightbulb} from 'lucide-react'
import { useAdvancedStore } from '../store/useAdvancedStore'
import toast from 'react-hot-toast'

interface PreventionTip {
  id: string
  category: 'social' | 'emotional' | 'physical' | 'mental'
  title: string
  description: string
  tips: string[]
  icon: string
}

interface EmergencyResource {
  id: string
  name: string
  phone: string
  description: string
  availability: string
  type: 'hotline' | 'center' | 'online'
}

const Prevention = () => {
  const { addXP, updateStreak } = useAdvancedStore()
  const [activeTab, setActiveTab] = useState<'tips' | 'emergency' | 'strategies' | 'resources'>('tips')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedTip, setExpandedTip] = useState<string | null>(null)

  const preventionTips: PreventionTip[] = [
    {
      id: '1',
      category: 'social',
      title: 'Lidando com Pressão Social',
      description: 'Como dizer não sem perder amizades',
      tips: [
        'Pratique frases como "Não, obrigado" com confiança',
        'Sugira atividades alternativas divertidas',
        'Tenha sempre uma "saída" planejada',
        'Cerque-se de amigos que respeitam suas escolhas',
        'Lembre-se: verdadeiros amigos não pressionam'
      ],
      icon: '🤝'
    },
    {
      id: '2',
      category: 'emotional',
      title: 'Gerenciamento de Emoções',
      description: 'Técnicas para lidar com sentimentos difíceis',
      tips: [
        'Pratique respiração profunda quando se sentir ansioso',
        'Mantenha um diário de emoções',
        'Identifique seus gatilhos emocionais',
        'Busque atividades que tragam alegria',
        'Converse com alguém de confiança'
      ],
      icon: '💭'
    },
    {
      id: '3',
      category: 'physical',
      title: 'Atividades Físicas',
      description: 'Exercícios como alternativa saudável',
      tips: [
        'Pratique esportes que você gosta',
        'Faça caminhadas ao ar livre',
        'Experimente dança ou artes marciais',
        'Use exercícios para liberar estresse',
        'Estabeleça metas físicas alcançáveis'
      ],
      icon: '🏃'
    },
    {
      id: '4',
      category: 'mental',
      title: 'Saúde Mental',
      description: 'Cuidando da mente e dos pensamentos',
      tips: [
        'Pratique mindfulness e meditação',
        'Mantenha uma rotina de sono saudável',
        'Limite o tempo em redes sociais',
        'Cultive hobbies e interesses pessoais',
        'Procure ajuda profissional quando necessário'
      ],
      icon: '🧠'
    }
  ]

  const emergencyResources: EmergencyResource[] = [
    {
      id: '1',
      name: 'CVV - Centro de Valorização da Vida',
      phone: '188',
      description: 'Apoio emocional e prevenção do suicídio',
      availability: '24 horas, todos os dias',
      type: 'hotline'
    },
    {
      id: '2',
      name: 'CAPS - Centro de Atenção Psicossocial',
      phone: '136',
      description: 'Atendimento em saúde mental',
      availability: 'Segunda a sexta, 8h às 17h',
      type: 'center'
    },
    {
      id: '3',
      name: 'Disque Saúde',
      phone: '136',
      description: 'Informações sobre saúde e serviços',
      availability: '24 horas, todos os dias',
      type: 'hotline'
    },
    {
      id: '4',
      name: 'SAMU - Serviço de Atendimento Móvel de Urgência',
      phone: '192',
      description: 'Emergências médicas',
      availability: '24 horas, todos os dias',
      type: 'hotline'
    }
  ]

  const copingStrategies = [
    {
      id: '1',
      title: 'Técnica 5-4-3-2-1',
      description: 'Para momentos de ansiedade',
      steps: [
        '5 coisas que você pode ver',
        '4 coisas que você pode tocar',
        '3 coisas que você pode ouvir',
        '2 coisas que você pode cheirar',
        '1 coisa que você pode provar'
      ],
      icon: '🎯'
    },
    {
      id: '2',
      title: 'Respiração 4-7-8',
      description: 'Para relaxamento imediato',
      steps: [
        'Inspire pelo nariz por 4 segundos',
        'Segure a respiração por 7 segundos',
        'Expire pela boca por 8 segundos',
        'Repita 3-4 vezes',
        'Sinta o corpo relaxar'
      ],
      icon: '🫁'
    },
    {
      id: '3',
      title: 'Técnica STOP',
      description: 'Para decisões impulsivas',
      steps: [
        'STOP - Pare o que está fazendo',
        'TAKE A BREATH - Respire fundo',
        'OBSERVE - Observe seus sentimentos',
        'PROCEED - Prossiga com consciência',
        'Escolha a melhor ação'
      ],
      icon: '🛑'
    }
  ]

  const categories = [
    { id: 'all', name: 'Todas', icon: '📋', color: 'bg-gray-500' },
    { id: 'social', name: 'Social', icon: '🤝', color: 'bg-blue-500' },
    { id: 'emotional', name: 'Emocional', icon: '💭', color: 'bg-purple-500' },
    { id: 'physical', name: 'Física', icon: '🏃', color: 'bg-green-500' },
    { id: 'mental', name: 'Mental', icon: '🧠', color: 'bg-orange-500' }
  ]

  const filteredTips = selectedCategory === 'all' 
    ? preventionTips 
    : preventionTips.filter(tip => tip.category === selectedCategory)

  const handleTipExpand = (tipId: string) => {
    setExpandedTip(expandedTip === tipId ? null : tipId)
    addXP(10)
    toast.success('📚 +10 XP por ler dica!')
  }

  const handleEmergencyCall = (phone: string, name: string) => {
    toast.success(`📞 Discando para ${name}: ${phone}`)
    // Em um app real, isso abriria o discador
    window.open(`tel:${phone}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pb-24 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-6"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Shield size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Prevenção</h1>
          <p className="text-gray-600">Ferramentas e estratégias para se proteger</p>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6"
      >
        <div className="bg-white rounded-2xl p-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'tips', name: 'Dicas', icon: Lightbulb },
              { id: 'emergency', name: 'Emergência', icon: AlertTriangle },
              { id: 'strategies', name: 'Estratégias', icon: Target },
              { id: 'resources', name: 'Recursos', icon: Book }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                <span className="text-sm">{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="px-6">
        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-6">
            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? `${category.color} text-white shadow-lg`
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Tips List */}
            <div className="space-y-4">
              {filteredTips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => handleTipExpand(tip.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{tip.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{tip.title}</h3>
                        <p className="text-gray-600">{tip.description}</p>
                      </div>
                      <ChevronRight 
                        size={20} 
                        className={`text-gray-400 transition-transform ${
                          expandedTip === tip.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {expandedTip === tip.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100"
                      >
                        <div className="p-6 bg-gray-50">
                          <h4 className="font-semibold text-gray-800 mb-3">Estratégias práticas:</h4>
                          <ul className="space-y-2">
                            {tip.tips.map((tipText, tipIndex) => (
                              <motion.li
                                key={tipIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: tipIndex * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-gray-700">{tipText}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Tab */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            {/* Emergency Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={24} className="text-red-600" />
                <h3 className="text-lg font-bold text-red-800">Em Situação de Emergência</h3>
              </div>
              <p className="text-red-700 mb-4">
                Se você ou alguém que conhece está em perigo imediato, não hesite em buscar ajuda profissional.
              </p>
              <div className="bg-white rounded-xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Sinais de alerta:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Pensamentos de autolesão</li>
                  <li>• Comportamento muito arriscado</li>
                  <li>• Isolamento social extremo</li>
                  <li>• Mudanças drásticas de humor</li>
                </ul>
              </div>
            </motion.div>

            {/* Emergency Contacts */}
            <div className="space-y-4">
              {emergencyResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{resource.name}</h3>
                      <p className="text-gray-600 mb-2">{resource.description}</p>
                      <div className="text-sm text-gray-500">
                        <Clock size={14} className="inline mr-1" />
                        {resource.availability}
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEmergencyCall(resource.phone, resource.name)}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Ligar: {resource.phone}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Strategies Tab */}
        {activeTab === 'strategies' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Técnicas de Enfrentamento</h3>
              <p className="text-gray-600 mb-6">
                Aprenda estratégias práticas para lidar com momentos difíceis e tomar decisões saudáveis.
              </p>
            </motion.div>

            {copingStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{strategy.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{strategy.title}</h3>
                    <p className="text-gray-600">{strategy.description}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Como fazer:</h4>
                  <ol className="space-y-2">
                    {strategy.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {stepIndex + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addXP(15)
                    toast.success('🎯 +15 XP por praticar técnica!')
                  }}
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Play size={20} />
                  Praticar Agora
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Book size={64} className="mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Biblioteca de Recursos</h3>
              <p className="text-gray-600 mb-6">
                Acesse materiais educativos, vídeos e conteúdo especializado sobre prevenção.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addXP(20)
                    toast.success('📚 Acessando biblioteca!')
                  }}
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold"
                >
                  Artigos Científicos
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addXP(20)
                    toast.success('🎥 Acessando vídeos!')
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold"
                >
                  Vídeos Educativos
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addXP(20)
                    toast.success('🎧 Acessando podcasts!')
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold"
                >
                  Podcasts
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
            >
              <div className="text-center">
                <Star size={32} className="mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-2">Dica Rápida</h3>
                <p className="text-sm opacity-90">
                  "Lembre-se: pedir ajuda é um sinal de força, não de fraqueza. 
                  Você não precisa enfrentar os desafios sozinho."
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Prevention
