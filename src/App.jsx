import { NavLink, Routes, Route } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, AlertTriangle, Utensils,
  Bath, Wrench, BarChart3, Settings, Menu, X, ChevronRight
} from 'lucide-react';
import React, { useState } from 'react';import Dashboard from './pages/Dashboard';
import Occupancy from './pages/Occupancy';
import Incidents from './pages/Incidents';
import MenuPage from './pages/MenuPage';
import Facilities from './pages/Facilities';
import Reports from './pages/Reports';
import Placeholder from './pages/Placeholder';

const nav = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Occupancy', to: '/occupancy', icon: Users },
  { label: 'Rooms', to: '/rooms', icon: Building2 },
  { label: 'Incidents', to: '/incidents', icon: AlertTriangle },
  { label: 'Today\'s Menu', to: '/menu', icon: Utensils },
  { label: 'Facilities', to: '/facilities', icon: Bath },
  { label: 'Maintenance', to: '/maintenance', icon: Wrench },
  { label: 'Reports', to: '/reports', icon: BarChart3 },
];

export default function App() {
  const [open, setOpen] = useState(true);
  return (
    <div className="app-shell">
      <aside className={open ? 'sidebar' : 'sidebar collapsed'}>
        <div className="brand">
          <div className="brand-mark"><Building2 size={22}/></div>
          {open && <div><strong>CampOps</strong><span>Management System</span></div>}
        </div>
        <nav>
          {nav.map(({label,to,icon:Icon}) => (
            <NavLink key={to} to={to} end={to === '/'} className="nav-item">
              <Icon size={19}/>{open && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <NavLink to="/settings" className="nav-item"><Settings size={19}/>{open && <span>Settings</span>}</NavLink>
          <button className="collapse-btn" onClick={() => setOpen(v => !v)}>
            {open ? <><ChevronRight size={18} className="rotate-180"/> Collapse</> : <Menu size={19}/>}
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setOpen(v => !v)}><Menu size={21}/></button>
          <div>
            <div className="eyebrow">CAMP OPERATIONS</div>
            <h1>Camp Management Dashboard</h1>
          </div>
          <div className="topbar-date">26 September 2026</div>
        </header>

        <section className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/occupancy" element={<Occupancy />} />
            <Route path="/rooms" element={<Placeholder title="Rooms" text="Room and bed allocation will be managed here." />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/maintenance" element={<Placeholder title="Maintenance" text="Track facility and equipment maintenance here." />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Placeholder title="Settings" text="Camp configuration and master data will be managed here." />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}