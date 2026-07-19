import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from './AppShell'

describe('accessibility', () => {
  it('exposes a skip link, landmarks, and labelled navigation', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: '跳到主要内容' })).toHaveAttribute('href', '#main-content')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    expect(screen.getByRole('complementary', { name: '主导航' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: '移动导航' })).toBeInTheDocument()
  })

  it('sound toggle has an accessible pressed state', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>,
    )
    const toggle = screen.getByRole('button', { name: /按键音效/ })
    expect(toggle).toHaveAttribute('aria-pressed')
  })

  it('decorative background flow is hidden from assistive technology', () => {
    const { container } = render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>,
    )
    expect(container.querySelector('.background-flow')).toHaveAttribute('aria-hidden', 'true')
  })
})
