import React, { useContext } from 'react';
import { ContextData } from '../DataContext';

function Footer() {
  const { isDarkMode } = useContext(ContextData);

  return (
    <footer className={isDarkMode ? 'todo-footer-dark' : 'todo-footer-light'}>
      <p style={{ color: isDarkMode ? '#f5f5f5' : '#000' }}>
        Challange by{' '}
        <a href="https://www.frontendmentor.io/" target="_blank">
          Frontend Mentor.
        </a>
      </p>
      <p style={{ color: isDarkMode ? '#f5f5f5' : '#000' }}>
        Developed by{' '}
        <a href="https://x.com/Shinawatra99" target="_blank">
          Shinawatra.
        </a>
      </p>
    </footer>
  );
}

export default Footer;
