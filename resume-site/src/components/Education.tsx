const educations = [
  {
    school: '國立台灣大學',
    degree: '資訊工程學系 學士',
    period: '2015 年 9 月 — 2019 年 6 月',
    note: '畢業專題：基於機器學習的程式碼自動補全工具',
  },
  {
    school: 'Coursera — Meta Front-End Developer Certificate',
    degree: '線上認證課程',
    period: '2021 年 4 月 完成',
    note: '涵蓋 React、UX 設計原則、版本控制實務',
  },
]

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">學歷</h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto mb-10 rounded-full" />

        <div className="space-y-4">
          {educations.map((edu, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-xl shrink-0">
                🎓
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>
                <p className="text-indigo-600 text-sm font-medium mt-0.5">{edu.degree}</p>
                <p className="text-sm text-gray-500 mt-2">{edu.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
