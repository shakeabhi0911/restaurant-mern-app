import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Consumers.css';

const initialForm = { name: '', email: '', phone: '' };

export default function Consumers() {
  const [form, setForm]       = useState(initialForm);
  const [errors, setErrors]   = useState({});
  const [alert, setAlert]     = useState(null); // { type, message }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Register | What's Fare is Fair";
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Name must be at least 2 characters.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = 'Please enter a valid email address.';
    if (!form.phone.trim() || !/^[0-9]{10}$/.test(form.phone))
      e.phone = 'Phone must be exactly 10 digits.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setAlert(null);
    try {
      await axios.post('/api/consumers', form);
      setAlert({ type: 'success', message: '🎉 Registration successful! Welcome to our community.' });
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setAlert({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consumers-page page-enter">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="consumers-hero">
        <div className="container">
          <h1 className="section-title" style={{ color: 'var(--white)' }}>Join Our Community</h1>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,.7)' }}>
            Register to stay updated with our menu and special offers.
          </p>
        </div>
      </div>

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <div className="consumers-form-wrap">
        <div className="consumers-form-card card">
          <div className="consumers-form-card__header">
            <span className="consumers-form-card__icon">🌿</span>
            <h2>Consumer Registration</h2>
            <p>Fill in your details to register with us.</p>
          </div>

          {alert && (
            <div className={`alert alert-${alert.type}`}>{alert.message}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Arjun Sharma"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className={`form-group ${errors.email ? 'form-group--error' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. arjun@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className={`form-group ${errors.phone ? 'form-group--error' : ''}`}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="10-digit number e.g. 9876543210"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                autoComplete="tel"
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary consumers-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  Registering…
                </>
              ) : (
                '✅ Register Now'
              )}
            </button>
          </form>
        </div>

        {/* ── Info Panel ─────────────────────────────────────────────────── */}
        <div className="consumers-info">
          <h3>Why Register?</h3>
          <ul className="consumers-info__list">
            {[
              ['🍽️', 'Get early access to new menu items'],
              ['🎁', 'Receive special offers and discounts'],
              ['📰', 'Stay updated with seasonal specials'],
              ['❤️', 'Be part of our growing community'],
            ].map(([icon, text]) => (
              <li key={text}>
                <span>{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="consumers-info__hours">
            <h4>⏰ Our Working Hours</h4>
            <ul>
              <li><strong>Mon – Fri</strong> 8:00 AM – 9:00 PM</li>
              <li><strong>Saturday</strong> 9:00 AM – 10:00 PM</li>
              <li><strong>Sunday</strong> 10:00 AM – 8:00 PM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
