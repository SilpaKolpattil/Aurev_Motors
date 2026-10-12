import React from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';

export default function Header({ page, navigate, onBook }) {
  const links = [
    ['Collection', 'collection'],
    ['Our philosophy', 'philosophy'],
    ['Visit us', 'visit']
  ];
  return <header className="site-header">
    <button className="brand" onClick={() => navigate('home')} aria-label="Aurev Motors home">
      <span className="brand-mark">V</span><span>Aurev Motors<span className="brand-dot">.</span></span>
    </button>
    <nav className="desktop-nav">
      {links.map(([label, target]) => <button key={target} className={page === target ? 'nav-link active' : 'nav-link'} onClick={() => navigate(target)}>{label}</button>)}
    </nav>
    <div className="header-actions">
      <button className="text-link desktop-book" onClick={onBook}>Book a test drive <ArrowUpRight size={15}/></button>
      <button className="mobile-menu" onClick={() => navigate('collection')} aria-label="Open collection"><Menu size={22}/></button>
    </div>
  </header>;
}
