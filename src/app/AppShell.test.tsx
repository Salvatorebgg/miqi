import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from './AppShell'

it('renders the learning cockpit and every primary destination', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: /学习驾驶舱/ })).toBeInTheDocument()
  for (const label of ['数学课堂', 'IELTS 英语', '每日资讯', '脑力游戏', '规划中心']) {
    expect(screen.getByRole('link', { name: new RegExp(label) })).toBeInTheDocument()
  }
})

it('keeps the planner reachable from the mobile navigation', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell />
    </MemoryRouter>,
  )

  const mobileNavigation = screen.getByRole('navigation', { name: '移动导航' })
  expect(within(mobileNavigation).getByRole('link', { name: '规划' })).toHaveAttribute('href', '/planner')
})
