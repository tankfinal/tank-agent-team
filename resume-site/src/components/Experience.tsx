interface ExperienceItem {
  company: string
  role: string
  period: string
  description: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'ABC 科技股份有限公司',
    role: '資深全端工程師',
    period: '2022 年 3 月 — 至今',
    description: [
      '主導核心後台系統重構，將舊版 jQuery 頁面遷移至 React + TypeScript，效能提升 40%。',
      '設計並實作 RESTful API（Node.js / Express），服務日流量超過 100 萬次。',
      '帶領 3 名工程師執行敏捷衝刺，每雙週穩定 deliver 功能。',
    ],
  },
  {
    company: 'XYZ 新創有限公司',
    role: '前端工程師',
    period: '2020 年 6 月 — 2022 年 2 月',
    description: [
      '從零開始搭建前端專案架構（Vite + React），建立設計系統元件庫供 3 個產品共用。',
      '串接第三方金流 API，整合 OAuth 登入流程，上線後無重大安全事故。',
    ],
  },
  {
    company: 'DEF 軟體工作室',
    role: '初階工程師（實習 → 全職）',
    period: '2019 年 7 月 — 2020 年 5 月',
    description: [
      '參與電商網站開發，負責商品列表、購物車與結帳頁面前端實作。',
      '維護既有 PHP 後端程式，修復 Bug 並補充單元測試覆蓋率至 70%+。',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">工作經歷</h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto mb-10 rounded-full" />

        <div className="relative">
          {/* vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-100 hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="md:pl-12 relative">
                {/* dot */}
                <div className="hidden md:block absolute left-3 top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white" />

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                      <p className="text-indigo-600 text-sm font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap bg-gray-100 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.description.map((d, j) => (
                      <li key={j} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-indigo-400 mt-0.5 shrink-0">▸</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
