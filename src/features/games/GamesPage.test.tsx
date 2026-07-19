import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { GamesPage } from './GamesPage'

describe('GamesPage', () => {
  beforeEach(() => localStorage.clear())

  it('renders the sudoku board by default', () => {
    render(<GamesPage />)
    expect(screen.getByRole('grid', { name: '数独棋盘' })).toBeInTheDocument()
    expect(screen.getAllByRole('gridcell')).toHaveLength(81)
  })

  it('switches to the maze tab', async () => {
    render(<GamesPage />)
    await userEvent.click(screen.getByRole('tab', { name: /迷宫/ }))
    expect(screen.getByRole('application', { name: /迷宫/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '向上移动' })).toBeInTheDocument()
  })

  it('places a digit via the number pad', async () => {
    render(<GamesPage />)
    const editable = screen
      .getAllByRole('gridcell')
      .find(cell => !cell.getAttribute('aria-label')!.includes('固定'))!
    await userEvent.click(editable)
    const pad = screen.getByRole('group', { name: '数字键盘' })
    const digit = pad.querySelectorAll('button')[4] // '5'
    await userEvent.click(digit)
    expect(editable).toHaveTextContent('5')
  })

  it('does not edit fixed cells', async () => {
    render(<GamesPage />)
    const fixed = screen
      .getAllByRole('gridcell')
      .find(cell => cell.getAttribute('aria-label')!.includes('固定'))!
    const original = fixed.textContent
    await userEvent.click(fixed)
    const pad = screen.getByRole('group', { name: '数字键盘' })
    await userEvent.click(pad.querySelectorAll('button')[0])
    expect(fixed).toHaveTextContent(original ?? '')
  })
})
