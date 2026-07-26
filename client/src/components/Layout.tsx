import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useReminders } from '@/contexts/RemindersContext'
import { useTheme } from '@/contexts/ThemeContext'
import Footer from '@/components/Footer'

const LogoMark = () => (
  <img src="/favicon.svg" width={28} height={28} alt="Reminder" className="shrink-0" />
)

const TagsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.169.659 1.591l8.182 8.182a2.25 2.25 0 0 0 3.182 0l4.318-4.318a2.25 2.25 0 0 0 0-3.182L11.159 3.659A2.25 2.25 0 0 0 9.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.063.379.32.696.673.846.084.036.167.074.249.115.343.17.75.146 1.071-.064l.758-.493a1.125 1.125 0 0 1 1.43.139l.773.772c.389.389.447.998.139 1.431l-.493.758c-.21.321-.234.728-.064 1.071.041.082.079.165.115.249.15.353.467.61.846.673l.894.149c.542.09.94.56.94 1.11v1.093c0 .55-.398 1.02-.94 1.11l-.894.149c-.379.063-.696.32-.846.673a6.91 6.91 0 0 1-.115.249c-.17.343-.146.75.064 1.071l.493.758c.308.433.25 1.042-.139 1.431l-.773.772a1.125 1.125 0 0 1-1.43.139l-.758-.493c-.321-.21-.728-.234-1.071-.064a6.91 6.91 0 0 1-.249.115c-.353.15-.61.467-.673.846l-.149.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894a1.125 1.125 0 0 0-.673-.846 6.91 6.91 0 0 1-.249-.115c-.343-.17-.75-.146-1.071.064l-.758.493a1.125 1.125 0 0 1-1.43-.139l-.773-.772a1.125 1.125 0 0 1-.139-1.431l.493-.758c.21-.321.234-.728.064-1.071a6.91 6.91 0 0 1-.115-.249 1.125 1.125 0 0 0-.846-.673l-.894-.149A1.125 1.125 0 0 1 3 12.674v-1.093c0-.55.398-1.02.94-1.11l.894-.149c.379-.063.696-.32.846-.673.036-.084.074-.167.115-.249.17-.343.146-.75-.064-1.071l-.493-.758a1.125 1.125 0 0 1 .139-1.431l.773-.772a1.125 1.125 0 0 1 1.43-.139l.758.493c.321.21.728.234 1.071.064.082-.041.165-.079.249-.115.353-.15.61-.467.673-.846l.149-.894z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
  </svg>
)

export default function Layout() {
  const { theme } = useTheme()
  const { reminders } = useReminders()
  const location = useLocation()

  const hasTags = reminders.some(r => r.tags && r.tags.length > 0)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [location.pathname])

  const navItems = [
    { to: '/tags', label: 'Tags', icon: <TagsIcon />, show: hasTags },
    { to: '/settings', label: 'Settings', icon: <SettingsIcon /> }
  ].filter(item => item.show !== false)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: theme.bg, color: theme.text }}>
      <header
        className="sticky top-0 z-40 backdrop-blur-md"
        style={{
          background: `${theme.surface}dd`,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" style={{ textDecoration: 'none' }}>
            <LogoMark />
            <span className="text-xl font-extrabold tracking-tight select-none gradient-text">
              Reminder
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-0.5">
            {navItems.map(item => {
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                  style={
                    active
                      ? { background: `${theme.accent}22`, color: theme.accent }
                      : { color: theme.text2 }
                  }
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
