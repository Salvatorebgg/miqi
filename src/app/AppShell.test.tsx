import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from './AppShell'

it('renders the learning cockpit and every primary destination', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: /学习中心/ })).toBeInTheDocument()
  for (const label of ['数学', '英语', '资讯', '游戏']) {
    expect(screen.getAllByRole('link', { name: new RegExp(label) }).length).toBeGreaterThan(0)
  }
})

it('renders all 5 nav links in the mobile navigation', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell />
    </MemoryRouter>,
  )

  const mobileNavigation = screen.getByRole('navigation', { name: '移动导航' })
  for (const label of ['首页', '数学', '英语', '资讯', '游戏']) {
    expect(within(mobileNavigation).getByRole('link', { name: label })).toBeInTheDocument()
  }
})
