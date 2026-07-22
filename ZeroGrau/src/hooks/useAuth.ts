
import { useState, useEffect, useCallback } from 'react'

interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

// Sistema de autenticação profissional
const AUTH_API = {
  async login(email: string, password: string): Promise<User> {
    // Simula delay de rede realista
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Credenciais demo para demonstração
    if (email === 'demo@zerograu.com' && password === '123456') {
      return {
        id: '1',
        email,
        name: 'Usuário Demo',
        createdAt: new Date().toISOString()
      }
    }
    
    // Validação profissional de email e senha
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error('Email inválido')
    }
    
    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres')
    }
    
    // Para demonstração, aceita emails válidos
    return {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      createdAt: new Date().toISOString()
    }
  },

  async register(email: string, password: string, name: string): Promise<User> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Validações profissionais
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error('Email inválido')
    }
    
    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres')
    }
    
    if (name.trim().length < 2) {
      throw new Error('Nome deve ter pelo menos 2 caracteres')
    }
    
    // Verifica se email já existe
    const existingUser = localStorage.getItem(`user_${email}`)
    if (existingUser) {
      throw new Error('Email já cadastrado')
    }
    
    const user: User = {
      id: Date.now().toString(),
      email,
      name: name.trim(),
      createdAt: new Date().toISOString()
    }
    
    // Salva usuário no sistema
    localStorage.setItem(`user_${email}`, JSON.stringify(user))
    
    return user
  }
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [, forceUpdate] = useState({})

  // Força re-renderização do componente
  const triggerRerender = useCallback(() => {
    forceUpdate({})
  }, [])

  useEffect(() => {
    // Inicialização segura da autenticação
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser')
        const sessionToken = localStorage.getItem('sessionToken')
        const sessionTime = localStorage.getItem('sessionTime')
        
        if (savedUser && sessionToken && sessionTime) {
          // Verifica se a sessão não expirou (24 horas)
          const sessionAge = Date.now() - parseInt(sessionTime)
          const maxAge = 24 * 60 * 60 * 1000 // 24 horas
          
          if (sessionAge < maxAge) {
            const userData = JSON.parse(savedUser)
            setUser(userData)
            setIsAuthenticated(true)
            console.log('✅ Sessão restaurada:', userData.email)
          } else {
            // Sessão expirou, limpa dados
            localStorage.removeItem('currentUser')
            localStorage.removeItem('sessionToken')
            localStorage.removeItem('sessionTime')
            console.log('⚠️ Sessão expirada')
          }
        }
      } catch (error) {
        console.error('❌ Erro ao restaurar sessão:', error)
        // Limpa dados corrompidos
        localStorage.removeItem('currentUser')
        localStorage.removeItem('sessionToken')
        localStorage.removeItem('sessionTime')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔄 Iniciando login...')
      const userData = await AUTH_API.login(email, password)
      
      // Salva na sessão
      const sessionToken = Date.now().toString()
      localStorage.setItem('currentUser', JSON.stringify(userData))
      localStorage.setItem('sessionToken', sessionToken)
      localStorage.setItem('sessionTime', Date.now().toString())
      
      console.log('💾 Dados salvos no localStorage')
      
      // 🎯 CORREÇÃO PRINCIPAL: Atualização FORÇADA do estado
      setUser(userData)
      setIsAuthenticated(true)
      
      // Força re-renderização imediata
      setTimeout(() => {
        triggerRerender()
        console.log('🔄 Re-renderização forçada')
      }, 50)
      
      console.log('✅ Login concluído - Estado:', { isAuthenticated: true, user: userData.email })
      
    } catch (error) {
      console.error('❌ Erro no login:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('🔄 Iniciando cadastro...')
      const userData = await AUTH_API.register(email, password, name)
      
      // Login automático após cadastro
      const sessionToken = Date.now().toString()
      localStorage.setItem('currentUser', JSON.stringify(userData))
      localStorage.setItem('sessionToken', sessionToken)
      localStorage.setItem('sessionTime', Date.now().toString())
      
      console.log('💾 Dados de cadastro salvos')
      
      // 🎯 CORREÇÃO: Atualização FORÇADA do estado
      setUser(userData)
      setIsAuthenticated(true)
      
      // Força re-renderização imediata
      setTimeout(() => {
        triggerRerender()
        console.log('🔄 Re-renderização forçada após cadastro')
      }, 50)
      
      console.log('✅ Cadastro concluído - Estado:', { isAuthenticated: true, user: userData.email })
      
    } catch (error) {
      console.error('❌ Erro no cadastro:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      // Limpa sessão completamente
      localStorage.removeItem('currentUser')
      localStorage.removeItem('sessionToken')
      localStorage.removeItem('sessionTime')
      
      setUser(null)
      setIsAuthenticated(false)
      triggerRerender()
      
      console.log('✅ Logout realizado')
    } catch (error) {
      console.error('❌ Erro no logout:', error)
      throw error
    }
  }

  // Debug: Log do estado atual
  useEffect(() => {
    console.log('🔍 Estado atual do auth:', { isAuthenticated, user: user?.email, loading })
  }, [isAuthenticated, user, loading])

  return {
    user,
    isAuthenticated,
    loading,
    signIn,
    signUp,
    signOut
  }
}
