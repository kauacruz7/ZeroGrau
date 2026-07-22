
import React from 'react'
import { motion } from 'framer-motion'
import {User, Mail, Calendar, Shield, LogOut, Settings, Bell, Award} from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const Account = () => {
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Usuário não encontrado</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-b-3xl shadow-lg"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-white bg-opacity-20 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
          >
            <User size={40} className="text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
          <p className="text-indigo-100 text-sm">{user.email}</p>
        </div>
      </motion.div>

      {/* Account Info */}
      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="text-indigo-600" size={24} />
            Informações da Conta
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Mail className="text-gray-500" size={20} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Calendar className="text-gray-500" size={20} />
              <div>
                <p className="text-sm text-gray-500">Membro desde</p>
                <p className="font-medium text-gray-800">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="text-yellow-500" size={24} />
            Seu Progresso
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-sm text-blue-800">Quiz Completados</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">8</div>
              <p className="text-sm text-green-800">Artigos Lidos</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <p className="text-sm text-purple-800">Jogos Jogados</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">15</div>
              <p className="text-sm text-orange-800">Dias Consecutivos</p>
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="text-gray-600" size={24} />
            Configurações
          </h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="text-gray-500" size={20} />
              <span className="text-gray-700">Notificações</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Shield className="text-gray-500" size={20} />
              <span className="text-gray-700">Privacidade</span>
            </button>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-3"
        >
          <LogOut size={24} />
          Sair da Conta
        </motion.button>
      </div>
    </div>
  )
}

export default Account
