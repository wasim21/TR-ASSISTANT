import React, { useState } from 'react';
import { Save, Plus, Users, BedDouble, DoorOpen } from 'lucide-react';

export default function Occupancy() {
  const [form,setForm] = useState({date:'2026-09-26',opening:850,arrivals:25,shiftIn:10,shiftOut:8,departures:5,totalBeds:1000,totalRooms:250,occupiedRooms:235});
  const closing = Number(form.opening)+Number(form.arrivals)+Number(form.shiftIn)-Number(form.shiftOut)-Number(form.departures);
  const occupancy = ((closing/Number(form.totalBeds))*100).toFixed(1);
  const set=(k,v)=>setForm({...form,[k]:v});
  return <>
    <div className="page-heading"><div><h2>Occupancy & Movement</h2><p>Enter the daily camp population and technician movement.</p></div><button className="primary-btn"><Save size={17}/> Save Daily Record</button></div>
    <section className="panel form-panel">
      <h3>Daily Occupancy Record</h3>
      <div className="form-grid">
        <Field label="Date" type="date" value={form.date} onChange={v=>set('date',v)}/>
        <Field label="Total Beds" type="number" value={form.totalBeds} onChange={v=>set('totalBeds',v)}/>
        <Field label="Total Rooms" type="number" value={form.totalRooms} onChange={v=>set('totalRooms',v)}/>
        <Field label="Occupied Rooms" type="number" value={form.occupiedRooms} onChange={v=>set('occupiedRooms',v)}/>
        <Field label="Opening Occupancy" type="number" value={form.opening} onChange={v=>set('opening',v)}/>
        <Field label="New Arrivals" type="number" value={form.arrivals} onChange={v=>set('arrivals',v)}/>
        <Field label="Shifted In" type="number" value={form.shiftIn} onChange={v=>set('shiftIn',v)}/>
        <Field label="Shifted Out" type="number" value={form.shiftOut} onChange={v=>set('shiftOut',v)}/>
        <Field label="Departures" type="number" value={form.departures} onChange={v=>set('departures',v)}/>
      </div>
    </section>
    <div className="stat-grid compact">
      <Summary icon={Users} title="Closing Occupancy" value={closing} sub="technicians in camp" tone="blue"/>
      <Summary icon={BedDouble} title="Occupancy" value={`${occupancy}%`} sub={`${Number(form.totalBeds)-closing} beds available`} tone="green"/>
      <Summary icon={DoorOpen} title="Room Occupancy" value={`${form.occupiedRooms} / ${form.totalRooms}`} sub={`${Number(form.totalRooms)-Number(form.occupiedRooms)} rooms available`} tone="purple"/>
    </div>
    <section className="panel">
      <div className="panel-head"><div><h3>Movement Calculation</h3><p>The system calculates closing occupancy automatically.</p></div><Plus size={19}/></div>
      <div className="calculation"><span>{form.opening}</span><b>+</b><span>{form.arrivals}</span><b>+</b><span>{form.shiftIn}</span><b>−</b><span>{form.shiftOut}</span><b>−</b><span>{form.departures}</span><b>=</b><strong>{closing}</strong></div>
    </section>
  </>;
}
function Field({label,type,value,onChange}){return <label className="field"><span>{label}</span><input type={type} value={value} onChange={e=>onChange(e.target.value)}/></label>}
function Summary({icon:Icon,title,value,sub,tone}){return <div className="stat-card"><div className={`icon-box ${tone}`}><Icon size={20}/></div><div><span>{title}</span><strong>{value}</strong><small>{sub}</small></div></div>}