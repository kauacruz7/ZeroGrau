
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {Brain, CheckCircle, XCircle, Trophy, ArrowRight, RotateCcw, Target, Clock, Star} from 'lucide-react'
import { useAdvancedStore } from '../store/useAdvancedStore'
import toast from 'react-hot-toast'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  category: string
}

const Quiz = () => {
  const { addXP, addCoins, userStats, updateChallengeProgress } = useAdvancedStore()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<boolean[]>([])

  const questions: Question[] = [
    {
      id: 1,
      question: "Qual é a idade mínima legal para consumir álcool no Brasil?",
      options: ["16 anos", "18 anos", "21 anos", "Não há idade mínima"],
      correct: 1,
      explanation: "No Brasil, a idade mínima legal para consumir álcool é 18 anos, conforme estabelecido pelo Estatuto da Criança e do Adolescente.",
      category: "Legislação"
    },
    {
      id: 2,
      question: "Qual dos seguintes é um sinal de dependência química?",
      options: ["Uso ocasional em festas", "Perda de controle sobre o uso", "Curiosidade sobre drogas", "Conversar sobre o assunto"],
      correct: 1,
      explanation: "A perda de controle sobre o uso é um dos principais sinais de dependência química, indicando que a pessoa não consegue mais parar por conta própria.",
      category: "Saúde"
    },
    {
      id: 3,
      question: "O que fazer se um amigo estiver usando drogas?",
      options: ["Ignorar a situação", "Oferecer ajuda e apoio", "Cortar a amizade", "Usar drogas junto"],
      correct: 1,
      explanation: "Oferecer ajuda e apoio é a melhor forma de ajudar um amigo. É importante mostrar que você se importa e está disponível para ajudar.",
      category: "Relacionamentos"
    },
    {
      id: 4,
      question: "Qual é o principal neurotransmissor afetado pelo álcool?",
      options: ["Dopamina", "Serotonina", "GABA", "Noradrenalina"],
      correct: 2,
      explanation: "O álcool afeta principalmente o GABA, um neurotransmissor inibitório, causando os efeitos depressores no sistema nervoso central.",
      category: "Ciência"
    },
    {
      id: 5,
      question: "Qual estratégia é mais eficaz para resistir à pressão dos pares?",
      options: ["Mentir sobre seus motivos", "Ter respostas preparadas", "Evitar todos os amigos", "Fingir que concorda"],
      correct: 1,
      explanation: "Ter respostas preparadas ajuda você a se sentir mais confiante e a responder de forma clara quando confrontado com pressão para usar substâncias.",
      category: "Prevenção"
    }
  ]

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer()
    }
  }, [timeLeft, showResult, quizCompleted])

  const handleAnswer = () => {
    if (selectedAnswer === null && timeLeft > 0) return

    const isCorrect = selectedAnswer === questions[currentQuestion].correct
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)
    
    if (isCorrect) {
      setScore(score + 1)
      addXP(20)
      addCoins(5)
      toast.success('✅ Resposta correta! +20 XP')
    } else {
      toast.error('❌ Resposta incorreta')
    }

    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      completeQuiz()
    }
  }

  const completeQuiz = () => {
    setQuizCompleted(true)
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0)
    const percentage = (finalScore / questions.length) * 100
    
    // Bonus por completar
    addXP(50)
    addCoins(20)
    
    // Bonus por performance
    if (percentage >= 80) {
      addXP(100)
      addCoins(50)
      toast.success('🏆 Excelente performance! Bonus de 100 XP!')
    } else if (percentage >= 60) {
      addXP(50)
      addCoins(25)
      toast.success('👏 Boa performance! Bonus de 50 XP!')
    }

    // Atualizar desafios
    updateChallengeProgress('week_reading', 1)
    
    toast.success(`🎯 Quiz completo! Pontuação: ${Math.round(percentage)}%`)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setTimeLeft(30)
    setQuizCompleted(false)
    setAnswers([])
  }

  if (quizCompleted) {
    const finalScore = answers.filter(Boolean).length
    const percentage = (finalScore / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-24 pt-6">
        <div className="px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Trophy size={40} className="text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completo!</h1>
            <p className="text-gray-600 mb-6">Parabéns por completar o desafio!</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">{finalScore}/{questions.length}</div>
                <div className="text-sm text-gray-600">Acertos</div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{Math.round(percentage)}%</div>
                <div className="text-sm text-gray-600">Pontuação</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between bg-yellow-50 rounded-lg p-3">
                <span className="text-sm font-medium">XP Ganho</span>
                <span className="text-yellow-600 font-bold">+{percentage >= 80 ? 170 : percentage >= 60 ? 120 : 70} XP</span>
              </div>
              <div className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                <span className="text-sm font-medium">Moedas Ganhas</span>
                <span className="text-green-600 font-bold">+{percentage >= 80 ? 75 : percentage >= 60 ? 50 : 25} moedas</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
            >
              <RotateCcw size={20} className="inline mr-2" />
              Jogar Novamente
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-24 pt-6">
      <div className="px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Brain size={28} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz Educativo</h1>
          <p className="text-gray-600">Teste seus conhecimentos sobre prevenção</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-1" />
              {timeLeft}s
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all"
            />
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              className="bg-gradient-to-r from-red-500 to-orange-500 h-1 rounded-full transition-all"
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <div className="mb-4">
            <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full mb-3">
              {questions[currentQuestion].category}
            </span>
            <h2 className="text-lg font-bold text-gray-800 leading-relaxed">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  showResult
                    ? index === questions[currentQuestion].correct
                      ? 'bg-green-100 border-2 border-green-500 text-green-800'
                      : index === selectedAnswer
                      ? 'bg-red-100 border-2 border-red-500 text-red-800'
                      : 'bg-gray-50 text-gray-500'
                    : selectedAnswer === index
                    ? 'bg-purple-100 border-2 border-purple-500 text-purple-800'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mr-3 text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {showResult && index === questions[currentQuestion].correct && (
                    <CheckCircle size={20} className="ml-auto text-green-600" />
                  )}
                  {showResult && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                    <XCircle size={20} className="ml-auto text-red-600" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-3">Explicação</h3>
              <p className="text-gray-600 mb-4">{questions[currentQuestion].explanation}</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextQuestion}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center"
              >
                {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
                <ArrowRight size={20} className="ml-2" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answer Button */}
        {!showResult && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnswer}
            disabled={selectedAnswer === null}
            className={`w-full py-4 rounded-xl font-semibold shadow-lg transition-all ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Confirmar Resposta
          </motion.button>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 grid grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-xl p-3 text-center shadow-lg">
            <Target size={20} className="mx-auto mb-1 text-purple-600" />
            <div className="text-sm font-medium text-gray-600">Acertos</div>
            <div className="text-lg font-bold text-purple-600">{score}</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-lg">
            <Star size={20} className="mx-auto mb-1 text-yellow-600" />
            <div className="text-sm font-medium text-gray-600">XP Total</div>
            <div className="text-lg font-bold text-yellow-600">{userStats?.totalXP || 0}</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-lg">
            <Trophy size={20} className="mx-auto mb-1 text-green-600" />
            <div className="text-sm font-medium text-gray-600">Nível</div>
            <div className="text-lg font-bold text-green-600">{userStats?.level || 1}</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Quiz
