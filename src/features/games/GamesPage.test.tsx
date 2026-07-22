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
    const digit = pad.querySelectorAll('button')[4]
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

  it('renders eight game selector cards', () => {
    render(<GamesPage />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(8)
  })

  it('highlights the active game card', () => {
    render(<GamesPage />)
    const sudokuTab = screen.getByRole('tab', { name: /数独/ })
    expect(sudokuTab).toHaveAttribute('aria-selected', 'true')
  })

  it('can switch back to sudoku from another game', async () => {
    render(<GamesPage />)
    await userEvent.click(screen.getByRole('tab', { name: /扫雷/ }))
    await userEvent.click(screen.getByRole('tab', { name: /数独/ }))
    expect(screen.getByRole('grid', { name: '数独棋盘' })).toBeInTheDocument()
    expect(screen.getAllByRole('gridcell')).toHaveLength(81)
  })

  it('shows Wordle game when switching to its tab', async () => {
    render(<GamesPage />)
    await userEvent.click(screen.getByRole('tab', { name: /猜词/ }))
    expect(screen.getByText(/新单词/)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Q' })).toHaveLength(1)
  })

  it('shows Minesweeper game with difficulty options', async () => {
    render(<GamesPage />)
    await userEvent.click(screen.getByRole('tab', { name: /扫雷/ }))
    expect(screen.getByText(/9×9 · 10雷/)).toBeInTheDocument()
    expect(screen.getByText(/16×16 · 40雷/)).toBeInTheDocument()
    expect(screen.getAllByText(/16×30 · 99雷/).length).toBeGreaterThanOrEqual(1)
  })

  it('switches through all 8 games successfully', async () => {
    render(<GamesPage />)
    const names = [/数独/, /迷宫/, /滑块拼图/, /心算竞赛/, /猜词/, /扫雷/, /反应测试/, /逻辑谜题/]
    for (const name of names) {
      await userEvent.click(screen.getByRole('tab', { name }))
      expect(screen.getByRole('tab', { name })).toHaveAttribute('aria-selected', 'true')
    }
  })
})
