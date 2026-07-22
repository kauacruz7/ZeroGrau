
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {GraduationCap, Shield, Brain, Heart, Mail, Lock, Eye, EyeOff, AlertCircle} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const LoginScreen = () => {
  const { login, register } = useAuthStore()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Nome é obrigatório'
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('🔄 Iniciando processo de autenticação...')
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros do formulário')
      return
    }
    
    setLoading(true)

    try {
      if (isLogin) {
        console.log('🔑 Fazendo login via store...')
        await login(formData.email, formData.password)
        toast.success('🎉 Login realizado com sucesso!')
      } else {
        console.log('📝 Fazendo cadastro via store...')
        await register(formData.email, formData.password, formData.name)
        toast.success('🎉 Conta criada com sucesso!')
      }
      
      console.log('✅ Processo concluído - aguardando redirecionamento automático...')
      
    } catch (error: any) {
      console.error('❌ Erro no processo:', error)
      toast.error(error.message || (isLogin ? 'Erro no login' : 'Erro ao criar conta'))
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const quickLogin = () => {
    console.log('🚀 Preenchendo credenciais demo...')
    setFormData({
      email: 'demo@zerograu.com',
      password: '123456',
      name: ''
    })
    setIsLogin(true)
    toast.success('🚀 Credenciais demo preenchidas!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>
        
        {/* Logo and branding */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg"
          >
            <GraduationCap size={40} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ZeroGrau</h1>
          <p className="text-gray-600 text-lg">Educação sobre Álcool e Drogas</p>
          <p className="text-sm text-gray-500 mt-1">Por Kauã Cruz</p>
        </motion.div>

        {/* Quick Demo Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={quickLogin}
          className="w-full mb-4 py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
        >
          🚀 Acesso Demo Rápido
        </motion.button>

        {/* Login/Signup Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex bg-gray-100 rounded-xl p-1 mb-6"
        >
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              isLogin 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              !isLogin 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Criar Conta
          </button>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Seu nome completo"
              />
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 mt-1 text-red-500 text-xs"
                >
                  <AlertCircle size={12} />
                  {errors.name}
                </motion.div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="seu@email.com"
              />
            </div>
            {errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 mt-1 text-red-500 text-xs"
              >
                <AlertCircle size={12} />
                {errors.email}
              </motion.div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 mt-1 text-red-500 text-xs"
              >
                <AlertCircle size={12} />
                {errors.password}
              </motion.div>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Processando...</span>
              </>
            ) : (
              <>
                <GraduationCap size={24} />
                {isLogin ? 'Entrar no ZeroGrau' : 'Criar Conta'}
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-4 mt-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-3 bg-blue-50 rounded-xl cursor-pointer"
          >
            <Brain className="text-blue-600 mx-auto mb-2" size={24} />
            <p className="text-xs text-blue-800 font-medium">Quiz Educativo</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-3 bg-green-50 rounded-xl cursor-pointer"
          >
            <Shield className="text-green-600 mx-auto mb-2" size={24} />
            <p className="text-xs text-green-800 font-medium">Prevenção</p>
          </motion.div>
        </motion.div>

        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mt-6 border border-amber-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-red-500" size={20} />
            <h3 className="font-bold text-gray-800">Nossa Missão</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Educar jovens sobre os riscos do álcool e drogas através de 
            conteúdo científico e interativo para escolhas mais conscientes.
          </p>
        </motion.div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>
      </motion.div>
    </div>
  )
}

export default LoginScreen
