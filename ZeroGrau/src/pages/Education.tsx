
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {BookOpen, Clock, User, TrendingUp, Award, CheckCircle, Star, Bookmark, Share2, Eye, FileText, Download, Search, Filter, BookmarkCheck} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import AchievementPopup from '../components/AchievementPopup'

interface ReadingContent {
  id: string
  title: string
  description: string
  category: 'alcohol' | 'drugs' | 'prevention' | 'health'
  type: 'article' | 'research' | 'guide' | 'story'
  readingTime: number // em minutos
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  thumbnail: string
  content: string
  completed: boolean
  rating: number
  author: string
  publishedAt: string
  tags: string[]
  wordCount: number
  readProgress: number
}

const Education = () => {
  const { userStats, updateStats, addExperience, unlockAchievement } = useAppStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedContent, setSelectedContent] = useState<ReadingContent | null>(null)
  const [achievementToShow, setAchievementToShow] = useState<any>(null)
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [readingProgress, setReadingProgress] = useState(0)
  const [currentReadingTime, setCurrentReadingTime] = useState(0)

  // Garantir que userStats existe com valores padrão
  const safeUserStats = userStats || {
    articlesRead: 0,
    educationProgress: 0,
    totalTimeSpent: 0,
    achievements: []
  }

  const categories = [
    { id: 'all', name: 'Todos', icon: '📚', color: 'bg-gray-500' },
    { id: 'alcohol', name: 'Álcool', icon: '🍺', color: 'bg-amber-500' },
    { id: 'drugs', name: 'Drogas', icon: '💊', color: 'bg-red-500' },
    { id: 'prevention', name: 'Prevenção', icon: '🛡️', color: 'bg-green-500' },
    { id: 'health', name: 'Saúde', icon: '❤️', color: 'bg-pink-500' }
  ]

  const readingContent: ReadingContent[] = [
    {
      id: '1',
      title: 'Os Efeitos do Álcool no Cérebro Adolescente',
      description: 'Compreenda como o álcool afeta especificamente o desenvolvimento cerebral dos jovens e suas consequências a longo prazo.',
      category: 'alcohol',
      type: 'article',
      readingTime: 8,
      difficulty: 'beginner',
      thumbnail: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg',
      completed: false,
      rating: 4.8,
      author: 'Dr. Maria Silva',
      publishedAt: '2024-01-15',
      tags: ['neurociência', 'adolescência', 'desenvolvimento'],
      wordCount: 1200,
      readProgress: 0,
      content: `
        <h2>🧠 Introdução</h2>
        <p>O cérebro adolescente está em constante desenvolvimento até aproximadamente os 25 anos. Durante este período crítico, o consumo de álcool pode ter consequências duradouras e significativas para o futuro do jovem.</p>
        
        <h3>⚗️ Como o Álcool Afeta o Cérebro</h3>
        <p>O álcool é um depressor do sistema nervoso central que interfere na comunicação entre neurônios. No cérebro adolescente, isso pode:</p>
        <ul>
          <li><strong>Prejudicar o desenvolvimento do córtex pré-frontal</strong> - área responsável pela tomada de decisões</li>
          <li><strong>Afetar a formação de memórias</strong> - dificultando o aprendizado</li>
          <li><strong>Interferir na maturação neural</strong> - atrasando o desenvolvimento cognitivo</li>
          <li><strong>Reduzir a plasticidade cerebral</strong> - limitando a capacidade de adaptação</li>
        </ul>
        
        <h3>📊 Dados Científicos Alarmantes</h3>
        <p>Pesquisas recentes mostram que:</p>
        <ul>
          <li>Adolescentes que bebem regularmente têm <strong>10% menos volume de massa cinzenta</strong></li>
          <li>O risco de dependência aumenta em <strong>4x</strong> quando o consumo inicia antes dos 15 anos</li>
          <li>Problemas de memória podem persistir por <strong>até 2 anos</strong> após parar de beber</li>
        </ul>
        
        <h3>🔬 Consequências a Longo Prazo</h3>
        <p>Estudos longitudinais demonstram que adolescentes que consomem álcool regularmente podem apresentar:</p>
        <ul>
          <li><strong>Menor volume de massa cinzenta</strong> nas áreas frontais do cérebro</li>
          <li><strong>Problemas de memória persistentes</strong> que afetam o desempenho acadêmico</li>
          <li><strong>Dificuldades de concentração</strong> e atenção sustentada</li>
          <li><strong>Maior risco de dependência</strong> na vida adulta (até 5x maior)</li>
          <li><strong>Alterações no sistema de recompensa</strong> cerebral</li>
        </ul>
        
        <h3>💡 Prevenção e Conscientização</h3>
        <p>A educação é fundamental. Compreender esses riscos ajuda os jovens a tomar decisões mais informadas. Estratégias eficazes incluem:</p>
        <ul>
          <li>Diálogo aberto com pais e educadores</li>
          <li>Programas de prevenção baseados em evidências</li>
          <li>Desenvolvimento de habilidades de resistência à pressão social</li>
          <li>Promoção de atividades alternativas saudáveis</li>
        </ul>
        
        <h3>🎯 Conclusão</h3>
        <p>O cérebro adolescente é particularmente vulnerável aos efeitos do álcool. Investir em prevenção e educação é investir no futuro de toda uma geração.</p>
      `
    },
    {
      id: '2',
      title: 'Drogas Sintéticas: Uma Análise Científica',
      description: 'Estudo aprofundado sobre as drogas sintéticas mais comuns, seus mecanismos de ação e os riscos para a saúde.',
      category: 'drugs',
      type: 'research',
      readingTime: 15,
      difficulty: 'intermediate',
      thumbnail: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg',
      completed: false,
      rating: 4.9,
      author: 'Prof. João Santos',
      publishedAt: '2024-01-10',
      tags: ['drogas sintéticas', 'química', 'neurobiologia'],
      wordCount: 2100,
      readProgress: 0,
      content: `
        <h2>🧪 Introdução às Drogas Sintéticas</h2>
        <p>As drogas sintéticas representam uma das maiores ameaças à saúde pública contemporânea. Diferentemente das drogas naturais, estas são produzidas artificialmente em laboratórios clandestinos.</p>
        
        <h3>⚗️ Principais Categorias</h3>
        
        <h4>1. Estimulantes Sintéticos</h4>
        <ul>
          <li><strong>MDMA (Ecstasy)</strong> - Afeta serotonina, dopamina e noradrenalina</li>
          <li><strong>Anfetaminas</strong> - Estimulam o sistema nervoso central</li>
          <li><strong>Catinonas sintéticas</strong> - "Sais de banho" com efeitos imprevisíveis</li>
        </ul>
        
        <h4>2. Depressores Sintéticos</h4>
        <ul>
          <li><strong>GHB</strong> - "Droga do estupro", extremamente perigosa</li>
          <li><strong>Benzodiazepínicos</strong> - Altamente viciantes</li>
          <li><strong>Fentanil</strong> - 50x mais potente que a heroína</li>
        </ul>
        
        <h4>3. Alucinógenos Sintéticos</h4>
        <ul>
          <li><strong>LSD</strong> - Altera percepção e consciência</li>
          <li><strong>NBOMe</strong> - Extremamente tóxico em pequenas doses</li>
          <li><strong>2C-B</strong> - Combina efeitos estimulantes e alucinógenos</li>
        </ul>
        
        <h3>🧠 Mecanismos de Ação</h3>
        <p>As drogas sintéticas atuam interferindo nos neurotransmissores:</p>
        <ul>
          <li><strong>Dopamina</strong> - Sistema de recompensa e prazer</li>
          <li><strong>Serotonina</strong> - Humor, sono e apetite</li>
          <li><strong>GABA</strong> - Principal neurotransmissor inibitório</li>
          <li><strong>Glutamato</strong> - Principal neurotransmissor excitatório</li>
        </ul>
        
        <h3>⚠️ Riscos Específicos</h3>
        
        <h4>Riscos Imediatos</h4>
        <ul>
          <li>Overdose fatal (especialmente com fentanil)</li>
          <li>Hipertermia maligna</li>
          <li>Convulsões e parada cardíaca</li>
          <li>Psicose aguda</li>
        </ul>
        
        <h4>Riscos a Longo Prazo</h4>
        <ul>
          <li>Danos cerebrais irreversíveis</li>
          <li>Dependência física e psicológica</li>
          <li>Transtornos psiquiátricos persistentes</li>
          <li>Problemas cardiovasculares crônicos</li>
        </ul>
        
        <h3>📊 Estatísticas Alarmantes</h3>
        <ul>
          <li><strong>300%</strong> - Aumento de overdoses por fentanil nos últimos 5 anos</li>
          <li><strong>1 em 4</strong> - Jovens que experimentam drogas sintéticas desenvolvem dependência</li>
          <li><strong>85%</strong> - Das overdoses fatais envolvem drogas sintéticas</li>
        </ul>
        
        <h3>🛡️ Estratégias de Prevenção</h3>
        <ul>
          <li>Educação baseada em evidências científicas</li>
          <li>Programas de redução de danos</li>
          <li>Testes de pureza em festivais e eventos</li>
          <li>Tratamento especializado para dependência</li>
        </ul>
        
        <h3>🎯 Conclusão</h3>
        <p>As drogas sintéticas representam um desafio complexo que requer abordagem multidisciplinar, combinando prevenção, educação, tratamento e políticas públicas eficazes.</p>
      `
    }
  ]

  const filteredContent = selectedCategory === 'all' 
    ? readingContent 
    : readingContent.filter(content => content.category === selectedCategory)

  const searchFilteredContent = searchQuery 
    ? filteredContent.filter(content => 
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredContent

  const handleContentClick = (content: ReadingContent) => {
    setSelectedContent(content)
    setReadingProgress(0)
    setCurrentReadingTime(0)
    
    // Simular progresso de leitura
    const timer = setInterval(() => {
      setCurrentReadingTime(prev => {
        const newTime = prev + 1
        const progress = Math.min((newTime / (content.readingTime * 60)) * 100, 100)
        setReadingProgress(progress)
        
        if (progress >= 100) {
          clearInterval(timer)
          
          if (!content.completed) {
            // Adicionar experiência baseada no tipo de conteúdo
            const experienceGain = content.type === 'research' ? 75 : 
                                 content.type === 'guide' ? 60 : 50
            addExperience(experienceGain)
            
            // Atualizar estatísticas
            const newStats = {
              articlesRead: safeUserStats.articlesRead + 1,
              educationProgress: Math.min(safeUserStats.educationProgress + 15, 100),
              totalTimeSpent: safeUserStats.totalTimeSpent + content.readingTime
            }
            updateStats(newStats)
            
            // Verificar conquistas
            if (safeUserStats.articlesRead === 0) {
              unlockAchievement('first_article')
              const achievement = safeUserStats.achievements?.find(a => a.id === 'first_article')
              if (achievement) setAchievementToShow(achievement)
            }
            
            if (newStats.articlesRead >= 10) {
              unlockAchievement('video_watcher') // Reutilizando para leitura
            }
            
            if (newStats.educationProgress >= 100) {
              unlockAchievement('education_master')
            }
            
            // Marcar como concluído
            content.completed = true
          }
        }
        
        return newTime
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }

  const toggleBookmark = (contentId: string) => {
    setBookmarkedItems(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen size={16} />
      case 'research': return <FileText size={16} />
      case 'guide': return <TrendingUp size={16} />
      case 'story': return <User size={16} />
      default: return <BookOpen size={16} />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'article': return 'Artigo'
      case 'research': return 'Pesquisa'
      case 'guide': return 'Guia'
      case 'story': return 'História'
      default: return 'Conteúdo'
    }
  }

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
            <BookOpen size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Biblioteca Digital</h1>
          <p className="text-gray-600">Conteúdo científico e educativo sobre prevenção</p>
        </div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-white rounded-2xl shadow-lg p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Progresso de Leitura</h3>
            <span className="text-2xl">📖</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-blue-600">{safeUserStats.articlesRead}</div>
              <div className="text-xs text-gray-600">Artigos Lidos</div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-600">{Math.floor(safeUserStats.totalTimeSpent)}min</div>
              <div className="text-xs text-gray-600">Tempo de Leitura</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">{safeUserStats.educationProgress}%</div>
              <div className="text-xs text-gray-600">Progresso Total</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-4"
      >
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar artigos, guias ou pesquisas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 mb-6"
      >
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
      </motion.div>

      {/* Content Grid */}
      <div className="px-6">
        <div className="grid gap-4">
          {searchFilteredContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Overlay com informações */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Status badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content.difficulty)}`}>
                    {content.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white flex items-center gap-1">
                    {getTypeIcon(content.type)}
                    {getTypeLabel(content.type)}
                  </span>
                  {content.completed && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white flex items-center gap-1">
                      <CheckCircle size={12} />
                      Lido
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleBookmark(content.id)
                    }}
                    className={`p-2 rounded-full ${
                      bookmarkedItems.includes(content.id)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-white/80 text-gray-600'
                    }`}
                  >
                    <Bookmark size={16} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-white/80 text-gray-600"
                  >
                    <Share2 size={16} />
                  </motion.button>
                </div>

                {/* Reading time and word count */}
                <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Clock size={12} />
                    {content.readingTime} min
                  </span>
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Eye size={12} />
                    {content.wordCount} palavras
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white">
                  <Star size={12} className="fill-current" />
                  <span className="text-sm font-medium">{content.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User size={14} className="text-gray-500" />
                  <span className="text-sm text-gray-600">{content.author}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{content.publishedAt}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {content.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {content.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {content.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Progress bar for read content */}
                {content.readProgress > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progresso de Leitura</span>
                      <span>{Math.round(content.readProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${content.readProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleContentClick(content)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  {content.completed ? (
                    <>
                      <BookmarkCheck size={20} />
                      Reler Conteúdo
                    </>
                  ) : (
                    <>
                      {getTypeIcon(content.type)}
                      Ler Agora
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reading Modal */}
      {selectedContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedContent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(selectedContent.type)}
                  <span className="text-sm font-medium text-gray-600">
                    {getTypeLabel(selectedContent.type)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedContent(null)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedContent.title}</h2>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {selectedContent.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {selectedContent.readingTime} min
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {selectedContent.wordCount} palavras
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progresso de Leitura</span>
                  <span>{Math.round(readingProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedContent.content }}
              />
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleBookmark(selectedContent.id)}
                    className={`p-2 rounded-full ${
                      bookmarkedItems.includes(selectedContent.id)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    <Bookmark size={16} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                  >
                    <Share2 size={16} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                  >
                    <Download size={16} />
                  </motion.button>
                </div>
                
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} className="fill-current" />
                  <span className="text-sm font-medium text-gray-700">{selectedContent.rating}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <AchievementPopup
        achievement={achievementToShow}
        onClose={() => setAchievementToShow(null)}
      />
    </div>
  )
}

export default Education
