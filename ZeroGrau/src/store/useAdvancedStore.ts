
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ====== INTERFACES ======
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  age: number
  profileType: 'prevention' | 'recovery' | 'family_support'
  ageGroup: '13-15' | '16-18' | '19-21' | '22+'
  interests: string[]
  level: 'beginner' | 'intermediate' | 'expert'
  joinedAt: string
  lastActive: string
  settings: UserSettings
}

export interface UserSettings {
  notifications: {
    dailyReminders: boolean
    motivationalQuotes: boolean
    riskAlerts: boolean
    milestoneAlerts: boolean
    pushEnabled: boolean
    quietHours: { start: string; end: string }
  }
  privacy: {
    profileVisible: boolean
    showProgress: boolean
    allowMentoring: boolean
  }
  accessibility: {
    fontSize: 'small' | 'medium' | 'large'
    highContrast: boolean
    reducedMotion: boolean
  }
  theme: {
    mode: 'light' | 'dark' | 'auto'
    colorScheme: 'blue' | 'green' | 'purple' | 'orange'
  }
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: 'progress' | 'social' | 'knowledge' | 'milestone'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  xpReward: number
  coinReward: number
  badgeId?: string
  type: 'daily' | 'weekly' | 'milestone' | 'special'
  completed: boolean
  completedAt?: string
  progress: number
  maxProgress: number
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly'
  category: 'reading' | 'quiz' | 'social' | 'habits'
  target: number
  progress: number
  xpReward: number
  coinReward: number
  startDate: string
  endDate: string
  completed: boolean
}

export interface MoodEntry {
  id: string
  date: string
  mood: 1 | 2 | 3 | 4 | 5
  energy: 1 | 2 | 3 | 4 | 5
  stress: 1 | 2 | 3 | 4 | 5
  notes?: string
  triggers?: string[]
  coping?: string[]
}

export interface HabitTracker {
  id: string
  name: string
  description: string
  category: 'positive' | 'negative'
  icon: string
  color: string
  target: number
  unit: string
  entries: { date: string; value: number }[]
  streak: number
  bestStreak: number
}

export interface SocialPost {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  type: 'text' | 'milestone' | 'question' | 'support'
  category?: string
  likes: string[]
  comments: Comment[]
  createdAt: string
  anonymous: boolean
}

export interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: string
  likes: string[]
}

export interface SupportGroup {
  id: string
  name: string
  description: string
  category: 'age' | 'situation' | 'interest'
  memberCount: number
  isPrivate: boolean
  tags: string[]
  lastActivity: string
}

export interface EmergencyContact {
  id: string
  name: string
  phone: string
  email?: string
  relationship: 'family' | 'friend' | 'professional'
  priority: number
}

export interface UserStats {
  // Progresso Geral
  totalXP: number
  level: number
  coins: number
  streak: number
  bestStreak: number
  
  // Atividades
  articlesRead: number
  videosWatched: number
  quizzesCompleted: number
  gamesPlayed: number
  forumPosts: number
  commentsPosted: number
  
  // Tempo
  totalTimeSpent: number
  dailyGoalStreak: number
  weeklyGoals: number
  monthlyGoals: number
  
  // Social
  friendsCount: number
  mentorshipGiven: number
  mentorshipReceived: number
  groupsJoined: number
  
  // Bem-estar
  moodEntries: number
  habitsTracked: number
  emergencyContactsAdded: number
  
  // Conquistas
  badgesEarned: Badge[]
  achievements: Achievement[]
  challenges: Challenge[]
}

// ====== STORE PRINCIPAL ======
interface AdvancedAppState {
  // User & Auth
  user: User | null
  isAuthenticated: boolean
  
  // Stats & Progress
  userStats: UserStats
  
  // Gamificação
  badges: Badge[]
  achievements: Achievement[]
  challenges: Challenge[]
  
  // Social
  posts: SocialPost[]
  groups: SupportGroup[]
  friends: string[]
  
