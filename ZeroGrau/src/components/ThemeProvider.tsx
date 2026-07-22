
import React, { useEffect } from 'react'
import { useAdvancedStore } from '../store/useAdvancedStore'

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { settings } = useAdvancedStore()

  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement
      const body = document.body
      
      // Remover todas as classes de tema anteriores
      root.classList.remove('dark', 'theme-blue', 'theme-green', 'theme-purple', 'theme-orange')
      
      // Determinar se deve usar modo escuro
      const themeMode = settings?.theme?.mode || 'light'
      let isDarkMode = false
      
      if (themeMode === 'dark') {
        isDarkMode = true
      } else if (themeMode === 'auto') {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      
      // Remover estilos dinâmicos anteriores
      let existingStyle = document.getElementById('dynamic-theme-styles')
      if (existingStyle) {
        existingStyle.remove()
      }
      
      // Aplicar modo escuro ou claro
      if (isDarkMode) {
        root.classList.add('dark')
        body.style.setProperty('background-color', '#111827', 'important')
        body.style.setProperty('color', '#f9fafb', 'important')
        root.style.setProperty('background-color', '#111827', 'important')
        
        const rootElement = document.getElementById('root')
        if (rootElement) {
          rootElement.style.setProperty('background-color', '#111827', 'important')
          rootElement.style.setProperty('color', '#f9fafb', 'important')
        }
      } else {
        // MODO CLARO - Limpar completamente estilos escuros
        body.style.removeProperty('background-color')
        body.style.removeProperty('color')
        root.style.removeProperty('background-color')
        
        // Aplicar fundo claro
        body.style.setProperty('background-color', '#ffffff', 'important')
        body.style.setProperty('color', '#1f2937', 'important')
        
        const rootElement = document.getElementById('root')
        if (rootElement) {
          rootElement.style.removeProperty('background-color')
          rootElement.style.removeProperty('color')
        }
      }
      
      // Aplicar esquema de cores
      const colorScheme = settings?.theme?.colorScheme || 'blue'
      root.classList.add(`theme-${colorScheme}`)
      
      // Criar novos estilos CSS
      const style = document.createElement('style')
      style.id = 'dynamic-theme-styles'
      
      const colorMap = {
        blue: { primary: '#3b82f6', secondary: '#1d4ed8', light: '#dbeafe' },
        green: { primary: '#10b981', secondary: '#059669', light: '#d1fae5' },
        purple: { primary: '#8b5cf6', secondary: '#7c3aed', light: '#e9d5ff' },
        orange: { primary: '#f59e0b', secondary: '#d97706', light: '#fed7aa' }
      }
      
      const colors = colorMap[colorScheme as keyof typeof colorMap] || colorMap.blue
      
      style.textContent = `
        :root {
          --primary-color: ${colors.primary};
          --primary-dark: ${colors.secondary};
          --primary-light: ${colors.light};
        }
        
        ${isDarkMode ? `
        /* MODO ESCURO - APLICAÇÃO PRECISA */
        html, body, #root {
          background-color: #111827 !important;
          color: #f9fafb !important;
        }
        
        /* FUNDO PRINCIPAL */
        .min-h-screen {
          background: #111827 !important;
        }
        
        /* CARDS E CONTAINERS - CONVERTER BRANCOS PARA ESCUROS */
        .bg-white {
          background-color: #1f2937 !important;
          color: #f9fafb !important;
        }
        
        .bg-gray-50 {
          background-color: #374151 !important;
          color: #f9fafb !important;
        }
        
        .bg-gray-100 {
          background-color: #4b5563 !important;
          color: #f9fafb !important;
        }
        
        .bg-gray-200 {
          background-color: #6b7280 !important;
          color: #f9fafb !important;
        }
        
        /* GRADIENTES CLAROS - CONVERTER PARA VERSÕES ESCURAS */
        .bg-gradient-to-r.from-blue-50.to-purple-50 {
          background: linear-gradient(to right, #1e3a8a, #581c87) !important;
          color: #f9fafb !important;
        }
        
        .bg-gradient-to-r.from-green-50.to-blue-50 {
          background: linear-gradient(to right, #064e3b, #1e3a8a) !important;
          color: #f9fafb !important;
        }
        
        .bg-gradient-to-r.from-purple-50.to-pink-50 {
          background: linear-gradient(to right, #581c87, #be185d) !important;
          color: #f9fafb !important;
        }
        
        .bg-gradient-to-r.from-orange-50.to-red-50 {
          background: linear-gradient(to right, #9a3412, #991b1b) !important;
          color: #f9fafb !important;
        }
        
        .bg-gradient-to-br.from-indigo-50.via-white.to-purple-50 {
          background: linear-gradient(to bottom right, #312e81, #1f2937, #581c87) !important;
          color: #f9fafb !important;
        }
        
        /* FUNDOS COLORIDOS CLAROS - CONVERTER PARA VERSÕES ESCURAS */
        .bg-blue-50 {
          background-color: #1e3a8a !important;
          color: #dbeafe !important;
        }
        
        .bg-green-50 {
          background-color: #064e3b !important;
          color: #d1fae5 !important;
        }
        
        .bg-purple-50 {
          background-color: #581c87 !important;
          color: #e9d5ff !important;
        }
        
        .bg-orange-50 {
          background-color: #9a3412 !important;
          color: #fed7aa !important;
        }
        
        .bg-yellow-50 {
          background-color: #a16207 !important;
          color: #fef3c7 !important;
        }
        
        .bg-red-50 {
          background-color: #991b1b !important;
          color: #fecaca !important;
        }
        
        .bg-pink-50 {
          background-color: #be185d !important;
          color: #fbcfe8 !important;
        }
        
        .bg-teal-50 {
          background-color: #115e59 !important;
          color: #99f6e4 !important;
        }
        
        .bg-indigo-50 {
          background-color: #312e81 !important;
          color: #e0e7ff !important;
        }
        
        .bg-cyan-50 {
          background-color: #164e63 !important;
          color: #cffafe !important;
        }
        
        /* NAVEGAÇÃO E MENUS */
        .bg-white\\/95 {
          background-color: rgba(31, 41, 55, 0.95) !important;
          color: #f9fafb !important;
        }
        
        /* BACKDROP E OVERLAYS */
        .backdrop-blur-lg {
          background-color: rgba(31, 41, 55, 0.8) !important;
        }
        
        /* TEXTOS - AJUSTAR PARA VISIBILIDADE */
        .text-gray-800 {
          color: #f9fafb !important;
        }
        
        .text-gray-700 {
          color: #e5e7eb !important;
        }
        
        .text-gray-600 {
          color: #d1d5db !important;
        }
        
        .text-gray-500 {
          color: #9ca3af !important;
        }
        
        .text-gray-400 {
          color: #6b7280 !important;
        }
        
        .text-gray-300 {
          color: #4b5563 !important;
        }
        
        /* BORDAS */
        .border-gray-100 {
          border-color: #4b5563 !important;
        }
        
        .border-gray-200 {
          border-color: #6b7280 !important;
        }
        
        .border-gray-300 {
          border-color: #9ca3af !important;
        }
        
        /* BORDAS COLORIDAS */
        .border-blue-100 {
          border-color: #1e40af !important;
        }
        
        .border-blue-200 {
          border-color: #1e40af !important;
        }
        
        .border-green-200 {
          border-color: #047857 !important;
        }
        
        .border-purple-200 {
          border-color: #6d28d9 !important;
        }
        
        .border-orange-200 {
          border-color: #c2410c !important;
        }
        
        .border-yellow-200 {
          border-color: #ca8a04 !important;
        }
        
        .border-red-200 {
          border-color: #dc2626 !important;
        }
        
        .border-pink-200 {
          border-color: #e11d48 !important;
        }
        
        .border-teal-200 {
          border-color: #0f766e !important;
        }
        
        /* INPUTS E FORMS */
        input, textarea, select {
          background-color: #374151 !important;
          color: #f9fafb !important;
          border-color: #6b7280 !important;
        }
        
        input:focus, textarea:focus, select:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
        }
        
        /* SHADOWS ESCUROS */
        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3) !important;
        }
        
        .shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2) !important;
        }
        
        .shadow {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2) !important;
        }
        
        /* MANTER GRADIENTES COLORIDOS VISÍVEIS */
        .bg-gradient-to-br.from-blue-500.to-blue-600,
        .from-blue-500.to-blue-600 {
          background: linear-gradient(to bottom right, #3b82f6, #2563eb) !important;
          color: white !important;
        }
        
        .bg-gradient-to-br.from-green-500.to-green-600,
        .from-green-500.to-green-600 {
          background: linear-gradient(to bottom right, #10b981, #059669) !important;
          color: white !important;
        }
        
        .bg-gradient-to-br.from-purple-500.to-purple-600,
        .from-purple-500.to-purple-600 {
          background: linear-gradient(to bottom right, #8b5cf6, #7c3aed) !important;
          color: white !important;
        }
        
        .bg-gradient-to-br.from-pink-500.to-pink-600,
        .from-pink-500.to-pink-600 {
          background: linear-gradient(to bottom right, #ec4899, #db2777) !important;
          color: white !important;
        }
        
        .bg-gradient-to-br.from-orange-500.to-orange-600,
        .from-orange-500.to-orange-600 {
          background: linear-gradient(to bottom right, #f59e0b, #d97706) !important;
          color: white !important;
        }
        
        .bg-gradient-to-br.from-indigo-500.to-purple-600,
        .from-indigo-500.to-purple-600 {
          background: linear-gradient(to bottom right, #6366f1, #7c3aed) !important;
          color: white !important;
        }
        
        /* CORES SÓLIDAS COLORIDAS */
        .bg-blue-500, .bg-blue-600 {
          background-color: #3b82f6 !important;
          color: white !important;
        }
        
        .bg-green-500, .bg-green-600 {
          background-color: #10b981 !important;
          color: white !important;
        }
        
        .bg-purple-500, .bg-purple-600 {
          background-color: #8b5cf6 !important;
          color: white !important;
        }
        
        .bg-pink-500, .bg-pink-600 {
          background-color: #ec4899 !important;
          color: white !important;
        }
        
        .bg-orange-500, .bg-orange-600 {
          background-color: #f59e0b !important;
          color: white !important;
        }
        
        .bg-red-500, .bg-red-600 {
          background-color: #ef4444 !important;
          color: white !important;
        }
        
        .bg-yellow-500, .bg-yellow-600 {
          background-color: #eab308 !important;
          color: white !important;
        }
        
        .bg-teal-500, .bg-teal-600 {
          background-color: #14b8a6 !important;
          color: white !important;
        }
        
        .bg-cyan-500, .bg-cyan-600 {
          background-color: #06b6d4 !important;
          color: white !important;
        }
        
        .bg-indigo-500, .bg-indigo-600 {
          background-color: #6366f1 !important;
          color: white !important;
        }
        
        /* PRESERVAR CORES DOS TEXTOS COLORIDOS */
        .text-blue-600 { color: #60a5fa !important; }
        .text-green-600 { color: #34d399 !important; }
        .text-purple-600 { color: #a78bfa !important; }
        .text-pink-600 { color: #f472b6 !important; }
        .text-orange-600 { color: #fb923c !important; }
        .text-indigo-600 { color: #818cf8 !important; }
        .text-yellow-500 { color: #fbbf24 !important; }
        .text-green-500 { color: #34d399 !important; }
        .text-red-500 { color: #f87171 !important; }
        .text-red-600 { color: #f87171 !important; }
        .text-teal-500 { color: #2dd4bf !important; }
        .text-cyan-500 { color: #22d3ee !important; }
        ` : `
        /* MODO CLARO - PRESERVAR CORES ORIGINAIS */
        html, body, #root {
          background-color: #ffffff !important;
          color: #1f2937 !important;
        }
        
        .min-h-screen {
          background: linear-gradient(to bottom right, #f8fafc, #ffffff, #f0f9ff) !important;
        }
        
        /* PRESERVAR GRADIENTES COLORIDOS */
        .bg-gradient-to-br.from-blue-500.to-blue-600,
        .from-blue-500.to-blue-600 {
          background: linear-gradient(to bottom right, #3b82f6, #2563eb) !important;
          color: white !important;
        }
        
        .bg-gradient-to-br.from-green-500.to-green-600,
        .from-green-500.to-green-600 {
          background: linear-gradient(to bottom right, #10b981, #059669) !important;
          color: white !important;
        }
        
        .bg-gradient-to-br.from-purple-500.to-purple-600,
        .from-purple-500.to-purple-600 {
          background: linear-gradient(to bottom right, #8b5cf6, #7c3aed) !important;
          color: white !important;
        }
        
        .bg-gradient-to-br.from-pink-500.to-pink-600,
        .from-pink-500.to-pink-600 {
          background: linear-gradient(to bottom right, #ec4899, #db2777) !important;
          color: white !important;
        }
        
        .bg-gradient-to-br.from-orange-500.to-orange-600,
        .from-orange-500.to-orange-600 {
          background: linear-gradient(to bottom right, #f59e0b, #d97706) !important;
          color: white !important;
        }
        
        .bg-gradient-to-br.from-indigo-500.to-purple-600,
        .from-indigo-500.to-purple-600 {
          background: linear-gradient(to bottom right, #6366f1, #7c3aed) !important;
          color: white !important;
        }
        
        /* CORES SÓLIDAS */
        .bg-blue-500, .bg-blue-600 {
          background-color: #3b82f6 !important;
          color: white !important;
        }
        
        .bg-green-500, .bg-green-600 {
          background-color: #10b981 !important;
          color: white !important;
        }
        
        .bg-purple-500, .bg-purple-600 {
          background-color: #8b5cf6 !important;
          color: white !important;
        }
        
        .bg-pink-500, .bg-pink-600 {
          background-color: #ec4899 !important;
          color: white !important;
        }
        
        .bg-orange-500, .bg-orange-600 {
          background-color: #f59e0b !important;
          color: white !important;
        }
        
        .bg-red-500, .bg-red-600 {
          background-color: #ef4444 !important;
          color: white !important;
        }
        
        .bg-yellow-500, .bg-yellow-600 {
          background-color: #eab308 !important;
          color: white !important;
        }
        
        .bg-teal-500, .bg-teal-600 {
          background-color: #14b8a6 !important;
          color: white !important;
        }
        
        .bg-cyan-500, .bg-cyan-600 {
          background-color: #06b6d4 !important;
          color: white !important;
        }
        
        .bg-indigo-500, .bg-indigo-600 {
          background-color: #6366f1 !important;
          color: white !important;
        }
        
        /* CORES DOS TEXTOS */
        .text-blue-600 { color: #2563eb !important; }
        .text-green-600 { color: #059669 !important; }
        .text-purple-600 { color: #7c3aed !important; }
        .text-pink-600 { color: #db2777 !important; }
        .text-orange-600 { color: #d97706 !important; }
        .text-indigo-600 { color: #4f46e5 !important; }
        .text-yellow-500 { color: #eab308 !important; }
        .text-green-500 { color: #22c55e !important; }
        .text-red-500 { color: #ef4444 !important; }
        .text-red-600 { color: #dc2626 !important; }
        .text-teal-500 { color: #14b8a6 !important; }
        .text-cyan-500 { color: #06b6d4 !important; }
        
        /* FUNDOS CLAROS */
        .bg-blue-50 { background-color: #eff6ff !important; color: #1e40af !important; }
        .bg-green-50 { background-color: #f0fdf4 !important; color: #166534 !important; }
        .bg-purple-50 { background-color: #faf5ff !important; color: #7c2d12 !important; }
        .bg-orange-50 { background-color: #fff7ed !important; color: #9a3412 !important; }
        .bg-yellow-50 { background-color: #fefce8 !important; color: #a16207 !important; }
        .bg-red-50 { background-color: #fef2f2 !important; color: #991b1b !important; }
        .bg-pink-50 { background-color: #fdf2f8 !important; color: #be185d !important; }
        .bg-teal-50 { background-color: #f0fdfa !important; color: #115e59 !important; }
        
        /* BORDAS CLARAS */
        .border-blue-100 { border-color: #bfdbfe !important; }
        .border-blue-200 { border-color: #bfdbfe !important; }
        .border-green-200 { border-color: #bbf7d0 !important; }
        .border-purple-200 { border-color: #e9d5ff !important; }
        .border-orange-200 { border-color: #fed7aa !important; }
        .border-yellow-200 { border-color: #fef3c7 !important; }
        .border-red-200 { border-color: #fecaca !important; }
        .border-pink-200 { border-color: #fbcfe8 !important; }
        .border-teal-200 { border-color: #99f6e4 !important; }
        
        /* BACKGROUNDS BÁSICOS */
        .bg-white {
          background-color: #ffffff !important;
          color: #1f2937 !important;
        }
        
        .bg-gray-50 {
          background-color: #f9fafb !important;
          color: #1f2937 !important;
        }
        
        .bg-gray-100 {
          background-color: #f3f4f6 !important;
          color: #1f2937 !important;
        }
        
        /* TEXTOS BÁSICOS */
        .text-gray-800 { color: #1f2937 !important; }
        .text-gray-700 { color: #374151 !important; }
        .text-gray-600 { color: #4b5563 !important; }
        .text-gray-500 { color: #6b7280 !important; }
        .text-gray-400 { color: #9ca3af !important; }
        .text-gray-300 { color: #d1d5db !important; }
        
        /* BORDAS BÁSICAS */
        .border-gray-100 { border-color: #f3f4f6 !important; }
        .border-gray-200 { border-color: #e5e7eb !important; }
        .border-gray-300 { border-color: #d1d5db !important; }
        `}
      `
      
      document.head.appendChild(style)
      
      console.log('Tema aplicado:', { mode: themeMode, isDarkMode, colorScheme })
    }
    
    applyTheme()
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      if (settings?.theme?.mode === 'auto') {
        applyTheme()
      }
    }
    
    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [settings?.theme])

  return <>{children}</>
}

export default ThemeProvider
