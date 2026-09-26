import React, { useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';

const INCIDENTS_KEY = 'campops-incidents';

const defaultIncidents = [
  {
    id: 1,
    type: 'Water Leakage',
    location: 'Block B',
    status: 'Open',
    time: '10:35 AM'
  },
  {
    id: 2,
    type: 'AC Issue',
    location: 'Room C-204',
    status: 'Closed',
    time: '08:20 AM'
  }
];

function loadIncidents() {
  try {
    const saved = localStorage.getItem(INCIDENTS_KEY);
    return saved ? JSON.parse(saved) : defaultIncidents;
  } catch {
    return defaultIncidents;
  }
}

export default function Incidents() {
  const [items, setItems] = useState(loadIncidents);
  const [form, setForm] = useState({
    type: '',
    location: '',
    description: '',
    status: 'Open'
  });

  const add = () => {
    if (!form.type.trim() || !form.location.trim()) {
      return;
    }

    const now = new Date();
    const newIncident = {
      ...form,
      type: form.type.trim(),
      location: form.location.trim(),
      id: Date.now(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newIncident, ...items];

    setItems(updated);
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(updated));
    setForm({
      type: '',
      location: '',
      description: '',
      status: 'Open'
    });
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <h2>Incidents</h2>
          <p>Record and monitor camp incidents.</p>
        </div>
        <button className="primary-btn" onClick={add}>
          <Plus size={17} /> Add Incident
        </button>
      </div>

      <section className="panel form-panel">
        <h3>New Incident</h3>
        <div className="form-grid">
          <label className="field">
            <span>Incident Type</span>
            <input
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              placeholder="e.g. Water leakage"
            />
          </label>

          <label className="field">
            <span>Location</span>
            <input
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              placeholder="Block / room"
            />
          </label>

          <label className="field wide">
            <span>Description</span>
            <input
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe what happened"
            />
          </label>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>Today's Incidents</h3>
            <p>{items.length} recorded</p>
          </div>
          <AlertTriangle size={19} />
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Incident</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map(incident => (
                <tr key={incident.id}>
                  <td>
                    <b>{incident.type}</b>
                    <small>{incident.description || 'No description'}</small>
                  </td>
                  <td>{incident.location}</td>
                  <td>{incident.date || '—'}</td>
                  <td>{incident.time || '—'}</td>
                  <td>
                    <span className={`status ${incident.status.toLowerCase()}`}>
                      {incident.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}