  // Bem-estar
  moodEntries: MoodEntry[]
  habits: HabitTracker[]
  emergencyContacts: EmergencyContact[]
  
  // Conteúdo
  favorites: string[]
  bookmarks: string[]
  notes: { contentId: string; note: string }[]
  
  // Configurações
  settings: UserSettings
  
  // ====== ACTIONS ======
  
  // User Management
  setUser: (user: User) => void
  updateUserProfile: (updates: Partial<User>) => void
  updateSettings: (settings: UserSettings) => void
  
  // XP & Gamificação
  addXP: (amount: number, source: string) => void
  addCoins: (amount: number, source: string) => void
  spendCoins: (amount: number, item: string) => boolean
  updateStreak: () => void
  
  // Badges & Achievements
  unlockBadge: (badgeId: string) => void
  completeAchievement: (achievementId: string) => void
  updateChallengeProgress: (challengeId: string, progress: number) => void
  
  // Social Features
  createPost: (post: Omit<SocialPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => void
  likePost: (postId: string) => void
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => void
  joinGroup: (groupId: string) => void
  addFriend: (userId: string) => void
  
  // Bem-estar
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void
  updateHabit: (habitId: string, value: number, date: string) => void
  addHabit: (habit: Omit<HabitTracker, 'id' | 'entries' | 'streak' | 'bestStreak'>) => void
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void
  
  // Conteúdo
  addToFavorites: (contentId: string) => void
  removeFromFavorites: (contentId: string) => void
  addBookmark: (contentId: string) => void
  addNote: (contentId: string, note: string) => void
  
  // Analytics
  trackActivity: (activity: string, metadata?: any) => void
  getDailyProgress: () => any
  getWeeklyStats: () => any
  getMonthlyReport: () => any
}

// ====== DADOS INICIAIS ======
const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_steps',
    name: 'Primeiros Passos',
    description: 'Completou o perfil inicial',
    icon: '👋',
    category: 'progress',
    rarity: 'common',
    unlocked: false
  },
  {
    id: 'knowledge_seeker',
    name: 'Buscador do Conhecimento',
    description: 'Leu 10 artigos educativos',
    icon: '📚',
    category: 'knowledge',
    rarity: 'common',
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'quiz_master',
    name: 'Mestre dos Quizzes',
    description: 'Completou 25 quizzes com 80%+ de acerto',
    icon: '🧠',
    category: 'knowledge',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 25
  },
  {
    id: 'social_butterfly',
    name: 'Borboleta Social',
    description: 'Fez 50 posts no fórum',
    icon: '🦋',
    category: 'social',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 50
  },
  {
    id: 'streak_champion',
    name: 'Campeão da Consistência',
    description: 'Manteve 30 dias de streak',
    icon: '🔥',
    category: 'milestone',
    rarity: 'epic',
    unlocked: false,
    progress: 0,
    maxProgress: 30
  },
  {
    id: 'mentor_hero',
    name: 'Herói Mentor',
    description: 'Ajudou 10 pessoas como mentor',
    icon: '🦸',
    category: 'social',
    rarity: 'legendary',
    unlocked: false,
    progress: 0,
    maxProgress: 10
  }
]

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'daily_reader',
    title: 'Leitor Diário',
    description: 'Leia 1 artigo hoje',
    xpReward: 50,
    coinReward: 10,
    type: 'daily',
    completed: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'weekly_warrior',
    title: 'Guerreiro Semanal',
    description: 'Complete 5 atividades esta semana',
    xpReward: 200,
    coinReward: 50,
    type: 'weekly',
    completed: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'milestone_100',
    title: 'Centenário',
    description: 'Alcance 100 artigos lidos',
    xpReward: 1000,
    coinReward: 500,
    badgeId: 'knowledge_seeker',
    type: 'milestone',
    completed: false,
    progress: 0,
    maxProgress: 100
  }
]

