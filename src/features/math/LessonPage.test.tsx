import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { LessonPage } from './LessonPage'

const renderLesson = (lessonId: string) =>
  render(
    <MemoryRouter initialEntries={[`/math/lesson/${lessonId}`]}>
      <Routes>
        <Route path="/math/lesson/:lessonId" element={<LessonPage />} />
      </Routes>
    </MemoryRouter>,
  )

describe('LessonPage', () => {
  beforeEach(() => localStorage.clear())

  it('renders objectives, intuition, principles, examples, exercises, quiz, and resources', () => {
    renderLesson('bridge-functions')
    expect(screen.getByRole('heading', { name: '函数与图像' })).toBeInTheDocument()
    expect(screen.getByText('目标')).toBeInTheDocument()
    expect(screen.getByText('直觉')).toBeInTheDocument()
    expect(screen.getByText('原理')).toBeInTheDocument()
    expect(screen.getByText('例题')).toBeInTheDocument()
    expect(screen.getByText('练习')).toBeInTheDocument()
    expect(screen.getByText('测验')).toBeInTheDocument()
    expect(screen.getByText('资料')).toBeInTheDocument()
  })

  it('grades a numeric exercise and shows feedback', async () => {
    renderLesson('bridge-functions')
    const answerInputs = screen.getAllByLabelText('答案')
    await userEvent.type(answerInputs[0], '11')
    const submitButtons = screen.getAllByRole('button', { name: '提交' })
    await userEvent.click(submitButtons[1])
    expect(await screen.findByText('回答正确！')).toBeInTheDocument()
  })

  it('reveals a solution on demand', async () => {
    renderLesson('bridge-functions')
    const revealButtons = screen.getAllByRole('button', { name: '解析' })
    await userEvent.click(revealButtons[0])
    expect(screen.getByText(/任取 0 ≤ x₁ < x₂/)).toBeInTheDocument()
  })

  it('marks the lesson as read and updates progress', async () => {
    renderLesson('bridge-functions')
    await userEvent.click(screen.getByRole('button', { name: '我已完成阅读' }))
    expect(screen.getByRole('button', { name: '已标记读完' })).toBeDisabled()
    expect(screen.getByText(/进度 20%/)).toBeInTheDocument()
  })

  it('external resources open safely in a new tab', () => {
    renderLesson('bridge-functions')
    for (const link of screen.getAllByRole('link', { name: /Bilibili|Khan/ })) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    }
  })

  it('shows a friendly state for an unknown lesson', () => {
    renderLesson('missing-lesson')
    expect(screen.getByText('没有找到这节课')).toBeInTheDocument()
  })
})
