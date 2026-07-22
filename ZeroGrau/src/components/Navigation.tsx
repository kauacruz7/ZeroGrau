
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Home, BarChart3, BookOpen, Users, Heart} from 'lucide-react'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Início', color: 'from-blue-500 to-blue-600' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard', color: 'from-purple-500 to-purple-600' },
    { path: '/education', icon: BookOpen, label: 'Educação', color: 'from-green-500 to-green-600' },
    { path: '/community', icon: Users, label: 'Comunidade', color: 'from-orange-500 to-orange-600' },
    { path: '/wellness', icon: Heart, label: 'Bem-estar', color: 'from-pink-500 to-pink-600' }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-3 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex-1"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-md` 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`text-xs font-medium mt-1 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                    {item.label}
                  </span>
                </motion.div>
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Navigation
