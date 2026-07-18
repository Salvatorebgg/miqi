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

type NavItem = {
  to: string
  label: string
  mobileLabel: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { to: '/', label: '学习首页', mobileLabel: '首页', icon: Home },
  { to: '/math', label: '数学课堂', mobileLabel: '数学', icon: Calculator },
  { to: '/english', label: 'IELTS 英语', mobileLabel: '英语', icon: Languages },
  { to: '/news', label: '每日资讯', mobileLabel: '资讯', icon: Newspaper },
  { to: '/games', label: '脑力游戏', mobileLabel: '游戏', icon: Gamepad2 },
  { to: '/planner', label: '规划中心', mobileLabel: '规划', icon: CalendarDays },
]

function DailySnapshot() {
  return (
    <div className="snapshot">
      <div className="snapshot-icon" aria-hidden="true">
        <Sparkles />
      </div>
      <p className="eyebrow">今日节奏</p>
      <h2>保持轻盈，持续前进</h2>
      <dl>
        <div>
          <dt>专注目标</dt>
          <dd>3 项</dd>
        </div>
        <div>
          <dt>学习连续</dt>
          <dd>7 天</dd>
        </div>
      </dl>
      <Link className="snapshot-link" to="/planner">
        查看今日规划
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
  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <div className="background-flow" aria-hidden="true">
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
          <p className="sidebar-note">每天一点，慢慢长成自己的节奏。</p>
        </aside>

        <main id="main-content">
          <header className="topbar">
            <div>
              <p className="eyebrow">MIQI LEARNING</p>
              <h1>学习驾驶舱</h1>
            </div>
            <Link className="account-link glass" to="/account" aria-label="打开个人中心">
              <UserRound aria-hidden="true" />
            </Link>
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
