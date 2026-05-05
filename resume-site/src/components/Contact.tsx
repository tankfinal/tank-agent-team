const contactLinks = [
  {
    label: 'Email',
    value: 'wang.xiaoming@example.com',
    href: 'mailto:wang.xiaoming@example.com',
    icon: '✉️',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/wang-xiaoming',
    href: 'https://linkedin.com/in/wang-xiaoming',
    icon: '💼',
  },
  {
    label: 'GitHub',
    value: 'github.com/wang-xiaoming',
    href: 'https://github.com/wang-xiaoming',
    icon: '🐙',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">聯絡我</h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto mb-4 rounded-full" />
        <p className="text-gray-500 mb-10 max-w-lg mx-auto">
          對我的背景有興趣嗎？歡迎透過以下方式聯絡，我通常會在 24 小時內回覆。
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-2xl px-5 py-4 transition-colors group"
            >
              <span className="text-2xl">{link.icon}</span>
              <div className="text-left">
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{link.label}</div>
                <div className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors break-all">
                  {link.value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
