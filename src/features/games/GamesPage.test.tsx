import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { GamesPage } from './GamesPage'

describe('GamesPage', () => {
  beforeEach(() => localStorage.clear())

  // ── existing tests (must still pass) ──

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

  // ── new tests: 24 point number puzzle ──

  it('switches to the 24 point game tab', async () => {
    render(<GamesPage />)
    await userEvent.click(screen.getByRole('tab', { name: /24/ }))
    // Number cards should appear
    const numberCards = document.querySelectorAll('.number-card')
    expect(numberCards.length).toBe(4)
    // Input field should be present
    expect(screen.getByPlaceholderText(/输入算式/)).toBeInTheDocument()
    // Submit button should be present
    expect(screen.getByRole('button', { name: /提交/ })).toBeInTheDocument()
  })

  it('allows typing an expression in the number puzzle', async () => {
    render(<GamesPage />)
    await userEvent.click(screen.getByRole('tab', { name: /24/ }))
    const input = screen.getByPlaceholderText(/输入算式/)
    await userEvent.type(input, '(3+5)*(9-7)')
    expect(input).toHaveValue('(3+5)*(9-7)')
  })

  it('shows error when submitting invalid expression', async () => {
    render(<GamesPage />)
    await userEvent.click(screen.getByRole('tab', { name: /24/ }))
    await userEvent.click(screen.getByRole('button', { name: /提交/ }))
    // Should show an error about empty input
    expect(screen.getByText('请输入算式')).toBeInTheDocument()
  })

  it('shows hint text when clicking the hint button', async () => {
    render(<GamesPage />)
    await userEvent.click(screen.getByRole('tab', { name: /24/ }))
    await userEvent.click(screen.getByRole('button', { name: /新一局/ }))
    await userEvent.click(screen.getByRole('button', { name: /^提示$/ }))
    // Hint feedback message should appear
    expect(screen.getByText(/已显示提示/)).toBeInTheDocument()
  })

  it('switches number puzzle difficulty and generates new numbers', async () => {
    render(<GamesPage />)
    await userEvent.click(screen.getByRole('tab', { name: /24/ }))
    // Click medium difficulty
    const mediumBtn = screen.getByRole('button', { name: '中等' })
    await userEvent.click(mediumBtn)
    // Number cards should still be present
    const numberCards = document.querySelectorAll('.number-card')
    expect(numberCards.length).toBe(4)
  })

  // ── new tests: game selector cards ──

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

  // ── new tests: help panel ──

  it('shows help panel when clicking the help button', async () => {
    render(<GamesPage />)
    const helpBtn = screen.getByRole('button', { name: '帮助' })
    await userEvent.click(helpBtn)
    expect(screen.getByText('玩法说明')).toBeInTheDocument()
  })

  it('hides help panel when clicking the help button again', async () => {
    render(<GamesPage />)
    const helpBtn = screen.getByRole('button', { name: '帮助' })
    await userEvent.click(helpBtn)
    expect(screen.getByText('玩法说明')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: '收起' }))
    expect(screen.queryByText('玩法说明')).not.toBeInTheDocument()
  })

  // ── new tests: switching back to sudoku preserves board ──

  it('can switch back to sudoku from another game', async () => {
    render(<GamesPage />)
    // Switch to maze
    await userEvent.click(screen.getByRole('tab', { name: /迷宫/ }))
    expect(screen.getByRole('button', { name: '向上移动' })).toBeInTheDocument()
    // Switch back to sudoku
    await userEvent.click(screen.getByRole('tab', { name: /数独/ }))
    expect(screen.getByRole('grid', { name: '数独棋盘' })).toBeInTheDocument()
    expect(screen.getAllByRole('gridcell')).toHaveLength(81)
  })
})
