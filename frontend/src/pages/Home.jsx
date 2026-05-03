import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

export default function Home() {
  useEffect(() => {
    document.title = "Home | What's Fare is Fair";
    // Seed menu on first visit
    axios.post('/api/menu/seed').catch(() => {});
  }, []);

  return (
    <div className="home page-enter">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
          <div className="hero__grain" />
        </div>
        <div className="container hero__content">
          <span className="hero__eyebrow">🌱 Community • Health • Taste</span>
          <h1 className="hero__title">
            Welcome to<br />
            <em>What's Fare is Fair</em>
          </h1>
          <p className="hero__sub">
            We are a local, community-driven restaurant focused on healthy food.
            Every ingredient tells a story — come taste the difference.
          </p>
          <div className="hero__cta">
            <Link to="/menu" className="btn btn-amber">View Menu</Link>
            <Link to="/consumers" className="btn btn-outline hero__btn-outline">Register Now</Link>
          </div>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="features">
        <div className="container">
          <div className="features__grid">
            <div className="feature-card card">
              <div className="feature-card__icon">🥗</div>
              <h3>About Us</h3>
              <p>
                We are a local, community-driven restaurant focused on healthy food.
                Our farm-to-table approach ensures every dish is fresh.
              </p>
            </div>
            <div className="feature-card card">
              <div className="feature-card__icon">🍽️</div>
              <h3>Menu</h3>
              <p>
                With a delicious listing, you have lots of tasty food to choose from.
                New seasonal items added regularly.
              </p>
              <Link to="/menu" className="btn btn-primary feature-card__btn">View Menu</Link>
            </div>
            <div className="feature-card card">
              <div className="feature-card__icon">⏰</div>
              <h3>Working Hours</h3>
              <p>
                We try to stay open so you get the food you want when you want it.
                Check our current schedule.
              </p>
              <Link to="/dashboard" className="btn btn-outline feature-card__btn">View Hours</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────────────────────────────── */}
      <section className="why-us">
        <div className="container">
          <div className="why-us__inner">
            <div className="why-us__text">
              <h2 className="section-title">Why Choose Us?</h2>
              <p className="section-subtitle">Quality food, community spirit, honest prices.</p>
              <ul className="why-us__list">
                {[
                  ['🌾', 'Farm-fresh ingredients sourced locally every morning'],
                  ['🧑‍🍳', 'Expert chefs with a passion for healthy cuisine'],
                  ['♻️', 'Eco-conscious packaging and zero food waste policy'],
                  ['❤️', 'A warm, welcoming space for the whole community'],
                ].map(([icon, text]) => (
                  <li key={text}>
                    <span className="why-us__icon">{icon}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Link to="/consumers" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                Join Our Community
              </Link>
            </div>
            <div className="why-us__visual" aria-hidden="true">
              <div className="why-us__plate">
                <span>🌿</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
