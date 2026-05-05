export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-indigo-50 to-white"
    >
      {/* Avatar placeholder */}
      <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-6 text-4xl select-none">
        👨‍💻
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-3">
        王小明
      </h1>
      <p className="text-xl md:text-2xl font-medium text-indigo-600 mb-4">
        全端工程師 · Full-Stack Engineer
      </p>
      <p className="max-w-xl text-gray-500 text-base md:text-lg leading-relaxed mb-10">
        5 年軟體開發經驗，專注於打造高品質的 Web 應用程式。
        熱愛簡潔的程式架構與流暢的使用者體驗。
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="#experience"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          查看工作經歷
        </a>
        <a
          href="#contact"
          className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
        >
          聯絡我
        </a>
      </div>
    </section>
  )
}
