import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Dashboard.css';

const TABS = ['Menu Items', 'Add Menu Item', 'Working Hours', 'Registered Consumers'];

const HOURS = [
  { day: 'Monday',    open: '8:00 AM',  close: '9:00 PM',  status: 'Open' },
  { day: 'Tuesday',   open: '8:00 AM',  close: '9:00 PM',  status: 'Open' },
  { day: 'Wednesday', open: '8:00 AM',  close: '9:00 PM',  status: 'Open' },
  { day: 'Thursday',  open: '8:00 AM',  close: '9:00 PM',  status: 'Open' },
  { day: 'Friday',    open: '8:00 AM',  close: '9:00 PM',  status: 'Open' },
  { day: 'Saturday',  open: '9:00 AM',  close: '10:00 PM', status: 'Open' },
  { day: 'Sunday',    open: '10:00 AM', close: '8:00 PM',  status: 'Open' },
];

const initForm = { name: '', description: '', price: '', category: 'Main Course' };

export default function Dashboard() {
  const [activeTab, setActiveTab]     = useState(0);
  const [menuItems, setMenuItems]     = useState([]);
  const [consumers, setConsumers]     = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [consLoading, setConsLoading] = useState(false);
  const [form, setForm]               = useState(initForm);
  const [formErr, setFormErr]         = useState({});
  const [formAlert, setFormAlert]     = useState(null);
  const [submitting, setSubmitting]   = useState(false);

  useEffect(() => {
    document.title = "Dashboard | What's Fare is Fair";
  }, []);

  const fetchMenu = useCallback(async () => {
    setMenuLoading(true);
    try {
      const res = await axios.get('/api/menu');
      setMenuItems(res.data.data || []);
    } catch { setMenuItems([]); }
    finally { setMenuLoading(false); }
  }, []);

  const fetchConsumers = useCallback(async () => {
    setConsLoading(true);
    try {
      const res = await axios.get('/api/consumers');
      setConsumers(res.data.data || []);
    } catch { setConsumers([]); }
    finally { setConsLoading(false); }
  }, []);

  useEffect(() => {
    if (activeTab === 0) fetchMenu();
    if (activeTab === 3) fetchConsumers();
  }, [activeTab, fetchMenu, fetchConsumers]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (formErr[name]) setFormErr((p) => ({ ...p, [name]: '' }));
  };

  const validateForm = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Item name is required.';
    if (!form.description.trim()) e.description = 'Description is required.';
    if (!form.price || isNaN(form.price) || Number(form.price) < 0)
      e.price = 'Enter a valid positive price.';
    return e;
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length) { setFormErr(errs); return; }
    setSubmitting(true);
    setFormAlert(null);
    try {
      await axios.post('/api/menu', { ...form, price: Number(form.price) });
      setFormAlert({ type: 'success', message: '✅ Menu item added successfully!' });
      setForm(initForm);
      setFormErr({});
    } catch (err) {
      setFormAlert({ type: 'error', message: err.response?.data?.message || 'Failed to add item.' });
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="dashboard-page page-enter">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="dashboard-hero">
        <div className="container">
          <span className="hero__eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            ⚙️ Admin Panel
          </span>
          <h1 className="section-title" style={{ color: 'var(--white)' }}>Dashboard</h1>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,.7)' }}>
            Manage menu items, consumers, and working hours.
          </p>
        </div>
      </div>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <div className="dash-stats-bar">
        <div className="container dash-stats-inner">
          <div className="dash-stat">
            <span className="dash-stat__icon">🍽️</span>
            <div>
              <div className="dash-stat__val">{menuItems.length}</div>
              <div className="dash-stat__lbl">Menu Items</div>
            </div>
          </div>
          <div className="dash-stat">
            <span className="dash-stat__icon">👥</span>
            <div>
              <div className="dash-stat__val">{consumers.length}</div>
              <div className="dash-stat__lbl">Consumers</div>
            </div>
          </div>
          <div className="dash-stat">
            <span className="dash-stat__icon">⏰</span>
            <div>
              <div className="dash-stat__val">7</div>
              <div className="dash-stat__lbl">Days Open</div>
            </div>
          </div>
          <div className="dash-stat">
            <span className="dash-stat__icon">📅</span>
            <div>
              <div className="dash-stat__val" style={{ fontSize: '1rem' }}>{today}</div>
              <div className="dash-stat__lbl">Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="container dash-tabs-wrap">
        <div className="dash-tabs">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`dash-tab ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {['🍽️', '➕', '⏰', '👥'][i]} {t}
            </button>
          ))}
        </div>

        {/* ── Tab 0: Menu Items ─────────────────────────────────────────── */}
        {activeTab === 0 && (
          <div className="dash-panel">
            <div className="dash-panel__head">
              <h2>All Menu Items</h2>
              <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '.9rem' }} onClick={fetchMenu}>
                🔄 Refresh
              </button>
            </div>
            {menuLoading ? (
              <div className="spinner-wrap"><div className="spinner" /></div>
            ) : menuItems.length === 0 ? (
              <p className="empty-msg">No menu items found. Add some in the "Add Menu Item" tab.</p>
            ) : (
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Added On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item, idx) => (
                      <tr key={item._id}>
                        <td>{idx + 1}</td>
                        <td><strong>{item.name}</strong></td>
                        <td className="table-desc">{item.description}</td>
                        <td><span className="price-chip">₹{Number(item.price).toFixed(2)}</span></td>
                        <td><span className="badge badge-forest">{item.category}</span></td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Tab 1: Add Menu Item ──────────────────────────────────────── */}
        {activeTab === 1 && (
          <div className="dash-panel">
            <h2>Add New Menu Item</h2>
            <div className="add-item-wrap">
              {formAlert && (
                <div className={`alert alert-${formAlert.type}`}>{formAlert.message}</div>
              )}
              <form onSubmit={handleAddItem} className="add-item-form" noValidate>
                <div className={`form-group ${formErr.name ? 'form-group--error' : ''}`}>
                  <label>Item Name</label>
                  <input name="name" value={form.name} onChange={handleFormChange}
                    placeholder="e.g. Mango Lassi" />
                  {formErr.name && <span className="field-error">{formErr.name}</span>}
                </div>
                <div className={`form-group ${formErr.description ? 'form-group--error' : ''}`}>
                  <label>Description</label>
                  <textarea name="description" value={form.description} onChange={handleFormChange}
                    placeholder="Brief description of the item" rows={3} />
                  {formErr.description && <span className="field-error">{formErr.description}</span>}
                </div>
                <div className="form-row">
                  <div className={`form-group ${formErr.price ? 'form-group--error' : ''}`}>
                    <label>Price (₹)</label>
                    <input name="price" type="number" min="0" step="0.01"
                      value={form.price} onChange={handleFormChange}
                      placeholder="e.g. 149.99" />
                    {formErr.price && <span className="field-error">{formErr.price}</span>}
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={form.category} onChange={handleFormChange}>
                      <option>Main Course</option>
                      <option>Starters</option>
                      <option>Beverages</option>
                      <option>Salads</option>
                      <option>Desserts</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}
                  style={{ marginTop: '8px' }}>
                  {submitting ? 'Adding…' : '➕ Add Menu Item'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── Tab 2: Working Hours ──────────────────────────────────────── */}
        {activeTab === 2 && (
          <div className="dash-panel">
            <h2>Working Hours</h2>
            <div className="hours-grid">
              {HOURS.map(({ day, open, close, status }) => (
                <div key={day} className={`hours-card card ${day === today ? 'hours-card--today' : ''}`}>
                  {day === today && <span className="today-badge">Today</span>}
                  <h3>{day}</h3>
                  <p className="hours-time">{open} — {close}</p>
                  <span className={`badge ${status === 'Open' ? 'badge-forest' : 'badge-terra'}`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab 3: Consumers ─────────────────────────────────────────── */}
        {activeTab === 3 && (
          <div className="dash-panel">
            <div className="dash-panel__head">
              <h2>Registered Consumers</h2>
              <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '.9rem' }} onClick={fetchConsumers}>
                🔄 Refresh
              </button>
            </div>
            {consLoading ? (
              <div className="spinner-wrap"><div className="spinner" /></div>
            ) : consumers.length === 0 ? (
              <p className="empty-msg">No consumers registered yet.</p>
            ) : (
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Registered On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consumers.map((c, idx) => (
                      <tr key={c._id}>
                        <td>{idx + 1}</td>
                        <td><strong>{c.name}</strong></td>
                        <td>{c.email}</td>
                        <td>{c.phone}</td>
                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
