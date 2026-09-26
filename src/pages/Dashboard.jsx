import React, { useState } from 'react';
import {
  Users,
  BedDouble,
  AlertTriangle,
  DoorOpen,
  ArrowDownToLine,
  ArrowUpFromLine,
  Utensils,
  Bath,
  TrendingUp,
  ClipboardList
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

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

const occupancyData = [
  { day: '20 Sep', value: 812 },
  { day: '21 Sep', value: 824 },
  { day: '22 Sep', value: 836 },
  { day: '23 Sep', value: 841 },
  { day: '24 Sep', value: 850 },
  { day: '25 Sep', value: 855 },
  { day: '26 Sep', value: 860 }
];

const cards = [
  { title: 'Technicians', value: '860', sub: 'of 1,000 beds occupied', icon: Users, tone: 'blue' },
  { title: 'Occupancy', value: '86%', sub: '140 beds available', icon: BedDouble, tone: 'green' },
  { title: 'Rooms', value: '235 / 250', sub: '15 rooms available', icon: DoorOpen, tone: 'purple' },
  { title: 'Incidents Today', value: '2', sub: '1 open · 1 closed', icon: AlertTriangle, tone: 'red' }
];

export default function Dashboard() {
  const [incidents] = useState(loadIncidents);

  return (
    <>
      <div className="page-heading">
        <div>
          <h2>Today’s Overview</h2>
          <p>Daily camp status and operational summary.</p>
        </div>
        <button className="primary-btn">
          <ClipboardList size={17} /> Daily Operations
        </button>
      </div>

      <div className="stat-grid">
        {cards.map(({ title, value, sub, icon: Icon, tone }) => (
          <div className="stat-card" key={title}>
            <div className={`icon-box ${tone}`}><Icon size={20} /></div>
            <div>
              <span>{title}</span>
              <strong>{value}</strong>
              <small>{sub}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <section className="panel chart-panel">
          <div className="panel-head">
            <div>
              <h3>7-Day Occupancy</h3>
              <p>Technicians in camp</p>
            </div>
            <TrendingUp size={19} />
          </div>
          <div className="chart">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={occupancyData}>
                <defs>
                  <linearGradient id="occ" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopOpacity=".28" />
                    <stop offset="100%" stopOpacity=".02" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis domain={[780, 900]} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  strokeWidth={2.5}
                  fill="url(#occ)"
                  stroke="currentColor"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Today’s Movement</h3>
              <p>Technician movement</p>
            </div>
            <Users size={19} />
          </div>
          <div className="movement-list">
            <Movement label="Opening occupancy" value="850" icon={Users} />
            <Movement label="New arrivals" value="+25" icon={ArrowDownToLine} positive />
            <Movement label="Shifted in" value="+10" icon={ArrowDownToLine} positive />
            <Movement label="Shifted out" value="-8" icon={ArrowUpFromLine} />
            <Movement label="Departures" value="-5" icon={ArrowUpFromLine} />
            <div className="closing">
              <span>Closing occupancy</span>
              <strong>860</strong>
            </div>
          </div>
        </section>
      </div>

      <div className="grid-3">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Today’s Menu</h3>
              <p>26 September</p>
            </div>
            <Utensils size={19} />
          </div>
          <div className="menu-mini">
            <b>Breakfast</b><span>Paratha, Egg &amp; Tea</span>
            <b>Lunch</b><span>Rice, Chicken Curry &amp; Dal</span>
            <b>Dinner</b><span>Chapati, Vegetable &amp; Chicken</span>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Facilities</h3>
              <p>Current availability</p>
            </div>
            <Bath size={19} />
          </div>
          <Facility label="Rooms" value="235 / 250" />
          <Facility label="Washrooms" value="76 / 80" />
          <Facility label="Toilets" value="115 / 120" />
          <Facility label="Showers" value="98 / 100" />
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Incidents</h3>
              <p>Latest activity</p>
            </div>
            <AlertTriangle size={19} />
          </div>

          {incidents.length === 0 ? (
            <p>No incidents recorded.</p>
          ) : (
            incidents.slice(0, 2).map(incident => (
              <div className="incident-mini" key={incident.id}>
                <div className={`incident-dot ${incident.status.toLowerCase()}`} />
                <div>
                  <b>{incident.type}</b>
                  <span>{incident.location} · {incident.status}</span>
                </div>
                <small>{incident.date || '—'} · {incident.time || '—'}</small>
              </div>
            ))
          )}
        </section>
      </div>
    </>
  );
}

function Movement({ label, value, icon: Icon, positive }) {
  return (
    <div className="movement-row">
      <div className="movement-icon"><Icon size={17} /></div>
      <span>{label}</span>
      <strong className={positive ? 'positive' : ''}>{value}</strong>
    </div>
  );
}

function Facility({ label, value }) {
  return (
    <div className="facility-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}