import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../../lib/supabase', () => ({ supabase: null }))

import { AuthPage } from './AuthPage'

describe('AuthPage (local mode)', () => {
  it('shows a local experience notice when Supabase is not configured', () => {
    render(<AuthPage />)
    expect(screen.getByRole('heading', { name: '当前无需登录' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('本地模式')
  })
})
