import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      <Link style={{ color: "black" }} to="/about">About</Link>

    </footer>
  );
};