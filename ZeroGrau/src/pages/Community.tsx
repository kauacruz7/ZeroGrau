
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {Users, MessageCircleDashed as MessageCircle, Heart, Share2, Plus, Search, Filter, Star, Clock, ThumbsUp, MessageSquare, Shield, Crown, UserCheck, TrendingUp, Eye, Bookmark} from 'lucide-react'
import { useAdvancedStore } from '../store/useAdvancedStore'
import toast from 'react-hot-toast'

interface ForumPost {
  id: string
  author: {
    id: string
    name: string
    avatar?: string
    level: number
    badges: string[]
    isMentor: boolean
  }
  title: string
  content: string
  category: 'support' | 'success' | 'question' | 'general'
  tags: string[]
  likes: number
  comments: number
  views: number
  createdAt: string
  isAnonymous: boolean
  isPinned: boolean
  isLocked: boolean
}

interface SupportGroup {
  id: string
  name: string
  description: string
  category: 'age' | 'situation' | 'interest'
  memberCount: number
  isPrivate: boolean
  tags: string[]
  lastActivity: string
  moderators: string[]
  rules: string[]
}

const Community = () => {
  const { user, createPost, likePost, addComment, joinGroup } = useAdvancedStore()
  const [activeTab, setActiveTab] = useState<'forum' | 'groups' | 'mentors'>('forum')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showJoinGroup, setShowJoinGroup] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general' as const,
    tags: [] as string[],
    isAnonymous: false
  })

  // Mock data para demonstração
  const forumPosts: ForumPost[] = [
    {
      id: '1',
      author: {
        id: '1',
        name: 'Ana Silva',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
        level: 5,
        badges: ['mentor', 'helper'],
        isMentor: true
      },
      title: '30 dias sem álcool - Minha experiência',
      content: 'Quero compartilhar com vocês como foram esses 30 dias. No início foi muito difícil, especialmente nos finais de semana...',
      category: 'success',
      tags: ['álcool', 'sucesso', '30dias'],
      likes: 24,
      comments: 8,
      views: 156,
      createdAt: '2024-01-15T10:30:00Z',
      isAnonymous: false,
      isPinned: true,
      isLocked: false
    },
    {
      id: '2',
      author: {
        id: '2',
        name: 'Usuário Anônimo',
        level: 2,
        badges: [],
        isMentor: false
      },
      title: 'Preciso de ajuda - pressão dos amigos',
      content: 'Estou enfrentando muita pressão dos meus amigos para beber. Como vocês lidam com isso?',
      category: 'support',
      tags: ['pressão', 'amigos', 'ajuda'],
      likes: 12,
      comments: 15,
      views: 89,
      createdAt: '2024-01-14T15:45:00Z',
      isAnonymous: true,
      isPinned: false,
      isLocked: false
    },
    {
      id: '3',
      author: {
        id: '3',
        name: 'Carlos Santos',
        level: 3,
        badges: ['questioner'],
        isMentor: false
      },
      title: 'Dúvida sobre os efeitos do álcool no sono',
      content: 'Li que o álcool prejudica o sono, mas sempre durmo melhor quando bebo. Alguém pode explicar?',
      category: 'question',
      tags: ['álcool', 'sono', 'dúvida'],
      likes: 7,
      comments: 12,
      views: 67,
      createdAt: '2024-01-14T09:20:00Z',
      isAnonymous: false,
      isPinned: false,
      isLocked: false
    }
  ]

  const supportGroups: SupportGroup[] = [
    {
      id: '1',
      name: 'Jovens 16-18 anos',
      description: 'Grupo de apoio para adolescentes entre 16 e 18 anos',
      category: 'age',
      memberCount: 45,
      isPrivate: false,
      tags: ['adolescentes', 'apoio', 'prevenção'],
      lastActivity: '2024-01-15T12:00:00Z',
      moderators: ['Ana Silva', 'Dr. João'],
      rules: [
        'Respeite todos os membros',
        'Não julgue experiências alheias',
        'Mantenha conversas construtivas'
      ]
    },
    {
      id: '2',
      name: 'Famílias em Recuperação',
      description: 'Espaço para famílias que enfrentam problemas com dependência',
      category: 'situation',
      memberCount: 28,
      isPrivate: true,
      tags: ['família', 'recuperação', 'apoio'],
      lastActivity: '2024-01-15T08:30:00Z',
      moderators: ['Dra. Maria'],
      rules: [
        'Confidencialidade absoluta',
        'Apoio mútuo sempre',
        'Sem julgamentos'
      ]
    },
    {
      id: '3',
      name: 'Esportes e Vida Saudável',
      description: 'Para quem busca alternativas saudáveis através do esporte',
      category: 'interest',
      memberCount: 67,
      isPrivate: false,
      tags: ['esporte', 'saúde', 'alternativas'],
      lastActivity: '2024-01-15T14:15:00Z',
      moderators: ['Prof. Lucas'],
      rules: [
        'Compartilhe atividades saudáveis',
        'Motive outros membros',
        'Celebre pequenas vitórias'
      ]
    }
  ]

  const categories = [
    { id: 'all', name: 'Todos', icon: '📋', color: 'bg-gray-500' },
    { id: 'support', name: 'Apoio', icon: '🤝', color: 'bg-blue-500' },
    { id: 'success', name: 'Sucessos', icon: '🎉', color: 'bg-green-500' },
    { id: 'question', name: 'Dúvidas', icon: '❓', color: 'bg-yellow-500' },
    { id: 'general', name: 'Geral', icon: '💬', color: 'bg-purple-500' }
  ]

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error('Preencha título e conteúdo')
      return
    }

    createPost({
      userId: user?.id || '',
      userName: newPost.isAnonymous ? 'Usuário Anônimo' : user?.name || '',
      userAvatar: newPost.isAnonymous ? undefined : user?.avatar,
      content: `**${newPost.title}**\n\n${newPost.content}`,
      type: newPost.category === 'support' ? 'support' : 
            newPost.category === 'question' ? 'question' : 'text',
      category: newPost.category,
      anonymous: newPost.isAnonymous
    })

    setNewPost({
      title: '',
      content: '',
      category: 'general',
      tags: [],
      isAnonymous: false
    })
    setShowCreatePost(false)
    toast.success('Post criado com sucesso!')
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      support: '🤝',
      success: '🎉',
      question: '❓',
      general: '💬'
    }
    return icons[category as keyof typeof icons] || '💬'
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      support: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      question: 'bg-yellow-100 text-yellow-800',
      general: 'bg-purple-100 text-purple-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Agora há pouco'
    if (diffInHours < 24) return `${diffInHours}h atrás`
    return `${Math.floor(diffInHours / 24)}d atrás`
  }

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-24 pt-4">
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
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Users size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Comunidade</h1>
          <p className="text-gray-600">Conecte-se, compartilhe e cresça junto com outros</p>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6"
      >
        <div className="bg-white rounded-2xl p-2 shadow-lg">
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'forum', name: 'Fórum', icon: MessageCircle },
              { id: 'groups', name: 'Grupos', icon: Users },
              { id: 'mentors', name: 'Mentores', icon: Crown }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                <span className="text-sm">{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      {activeTab === 'forum' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6 mb-6"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar posts, tags ou conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Create Post Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreatePost(true)}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            Criar Post
          </motion.button>
        </motion.div>
      )}

      {/* Content Area */}
      <div className="px-6">
        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border ${
                  post.isPinned ? 'border-yellow-300 bg-yellow-50' : 'border-gray-100'
                }`}
              >
                {/* Post Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {post.isAnonymous ? '?' : post.author.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800">
                          {post.isAnonymous ? 'Usuário Anônimo' : post.author.name}
                        </span>
                        {post.author.isMentor && (
                          <Crown size={14} className="text-yellow-500" />
                        )}
                        <span className="text-sm text-gray-500">Nível {post.author.level}</span>
                        {post.isPinned && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            📌 Fixado
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={12} />
                        {formatTimeAgo(post.createdAt)}
                        <span>•</span>
                        <Eye size={12} />
                        {post.views} visualizações
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {getCategoryIcon(post.category)} {post.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-3">{post.content}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <Heart size={16} />
                        <span className="text-sm">{post.likes}</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors"
                      >
                        <MessageSquare size={16} />
                        <span className="text-sm">{post.comments}</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors"
                      >
                        <Share2 size={16} />
                      </motion.button>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-600 hover:text-yellow-500 transition-colors"
                    >
                      <Bookmark size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === 'groups' && (
          <div className="space-y-4">
            {supportGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{group.name}</h3>
                      {group.isPrivate && (
                        <Shield size={16} className="text-gray-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{group.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {group.memberCount} membros
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {formatTimeAgo(group.lastActivity)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {group.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    Moderado por: {group.moderators.join(', ')}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold"
                  >
                    {group.isPrivate ? 'Solicitar Acesso' : 'Entrar no Grupo'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mentors Tab */}
        {activeTab === 'mentors' && (
          <div className="text-center py-12">
            <Crown size={64} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sistema de Mentoria</h3>
            <p className="text-gray-600 mb-6">
              Conecte-se com mentores experientes ou torne-se um mentor para ajudar outros
            </p>
            
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold"
              >
                Encontrar um Mentor
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-blue-500 text-blue-500 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Tornar-se Mentor
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Criar Novo Post</h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Título do post..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                
                <textarea
                  placeholder="Compartilhe sua experiência, dúvida ou pensamento..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                />
                
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value as any })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="general">Geral</option>
                  <option value="support">Pedido de Apoio</option>
                  <option value="success">História de Sucesso</option>
                  <option value="question">Dúvida</option>
                </select>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newPost.isAnonymous}
                    onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-600">Postar anonimamente</span>
                </label>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreatePost}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold"
                >
                  Publicar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Community
