import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import '../css/Header.css';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a href="#home" className="brand">Hiwot<span>.</span>Ketema</a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.label}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>
      <div className="wrap">
        <div className={`mobile-menu ${open ? 'open' : ''}`}>
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
      </div>
    </header>
  );
}
