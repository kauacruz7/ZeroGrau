
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function useNotifications() {
  useEffect(() => {
    // Verificar se é fim de semana e agendar notificações
    const scheduleWeekendNotifications = () => {
      const now = new Date()
      const dayOfWeek = now.getDay() // 0 = domingo, 6 = sábado
      
      // Mensagens de prevenção para fins de semana
      const preventionMessages = [
        '🚫 Lembre-se: O álcool pode prejudicar seu desenvolvimento!',
        '💪 Seja forte! Escolha atividades saudáveis neste fim de semana.',
        '🧠 Proteja seu cérebro! Evite o álcool e mantenha-se focado.',
        '🌟 Você é capaz de se divertir sem álcool!',
        '🏃‍♂️ Que tal praticar esportes ao invés de beber?',
        '📚 Use este tempo livre para aprender algo novo!',
        '👥 Procure amigos que apoiam suas escolhas saudáveis.',
        '🎯 Mantenha seus objetivos em mente. O álcool não te levará lá!'
      ]

      // Se for sexta (5), sábado (6) ou domingo (0)
      if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
        const randomMessage = preventionMessages[Math.floor(Math.random() * preventionMessages.length)]
        
        // Mostrar notificação imediatamente se for fim de semana
        toast(randomMessage, {
          duration: 6000,
          position: 'top-center',
          style: {
            background: '#ef4444',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
          },
          icon: '⚠️'
        })

        // Agendar notificações periódicas durante o fim de semana
        const notificationInterval = setInterval(() => {
          const currentDay = new Date().getDay()
          
          // Continuar apenas se ainda for fim de semana
          if (currentDay === 5 || currentDay === 6 || currentDay === 0) {
            const randomMsg = preventionMessages[Math.floor(Math.random() * preventionMessages.length)]
            toast(randomMsg, {
              duration: 5000,
              position: 'top-center',
              style: {
                background: '#f59e0b',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '12px',
                padding: '16px'
              },
              icon: '💡'
            })
          } else {
            // Parar notificações se não for mais fim de semana
            clearInterval(notificationInterval)
          }
        }, 3600000) // A cada 1 hora

        // Limpar intervalo quando componente for desmontado
        return () => clearInterval(notificationInterval)
      }
    }

    // Executar verificação imediatamente
    scheduleWeekendNotifications()

    // Verificar novamente a cada hora para detectar mudança de dia
    const hourlyCheck = setInterval(scheduleWeekendNotifications, 3600000)

    return () => clearInterval(hourlyCheck)
  }, [])

  // Função para mostrar notificação manual de prevenção
  const showPreventionReminder = () => {
    toast('🛡️ Lembre-se: Sua saúde é seu bem mais precioso!', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#10b981',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '12px',
        padding: '16px'
      },
      icon: '💚'
    })
  }

  return { showPreventionReminder }
}
