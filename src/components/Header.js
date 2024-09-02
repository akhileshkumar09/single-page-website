import React from 'react';
import './Header.css';

const Header = ({ activeSection }) => {
  return (
    <header className="fixed-header">
      <nav>
        <ul>
          <li><a href="#story" className={activeSection === 'story' ? 'active' : ''}>Story</a></li>
          <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
          <li><a href="#work" className={activeSection === 'work' ? 'active' : ''}>Work</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
