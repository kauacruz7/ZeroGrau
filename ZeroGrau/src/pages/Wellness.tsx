
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {Heart, Calendar, TrendingUp, Target, Shield, Phone, MessageCircleDashed as MessageCircle, Clock, Plus, Edit3, Trash2, AlertTriangle, CheckCircle, BarChart3} from 'lucide-react'
import { useAdvancedStore } from '../store/useAdvancedStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts'
import toast from 'react-hot-toast'

interface MoodEntry {
  id: string
  date: string
  mood: 1 | 2 | 3 | 4 | 5
  energy: 1 | 2 | 3 | 4 | 5
  stress: 1 | 2 | 3 | 4 | 5
  notes?: string
  triggers?: string[]
  coping?: string[]
}

const Wellness = () => {
  const { 
    moodEntries, 
    habits, 
    emergencyContacts,
    addMoodEntry, 
    updateHabit, 
    addHabit,
    addEmergencyContact 
  } = useAdvancedStore()

  const [activeTab, setActiveTab] = useState<'mood' | 'habits' | 'emergency'>('mood')
  const [showMoodForm, setShowMoodForm] = useState(false)
  const [showHabitForm, setShowHabitForm] = useState(false)
  const [showEmergencyForm, setShowEmergencyForm] = useState(false)
  
  const [newMood, setNewMood] = useState({
    mood: 3 as 1 | 2 | 3 | 4 | 5,
    energy: 3 as 1 | 2 | 3 | 4 | 5,
    stress: 3 as 1 | 2 | 3 | 4 | 5,
    notes: '',
    triggers: [] as string[],
    coping: [] as string[]
  })

  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    category: 'positive' as 'positive' | 'negative',
    icon: '✅',
    color: 'blue',
    target: 1,
    unit: 'vezes'
  })

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: 'family' as 'family' | 'friend' | 'professional',
    priority: 1
  })

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Mock data para demonstração
  const moodData = [
    { date: '01/01', mood: 4, energy: 3, stress: 2 },
    { date: '02/01', mood: 3, energy: 4, stress: 3 },
    { date: '03/01', mood: 5, energy: 5, stress: 1 },
    { date: '04/01', mood: 4, energy: 3, stress: 2 },
    { date: '05/01', mood: 3, energy: 2, stress: 4 },
    { date: '06/01', mood: 4, energy: 4, stress: 2 },
    { date: '07/01', mood: 5, energy: 4, stress: 1 }
  ]

  const habitData = habits?.map(habit => ({
    name: habit.name,
    progress: habit.entries.filter(e => e.date === selectedDate)[0]?.value || 0,
    target: habit.target,
    percentage: ((habit.entries.filter(e => e.date === selectedDate)[0]?.value || 0) / habit.target) * 100
  })) || []

  const commonTriggers = [
    'Estresse', 'Pressão social', 'Ansiedade', 'Tédio', 'Tristeza', 
    'Conflitos', 'Solidão', 'Trabalho', 'Estudos', 'Família'
  ]

  const copingStrategies = [
    'Exercício', 'Meditação', 'Música', 'Conversar', 'Ler', 
    'Respiração', 'Caminhada', 'Hobby', 'Descanso', 'Água'
  ]

  const moodEmojis = ['😢', '😕', '😐', '😊', '😄']
  const energyEmojis = ['🔋', '🔋', '🔋', '🔋', '🔋']
  const stressEmojis = ['😌', '😐', '😰', '😫', '🤯']

  const handleMoodSubmit = () => {
    addMoodEntry({
      date: selectedDate,
      mood: newMood.mood,
      energy: newMood.energy,
      stress: newMood.stress,
      notes: newMood.notes,
      triggers: newMood.triggers,
      coping: newMood.coping
    })

    setNewMood({
      mood: 3,
      energy: 3,
      stress: 3,
      notes: '',
      triggers: [],
      coping: []
    })
    setShowMoodForm(false)
    toast.success('Humor registrado com sucesso!')
  }

  const handleHabitSubmit = () => {
    if (!newHabit.name.trim()) {
      toast.error('Nome do hábito é obrigatório')
      return
    }

    addHabit(newHabit)
    setNewHabit({
      name: '',
      description: '',
      category: 'positive',
      icon: '✅',
      color: 'blue',
      target: 1,
      unit: 'vezes'
    })
    setShowHabitForm(false)
    toast.success('Hábito adicionado com sucesso!')
  }

  const handleContactSubmit = () => {
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      toast.error('Nome e telefone são obrigatórios')
      return
    }

    addEmergencyContact(newContact)
    setNewContact({
      name: '',
      phone: '',
      email: '',
      relationship: 'family',
      priority: 1
    })
    setShowEmergencyForm(false)
    toast.success('Contato de emergência adicionado!')
  }

  const updateHabitValue = (habitId: string, value: number) => {
    updateHabit(habitId, value, selectedDate)
    toast.success('Hábito atualizado!')
  }

  const emergencyNumbers = [
    { name: 'CVV - Centro de Valorização da Vida', number: '188', description: 'Prevenção do suicídio' },
    { name: 'CAPS - Centro de Atenção Psicossocial', number: '136', description: 'Saúde mental' },
    { name: 'Disque Saúde', number: '136', description: 'Informações de saúde' },
    { name: 'SAMU', number: '192', description: 'Emergências médicas' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 pb-24 pt-4">
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
            className="w-16 h-16 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Heart size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-estar</h1>
          <p className="text-gray-600">Cuide da sua saúde mental e emocional</p>
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
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'mood', name: 'Humor', icon: Heart },
              { id: 'habits', name: 'Hábitos', icon: Target },
              { id: 'emergency', name: 'Emergência', icon: Shield }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-blue-600 text-white shadow-lg'
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

      {/* Date Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-6"
      >
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-blue-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="px-6">
        {/* Mood Tab */}
        {activeTab === 'mood' && (
          <div className="space-y-6">
            {/* Quick Mood Entry */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Como você está hoje?</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMoodForm(true)}
                  className="bg-gradient-to-r from-pink-500 to-blue-600 text-white p-2 rounded-full"
                >
                  <Plus size={20} />
                </motion.button>
              </div>

              {/* Mood Chart */}
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis domain={[1, 5]} hide />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#ec4899" 
                      strokeWidth={3}
                      dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                      name="Humor"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="energy" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                      name="Energia"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="stress" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                      name="Estresse"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full mx-auto mb-1"></div>
                  <span className="text-gray-600">Humor</span>
                </div>
                <div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                  <span className="text-gray-600">Energia</span>
                </div>
                <div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                  <span className="text-gray-600">Estresse</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Mood Entries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Registros Recentes</h3>
              
              {moodEntries && moodEntries.length > 0 ? (
                <div className="space-y-3">
                  {moodEntries.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{moodEmojis[entry.mood - 1]}</div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {new Date(entry.date).toLocaleDateString()}
                          </div>
                          {entry.notes && (
                            <div className="text-sm text-gray-600">{entry.notes}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>Energia: {energyEmojis[entry.energy - 1]}</div>
                        <div>Estresse: {stressEmojis[entry.stress - 1]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Heart size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Nenhum registro de humor ainda</p>
                  <p className="text-sm">Comece registrando como você se sente hoje!</p>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Habits Tab */}
        {activeTab === 'habits' && (
          <div className="space-y-6">
            {/* Add Habit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowHabitForm(true)}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus size={20} />
              Adicionar Hábito
            </motion.button>

            {/* Habits Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Progresso de Hoje</h3>
              
              {habits && habits.length > 0 ? (
                <div className="space-y-4">
                  {habits.map((habit) => {
                    const todayEntry = habit.entries.find(e => e.date === selectedDate)
                    const currentValue = todayEntry?.value || 0
                    const progress = (currentValue / habit.target) * 100

                    return (
                      <div key={habit.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{habit.icon}</span>
                            <div>
                              <div className="font-medium text-gray-800">{habit.name}</div>
                              <div className="text-sm text-gray-600">{habit.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-800">
                              {currentValue}/{habit.target} {habit.unit}
                            </div>
                            <div className="text-sm text-gray-600">{Math.round(progress)}%</div>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              habit.category === 'positive' 
                                ? 'bg-gradient-to-r from-green-400 to-blue-500'
                                : 'bg-gradient-to-r from-red-400 to-orange-500'
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateHabitValue(habit.id, Math.max(0, currentValue - 1))}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                          >
                            -
                          </motion.button>
                          
                          <span className="flex-1 text-center font-medium">{currentValue}</span>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateHabitValue(habit.id, currentValue + 1)}
                            className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Target size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Nenhum hábito cadastrado</p>
                  <p className="text-sm">Adicione hábitos para acompanhar seu progresso!</p>
                </div>
              )}
            </motion.div>

            {/* Habits Chart */}
            {habitData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">Visão Geral</h3>
                
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={habitData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                      />
                      <YAxis hide />
                      <Bar 
                        dataKey="percentage" 
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Emergency Tab */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            {/* Emergency Numbers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={24} className="text-red-600" />
                <h3 className="text-lg font-bold text-red-800">Emergência</h3>
              </div>
              
              <div className="space-y-3">
                {emergencyNumbers.map((contact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl p-4 border border-red-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-800">{contact.name}</div>
                        <div className="text-sm text-gray-600">{contact.description}</div>
                      </div>
                      <motion.a
                        href={`tel:${contact.number}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >
                        <Phone size={16} />
                        {contact.number}
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Personal Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Seus Contatos de Emergência</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEmergencyForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full"
                >
                  <Plus size={20} />
                </motion.button>
              </div>

              {emergencyContacts && emergencyContacts.length > 0 ? (
                <div className="space-y-3">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-800">{contact.name}</div>
                        <div className="text-sm text-gray-600 capitalize">{contact.relationship}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.a
                          href={`tel:${contact.phone}`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-green-600 text-white p-2 rounded-full"
                        >
                          <Phone size={16} />
                        </motion.a>
                        {contact.email && (
                          <motion.a
                            href={`mailto:${contact.email}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-blue-600 text-white p-2 rounded-full"
                          >
                            <MessageCircle size={16} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Shield size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Nenhum contato de emergência</p>
                  <p className="text-sm">Adicione pessoas importantes para momentos difíceis</p>
                </div>
              )}
            </motion.div>

            {/* Crisis Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-blue-800 mb-4">Recursos de Apoio</h3>
              
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Se você está pensando em se machucar:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Ligue 188 (CVV) - 24h gratuito</li>
                    <li>• Procure um adulto de confiança</li>
                    <li>• Vá ao pronto-socorro mais próximo</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Em situações de risco:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Saia do local se possível</li>
                    <li>• Ligue para um contato de confiança</li>
                    <li>• Use aplicativos de segurança</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Mood Form Modal */}
      <AnimatePresence>
        {showMoodForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowMoodForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">Registrar Humor</h3>
              
              <div className="space-y-6">
                {/* Mood Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Como está seu humor? {moodEmojis[newMood.mood - 1]}
                  </label>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <motion.button
                        key={value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setNewMood({ ...newMood, mood: value as any })}
                        className={`w-12 h-12 rounded-full text-2xl ${
                          newMood.mood === value
                            ? 'bg-pink-500 text-white scale-110'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {moodEmojis[value - 1]}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Energy Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Nível de energia? ⚡
                  </label>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <motion.button
                        key={value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setNewMood({ ...newMood, energy: value as any })}
                        className={`w-12 h-12 rounded-full text-xl font-bold ${
                          newMood.energy === value
                            ? 'bg-blue-500 text-white scale-110'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {value}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Stress Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Nível de estresse? {stressEmojis[newMood.stress - 1]}
                  </label>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <motion.button
                        key={value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setNewMood({ ...newMood, stress: value as any })}
                        className={`w-12 h-12 rounded-full text-2xl ${
                          newMood.stress === value
                            ? 'bg-yellow-500 text-white scale-110'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {stressEmojis[value - 1]}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas (opcional)
                  </label>
                  <textarea
                    value={newMood.notes}
                    onChange={(e) => setNewMood({ ...newMood, notes: e.target.value })}
                    placeholder="Como foi seu dia? O que influenciou seu humor?"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                  />
                </div>

                {/* Triggers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gatilhos (opcional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonTriggers.map((trigger) => (
                      <motion.button
                        key={trigger}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const triggers = newMood.triggers.includes(trigger)
                            ? newMood.triggers.filter(t => t !== trigger)
                            : [...newMood.triggers, trigger]
                          setNewMood({ ...newMood, triggers })
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newMood.triggers.includes(trigger)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {trigger}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Coping Strategies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estratégias usadas (opcional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {copingStrategies.map((strategy) => (
                      <motion.button
                        key={strategy}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const coping = newMood.coping.includes(strategy)
                            ? newMood.coping.filter(s => s !== strategy)
                            : [...newMood.coping, strategy]
                          setNewMood({ ...newMood, coping })
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newMood.coping.includes(strategy)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {strategy}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowMoodForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleMoodSubmit}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-blue-600 text-white rounded-xl font-semibold"
                >
                  Registrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Habit Form Modal */}
      <AnimatePresence>
        {showHabitForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowHabitForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">Adicionar Hábito</h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome do hábito..."
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                
                <textarea
                  placeholder="Descrição (opcional)..."
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                    <select
                      value={newHabit.category}
                      onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value as any })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="positive">Positivo</option>
                      <option value="negative">Negativo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta</label>
                    <input
                      type="number"
                      min="1"
                      value={newHabit.target}
                      onChange={(e) => setNewHabit({ ...newHabit, target: parseInt(e.target.value) || 1 })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ícone</label>
                    <input
                      type="text"
                      placeholder="✅"
                      value={newHabit.icon}
                      onChange={(e) => setNewHabit({ ...newHabit, icon: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unidade</label>
                    <input
                      type="text"
                      placeholder="vezes"
                      value={newHabit.unit}
                      onChange={(e) => setNewHabit({ ...newHabit, unit: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowHabitForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleHabitSubmit}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold"
                >
                  Adicionar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency Contact Form Modal */}
      <AnimatePresence>
        {showEmergencyForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowEmergencyForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">Adicionar Contato de Emergência</h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome completo..."
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                
                <input
                  type="tel"
                  placeholder="Telefone..."
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                
                <input
                  type="email"
                  placeholder="Email (opcional)..."
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                
                <select
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value as any })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="family">Família</option>
                  <option value="friend">Amigo</option>
                  <option value="professional">Profissional</option>
                </select>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEmergencyForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleContactSubmit}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold"
                >
                  Adicionar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Wellness
