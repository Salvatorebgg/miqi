import { useEffect } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  Calculator,
  Gamepad2,
  Home,
  Languages,
  Newspaper,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { installControlSounds } from '../lib/audio'
import { loadPreferences } from '../lib/preferences'
import { SoundToggle } from '../components/ui/SoundToggle'
import { SyncBadge } from '../components/ui/SyncBadge'

type NavItem = {
  to: string
  label: string
  mobileLabel: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { to: '/', label: '首页', mobileLabel: '首页', icon: Home },
  { to: '/math', label: '数学', mobileLabel: '数学', icon: Calculator },
  { to: '/english', label: '英语', mobileLabel: '英语', icon: Languages },
  { to: '/news', label: '资讯', mobileLabel: '资讯', icon: Newspaper },
  { to: '/games', label: '游戏', mobileLabel: '游戏', icon: Gamepad2 },
  { to: '/planner', label: '规划', mobileLabel: '规划', icon: CalendarDays },
]

function DailySnapshot() {
  return (
    <div className="snapshot">
      <div className="snapshot-icon" aria-hidden="true">
        <Sparkles />
      </div>
      <p className="eyebrow">今日</p>
      <h2>学习概览</h2>
      <dl>
        <div>
          <dt>待完成</dt>
          <dd>3 项</dd>
        </div>
        <div>
          <dt>连续</dt>
          <dd>7 天</dd>
        </div>
      </dl>
      <Link className="snapshot-link" to="/planner">
        查看规划
      </Link>
    </div>
  )
}

function MobileDock({ items }: { items: NavItem[] }) {
  return (
    <nav className="mobile-dock glass" aria-label="移动导航">
      {items.map(({ to, mobileLabel, icon: Icon }) => (
        <NavLink key={to} to={to} aria-label={mobileLabel} end={to === '/'}>
          <Icon aria-hidden="true" />
          <span>{mobileLabel}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export function AppShell() {
  useEffect(() => installControlSounds(), [])

  useEffect(() => {
    const apply = () => {
      document.body.classList.toggle('reduce-motion', loadPreferences().reduceMotion)
    }
    apply()
    window.addEventListener('miqi:preferences', apply)
    return () => window.removeEventListener('miqi:preferences', apply)
  }, [])

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <div className="background-flow" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="app-shell">
        <aside className="sidebar glass" aria-label="主导航">
          <Link className="brand" to="/" aria-label="Miqi 首页">
            M
          </Link>
          <nav>
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} end={to === '/'}>
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
          <p className="sidebar-note">Miqi Learning</p>
          <div className="sidebar-footer">
            <SyncBadge />
          </div>
        </aside>

        <main id="main-content">
          <header className="topbar">
            <div>
              <p className="eyebrow">MIQI</p>
              <h1>学习中心</h1>
            </div>
            <div className="topbar-actions">
              <SoundToggle />
              <Link className="account-link glass" to="/account" aria-label="打开个人中心">
                <UserRound aria-hidden="true" />
              </Link>
            </div>
          </header>
          <Outlet />
        </main>

        <aside className="context-rail glass" aria-label="学习概览">
          <DailySnapshot />
        </aside>

        <MobileDock items={navItems} />
      </div>
    </div>
  )
}
