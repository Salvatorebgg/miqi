import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { EnglishPage } from './EnglishPage'

describe('EnglishPage', () => {
  beforeEach(() => localStorage.clear())

  it('renders the daily vocabulary trainer and reading tabs', async () => {
    render(<EnglishPage />)
    expect(screen.getByRole('heading', { name: '每天一点点，向高分靠近' })).toBeInTheDocument()
    expect(await screen.findByText(/今日单词/)).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /情景理解/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /英文新闻/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /论文摘要/ })).toBeInTheDocument()
  })

  it('reveals a word and records a rating', async () => {
    render(<EnglishPage />)
    await userEvent.click(await screen.findByRole('button', { name: '显示释义与例句' }))
    expect(screen.getByRole('group', { name: '熟悉程度' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: '熟练掌握' }))
    const stored = JSON.parse(localStorage.getItem('miqi:vocabulary') ?? '[]') as { familiarity: number }[]
    expect(stored).toHaveLength(1)
    expect(stored[0].familiarity).toBe(2)
  })

  it('submits reading answers and reveals explanations', async () => {
    render(<EnglishPage />)
    const radios = await screen.findAllByRole('radio')
    // Answer all four questions with the first option of each group.
    const groups = new Map<string, HTMLInputElement>()
    for (const radio of radios) {
      const input = radio as HTMLInputElement
      if (!groups.has(input.name)) groups.set(input.name, input)
    }
    for (const input of groups.values()) await userEvent.click(input)
    await userEvent.click(screen.getByRole('button', { name: '提交阅读答案' }))
    expect(await screen.findByText(/答对 \d \/ 4 题/)).toBeInTheDocument()
    const attempts = JSON.parse(localStorage.getItem('miqi:reading-attempts') ?? '[]') as unknown[]
    expect(attempts).toHaveLength(1)
  })
})
