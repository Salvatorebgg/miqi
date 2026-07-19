import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { CloudOff, LogOut, Volume2, VolumeX, Waves } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { loadPreferences, savePreferences, type Preferences } from '../../lib/preferences'

export function AccountPage() {
  const [user, setUser] = useState<User | null>(null)
  const [preferences, setPreferences] = useState<Preferences>(() => loadPreferences())

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.subscription.unsubscribe()
  }, [])

  const update = (patch: Partial<Preferences>) => {
    const next = { ...preferences, ...patch }
    setPreferences(next)
    savePreferences(next)
  }

  return (
    <section className="page-panel glass" aria-labelledby="account-title">
      <p className="eyebrow">个人中心</p>
      <h2 id="account-title">你的学习档案</h2>

      <div className="account-grid">
        <article className="settings-card glass">
          <h3>账号</h3>
          {supabase ? (
            user ? (
              <>
                <p>已登录：{user.email ?? user.user_metadata?.full_name ?? 'Miqi 学习者'}</p>
                <button type="button" className="ghost-button" onClick={() => void supabase?.auth.signOut()}>
                  <LogOut aria-hidden="true" />
                  退出登录
                </button>
              </>
            ) : (
              <p>
                尚未登录。<Link to="/auth">前往登录</Link> 后可在多设备间同步进度。
              </p>
            )
          ) : (
            <p role="status">
              <CloudOff aria-hidden="true" /> 本地体验模式：数据仅保存在当前设备。
            </p>
          )}
        </article>

        <article className="settings-card glass">
          <h3>偏好设置</h3>
          <label className="setting-row">
            <span>
              {preferences.muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
              按键音效
            </span>
            <input
              type="checkbox"
              checked={!preferences.muted}
              onChange={event => update({ muted: !event.target.checked })}
            />
          </label>
          <label className="setting-row">
            <span>
              <Waves aria-hidden="true" />
              背景水流动画
            </span>
            <input
              type="checkbox"
              checked={!preferences.reduceMotion}
              onChange={event => update({ reduceMotion: !event.target.checked })}
            />
          </label>
        </article>

        <article className="settings-card glass">
          <h3>同步状态</h3>
          <p role="status">
            {supabase
              ? user
                ? '云端同步已开启，学习记录将自动备份。'
                : '登录后开启云端同步。'
              : '本地模式：所有进度保存在浏览器中，不会丢失。'}
          </p>
        </article>
      </div>
    </section>
  )
}
