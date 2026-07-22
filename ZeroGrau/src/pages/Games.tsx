
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {Gamepad2, Trophy, Star, Target, Clock, ArrowLeft, RotateCcw, CheckCircle} from 'lucide-react'
import { useAdvancedStore } from '../store/useAdvancedStore'
import toast from 'react-hot-toast'

const Games = () => {
  const { addXP, addCoins, userStats } = useAdvancedStore()
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const games = [
    {
      id: 'memory',
      title: 'Jogo da Memória',
      description: 'Encontre os pares de cartas sobre prevenção',
      icon: '🧠',
      color: 'from-blue-500 to-blue-600',
      xpReward: 25
    },
    {
      id: 'decision',
      title: 'Simulador de Decisões',
      description: 'Tome decisões inteligentes em situações de risco',
      icon: '🎯',
      color: 'from-green-500 to-green-600',
      xpReward: 30
    },
    {
      id: 'puzzle',
      title: 'Quebra-cabeça Educativo',
      description: 'Monte imagens sobre vida saudável',
      icon: '🧩',
      color: 'from-purple-500 to-purple-600',
      xpReward: 20
    },
    {
      id: 'quiz-rapid',
      title: 'Quiz Relâmpago',
      description: 'Responda rápido sobre prevenção',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      xpReward: 35
    }
  ]

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24">
        {selectedGame === 'memory' && <MemoryGame onBack={() => setSelectedGame(null)} addXP={addXP} addCoins={addCoins} />}
        {selectedGame === 'decision' && <DecisionGame onBack={() => setSelectedGame(null)} addXP={addXP} addCoins={addCoins} />}
        {selectedGame === 'puzzle' && <PuzzleGame onBack={() => setSelectedGame(null)} addXP={addXP} addCoins={addCoins} />}
        {selectedGame === 'quiz-rapid' && <RapidQuizGame onBack={() => setSelectedGame(null)} addXP={addXP} addCoins={addCoins} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24 pt-6">
      <div className="px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Gamepad2 size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Jogos Educativos</h1>
          <p className="text-gray-600">Aprenda brincando sobre prevenção</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <Star size={24} className="mx-auto mb-2 text-yellow-500" />
            <div className="text-lg font-bold text-yellow-600">{userStats?.totalXP || 0}</div>
            <div className="text-xs text-gray-600">XP Total</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <Trophy size={24} className="mx-auto mb-2 text-green-500" />
            <div className="text-lg font-bold text-green-600">{userStats?.level || 1}</div>
            <div className="text-xs text-gray-600">Nível</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <Target size={24} className="mx-auto mb-2 text-blue-500" />
            <div className="text-lg font-bold text-blue-600">{userStats?.gamesPlayed || 0}</div>
            <div className="text-xs text-gray-600">Jogos</div>
          </div>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 gap-6">
          {games.map((game, index) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedGame(game.id)}
              className={`bg-gradient-to-r ${game.color} rounded-2xl p-6 text-white shadow-lg text-left`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{game.icon}</div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Recompensa</div>
                  <div className="font-bold">+{game.xpReward} XP</div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{game.title}</h3>
              <p className="text-sm opacity-90 mb-4">{game.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Jogar Agora</span>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">▶️</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Daily Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="text-center">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="text-xl font-bold mb-2">Desafio Diário</h3>
            <p className="text-sm opacity-90 mb-4">Complete 3 jogos hoje e ganhe 100 XP extras!</p>
            <div className="bg-white/20 rounded-full h-2 mb-3">
              <div 
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${Math.min(((userStats?.gamesPlayed || 0) % 3) / 3 * 100, 100)}%` }}
              />
            </div>
            <div className="text-sm font-medium">
              {(userStats?.gamesPlayed || 0) % 3}/3 jogos completos
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Jogo da Memória
const MemoryGame = ({ onBack, addXP, addCoins }: { onBack: () => void, addXP: (xp: number) => void, addCoins: (coins: number) => void }) => {
  const [cards, setCards] = useState<{ id: number, content: string, flipped: boolean, matched: boolean }[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)

  const cardContents = ['🚫', '💪', '🧠', '❤️', '🏃', '📚', '🤝', '⭐']

  useEffect(() => {
    const shuffledCards = [...cardContents, ...cardContents]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        flipped: false,
        matched: false
      }))
    setCards(shuffledCards)
  }, [])

  const flipCard = (id: number) => {
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return

    const newCards = cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    )
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlippedCards
      
      if (cards[first].content === cards[second].content) {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, matched: true }
              : card
          ))
          setFlippedCards([])
          
          // Check if game completed
          const allMatched = newCards.every(card => 
            card.id === first || card.id === second || card.matched
          )
          if (allMatched) {
            setGameCompleted(true)
            addXP(25)
            addCoins(10)
            toast.success('🎉 Jogo completo! +25 XP')
          }
        }, 1000)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, flipped: false }
              : card
          ))
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    setGameCompleted(false)
    setMoves(0)
    setFlippedCards([])
    const shuffledCards = [...cardContents, ...cardContents]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        flipped: false,
        matched: false
      }))
    setCards(shuffledCards)
  }

  return (
    <div className="pt-6 px-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center text-gray-600">
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">Jogo da Memória</div>
          <div className="text-sm text-gray-600">Movimentos: {moves}</div>
        </div>
        <button onClick={resetGame} className="text-gray-600">
          <RotateCcw size={20} />
        </button>
      </div>

      {gameCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 rounded-xl p-4 mb-6 text-center"
        >
          <CheckCircle size={32} className="mx-auto mb-2 text-green-600" />
          <div className="font-bold text-green-800">Parabéns!</div>
          <div className="text-sm text-green-600">Completado em {moves} movimentos</div>
        </motion.div>
      )}

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => flipCard(card.id)}
            className={`aspect-square rounded-xl text-2xl font-bold transition-all ${
              card.flipped || card.matched
                ? 'bg-white shadow-lg'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
            }`}
          >
            {card.flipped || card.matched ? card.content : '?'}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Simulador de Decisões
const DecisionGame = ({ onBack, addXP, addCoins }: { onBack: () => void, addXP: (xp: number) => void, addCoins: (coins: number) => void }) => {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)

  const scenarios = [
    {
      situation: "Você está em uma festa e alguém oferece uma bebida alcoólica.",
      options: [
        { text: "Aceitar para não parecer chato", points: 0, feedback: "Ceder à pressão pode levar a decisões ruins." },
        { text: "Recusar educadamente", points: 10, feedback: "Excelente! Você manteve seus valores." },
        { text: "Fingir que vai beber", points: 5, feedback: "Melhor que aceitar, mas honestidade é sempre melhor." }
      ]
    },
    {
      situation: "Um amigo próximo está usando drogas e te convida para experimentar.",
      options: [
        { text: "Experimentar só uma vez", points: 0, feedback: "Não existe 'só uma vez' quando se trata de drogas." },
        { text: "Recusar e oferecer ajuda ao amigo", points: 10, feedback: "Perfeito! Você protegeu a si mesmo e ao seu amigo." },
        { text: "Ir embora sem falar nada", points: 3, feedback: "Se protegeu, mas poderia ter ajudado o amigo." }
      ]
    },
    {
      situation: "Você se sente pressionado pelos colegas para fumar.",
      options: [
        { text: "Fumar para se encaixar", points: 0, feedback: "Sua saúde vale mais que a aprovação dos outros." },
        { text: "Explicar os riscos do cigarro", points: 10, feedback: "Ótimo! Educação é a melhor prevenção." },
        { text: "Mudar de assunto", points: 5, feedback: "Evitou o problema, mas perdeu a chance de educar." }
      ]
    }
  ]

  const handleChoice = (points: number, feedback: string) => {
    setScore(score + points)
    toast.success(feedback)
    
    if (currentScenario < scenarios.length - 1) {
      setTimeout(() => setCurrentScenario(currentScenario + 1), 2000)
    } else {
      setTimeout(() => {
        setGameCompleted(true)
        addXP(30)
        addCoins(15)
        toast.success('🎯 Simulação completa! +30 XP')
      }, 2000)
    }
  }

  const resetGame = () => {
    setCurrentScenario(0)
    setScore(0)
    setGameCompleted(false)
  }

  if (gameCompleted) {
    return (
      <div className="pt-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center text-gray-600">
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </button>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">Resultado Final</div>
          </div>
          <button onClick={resetGame} className="text-gray-600">
            <RotateCcw size={20} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg text-center"
        >
          <Trophy size={48} className="mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Simulação Completa!</h2>
          <div className="text-4xl font-bold text-green-600 mb-2">{score}/30</div>
          <div className="text-gray-600 mb-6">
            {score >= 25 ? 'Excelente! Você tomou ótimas decisões.' :
             score >= 15 ? 'Bom trabalho! Algumas decisões podem melhorar.' :
             'Continue praticando para tomar melhores decisões.'}
          </div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Jogar Novamente
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-6 px-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center text-gray-600">
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">Simulador de Decisões</div>
          <div className="text-sm text-gray-600">Cenário {currentScenario + 1}/{scenarios.length}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Pontos</div>
          <div className="font-bold text-green-600">{score}</div>
        </div>
      </div>

      <motion.div
        key={currentScenario}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          {scenarios[currentScenario].situation}
        </h3>

        <div className="space-y-4">
          {scenarios[currentScenario].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChoice(option.points, option.feedback)}
              className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-xl border-2 border-transparent hover:border-blue-200 transition-all"
            >
              <div className="flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option.text}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Quebra-cabeça
const PuzzleGame = ({ onBack, addXP, addCoins }: { onBack: () => void, addXP: (xp: number) => void, addCoins: (coins: number) => void }) => {
  const [pieces, setPieces] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)

  useEffect(() => {
    const shuffled = Array.from({ length: 15 }, (_, i) => i + 1).concat([0]).sort(() => Math.random() - 0.5)
    setPieces(shuffled)
  }, [])

  const movePiece = (index: number) => {
    const emptyIndex = pieces.indexOf(0)
    const canMove = [
      emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4
    ].includes(index) && 
    !(emptyIndex % 4 === 0 && index === emptyIndex - 1) &&
    !(emptyIndex % 4 === 3 && index === emptyIndex + 1)

    if (canMove) {
      const newPieces = [...pieces]
      ;[newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]]
      setPieces(newPieces)
      setMoves(moves + 1)

      // Check if completed
      const isCompleted = newPieces.every((piece, i) => piece === (i + 1) % 16)
      if (isCompleted) {
        setGameCompleted(true)
        addXP(20)
        addCoins(8)
        toast.success('🧩 Quebra-cabeça completo! +20 XP')
      }
    }
  }

  const resetGame = () => {
    const shuffled = Array.from({ length: 15 }, (_, i) => i + 1).concat([0]).sort(() => Math.random() - 0.5)
    setPieces(shuffled)
    setMoves(0)
    setGameCompleted(false)
  }

  return (
    <div className="pt-6 px-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center text-gray-600">
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">Quebra-cabeça</div>
          <div className="text-sm text-gray-600">Movimentos: {moves}</div>
        </div>
        <button onClick={resetGame} className="text-gray-600">
          <RotateCcw size={20} />
        </button>
      </div>

      {gameCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 rounded-xl p-4 mb-6 text-center"
        >
          <CheckCircle size={32} className="mx-auto mb-2 text-green-600" />
          <div className="font-bold text-green-800">Quebra-cabeça completo!</div>
          <div className="text-sm text-green-600">Resolvido em {moves} movimentos</div>
        </motion.div>
      )}

      <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
        {pieces.map((piece, index) => (
          <motion.button
            key={index}
            whileHover={piece !== 0 ? { scale: 1.05 } : {}}
            whileTap={piece !== 0 ? { scale: 0.95 } : {}}
            onClick={() => movePiece(index)}
            className={`aspect-square rounded-lg text-lg font-bold transition-all ${
              piece === 0 
                ? 'bg-gray-200' 
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
            }`}
          >
            {piece !== 0 && piece}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Quiz Relâmpago
const RapidQuizGame = ({ onBack, addXP, addCoins }: { onBack: () => void, addXP: (xp: number) => void, addCoins: (coins: number) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameCompleted, setGameCompleted] = useState(false)

  const questions = [
    { question: "Álcool é uma droga?", answer: true },
    { question: "Cigarro não causa dependência?", answer: false },
    { question: "Exercícios ajudam a reduzir o estresse?", answer: true },
    { question: "Drogas melhoram o desempenho escolar?", answer: false },
    { question: "Conversar com amigos é importante para a saúde mental?", answer: true }
  ]

  useEffect(() => {
    if (timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      nextQuestion()
    }
  }, [timeLeft, gameCompleted])

  const handleAnswer = (answer: boolean) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1)
      toast.success('✅ Correto!')
    } else {
      toast.error('❌ Incorreto!')
    }
    nextQuestion()
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(10)
    } else {
      setGameCompleted(true)
      addXP(35)
      addCoins(18)
      toast.success('⚡ Quiz relâmpago completo! +35 XP')
    }
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setTimeLeft(10)
    setGameCompleted(false)
  }

  if (gameCompleted) {
    return (
      <div className="pt-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center text-gray-600">
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </button>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">Resultado</div>
          </div>
          <button onClick={resetGame} className="text-gray-600">
            <RotateCcw size={20} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg text-center"
        >
          <div className="text-4xl mb-4">⚡</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Relâmpago Completo!</h2>
          <div className="text-4xl font-bold text-yellow-600 mb-2">{score}/{questions.length}</div>
          <div className="text-gray-600 mb-6">Respostas corretas</div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Jogar Novamente
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-6 px-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center text-gray-600">
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">Quiz Relâmpago</div>
          <div className="text-sm text-gray-600">Pergunta {currentQuestion + 1}/{questions.length}</div>
        </div>
        <div className="text-right">
          <Clock size={20} className="inline mr-1" />
          <span className="font-bold text-red-600">{timeLeft}s</span>
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg text-center"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-8">
          {questions[currentQuestion].question}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg"
          >
            ✅ VERDADEIRO
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(false)}
            className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 rounded-xl font-bold text-lg"
          >
            ❌ FALSO
          </motion.button>
        </div>

        <div className="mt-6">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full transition-all"
              style={{ width: `${(timeLeft / 10) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Games
