import '../css/About.css';

const HOBBIES = ['Photography', 'Basketball', 'Reading science fiction', 'Traveling'];

const GOALS = [
  "Finish this portfolio and truly understand every part of how it's built.",
  'Build a second project using CSS Grid.',
  'Land an internship in web development.',
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="section-head"><h2>About</h2></div>
        <div className="about-grid">
          <div>
            <p>
              I'm a graduate of Addis Ababa Science and Technology University (AASTU), where I
              earned my Bachelor's degree in Electrical Engineering. I grew up in Ethiopia and
              have always been curious about how things work, which is what eventually pulled me
              toward technology.
            </p>
            <p>
              Outside of coursework and code, I enjoy listening to music, watching movies,
              traveling, taking photos, and spending time with friends and family. Right now I'm
              focused on building my technical skills and finding my footing in web development.
            </p>
            <div className="chip-row">
              {HOBBIES.map((h) => <span className="chip" key={h}>{h}</span>)}
            </div>
            <h3 className="goals-title">What I'm working toward</h3>
            <ol className="goal-list">
              {GOALS.map((g) => <li key={g}>{g}</li>)}
            </ol>
          </div>
          <div className="info-card">
            <div className="info-row"><span>LOCATION</span><span>Addis Ababa, Ethiopia</span></div>
            <div className="info-row"><span>LANGUAGES</span><span>English, Amharic</span></div>
            <div className="info-row"><span>CURRENTLY LEARNING</span><span>Full-stack web development (IBT College)</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
