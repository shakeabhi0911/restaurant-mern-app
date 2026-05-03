import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">🌿 What's Fare is Fair</span>
          <p>A local, community-driven restaurant focused on healthy, honest food.</p>
        </div>
        <div className="footer__links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/consumers">Register</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
        <div className="footer__hours">
          <h4>Working Hours</h4>
          <ul>
            <li>Mon – Fri: 8:00 AM – 9:00 PM</li>
            <li>Saturday: 9:00 AM – 10:00 PM</li>
            <li>Sunday: 10:00 AM – 8:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} What's Fare is Fair. Built with the MERN Stack.</p>
      </div>
    </footer>
  );
}
