import React from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';

export default function CarCard({ car, onDetails, onConfigure }) {
  return <article className="car-card">
    <div className="car-image-wrap">
      <img src={car.image} alt={`${car.name} vehicle`} className="car-image" loading="lazy"/>
      <span className="car-badge">{car.badge}</span>
      <button className="image-arrow" onClick={() => onDetails(car)} aria-label={`View ${car.name} details`}><ArrowUpRight size={19}/></button>
    </div>
    <div className="car-card-info">
      <div><p className="eyebrow">{car.type}</p><h3>{car.name}</h3></div>
      <p className="car-price">{car.priceLabel}<span> onwards</span></p>
    </div>
    <div className="car-specs">
      <div><span>Range</span><strong>{car.range}</strong></div>
      <div><span>0–100 km/h</span><strong>{car.acceleration}</strong></div>
      <div><span>Power</span><strong>{car.power}</strong></div>
    </div>
    <div className="car-card-actions">
      <button className="button button-dark button-small" onClick={() => onDetails(car)}>Explore model <ArrowUpRight size={15}/></button>
      <button className="configure-link" onClick={() => onConfigure(car)}><Zap size={15}/> Configure</button>
    </div>
  </article>;
}
