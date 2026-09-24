import { FiBookOpen } from 'react-icons/fi';
import '../css/Education.css';

export default function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <div className="section-head"><h2>Education</h2></div>
        <div className="edu-card">
          <div className="edu-icon"><FiBookOpen size={18} /></div>
          <div>
            <h3>Addis Ababa Science and Technology University</h3>
            <div className="edu-meta">Electrical Engineering — Communication stream · 2018–2023</div>
          </div>
        </div>
      </div>
    </section>
  );
}
