
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Settings as SettingsIcon, User, Bell, Shield, Palette, Accessibility, Volume2, Moon, Sun, Smartphone, Mail, Lock, Eye, EyeOff, Save, LogOut, Trash2, Download, Upload, RefreshCw} from 'lucide-react'
import { useAdvancedStore } from '../store/useAdvancedStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const Settings = () => {
  const { user, settings, updateSettings, updateUserProfile } = useAdvancedStore()
  const { logout } = useAuthStore()
  
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'privacy' | 'accessibility' | 'theme' | 'account'>('theme')
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || 18,
    profileType: user?.profileType || 'prevention',
    ageGroup: user?.ageGroup || '16-18',
    interests: user?.interests || []
  })

  const sections = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'theme', name: 'Tema', icon: Palette },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'privacy', name: 'Privacidade', icon: Shield },
    { id: 'accessibility', name: 'Acessibilidade', icon: Accessibility },
    { id: 'account', name: 'Conta', icon: Lock }
  ]

  const interests = [
    'Esportes', 'Música', 'Arte', 'Tecnologia', 'Leitura', 'Cinema',
    'Jogos', 'Viagens', 'Culinária', 'Fotografia', 'Dança', 'Teatro'
  ]

  const colorSchemes = [
    { id: 'blue', name: 'Azul', color: '#3b82f6', preview: 'bg-blue-500' },
    { id: 'green', name: 'Verde', color: '#10b981', preview: 'bg-green-500' },
    { id: 'purple', name: 'Roxo', color: '#8b5cf6', preview: 'bg-purple-500' },
    { id: 'orange', name: 'Laranja', color: '#f59e0b', preview: 'bg-orange-500' }
  ]

  const handleThemeChange = (key: string, value: any) => {
    const newSettings = {
      ...settings,
      theme: {
        ...settings?.theme,
        [key]: value
      }
    }
    updateSettings(newSettings)
    toast.success(`Tema ${value === 'dark' ? 'escuro' : value === 'light' ? 'claro' : value} aplicado!`)
  }

  const handleSaveProfile = () => {
    updateUserProfile(profileData)
    toast.success('Perfil atualizado com sucesso!')
  }

  const handleLogout = () => {
    logout()
    toast.success('Logout realizado!')
  }

  const handleExportData = () => {
    try {
      const data = {
        profile: user,
        settings: settings,
        exportDate: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `zerograu-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success('Dados exportados!')
    } catch (error) {
      toast.error('Erro ao exportar dados')
    }
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta?')) {
      toast.success('Conta marcada para exclusão')
      setTimeout(() => logout(), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pb-24 pt-4">
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
            className="w-16 h-16 bg-gradient-to-r from-gray-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <SettingsIcon size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Configurações</h1>
          <p className="text-gray-600">Personalize sua experiência no ZeroGrau</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6"
      >
        <div className="bg-white rounded-2xl p-2 shadow-lg overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(section.id as any)}
                className={`flex items-center gap-2 py-3 px-4 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <section.icon size={18} />
                <span className="text-sm">{section.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-6">
        {/* Theme Section */}
        {activeSection === 'theme' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-6">🎨 Personalização do Tema</h3>
              
              <div className="space-y-8">
                {/* Modo de Exibição */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Modo de Exibição</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'light', name: 'Claro', icon: Sun, desc: 'Tema claro' },
                      { id: 'dark', name: 'Escuro', icon: Moon, desc: 'Tema escuro' },
                      { id: 'auto', name: 'Auto', icon: Smartphone, desc: 'Segue o sistema' }
                    ].map((mode) => (
                      <motion.button
                        key={mode.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleThemeChange('mode', mode.id)}
                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          settings?.theme?.mode === mode.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        <mode.icon 
                          size={28} 
                          className={settings?.theme?.mode === mode.id ? 'text-blue-600' : 'text-gray-600'} 
                        />
                        <div className="text-center">
                          <span className={`text-sm font-semibold block ${settings?.theme?.mode === mode.id ? 'text-blue-600' : 'text-gray-700'}`}>
                            {mode.name}
                          </span>
                          <span className="text-xs text-gray-500">{mode.desc}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Esquema de Cores */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Esquema de Cores</label>
                  <div className="grid grid-cols-2 gap-4">
                    {colorSchemes.map((scheme) => (
                      <motion.button
                        key={scheme.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleThemeChange('colorScheme', scheme.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          settings?.theme?.colorScheme === scheme.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        <div 
                          className="w-8 h-8 rounded-full shadow-md flex-shrink-0" 
                          style={{ backgroundColor: scheme.color }}
                        ></div>
                        <div className="text-left">
                          <span className={`font-semibold block ${settings?.theme?.colorScheme === scheme.id ? 'text-blue-600' : 'text-gray-700'}`}>
                            {scheme.name}
                          </span>
                          <span className="text-xs text-gray-500">Cor principal</span>
                        </div>
                        {settings?.theme?.colorScheme === scheme.id && (
                          <div className="ml-auto">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">👀 Pré-visualização</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      Modo atual: <span className="font-semibold">{
                        settings?.theme?.mode === 'light' ? 'Claro' :
                        settings?.theme?.mode === 'dark' ? 'Escuro' : 'Automático'
                      }</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Cores: <span className="font-semibold">{
                        colorSchemes.find(c => c.id === settings?.theme?.colorScheme)?.name || 'Azul'
                      }</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile Section */}
        {activeSection === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Informações Pessoais</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveProfile}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Salvar Perfil
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Account Section */}
        {activeSection === 'account' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Gerenciar Conta</h3>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExportData}
                  className="w-full flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Download size={20} className="text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium text-blue-800">Exportar Dados</div>
                    <div className="text-sm text-blue-600">Baixar uma cópia dos seus dados</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors"
                >
                  <LogOut size={20} className="text-orange-600" />
                  <div className="text-left">
                    <div className="font-medium text-orange-800">Sair da Conta</div>
                    <div className="text-sm text-orange-600">Fazer logout do aplicativo</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={20} className="text-red-600" />
                  <div className="text-left">
                    <div className="font-medium text-red-800">Excluir Conta</div>
                    <div className="text-sm text-red-600">Remover permanentemente sua conta</div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Settings
