const navLinks = [
  { label: '關於我', href: '#about' },
  { label: '工作經歷', href: '#experience' },
  { label: '技能', href: '#skills' },
  { label: '學歷', href: '#education' },
  { label: '聯絡', href: '#contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-semibold text-gray-900 tracking-tight">王小明</span>
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* mobile: simple contact link */}
        <a
          href="#contact"
          className="md:hidden text-sm font-medium text-indigo-600"
        >
          聯絡我
        </a>
      </nav>
    </header>
  )
}
