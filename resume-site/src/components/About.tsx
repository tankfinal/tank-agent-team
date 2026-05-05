export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">關於我</h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto mb-10 rounded-full" />

        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="flex-1 space-y-4 text-gray-600 leading-relaxed text-base md:text-lg">
            <p>
              嗨，我是王小明，一名擁有 5 年經驗的全端工程師，目前主要以
              React、TypeScript 和 Node.js 進行開發。曾參與多個從 0 到 1 的產品開發，
              熟悉敏捷開發流程與跨團隊協作。
            </p>
            <p>
              我對系統設計與程式碼品質有高度要求，喜歡撰寫易讀、易維護的程式碼。
              閒暇時會關注開源社群動態，偶爾貢獻 PR 或撰寫技術文章。
            </p>
            <p>
              目前積極尋求新的職涯挑戰，希望加入具有技術深度的團隊，一起打造有影響力的產品。
            </p>
          </div>

          {/* Quick stats */}
          <div className="md:w-52 w-full grid grid-cols-2 md:grid-cols-1 gap-4">
            {[
              { value: '5+', label: '年工作經驗' },
              { value: '20+', label: '完成專案' },
              { value: '3', label: '程式語言' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-indigo-50 rounded-xl p-4 text-center"
              >
                <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
