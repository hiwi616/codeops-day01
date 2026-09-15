import { useState } from 'react';
import { FiMail, FiPhone, FiGithub, FiSend, FiCheckCircle } from 'react-icons/fi';
import '../css/Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="section-head"><h2>Contact</h2></div>
        <div className="contact-grid">
          <div className="contact-links">
            <a className="contact-link" href="mailto:hiwotketema701@gmail.com">
              <FiMail size={17} /> hiwotketema701@gmail.com
            </a>
            <a className="contact-link" href="tel:+251983074470">
              <FiPhone size={17} /> +251 98 307 4470
            </a>
            <a className="contact-link" href="https://github.com/hiwi616" target="_blank" rel="noopener noreferrer">
              <FiGithub size={17} /> github.com/hiwi616
            </a>
          </div>

          {sent ? (
            <div className="sent-note">
              <FiCheckCircle size={18} /> Thanks — your message has been noted. I'll get back to you soon.
            </div>
          ) : (
            <form className="msg-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                />
              </div>
              <div className="form-row">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Job opportunity, feedback, collaboration…"
                />
              </div>
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  required
                  minLength={10}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message here."
                />
              </div>
              <button type="submit" className="submit-btn">
                Send message <FiSend size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
