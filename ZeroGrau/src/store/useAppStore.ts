
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

export interface UserStats {
  articlesRead: number
  quizzesCompleted: number
  gamesPlayed: number
  totalTimeSpent: number
  educationProgress: number
  achievements: Badge[]
  currentStreak: number
  totalXP: number
  level: number
}

export interface FavoriteContent {
  id: string
  type: 'article' | 'quiz' | 'game'
  title: string
  category: string
  addedAt: string
}

interface AppState {
  // Theme
  darkMode: boolean
  toggleDarkMode: () => void

  // User Stats
  userStats: UserStats
  updateStats: (newStats: Partial<UserStats>) => void

  // Experience System
  addExperience: (amount: number) => void
  getCurrentLevel: () => number
  getXPForNextLevel: () => number

  // Achievements
  unlockAchievement: (achievementId: string) => void
  getUnlockedAchievements: () => Badge[]

  // Favorites
  favorites: FavoriteContent[]
  addToFavorites: (content: FavoriteContent) => void
  removeFromFavorites: (contentId: string) => void

  // Content tracking
  readArticle: (articleId: string) => void
  completeQuiz: (score: number) => void
  playGame: (gameId: string) => void
}

const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_article',
    name: 'Primeiro Leitor',
    description: 'Leu seu primeiro artigo',
    icon: '📖',
    unlocked: false
  },
  {
    id: 'quiz_master',
    name: 'Mestre dos Quiz',
    description: 'Completou 5 quizzes',
    icon: '🧠',
    unlocked: false
  },
  {
    id: 'knowledge_seeker',
    name: 'Buscador do Conhecimento',
    description: 'Leu 10 artigos',
    icon: '🔍',
    unlocked: false
  },
  {
    id: 'perfect_score',
    name: 'Pontuação Perfeita',
    description: 'Acertou 100% em um quiz',
    icon: '⭐',
    unlocked: false
  },
  {
    id: 'video_watcher',
    name: 'Espectador Dedicado',
    description: 'Assistiu 5 vídeos educativos',
    icon: '📺',
    unlocked: false
  },
  {
    id: 'game_player',
    name: 'Jogador Ativo',
    description: 'Jogou 3 jogos educativos',
    icon: '🎮',
    unlocked: false
  },
  {
    id: 'education_master',
    name: 'Mestre da Educação',
    description: 'Completou 100% do progresso educativo',
    icon: '🎓',
    unlocked: false
  },
  {
    id: 'streak_champion',
    name: 'Campeão da Sequência',
    description: 'Manteve uma sequência de 7 dias',
    icon: '🔥',
    unlocked: false
  }
]

const INITIAL_USER_STATS: UserStats = {
  articlesRead: 0,
  quizzesCompleted: 0,
  gamesPlayed: 0,
  totalTimeSpent: 0,
  educationProgress: 0,
  achievements: INITIAL_BADGES,
  currentStreak: 0,
  totalXP: 0,
  level: 1
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      darkMode: false,
      userStats: INITIAL_USER_STATS,
      favorites: [],

      toggleDarkMode: () => {
        set(state => ({ darkMode: !state.darkMode }))
        // Apply theme to document
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark')
        }
      },

      updateStats: (newStats: Partial<UserStats>) => {
        set(state => ({
          userStats: { ...state.userStats, ...newStats }
        }))
      },

      addExperience: (amount: number) => {
        set(state => {
          const newXP = state.userStats.totalXP + amount
          const newLevel = Math.floor(newXP / 100) + 1
          
          return {
            userStats: {
              ...state.userStats,
              totalXP: newXP,
              level: newLevel
            }
          }
        })
      },

      getCurrentLevel: () => {
        return get().userStats.level
      },

      getXPForNextLevel: () => {
        const currentLevel = get().getCurrentLevel()
        return currentLevel * 100
      },

      unlockAchievement: (achievementId: string) => {
        set(state => {
          const updatedAchievements = state.userStats.achievements.map(achievement =>
            achievement.id === achievementId && !achievement.unlocked
              ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
              : achievement
          )

          return {
            userStats: {
              ...state.userStats,
              achievements: updatedAchievements
            }
          }
        })
      },

      getUnlockedAchievements: () => {
        return get().userStats.achievements.filter(achievement => achievement.unlocked)
      },

      addToFavorites: (content: FavoriteContent) => {
        set(state => ({
          favorites: [...state.favorites, content]
        }))
      },

      removeFromFavorites: (contentId: string) => {
        set(state => ({
          favorites: state.favorites.filter(fav => fav.id !== contentId)
        }))
      },

      readArticle: (articleId: string) => {
        const { userStats, addExperience, unlockAchievement } = get()
        
        // Update stats
        const newStats = {
          articlesRead: userStats.articlesRead + 1,
          educationProgress: Math.min(userStats.educationProgress + 10, 100)
        }
        
        get().updateStats(newStats)
        addExperience(10)

        // Check achievements
        if (userStats.articlesRead === 0) {
          unlockAchievement('first_article')
        }
        if (newStats.articlesRead >= 10) {
          unlockAchievement('knowledge_seeker')
        }
        if (newStats.educationProgress >= 100) {
          unlockAchievement('education_master')
        }
      },

      completeQuiz: (score: number) => {
        const { userStats, addExperience, unlockAchievement } = get()
        
        // Calculate XP based on score
        const xpGained = Math.floor(score * 0.5) + 20
        
        // Update stats
        const newStats = {
          quizzesCompleted: userStats.quizzesCompleted + 1
        }
        
        get().updateStats(newStats)
        addExperience(xpGained)

        // Check achievements
        if (newStats.quizzesCompleted >= 5) {
          unlockAchievement('quiz_master')
        }
        if (score === 100) {
          unlockAchievement('perfect_score')
        }
      },

      playGame: (gameId: string) => {
        const { userStats, addExperience, unlockAchievement } = get()
        
        // Update stats
        const newStats = {
          gamesPlayed: userStats.gamesPlayed + 1
        }
        
        get().updateStats(newStats)
        addExperience(15)

        // Check achievements
        if (newStats.gamesPlayed >= 3) {
          unlockAchievement('game_player')
        }
      }
    }),
    {
      name: 'zerograu-app-store',
      partialize: (state) => ({
        darkMode: state.darkMode,
        userStats: state.userStats,
        favorites: state.favorites
      })
    }
  )
)
