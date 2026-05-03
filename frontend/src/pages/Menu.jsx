import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Menu.css';

const FILTERS = [
  { label: 'All Items',    min: '',  max: '' },
  { label: 'Under ₹100',  min: '',  max: 100 },
  { label: '₹100 – ₹500', min: 100, max: 500 },
  { label: 'Above ₹500',  min: 500, max: '' },
];

export default function Menu() {
  const [items, setItems]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [activeFilter, setActiveFilter] = useState(0);
  const [ordered, setOrdered]         = useState({}); // { itemId: true }

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const f = FILTERS[activeFilter];
      const params = {};
      if (f.min !== '') params.minPrice = f.min;
      if (f.max !== '') params.maxPrice = f.max;
      const res = await axios.get('/api/menu', { params });
      setItems(res.data.data || []);
    } catch {
      setError('Failed to load menu items. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    document.title = "Menu | What's Fare is Fair";
    fetchMenu();
  }, [fetchMenu]);

  const handleOrder = (item) => {
    setOrdered((prev) => ({ ...prev, [item._id]: true }));
    setTimeout(() => {
      setOrdered((prev) => ({ ...prev, [item._id]: false }));
    }, 3000);
  };

  const categoryColors = {
    'Main Course': 'badge-forest',
    'Beverages':   'badge-amber',
    'Starters':    'badge-terra',
    'Salads':      'badge-forest',
  };

  return (
    <div className="menu-page page-enter">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="menu-hero">
        <div className="container">
          <span className="hero__eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            🍽️ Fresh &amp; Healthy
          </span>
          <h1 className="section-title" style={{ color: 'var(--white)' }}>Our Menu</h1>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,.7)' }}>
            With a delicious listing, you have lots of tasty food to choose from.
          </p>
        </div>
      </div>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <div className="menu-filters">
        <div className="container">
          <div className="menu-filters__bar">
            <span className="menu-filters__label">Filter by Price:</span>
            <div className="menu-filters__pills">
              {FILTERS.map((f, i) => (
                <button
                  key={i}
                  className={`filter-pill ${activeFilter === i ? 'active' : ''}`}
                  onClick={() => setActiveFilter(i)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="menu-content">
        <div className="container">
          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <div className="spinner-wrap"><div className="spinner" /></div>
          ) : items.length === 0 ? (
            <div className="menu-empty">
              <span>🍃</span>
              <p>No items found for this filter.</p>
            </div>
          ) : (
            <>
              <p className="menu-count">
                Showing <strong>{items.length}</strong> item{items.length !== 1 ? 's' : ''}
              </p>
              <div className="menu-grid">
                {items.map((item) => (
                  <div key={item._id} className="menu-card card">
                    <div className="menu-card__emoji">
                      {item.category === 'Beverages' ? '🥤'
                        : item.category === 'Starters' ? '🍱'
                        : item.category === 'Salads' ? '🥗'
                        : '🍽️'}
                    </div>
                    <div className="menu-card__body">
                      <div className="menu-card__top">
                        <span className={`badge ${categoryColors[item.category] || 'badge-forest'}`}>
                          {item.category || 'Main Course'}
                        </span>
                      </div>
                      <h3 className="menu-card__name">{item.name}</h3>
                      <p className="menu-card__desc">{item.description}</p>
                      <div className="menu-card__footer">
                        <span className="menu-card__price">
                          ₹{Number(item.price).toFixed(2)}
                        </span>
                        {ordered[item._id] ? (
                          <div className="order-confirm">
                            ✅ Order placed!
                          </div>
                        ) : (
                          <button
                            className="btn btn-primary menu-card__order-btn"
                            onClick={() => handleOrder(item)}
                          >
                            Order Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
