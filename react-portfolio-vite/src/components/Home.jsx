import { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import '../css/Home.css';

function Trace({ width = 110 }) {
  return (
    <svg className="trace" width={width} height="14" viewBox={`0 0 ${width} 14`} fill="none">
      <path
        d={`M0 7 H${width * 0.35} L${width * 0.45} 2 L${width * 0.55} 12 L${width * 0.65} 7 H${width}`}
        stroke="var(--copper)"
        strokeWidth="1.5"
      />
      <circle cx="2" cy="7" r="2.5" fill="var(--copper)" />
      <circle cx={width - 2} cy="7" r="2.5" fill="var(--copper)" />
    </svg>
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="home-section">
      <div className="wrap">
        <div className="hero">
          <div className="avatar">HK</div>
          <div className="hero-text">
            <div className={`trace-wrap ${ready ? 'go' : ''}`}>
              <Trace />
            </div>
            <h1>Hi, I'm Hiwot Ketema.</h1>
            <p>
              I'm an Electrical Engineering graduate learning full-stack web development from the
              ground up. This site is my growing portfolio — built by hand to show what I've
              learned about putting a real, multi-page site together.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">See my projects</a>
              <a href="#contact" className="btn btn-outline">Get in touch</a>
            </div>
          </div>
        </div>

        <div className="quick-facts">
          <span className="quick-fact"><FiMapPin size={14} /> Based in <b>Addis Ababa, Ethiopia</b></span>
          <span className="quick-fact">Studying <b>full-stack web development</b></span>
          <span className="quick-fact">Background in <b>Electrical Engineering</b></span>
        </div>
      </div>
    </section>
  );
}
