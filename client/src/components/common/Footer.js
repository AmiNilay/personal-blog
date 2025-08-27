import React from 'react';

// A simple footer with your name and the current year.
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ textAlign: 'center', padding: '2rem', marginTop: 'auto', color: 'var(--text-secondary)' }}>
      <p>&copy; {currentYear} Nilay Naha. All Rights Reserved.</p>
      <p>Built with React, Node.js</p>
    </footer>
  );
};

export default Footer;