
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import LoginScreen from './components/LoginScreen'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Education from './pages/Education'
import Prevention from './pages/Prevention'
import Community from './pages/Community'
import Games from './pages/Games'
import Quiz from './pages/Quiz'
import Wellness from './pages/Wellness'
import Settings from './pages/Settings'
import Account from './pages/Account'
import { useAuthStore } from './store/authStore'
import ThemeProvider from './components/ThemeProvider'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          
          {!isAuthenticated ? (
            <LoginScreen />
          ) : (
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/education" element={<Education />} />
                <Route path="/prevention" element={<Prevention />} />
                <Route path="/community" element={<Community />} />
                <Route path="/games" element={<Games />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/wellness" element={<Wellness />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/account" element={<Account />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          )}
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
