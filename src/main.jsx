import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Gift, Heart, Sparkles, Users, CalendarCheck, BarChart3, QrCode, Wand2, Play, ArrowRight, ShieldCheck, MessageCircle, CreditCard, LayoutDashboard } from 'lucide-react';
import './styles.css';

const assets = {
  image1: '/momentcraft-mvp/assets/image1.png',
  image2: '/momentcraft-mvp/assets/image2.png',
  image3: '/momentcraft-mvp/assets/image3.png',
  image4: '/momentcraft-mvp/assets/image4.png',
  image5: '/momentcraft-mvp/assets/image5.png',
  video1: '/momentcraft-mvp/assets/video1.mp4'
};

const navItems = ['Home', 'Experience', 'Builder', 'Dashboard', 'Gifts', 'RSVP', 'Guestbook', 'Analytics', 'Pricing'];

function App() {
  const [page, setPage] = useState('Home');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="app">
      <div className="cursor-glow" style={{ left: cursor.x, top: cursor.y }} />
      <Particles />
      <Header page={page} setPage={setPage} />
      <main>
        {page === 'Home' && <Home setPage={setPage} />}
        {page === 'Experience' && <Experience />}
        {page === 'Builder' && <Builder />}
        {page === 'Dashboard' && <Dashboard />}
        {page === 'Gifts' && <Gifts />}
        {page === 'RSVP' && <RSVP />}
        {page === 'Guestbook' && <Guestbook />}
        {page === 'Analytics' && <Analytics />}
        {page === 'Pricing' && <Pricing />}
      </main>
    </div>
  );
}

function Header({ page, setPage }) {
  return (
    <header className="topbar glass">
      <div className="brand" onClick={() => setPage('Home')}>
        <span className="brand-icon"><Heart size={18} fill="currentColor" /></span>
        <span>MomentCraft</span>
      </div>
      <nav>
        {navItems.map((item) => (
          <button key={item} onClick={() => setPage(item)} className={page === item ? 'active' : ''}>{item}</button>
        ))}
      </nav>
    </header>
  );
}

function Home({ setPage }) {
  return (
    <section className="hero page-section">
      <div className="hero-copy">
        <div className="pill"><Sparkles size={15}/> Interactive celebration platform</div>
        <h1>Create unforgettable digital moments for weddings, birthdays, proposals and anniversaries.</h1>
        <p>Frontend-only MVP with cinematic guest experience, builder interface, dashboard placeholders, gifts, RSVP, guestbook, analytics and pricing screens.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => setPage('Experience')}><Play size={18}/> Launch Demo Experience</button>
          <button className="secondary" onClick={() => setPage('Builder')}><Wand2 size={18}/> Open Builder</button>
        </div>
      </div>
      <div className="hero-card glass">
        <img src={assets.image1} alt="Couple memory" />
        <div className="overlay-card glass">
          <p>Someone has prepared something special just for you...</p>
        </div>
      </div>
    </section>
  );
}

const memories = [
  { image: assets.image1, title: 'The first spark', question: 'What made this love feel different?', options: ['The laughter', 'The peace', 'The friendship', 'All of the above and more'] },
  { image: assets.image2, title: 'Favourite little things', question: 'What is your favourite thing about both of you?', input: true },
  { image: assets.image3, title: 'The journey', question: 'Which word best describes this journey?', options: ['Beautiful', 'Unexpected', 'Graceful', 'All of the above and more'] },
  { image: assets.image4, title: 'The promise', question: 'Complete this: Forever means...', input: true },
  { image: assets.image5, title: 'The final memory', question: 'Ready for the surprise?', options: ['Yes, show me', 'Absolutely', 'I am ready', 'All of the above and more'] }
];

function Experience() {
  const [step, setStep] = useState(-1);
  const [answer, setAnswer] = useState('');
  const [typedMemory, setTypedMemory] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) { setShowFinal(true); return; }
    const t = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  if (showFinal) return <FinalReveal typedMemory={typedMemory} />;

  if (countdown !== null) {
    return <section className="full-screen cinematic"><h2>The final reveal begins in...</h2><div className="countdown">{countdown}</div></section>;
  }

  if (step === -1) {
    return (
      <section className="full-screen loading-screen">
        <div className="glass intro-box">
          <Heart size={46} fill="currentColor" />
          <h1>Someone has prepared something special just for you...</h1>
          <p>Take a breath. This is not a slideshow. Every click unlocks a memory.</p>
          <button className="primary" onClick={() => setStep(0)}>Begin the experience</button>
        </div>
      </section>
    );
  }

  const memory = memories[step];
  const isLast = step === memories.length - 1;

  return (
    <section className="experience-wrap page-section">
      <div className="memory-visual glass"><img src={memory.image} alt={memory.title}/></div>
      <div className="memory-panel glass">
        <span className="chapter">Chapter {step + 1}</span>
        <h2>{memory.title}</h2>
        <p className="typewriter">{memory.question}</p>
        {memory.input ? (
          <div className="input-row">
            <input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer here..." />
            <button className="primary" onClick={() => { setTypedMemory(answer || 'this beautiful love'); setAnswer(''); step < memories.length - 1 ? setStep(step + 1) : setCountdown(5); }}>Enter</button>
          </div>
        ) : (
          <div className="option-grid">
            {memory.options.map((opt) => <button key={opt} className="option" onClick={() => isLast ? setCountdown(5) : setStep(step + 1)}>{opt}</button>)}
          </div>
        )}
        <div className="reveal-note">No wrong answers. This experience is built to celebrate, not test.</div>
      </div>
    </section>
  );
}

