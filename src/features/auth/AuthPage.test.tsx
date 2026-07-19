import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockSupabase } = vi.hoisted(() => ({
  mockSupabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      signInWithOAuth: vi.fn(),
    },
  },
}))

vi.mock('../../lib/supabase', () => ({ supabase: mockSupabase }))

import { AuthPage } from './AuthPage'

describe('AuthPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('validates email before submitting', async () => {
    render(<AuthPage />)
    await userEvent.type(screen.getByLabelText('邮箱'), 'not-an-email')
    await userEvent.type(screen.getByLabelText('密码'), 'secret1')
    await userEvent.click(screen.getByRole('button', { name: /邮箱登录/ }))
    expect(screen.getByRole('alert')).toHaveTextContent('请输入有效的邮箱地址')
    expect(mockSupabase.auth.signInWithPassword).not.toHaveBeenCalled()
  })

  it('signs in with email and password', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null })
    render(<AuthPage />)
    await userEvent.type(screen.getByLabelText('邮箱'), 'learner@example.com')
    await userEvent.type(screen.getByLabelText('密码'), 'secret1')
    await userEvent.click(screen.getByRole('button', { name: /邮箱登录/ }))
    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'learner@example.com',
      password: 'secret1',
    })
    expect(await screen.findByRole('status')).toHaveTextContent('登录成功')
  })

  it('shows server errors to the learner', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: new Error('Invalid login credentials') })
    render(<AuthPage />)
    await userEvent.type(screen.getByLabelText('邮箱'), 'learner@example.com')
    await userEvent.type(screen.getByLabelText('密码'), 'secret1')
    await userEvent.click(screen.getByRole('button', { name: /邮箱登录/ }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid login credentials')
  })

  it('invokes GitHub OAuth with the miqi redirect', async () => {
    mockSupabase.auth.signInWithOAuth.mockResolvedValue({ error: null })
    render(<AuthPage />)
    await userEvent.click(screen.getByRole('button', { name: /使用 GitHub 登录/ }))
    expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'github',
      options: { redirectTo: `${location.origin}/miqi/#/` },
    })
  })

  it('switches to sign-up mode', async () => {
    render(<AuthPage />)
    await userEvent.click(screen.getByRole('button', { name: '立即注册' }))
    expect(screen.getByRole('heading', { name: '创建 Miqi 账号' })).toBeInTheDocument()
  })
})
