import React, { useState } from 'react';
import { X, CalendarDays, CheckCircle2 } from 'lucide-react';

export default function BookingModal({ car, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', model: car?.name || 'Aura X', date: '', time: '10:00 AM', location: 'Bengaluru Experience Centre' });
  const update = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); setSubmitted(true); };
  return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <button className="modal-close" onClick={onClose} aria-label="Close booking form"><X size={20}/></button>
      {!submitted ? <>
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2 id="booking-title">Book a test drive.</h2>
        <p className="modal-intro">Get behind the wheel. Our team will confirm your preferred time shortly.</p>
        <form onSubmit={submit} className="booking-form">
          <label>Full name<input name="name" value={form.name} onChange={update} placeholder="Your name" required /></label>
          <div className="form-row">
            <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label>
            <label>Phone number<input name="phone" type="tel" pattern="[0-9+() -]{8,}" value={form.phone} onChange={update} placeholder="+91 " required /></label>
          </div>
          <div className="form-row">
            <label>Model<select name="model" value={form.model} onChange={update}><option>Aura X</option><option>Nova GT</option><option>Terra E</option><option>Pulse R</option></select></label>
            <label>Preferred date<input name="date" type="date" min={new Date().toISOString().split('T')[0]} value={form.date} onChange={update} required /></label>
          </div>
          <div className="form-row">
            <label>Preferred time<select name="time" value={form.time} onChange={update}><option>10:00 AM</option><option>11:30 AM</option><option>02:00 PM</option><option>03:30 PM</option><option>05:00 PM</option></select></label>
            <label>Experience centre<select name="location" value={form.location} onChange={update}><option>Bengaluru Experience Centre</option><option>Mumbai Experience Centre</option><option>Hyderabad Experience Centre</option></select></label>
          </div>
          <button className="button button-dark submit-booking" type="submit">Request my test drive <CalendarDays size={17}/></button>
          <p className="form-note">Demo experience only. Your details are not sent to a server.</p>
        </form>
      </> : <div className="booking-success">
        <span className="success-icon"><CheckCircle2 size={36}/></span>
        <p className="eyebrow">REQUEST RECEIVED</p><h2>You're one step closer.</h2>
        <p>Thanks, {form.name}. Your request for the <strong>{form.model}</strong> on <strong>{form.date}</strong> at <strong>{form.time}</strong> has been recorded in this demo.</p>
        <button className="button button-dark" onClick={onClose}>Done</button>
      </div>}
    </section>
  </div>;
}