function FinalReveal({ typedMemory }) {
  return (
    <section className="final-reveal">
      <video src={assets.video1} autoPlay controls playsInline className="final-video" />
      <div className="final-message glass">
        <h1>Forever begins here.</h1>
        <p>Every laugh, every quiet moment, every ordinary day became part of something extraordinary.</p>
        <p>And when you said <strong>“{typedMemory}”</strong>, it became another line in this story.</p>
        <p className="signature">With love, always.</p>
      </div>
    </section>
  );
}

function Builder() {
  const steps = ['Event Type', 'Names', 'Media Upload', 'Story Prompts', 'Questions', 'Theme', 'Music', 'Preview', 'Publish'];
  return <Shell title="Experience Builder" subtitle="UI-only builder prepared for future database and AI integration."><div className="grid three">{steps.map((s, i) => <Card key={s} icon={<Wand2/>} title={`${i+1}. ${s}`} text="Demo interface. Full automation comes in Version 1." />)}</div></Shell>;
}
function Dashboard() { return <Shell title="Dashboards" subtitle="Customer, planner and admin interfaces."><div className="grid three"><Card icon={<LayoutDashboard/>} title="Customer Dashboard" text="My experiences, drafts, published links, media library."/><Card icon={<Users/>} title="Planner Dashboard" text="Clients, templates, white-label settings, reports."/><Card icon={<ShieldCheck/>} title="Admin Dashboard" text="Users, experiences, templates, revenue, reviews."/></div></Shell>; }
function Gifts() { return <Shell title="Gift Centre" subtitle="UI-only for now. Payments and Paystack integration come later."><div className="grid four"><Card icon={<Gift/>} title="Buy Flowers" text="Disabled demo button."/><Card icon={<CreditCard/>} title="Send Money" text="Escrow interface placeholder."/><Card icon={<Gift/>} title="Sponsor Honeymoon" text="UI only."/><Card icon={<Gift/>} title="Gift Registry" text="UI only."/></div></Shell>; }
function RSVP() { return <Shell title="RSVP & QR" subtitle="Invitation, QR sharing and guest confirmation UI."><div className="grid two"><Card icon={<QrCode/>} title="QR Code Page" text="Static demo QR placeholder."/><Card icon={<CalendarCheck/>} title="RSVP Form" text="Guest names and attendance UI only."/></div></Shell>; }
function Guestbook() { return <Shell title="Digital Guestbook" subtitle="Messages, wishes, photos and voice notes later."><div className="guestbook"><p>“May your home be filled with laughter, peace and abundance.”</p><p>“This love story is beautiful. Congratulations.”</p><p>“The best is still ahead.”</p></div></Shell>; }
function Analytics() { return <Shell title="Analytics" subtitle="Placeholder cards for Version 1 engagement metrics."><div className="grid four"><Stat label="Views" value="1,248"/><Stat label="Guest Messages" value="86"/><Stat label="Completion" value="78%"/><Stat label="Gift Clicks" value="42"/></div></Shell>; }
function Pricing() { return <Shell title="Pricing" subtitle="Commercial packages for validation."><div className="grid three"><Price name="Basic" price="₦10k" items={['Template experience','Static link','QR code']}/><Price name="Premium" price="₦50k" items={['Cinematic flow','Video reveal','Guestbook UI']}/><Price name="Luxury" price="₦150k+" items={['Planner support','Reception mode','Custom story']}/></div></Shell>; }

function Shell({ title, subtitle, children }) { return <section className="page-section"><div className="section-head"><h1>{title}</h1><p>{subtitle}</p></div>{children}</section>; }
function Card({ icon, title, text }) { return <div className="card glass"><div className="card-icon">{icon}</div><h3>{title}</h3><p>{text}</p><button className="ghost">Demo only <ArrowRight size={14}/></button></div>; }
function Stat({ label, value }) { return <div className="stat glass"><BarChart3/><strong>{value}</strong><span>{label}</span></div>; }
function Price({ name, price, items }) { return <div className="price glass"><h3>{name}</h3><strong>{price}</strong>{items.map((i) => <p key={i}>✓ {i}</p>)}<button className="primary">Select package</button></div>; }
function Particles() { return <div className="particles">{Array.from({length: 24}).map((_, i) => <span key={i} style={{ '--i': i }} />)}</div>; }

createRoot(document.getElementById('root')).render(<App />);
