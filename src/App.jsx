import React, { useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, Gauge, Menu, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import Header from './components/Header.jsx';
import CarCard from './components/CarCard.jsx';
import BookingModal from './components/BookingModal.jsx';
import { cars } from './data/cars.js';
import EmiCalculator from "./components/EmiCalculator.jsx";

function Footer({ navigate, onBook }) {
  return <footer className="site-footer">
    <div className="footer-top"><div><div className="brand footer-brand"><span className="brand-mark">V</span><span>Aurev Motors<span className="brand-dot">.</span></span></div><p>Move with meaning.</p></div>
      <div className="footer-links"><button onClick={() => navigate('collection')}>Explore collection</button><button onClick={onBook}>Book a test drive</button><button onClick={() => navigate('philosophy')}>Our philosophy</button></div>
      <div className="footer-note">Crafted for the road ahead.<br/>Designed around you.</div>
    </div>
    <div className="footer-bottom"><span>© 2026 Aurev Motors MOTORS — CONCEPT WEBSITE</span><span>DESIGNED TO MOVE YOU ↗</span></div>
    <div className="footer-bottom"><span>Aurev Motors is a fictional automotive showroom website created as a frontend development project. Vehicle models, specifications, prices, and showroom details are illustrative. This website is not affiliated with a real car manufacturer or dealership. Test-drive bookings are for demonstration purposes only.</span>
    </div>
  </footer>;
}

function Home({ navigate, onBook, onDetails, onConfigure }) {
  return <>
    <section className="hero">
      <img className="hero-image" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90" alt="Performance car on a mountain road"/>
      <div className="hero-shade"></div>
      <div className="hero-content">
        <p className="eyebrow light-eyebrow"><span className="eyebrow-line"></span> THE FUTURE, IN MOTION</p>
        <h1>Drive your<br/><em>next chapter.</em></h1>
        <p className="hero-copy">Thoughtfully engineered. Beautifully considered.<br/>Made for wherever life takes you.</p>
        <div className="hero-actions"><button className="button button-light" onClick={() => navigate('collection')}>Explore the collection <ArrowRight size={17}/></button><button className="hero-secondary" onClick={onBook}>Book a test drive <ArrowUpRight size={16}/></button></div>
      </div>
      <div className="hero-bottom"><span>01 / 04 — THE Aurev Motors COLLECTION</span><span className="scroll-cue">SCROLL TO DISCOVER <ArrowDown size={14}/></span></div>
    </section>
    <section className="intro section-shell">
      <div className="intro-left"><p className="eyebrow">A DIFFERENT KIND OF DRIVE</p><h2>More than a car.<br/><span>A feeling.</span></h2></div>
      <div className="intro-right"><p>We believe the best journeys are the ones that feel unmistakably yours. Every line, every detail, every mile is designed to make the everyday extraordinary.</p><button className="underlined-link" onClick={() => navigate('philosophy')}>Discover our philosophy <ArrowUpRight size={16}/></button></div>
    </section>
    <section className="featured-section section-shell" id="collection">
      <div className="section-heading"><div><p className="eyebrow">FIND YOUR Aurev Motors</p><h2>Made to move <em>you.</em></h2></div><button className="underlined-link" onClick={() => navigate('collection')}>View all models <ArrowRight size={16}/></button></div>
      <div className="car-grid">{cars.slice(0, 3).map(car => <CarCard key={car.id} car={car} onDetails={onDetails} onConfigure={onConfigure}/>)}</div>
    </section>
    <section className="manifesto">
      <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85" alt="Close up of a car design detail"/>
      <div className="manifesto-overlay"></div><div className="manifesto-content"><p className="eyebrow light-eyebrow">ENGINEERED WITH INTENTION</p><h2>Every detail<br/>has a <em>purpose.</em></h2><p>Intelligent technology. Considered materials. A quieter kind of confidence.</p><button className="button button-light" onClick={() => navigate('philosophy')}>The Aurev Motors approach <ArrowRight size={16}/></button></div>
    </section>
    <section className="experience-strip section-shell">
      <div className="experience-copy"><p className="eyebrow">FEEL IT FOR YOURSELF</p><h2>Some things are<br/>better <em>experienced.</em></h2><p>Take the long way home. Hear the quiet. Feel the response. Your first drive is on us.</p><button className="button button-dark" onClick={onBook}>Reserve your test drive <ArrowUpRight size={16}/></button></div>
      <div className="experience-image"><img src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=85" alt="Car parked beside a scenic road"/><div className="image-caption"><span>01</span><span>YOUR ROAD. YOUR RULES.</span></div></div>
    </section>
  </>;
}

function Collection({ onDetails, onConfigure }) {
  const [category, setCategory] = useState('All models');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    let list = cars.filter(c => (category === 'All models' || c.category === category) && `${c.name} ${c.type}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-low') list = [...list].sort((a,b) => a.price-b.price);
    if (sort === 'price-high') list = [...list].sort((a,b) => b.price-a.price);
    return list;
  }, [category, sort, search]);
  return <main className="inner-page section-shell">
    <div className="page-intro"><p className="eyebrow">THE Aurev Motors COLLECTION</p><h1>Find your <em>drive.</em></h1><p>Distinct personalities. One unmistakable point of view.</p></div>
    <div className="catalog-toolbar"><div className="filter-pills">{['All models','SUV','Sedan','Crossover','Performance'].map(item => <button key={item} className={category === item ? 'filter-pill selected' : 'filter-pill'} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="catalog-controls"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search models..." aria-label="Search models"/><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort models"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div></div>
    <p className="results-count">{filtered.length} MODELS TO EXPLORE</p>
    {filtered.length ? <div className="car-grid">{filtered.map(car => <CarCard key={car.id} car={car} onDetails={onDetails} onConfigure={onConfigure}/>)}</div> : <div className="empty-state"><h3>No models found</h3><p>Try another search or category.</p><button className="button button-dark" onClick={() => {setCategory('All models');setSearch('');}}>Clear filters</button></div>}
  </main>;
}

function CarDetails({ car, onBack, onConfigure, onBook }) {
  return <main className="details-page">
    <div className="details-top section-shell"><button className="back-link" onClick={onBack}><ArrowLeft size={16}/> Back to collection</button><span className="eyebrow">{car.type.toUpperCase()}</span></div>
    <section className="details-hero"><img src={car.image} alt={car.name}/><div className="details-hero-overlay"></div><div className="details-title"><p className="eyebrow light-eyebrow">{car.badge}</p><h1>{car.name}<span>.</span></h1><p>{car.description}</p><div className="details-price">{car.priceLabel}<small> onwards</small></div><div className="details-buttons"><button className="button button-light" onClick={() => onConfigure(car)}>Configure yours <ArrowRight size={16}/></button><button className="button button-outline-light" onClick={() => onBook(car)}>Book a test drive</button></div></div></section>
    <section className="spec-overview section-shell"><div className="spec-overview-heading"><p className="eyebrow">THE NUMBERS, AT A GLANCE</p><h2>Performance meets <em>purpose.</em></h2></div><div className="spec-big-grid"><div><Zap/><strong>{car.range}</strong><span>Estimated range</span></div><div><Gauge/><strong>{car.acceleration}</strong><span>0–100 km/h</span></div><div><Sparkles/><strong>{car.power}</strong><span>Peak power</span></div><div><ShieldCheck/><strong>{car.seats}</strong><span>Room for life</span></div></div></section>
    <section className="details-bottom section-shell"><div><p className="eyebrow">MAKE IT YOURS</p><h2>Your story.<br/><em>Your specification.</em></h2></div><div><p>Choose a colour, explore the details, and build a Aurev Motors that feels like it was made just for you.</p><button className="button button-dark" onClick={() => onConfigure(car)}>Start configuring <ArrowUpRight size={16}/></button></div></section>
    <div><EmiCalculator price={car.price} /></div>
  </main>;
}

function Configurator({ car, onBack, onBook }) {
  const [color, setColor] = useState(car.colors[0]);
  const [trim, setTrim] = useState('Premium');
  const [wheels, setWheels] = useState('20-inch Aero');
  const [interior, setInterior] = useState('Charcoal');
  const [showSummary, setShowSummary] = useState(false);
  const trimCost = trim === 'Premium' ? 0 : trim === 'Performance' ? 250000 : 150000;
  const wheelCost = wheels === '21-inch Sport' ? 85000 : 0;
  const interiorCost = interior === 'Warm Sand' ? 45000 : 0;
  const total = car.price + trimCost + wheelCost + interiorCost;
  const format = amount => '₹' + amount.toLocaleString('en-IN');
  return <main className="configurator-page">
    <div className="config-header section-shell"><button className="back-link" onClick={onBack}><ArrowLeft size={16}/> Back to {car.name}</button><div><p className="eyebrow">Aurev Motors STUDIO</p><h1>Make it <em>yours.</em></h1></div><span className="config-step">01 — CONFIGURE</span></div>
    <div className="config-layout">
      <div className="config-preview"><img src={car.image} alt={`${car.name} configuration preview`} /><div className="preview-gradient"></div><div className="preview-label"><span>{car.name.toUpperCase()}</span><span>{color.name.toUpperCase()}</span></div><div className="color-chip-large" style={{background: color.hex}}></div></div>
      <div className="config-options">
        <div className="config-option"><div className="option-heading"><div><p className="eyebrow">01 / EXTERIOR</p><h3>Choose your colour</h3></div><span>{color.name}</span></div><div className="swatches">{car.colors.map(c => <button key={c.name} title={c.name} aria-label={c.name} className={`swatch ${color.name === c.name ? 'swatch-active' : ''}`} style={{background:c.hex}} onClick={() => setColor(c)}>{color.name === c.name && <Check size={17} color={['#e9e9e5','#c6c8ca','#c6c6c2','#e7e5df'].includes(c.hex)?'#151515':'#fff'}/>}</button>)}</div><p className="option-caption">Premium multi-layer finish included</p></div>
        <div className="config-option"><div className="option-heading"><div><p className="eyebrow">02 / PERFORMANCE</p><h3>Select your trim</h3></div></div><div className="choice-list">{[['Premium','Included','Everyday refinement'],['Long Range','+ ₹1,50,000','More distance, fewer stops'],['Performance','+ ₹2,50,000','Sharper response and control']].map(([name,cost,desc]) => <button key={name} className={`choice-card ${trim === name ? 'choice-active' : ''}`} onClick={() => setTrim(name)}><span className="choice-radio">{trim === name && <span/>}</span><span className="choice-main"><strong>{name}</strong><small>{desc}</small></span><span className="choice-cost">{cost}</span></button>)}</div></div>
        <div className="config-option compact-option"><div className="option-heading"><div><p className="eyebrow">03 / WHEELS</p><h3>Set your stance</h3></div></div><div className="select-wrap"><select value={wheels} onChange={e => setWheels(e.target.value)}><option>20-inch Aero</option><option>21-inch Sport</option></select><ChevronDown size={16}/></div></div>
        <div className="config-option compact-option"><div className="option-heading"><div><p className="eyebrow">04 / INTERIOR</p><h3>Choose your cabin</h3></div></div><div className="interior-options">{['Charcoal','Warm Sand'].map(i => <button key={i} className={`interior-choice ${interior === i ? 'interior-active' : ''}`} onClick={() => setInterior(i)}><span className={`interior-swatch ${i === 'Charcoal' ? 'charcoal' : 'sand'}`}/>{i}{i === 'Warm Sand' && <small>+ ₹45,000</small>}</button>)}</div></div>
        <div className="config-total"><div><span>Estimated starting price</span><strong>{format(total)}</strong><small>Ex-showroom estimate · taxes and registration may vary</small></div><button className="button button-dark" onClick={() => setShowSummary(!showSummary)}>{showSummary ? 'Hide summary' : 'Review build'} <ArrowRight size={16}/></button></div>
        {showSummary && <div className="build-summary"><h3>Your {car.name}</h3><p>{color.name} exterior · {trim} trim · {wheels} wheels · {interior} interior</p><div><span>Estimated total</span><strong>{format(total)}</strong></div><button className="button button-dark" onClick={() => onBook(car)}>Book a test drive <ArrowUpRight size={16}/></button></div>}
      </div>
    </div>
  </main>;
}

function Philosophy({ onBook, navigate }) {
  return <main className="philosophy-page">
    <section className="philosophy-hero"><img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=85" alt="Automotive design detail"/><div className="details-hero-overlay"></div><div><p className="eyebrow light-eyebrow">THE Aurev Motors POINT OF VIEW</p><h1>Progress, with<br/><em>purpose.</em></h1><p>We don't build cars to fill roads. We build them to make every journey matter.</p></div></section>
    <section className="philosophy-values section-shell"><div className="values-heading"><p className="eyebrow">WHAT MOVES US</p><h2>Thoughtful by<br/><em>design.</em></h2></div><div className="values-list"><article><span>01</span><div><h3>Less, but better.</h3><p>Every element earns its place. Clear interfaces, considered materials, and intuitive technology create a calmer relationship with your car.</p></div></article><article><span>02</span><div><h3>Performance with purpose.</h3><p>Power should feel natural, not complicated. Our engineering aims to make every response immediate, balanced, and effortless.</p></div></article><article><span>03</span><div><h3>Made around you.</h3><p>Your time, your comfort, your way of moving. The best technology is the kind that quietly makes life better.</p></div></article></div></section>
    <section className="philosophy-cta"><p className="eyebrow light-eyebrow">THE ROAD IS YOURS</p><h2>Ready to feel the <em>difference?</em></h2><button className="button button-light" onClick={onBook}>Experience Aurev Motors <ArrowRight size={16}/></button></section>
  </main>;
}

function Visit({ onBook }) {
  return <main className="inner-page section-shell visit-page"><div className="page-intro"><p className="eyebrow">COME SAY HELLO</p><h1>Meet us <em>in person.</em></h1><p>Great conversations start with a great first drive.</p></div><div className="visit-layout"><div className="visit-photo"><img src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=85" alt="Aurev Motors showroom experience"/></div><div className="visit-info"><p className="eyebrow">BENGALURU EXPERIENCE CENTRE</p><h2>Take your time.<br/><em>Find your drive.</em></h2><p>Explore the collection, speak with a product specialist, and discover which Aurev Motors fits your everyday.</p><div className="visit-detail"><span>ADDRESS</span><strong>Indiranagar, Bengaluru, Karnataka</strong><small>Concept location for this demo website</small></div><div className="visit-detail"><span>HOURS</span><strong>Mon – Sun · 10:00 AM – 7:00 PM</strong></div><button className="button button-dark" onClick={onBook}>Plan your visit <ArrowUpRight size={16}/></button></div></div></main>;
}

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(cars[0]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingCar, setBookingCar] = useState(cars[0]);
  const navigate = next => { setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const details = car => { setSelectedCar(car); navigate('details'); };
  const configure = car => { setSelectedCar(car); navigate('configurator'); };
  const book = car => { if (car) setBookingCar(car); setBookingOpen(true); };
  return <div className="app-shell">
    <Header page={page} navigate={navigate} onBook={() => book(selectedCar || cars[0])}/>
    {page === 'home' && <Home navigate={navigate} onBook={() => book(cars[0])} onDetails={details} onConfigure={configure}/>}
    {page === 'collection' && <Collection onDetails={details} onConfigure={configure}/>}
    {page === 'details' && <CarDetails car={selectedCar} onBack={() => navigate('collection')} onConfigure={configure} onBook={book}/>}
    {page === 'configurator' && <Configurator car={selectedCar} onBack={() => navigate('details')} onBook={book}/>}
    {page === 'philosophy' && <Philosophy onBook={() => book(selectedCar)} navigate={navigate}/>}
    {page === 'visit' && <Visit onBook={() => book(selectedCar)}/>}
    <Footer navigate={navigate} onBook={() => book(selectedCar)}/>
    {bookingOpen && <BookingModal car={bookingCar} onClose={() => setBookingOpen(false)}/>}
  </div>;
}