const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'week_reading',
    title: 'Semana da Leitura',
    description: 'Leia 7 artigos esta semana',
    type: 'weekly',
    category: 'reading',
    target: 7,
    progress: 0,
    xpReward: 300,
    coinReward: 75,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false
  },
  {
    id: 'daily_mood',
    title: 'Registro de Humor',
    description: 'Registre seu humor por 7 dias consecutivos',
    type: 'weekly',
    category: 'habits',
    target: 7,
    progress: 0,
    xpReward: 200,
    coinReward: 40,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false
  }
]

const INITIAL_HABITS: HabitTracker[] = [
  {
    id: 'water_intake',
    name: 'Hidratação',
    description: 'Copos de água por dia',
    category: 'positive',
    icon: '💧',
    color: 'blue',
    target: 8,
    unit: 'copos',
    entries: [],
    streak: 0,
    bestStreak: 0
  },
  {
    id: 'exercise',
    name: 'Exercício',
    description: 'Minutos de atividade física',
    category: 'positive',
    icon: '🏃',
    color: 'green',
    target: 30,
    unit: 'minutos',
    entries: [],
    streak: 0,
    bestStreak: 0
  },
  {
    id: 'screen_time',
    name: 'Tempo de Tela',
    description: 'Horas em dispositivos',
    category: 'negative',
    icon: '📱',
    color: 'red',
    target: 4,
    unit: 'horas',
    entries: [],
    streak: 0,
    bestStreak: 0
  }
]

const INITIAL_SETTINGS: UserSettings = {
  notifications: {
    dailyReminders: true,
    motivationalQuotes: true,
    riskAlerts: true,
    milestoneAlerts: true,
    pushEnabled: true,
    quietHours: { start: '22:00', end: '08:00' }
  },
  privacy: {
    profileVisible: true,
    showProgress: true,
    allowMentoring: false
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false
  },
  theme: {
    mode: 'light',
    colorScheme: 'blue'
  }
}

const INITIAL_USER_STATS: UserStats = {
  totalXP: 0,
  level: 1,
  coins: 100,
  streak: 0,
  bestStreak: 0,
  articlesRead: 0,
  videosWatched: 0,
  quizzesCompleted: 0,
  gamesPlayed: 0,
  forumPosts: 0,
  commentsPosted: 0,
  totalTimeSpent: 0,
  dailyGoalStreak: 0,
  weeklyGoals: 0,
  monthlyGoals: 0,
  friendsCount: 0,
  mentorshipGiven: 0,
  mentorshipReceived: 0,
  groupsJoined: 0,
  moodEntries: 0,
  habitsTracked: 0,
  emergencyContactsAdded: 0,
  badgesEarned: [],
  achievements: INITIAL_ACHIEVEMENTS,
  challenges: INITIAL_CHALLENGES
}

