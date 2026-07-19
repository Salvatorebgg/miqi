import { useState, type FormEvent } from 'react'
import { Github, KeyRound, Mail } from 'lucide-react'
import { supabase } from '../../lib/supabase'

type Mode = 'sign-in' | 'sign-up'

export function AuthPage() {
  const [mode, setMode] = useState<Mode>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!supabase) {
    return (
      <section className="page-panel glass" aria-labelledby="auth-title">
        <p className="eyebrow">本地体验模式</p>
        <h2 id="auth-title">当前无需登录</h2>
        <p role="status">
          未检测到 Supabase 配置，应用正以本地模式运行。你的学习记录会安全地保存在这台设备上。
          配置云端后可随时回来登录同步。
        </p>
      </section>
    )
  }

  const client = supabase
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    if (!email.includes('@')) {
      setError('请输入有效的邮箱地址')
      return
    }
    if (password.length < 6) {
      setError('密码至少需要 6 位')
      return
    }
    setBusy(true)
    try {
      if (mode === 'sign-in') {
        const { error: signInError } = await client.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
        setMessage('登录成功，欢迎回来！')
      } else {
        const { error: signUpError } = await client.auth.signUp({ email, password })
        if (signUpError) throw signUpError
        setMessage('注册成功，请查收验证邮件完成确认。')
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '操作失败，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  const resetPassword = async () => {
    setError(null)
    setMessage(null)
    if (!email.includes('@')) {
      setError('请先输入邮箱，再重置密码')
      return
    }
    const { error: resetError } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/miqi/#/account`,
    })
    if (resetError) setError(resetError.message)
    else setMessage('重置邮件已发送，请按邮件提示操作。')
  }

  const signInWithGithub = async () => {
    setError(null)
    const { error: oauthError } = await client.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/miqi/#/` },
    })
    if (oauthError) setError(oauthError.message)
  }

  return (
    <section className="page-panel glass" aria-labelledby="auth-title">
      <p className="eyebrow">{mode === 'sign-in' ? '欢迎回来' : '加入我们'}</p>
      <h2 id="auth-title">{mode === 'sign-in' ? '登录 Miqi Learning' : '创建 Miqi 账号'}</h2>

      <form className="auth-form" onSubmit={submit} noValidate>
        <label className="form-field">
          <span>邮箱</span>
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className="form-field">
          <span>密码</span>
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
            required
            minLength={6}
          />
        </label>

        {error ? <p role="alert" className="form-error">{error}</p> : null}
        {message ? <p role="status" className="form-success">{message}</p> : null}

        <button type="submit" className="primary-button" disabled={busy}>
          <Mail aria-hidden="true" />
          {busy ? '处理中…' : mode === 'sign-in' ? '邮箱登录' : '邮箱注册'}
        </button>
        <button type="button" className="ghost-button" onClick={resetPassword} disabled={busy}>
          <KeyRound aria-hidden="true" />
          忘记密码，发送重置邮件
        </button>
        <button type="button" className="ghost-button" onClick={signInWithGithub} disabled={busy}>
          <Github aria-hidden="true" />
          使用 GitHub 登录
        </button>
      </form>

      <p className="auth-switch">
        {mode === 'sign-in' ? '还没有账号？' : '已经有账号了？'}
        <button
          type="button"
          className="link-button"
          onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}
        >
          {mode === 'sign-in' ? '立即注册' : '直接登录'}
        </button>
      </p>
    </section>
  )
}
