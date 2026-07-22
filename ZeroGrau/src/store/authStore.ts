
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  initialize: () => void
}

// API simulada
const AUTH_API = {
  async login(email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    if (email === 'demo@zerograu.com' && password === '123456') {
      return {
        id: '1',
        email,
        name: 'Usuário Demo',
        createdAt: new Date().toISOString()
      }
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error('Email inválido')
    }
    
    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres')
    }
    
    return {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      createdAt: new Date().toISOString()
    }
  },

  async register(email: string, password: string, name: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error('Email inválido')
    }
    
    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres')
    }
    
    if (name.trim().length < 2) {
      throw new Error('Nome deve ter pelo menos 2 caracteres')
    }
    
    return {
      id: Date.now().toString(),
      email,
      name: name.trim(),
      createdAt: new Date().toISOString()
    }
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: true,

      setUser: (user: User) => {
        console.log('🔄 Definindo usuário:', user.email)
        set({ user, isAuthenticated: true })
      },

      setLoading: (loading: boolean) => {
        set({ loading })
      },

      login: async (email: string, password: string) => {
        console.log('🔑 Iniciando login para:', email)
        set({ loading: true })
        
        try {
          const user = await AUTH_API.login(email, password)
          console.log('✅ Login bem-sucedido:', user.email)
          
          // Atualiza estado imediatamente
          set({ 
            user, 
            isAuthenticated: true, 
            loading: false 
          })
          
          console.log('🎯 Estado após login:', get())
          
        } catch (error) {
          console.error('❌ Erro no login:', error)
          set({ loading: false })
          throw error
        }
      },

      register: async (email: string, password: string, name: string) => {
        console.log('📝 Iniciando cadastro para:', email)
        set({ loading: true })
        
        try {
          const user = await AUTH_API.register(email, password, name)
          console.log('✅ Cadastro bem-sucedido:', user.email)
          
          // Login automático após cadastro
          set({ 
            user, 
            isAuthenticated: true, 
            loading: false 
          })
          
          console.log('🎯 Estado após cadastro:', get())
          
        } catch (error) {
          console.error('❌ Erro no cadastro:', error)
          set({ loading: false })
          throw error
        }
      },

      logout: () => {
        console.log('👋 Fazendo logout')
        set({ 
          user: null, 
          isAuthenticated: false, 
          loading: false 
        })
      },

      initialize: () => {
        console.log('🚀 Inicializando auth store')
        set({ loading: false })
      }
    }),
    {
      name: 'zerograu-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)
