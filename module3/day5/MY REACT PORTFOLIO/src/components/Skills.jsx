import '../css/Skills.css';

const SKILL_GROUPS = [
  {
    title: 'Web development',
    items: [
      'HTML5 — comfortable building semantic, multi-page sites',
      'CSS — layout, color, simple responsive design',
      'JavaScript',
    ],
  },
  {
    title: 'Tools',
    items: ['Git & GitHub (basics)', 'VS Code'],
  },
  {
    title: 'Other',
    items: ['Basic Python', 'Microsoft Office & spreadsheets'],
  },
];

const SOFT_SKILLS = ['Communication', 'Problem solving', 'Time management'];

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="section-head"><h2>Skills</h2></div>
        <div className="skills-grid">
          {SKILL_GROUPS.map((g) => (
            <div className="skill-group" key={g.title}>
              <h4>{g.title}</h4>
              <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="soft-skills">
          {SOFT_SKILLS.map((s) => <span className="chip" key={s}>{s}</span>)}
        </div>
      </div>
    </section>
  );
}
