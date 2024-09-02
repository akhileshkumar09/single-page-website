import React, { useEffect, useState, useRef, useMemo } from 'react';
import Header from './components/Header';
import Section from './components/Section';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('story');
  const sections = useMemo(() => ['story', 'skills', 'work', 'about'], []);
  const autoScrolling = useRef(false);  // Use useRef to persist the value

  // Handle manual scrolling and detect the active section
  useEffect(() => {
    const handleScroll = () => {
      if (autoScrolling.current) return;

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, sections]);

  // Handle auto-scrolling to the next section
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!autoScrolling.current) {
        const currentIndex = sections.indexOf(activeSection);
        const nextSectionIndex = (currentIndex + 1) % sections.length;
        autoScrolling.current = true;
        console.log('Auto-scrolling to:', sections[nextSectionIndex]); // Debugging output
        document.getElementById(sections[nextSectionIndex]).scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
          autoScrolling.current = false;
        }, 1000);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [activeSection, sections]);

  return (
    <div className="App">
      <Header activeSection={activeSection} />
      <Section id="story">Story Section</Section>
      <Section id="skills">Skills Section</Section>
      <Section id="work">Work Section</Section>
      <Section id="about">About Section</Section>
    </div>
  );
}

export default App;
