import { FiArrowUpRight } from 'react-icons/fi';
import '../css/Projects.css';

const PROJECT = {
  name: 'Addis Bank Management System',
  desc:
    'A simulated bank: create accounts, deposit, withdraw, and transfer money, undo transactions, ' +
    'earn interest, and use overdrafts. Branches are organized as a tree, and account transfers are ' +
    'modeled as a graph so relationships between accounts can be analyzed.',
  stack: ['HTML', 'CSS', 'JavaScript'],
  link: 'https://github.com/hiwi616/codeops-day01/tree/main/module1/day10/Mini_project',
};

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head"><h2>Projects</h2></div>
        <div className="project-card">
          <h3>{PROJECT.name}</h3>
          <p>{PROJECT.desc}</p>
          <div className="tags">
            {PROJECT.stack.map((s) => <span className="tag" key={s}>{s}</span>)}
          </div>
          <a className="project-link" href={PROJECT.link} target="_blank" rel="noopener noreferrer">
            View on GitHub <FiArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
