
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useAppStore } from '../store/useAppStore'

const ProgressChart = () => {
  const { progress, quizHistory } = useAppStore()

  const activityData = [
    { name: 'Quiz', value: progress.quizzesCompleted, color: '#8B5CF6' },
    { name: 'Artigos', value: progress.articlesRead, color: '#06B6D4' },
    { name: 'Jogos', value: progress.gamesPlayed, color: '#10B981' }
  ]

  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' })
    
    // Simulate activity data
    const activity = Math.floor(Math.random() * 5)
    return { day: dayName, activity }
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📊 Seu Progresso</h3>
      
      {/* Activity Distribution */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">Distribuição de Atividades</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                dataKey="value"
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {activityData.map((item) => (
            <div key={item.name} className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600 dark:text-gray-300">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">Atividade Semanal</h4>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#6B7280' }}
              />
              <YAxis hide />
              <Bar 
                dataKey="activity" 
                fill="#8B5CF6" 
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default ProgressChart
