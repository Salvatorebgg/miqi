/** Reaction speed test — measures and trains reaction time in milliseconds. */

export interface ReactionState {
  phase: 'idle' | 'waiting' | 'ready' | 'go' | 'falseStart' | 'done'
  round: number
  totalRounds: number
  reactionTimes: number[]
  bestTime: number
  avgTime: number
  startTime: number
  gameOver: boolean
  message: string
}

export function generateReaction(totalRounds: number = 5): ReactionState {
  return {
    phase: 'idle', round: 0, totalRounds,
    reactionTimes: [], bestTime: Infinity, avgTime: 0,
    startTime: 0, gameOver: false, message: '点击"开始"测试反应速度',
  }
}

export function startRound(state: ReactionState): ReactionState {
  if (state.gameOver) return state
  if (state.round >= state.totalRounds) {
    return { ...state, phase: 'done', gameOver: true, message: '测试完成！' }
  }
  // Random delay 1-5 seconds before green
  return { ...state, phase: 'ready', message: '等待绿色出现...' }
}

export function goGreen(state: ReactionState): ReactionState {
  if (state.phase !== 'ready') return state
  return { ...state, phase: 'go', startTime: performance.now(), message: '快按！' }
}

export function tap(state: ReactionState): ReactionState {
  switch (state.phase) {
    case 'idle': {
      const next = startRound({ ...state, round: 0, reactionTimes: [], bestTime: Infinity })
      // Need to also set up go phase — caller handles timing
      return next
    }
    case 'ready':
      return { ...state, phase: 'falseStart', message: '太早了！等绿色出现再按' }
    case 'falseStart':
      return state // already penalized
    case 'go': {
      const reactionTime = Math.round(performance.now() - state.startTime)
      const times = [...state.reactionTimes, reactionTime]
      const avgTime = Math.round(times.reduce((a, b) => a + b, 0) / times.length)
      const bestTime = Math.min(state.bestTime, reactionTime)
      const round = state.round + 1
      return {
        ...state, reactionTimes: times, bestTime, avgTime, round,
        phase: 'idle', message: `${reactionTime}ms · 单击继续下一轮 (${round}/${state.totalRounds})`,
        gameOver: round >= state.totalRounds,
      }
    }
    case 'done':
      return state
    default:
      return state
  }
}

export function getReactionRating(avgMs: number): string {
  if (avgMs < 150) return '⚡ 闪电反应'
  if (avgMs < 200) return '🥇 极速'
  if (avgMs < 250) return '🥈 优秀'
  if (avgMs < 300) return '🥉 良好'
  if (avgMs < 400) return '一般'
  return '需要练习'
}