// ====== IMPLEMENTAÇÃO DO STORE ======
export const useAdvancedStore = create<AdvancedAppState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      userStats: INITIAL_USER_STATS,
      badges: INITIAL_BADGES,
      achievements: INITIAL_ACHIEVEMENTS,
      challenges: INITIAL_CHALLENGES,
      posts: [],
      groups: [],
      friends: [],
      moodEntries: [],
      habits: INITIAL_HABITS,
      emergencyContacts: [],
      favorites: [],
      bookmarks: [],
      notes: [],
      settings: INITIAL_SETTINGS,

      // ====== USER MANAGEMENT ======
      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },

      updateUserProfile: (updates: Partial<User>) => {
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null
        }))
      },

      updateSettings: (newSettings: UserSettings) => {
        set(state => ({
          settings: newSettings,
          user: state.user ? { ...state.user, settings: newSettings } : null
        }))
      },

      // ====== XP & GAMIFICAÇÃO ======
      addXP: (amount: number, source: string) => {
        set(state => {
          const newXP = state.userStats.totalXP + amount
          const newLevel = Math.floor(newXP / 1000) + 1
          
          // Verificar se subiu de nível
          if (newLevel > state.userStats.level) {
            // Bonus por subir de nível
            const levelBonus = newLevel * 50
            return {
              userStats: {
                ...state.userStats,
                totalXP: newXP,
                level: newLevel,
                coins: state.userStats.coins + levelBonus
              }
            }
          }
          
          return {
            userStats: {
              ...state.userStats,
              totalXP: newXP,
              level: newLevel
            }
          }
        })
      },

      addCoins: (amount: number, source: string) => {
        set(state => ({
          userStats: {
            ...state.userStats,
            coins: state.userStats.coins + amount
          }
        }))
      },

      spendCoins: (amount: number, item: string) => {
        const state = get()
        if (state.userStats.coins >= amount) {
          set(prevState => ({
            userStats: {
              ...prevState.userStats,
              coins: prevState.userStats.coins - amount
            }
          }))
          return true
        }
        return false
      },

      updateStreak: () => {
        set(state => {
          const newStreak = state.userStats.streak + 1
          const newBestStreak = Math.max(newStreak, state.userStats.bestStreak)
          
          return {
            userStats: {
              ...state.userStats,
              streak: newStreak,
              bestStreak: newBestStreak
            }
          }
        })
      },

      // ====== BADGES & ACHIEVEMENTS ======
      unlockBadge: (badgeId: string) => {
        set(state => {
          const updatedBadges = state.badges.map(badge =>
            badge.id === badgeId && !badge.unlocked
              ? { ...badge, unlocked: true, unlockedAt: new Date().toISOString() }
              : badge
          )
          
          const unlockedBadge = updatedBadges.find(b => b.id === badgeId && b.unlocked)
          
          return {
            badges: updatedBadges,
            userStats: {
              ...state.userStats,
              badgesEarned: unlockedBadge 
                ? [...state.userStats.badgesEarned, unlockedBadge]
                : state.userStats.badgesEarned
            }
          }
        })
      },

      completeAchievement: (achievementId: string) => {
        set(state => {
          const updatedAchievements = state.userStats.achievements.map(achievement =>
            achievement.id === achievementId && !achievement.completed
              ? { 
                  ...achievement, 
                  completed: true, 
                  completedAt: new Date().toISOString() 
                }
              : achievement
          )
          
          const completedAchievement = updatedAchievements.find(a => a.id === achievementId && a.completed)
          
          if (completedAchievement) {
            // Adicionar recompensas
            const newXP = state.userStats.totalXP + completedAchievement.xpReward
            const newCoins = state.userStats.coins + completedAchievement.coinReward
            
            return {
              userStats: {
                ...state.userStats,
                achievements: updatedAchievements,
                totalXP: newXP,
                coins: newCoins
              }
            }
          }
          
          return {
            userStats: {
              ...state.userStats,
              achievements: updatedAchievements
            }
          }
        })
      },

      updateChallengeProgress: (challengeId: string, progress: number) => {
        set(state => {
          const updatedChallenges = state.userStats.challenges.map(challenge =>
            challenge.id === challengeId
              ? { 
                  ...challenge, 
                  progress: Math.min(progress, challenge.target),
                  completed: progress >= challenge.target
                }
              : challenge
          )
          
          return {
            userStats: {
              ...state.userStats,
              challenges: updatedChallenges
            }
          }
        })
      },

      // ====== SOCIAL FEATURES ======
      createPost: (post: Omit<SocialPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
        set(state => ({
          posts: [{
            ...post,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            likes: [],
            comments: []
          }, ...state.posts],
          userStats: {
            ...state.userStats,
            forumPosts: state.userStats.forumPosts + 1
          }
        }))
      },

      likePost: (postId: string) => {
        const state = get()
        if (!state.user) return
        
        set(prevState => ({
          posts: prevState.posts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes.includes(state.user!.id)
                    ? post.likes.filter(id => id !== state.user!.id)
                    : [...post.likes, state.user!.id]
                }
              : post
          )
        }))
      },

      addComment: (postId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => {
        set(state => ({
          posts: state.posts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  comments: [...post.comments, {
                    ...comment,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    likes: []
                  }]
                }
              : post
          ),
          userStats: {
            ...state.userStats,
            commentsPosted: state.userStats.commentsPosted + 1
          }
        }))
      },

      joinGroup: (groupId: string) => {
        set(state => ({
          userStats: {
            ...state.userStats,
            groupsJoined: state.userStats.groupsJoined + 1
          }
        }))
      },

      addFriend: (userId: string) => {
        set(state => ({
          friends: [...state.friends, userId],
          userStats: {
            ...state.userStats,
            friendsCount: state.userStats.friendsCount + 1
          }
        }))
      },

      // ====== BEM-ESTAR ======
      addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => {
        set(state => ({
          moodEntries: [{
            ...entry,
            id: Date.now().toString()
          }, ...state.moodEntries],
          userStats: {
            ...state.userStats,
            moodEntries: state.userStats.moodEntries + 1
          }
        }))
      },

      updateHabit: (habitId: string, value: number, date: string) => {
        set(state => ({
          habits: state.habits.map(habit =>
            habit.id === habitId
              ? {
                  ...habit,
                  entries: [...habit.entries.filter(e => e.date !== date), { date, value }]
                }
              : habit
          )
        }))
      },

      addHabit: (habit: Omit<HabitTracker, 'id' | 'entries' | 'streak' | 'bestStreak'>) => {
        set(state => ({
          habits: [...state.habits, {
            ...habit,
            id: Date.now().toString(),
            entries: [],
            streak: 0,
            bestStreak: 0
          }]
        }))
      },

      addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => {
        set(state => ({
          emergencyContacts: [...state.emergencyContacts, {
            ...contact,
            id: Date.now().toString()
          }],
          userStats: {
            ...state.userStats,
            emergencyContactsAdded: state.userStats.emergencyContactsAdded + 1
          }
        }))
      },

      // ====== CONTEÚDO ======
      addToFavorites: (contentId: string) => {
        set(state => ({
          favorites: [...state.favorites, contentId]
        }))
      },

      removeFromFavorites: (contentId: string) => {
        set(state => ({
          favorites: state.favorites.filter(id => id !== contentId)
        }))
      },

      addBookmark: (contentId: string) => {
        set(state => ({
          bookmarks: state.bookmarks.includes(contentId)
            ? state.bookmarks.filter(id => id !== contentId)
            : [...state.bookmarks, contentId]
        }))
      },

      addNote: (contentId: string, note: string) => {
        set(state => ({
          notes: [...state.notes.filter(n => n.contentId !== contentId), { contentId, note }]
        }))
      },

      // ====== ANALYTICS ======
      trackActivity: (activity: string, metadata?: any) => {
        // Implementar tracking de atividades
        console.log('Activity tracked:', activity, metadata)
      },

      getDailyProgress: () => {
        const state = get()
        // Implementar cálculo de progresso diário
        return {
          articlesRead: 0,
          quizzesCompleted: 0,
          timeSpent: 0,
          moodLogged: false
        }
      },

      getWeeklyStats: () => {
        const state = get()
        // Implementar estatísticas semanais
        return {
          totalXP: state.userStats.totalXP,
          activeDays: 0,
          achievements: 0
        }
      },

      getMonthlyReport: () => {
        const state = get()
        // Implementar relatório mensal
        return {
          summary: 'Excelente progresso este mês!',
          highlights: [],
          recommendations: []
        }
      }
    }),
    {
      name: 'zerograu-advanced-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userStats: state.userStats,
        badges: state.badges,
        moodEntries: state.moodEntries,
        habits: state.habits,
        emergencyContacts: state.emergencyContacts,
        favorites: state.favorites,
        bookmarks: state.bookmarks,
        notes: state.notes,
        settings: state.settings
      })
    }
  )
)
