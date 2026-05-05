interface SkillGroup {
  category: string
  skills: string[]
  color: string
}

const skillGroups: SkillGroup[] = [
  {
    category: '前端',
    skills: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Next.js', 'HTML5', 'CSS3'],
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    category: '後端',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'REST API'],
    color: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    category: '工具 & 流程',
    skills: ['Git', 'Docker', 'GitHub Actions', 'AWS', 'Figma', 'Jest', 'Postman'],
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">技能</h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto mb-10 rounded-full" />

        <div className="space-y-8">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${group.color}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
