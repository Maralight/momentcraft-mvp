import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Gift, Heart, Sparkles, CalendarDays, Users, BarChart3, QrCode, Settings, ShieldCheck, Wand2, PlayCircle, BookOpen, CreditCard, MessageCircle, PartyPopper, LayoutDashboard } from 'lucide-react';
import './styles.css';

const ASSETS = {
  image1: './assets/image1.png',
  image2: './assets/image2.png',
  image3: './assets/image3.png',
  image4: './assets/image4.png',
  image5: './assets/image5.png',
  video1: './assets/video1.mp4',
};

const nav = [
  ['home', 'Home'], ['builder', 'Builder'], ['experience', 'Guest Experience'], ['dashboard', 'Customer'], ['planner', 'Planner'], ['admin', 'Admin'], ['pricing', 'Pricing']
];

const featureCards = [
  ['AI Experience Builder', 'UI-only MVP', 'Questionnaire, memory prompts, media slots, and generated story preview.'],
  ['Digital Gifts', 'Dummy UI', 'Gift, honeymoon, flowers, cash gift, and escrow flow placeholders.'],
  ['RSVP + Guestbook', 'Local demo', 'Collect wishes visually in the demo session without backend storage.'],
  ['Audience Mode', 'UI-only MVP', 'QR code, live poll mockup, reactions, word cloud placeholder.'],
  ['Planner Portal', 'UI-only MVP', 'Client list, white-label settings, templates, reports.'],
  ['Admin Portal', 'UI-only MVP', 'Users, experiences, themes, payments, and system controls.'],
];

function CursorFX(){
  useEffect(()=>{
    const trail=[];
    const move=(e)=>{
      const dot=document.createElement('div');
      dot.className='heart-trail';
      dot.style.left=e.clientX+'px'; dot.style.top=e.clientY+'px';
      dot.textContent='♥'; document.body.appendChild(dot); trail.push(dot);
      setTimeout(()=>{dot.remove();},900);
    };
    window.addEventListener('pointermove', move);
    return()=>window.removeEventListener('pointermove', move);
  },[]);
  return null;
}

function Particles(){
  const petals = useMemo(()=>Array.from({length:24},(_,i)=>({id:i,left:Math.random()*100,delay:Math.random()*8,dur:8+Math.random()*8})),[]);
  const gold = useMemo(()=>Array.from({length:45},(_,i)=>({id:i,left:Math.random()*100,top:Math.random()*100,delay:Math.random()*5})),[]);
  return <><div className="petals">{petals.map(p=><span key={p.id} style={{left:p.left+'%',animationDelay:p.delay+'s',animationDuration:p.dur+'s'}}>❦</span>)}</div><div className="gold-dust">{gold.map(g=><i key={g.id} style={{left:g.left+'%',top:g.top+'%',animationDelay:g.delay+'s'}} />)}</div></>;
}

function Shell(){
  const [page,setPage]=useState('home');
  return <div className="app"><CursorFX/><Particles/><header className="topbar"><div className="brand"><span className="brandmark"><Heart size={18}/></span><b>MomentCraft</b><small>Interactive Celebration Platform</small></div><nav>{nav.map(([id,label])=><button key={id} onClick={()=>setPage(id)} className={page===id?'active':''}>{label}</button>)}</nav></header><main>{page==='home'&&<Home setPage={setPage}/>} {page==='builder'&&<Builder/>} {page==='experience'&&<Experience/>} {page==='dashboard'&&<Customer/>} {page==='planner'&&<Planner/>} {page==='admin'&&<Admin/>} {page==='pricing'&&<Pricing/>}</main></div>
}

function Home({setPage}){return <section className="hero"><div className="hero-copy glass"><p className="eyebrow">Emotion-as-a-Service MVP</p><h1>Create cinematic, interactive moments for weddings, proposals, birthdays and life events.</h1><p>Frontend-only verified MVP with dummy interfaces for payments, RSVPs, dashboards, QR flows, analytics, planner tools, and a full cinematic guest experience.</p><div className="hero-actions"><button className="primary" onClick={()=>setPage('builder')}><Wand2/> Create Experience</button><button className="secondary" onClick={()=>setPage('experience')}><PlayCircle/> View Guest Experience</button></div></div><div className="hero-preview glass"><div className="phone"><img src={ASSETS.image1} onError={e=>e.currentTarget.style.display='none'} /><div className="phone-fallback">Add<br/>image1.png</div><h3>Someone has prepared something special just for you...</h3></div></div><div className="grid cards">{featureCards.map(([title,badge,desc])=><div className="card glass" key={title}><span>{badge}</span><h3>{title}</h3><p>{desc}</p></div>)}</div></section>}

function Builder(){const steps=['Event Type','People','Media','Story','Questions','Theme','Gifts','Publish']; return <section className="page"><h1>Experience Builder</h1><p className="sub">No database yet. This MVP simulates the full Version 1 workflow.</p><div className="builder-layout"><aside className="glass side">{steps.map((s,i)=><div className="step" key={s}><b>{i+1}</b>{s}</div>)}</aside><div className="glass panel"><h2>Wedding Surprise Setup</h2><div className="form-grid"><label>Bride name<input defaultValue="Chioma" /></label><label>Groom name<input defaultValue="Emeka" /></label><label>Event type<select defaultValue="Wedding"><option>Wedding</option><option>Proposal</option><option>Birthday</option><option>Anniversary</option></select></label><label>Theme<select defaultValue="Luxury Gold"><option>Luxury Gold</option><option>Romantic Garden</option><option>Modern Black</option><option>Traditional Nigerian</option></select></label></div><h3>Media Checklist</h3><div className="asset-list"><code>public/assets/image1.png</code><code>public/assets/image2.png</code><code>public/assets/image3.png</code><code>public/assets/image4.png</code><code>public/assets/image5.png</code><code>public/assets/video1.mp4</code></div><h3>Feature Toggles</h3><div className="toggles">{['Background music','Petals','Golden particles','Heart cursor','Confetti','Countdown','Gift UI','RSVP UI','Guestbook UI','QR Code'].map(x=><label key={x}><input type="checkbox" defaultChecked/> {x}</label>)}</div><button className="primary">Generate Preview — Demo</button></div></div></section>}

const chapters=[
  {q:'Which moment made this love story feel real?', a:['The first date','The first serious conversation','The proposal','All of the above and more'], img:ASSETS.image1, msg:'Every love story has a beginning. Yours became unforgettable because it kept choosing joy.'},
  {q:'What should today remind you of?', a:['Laughter','Friendship','Patience','All of the above and more'], img:ASSETS.image2, msg:'A marriage is not one big moment. It is thousands of small choices made with love.'},
  {q:'Type one thing you love about this couple.', input:true, img:ASSETS.image3, msg:'That word belongs in their story forever.'},
  {q:'What should their home always be filled with?', a:['Peace','Prayer','Money','All of the above and more'], img:ASSETS.image4, msg:'May this home be full of peace, laughter, wisdom and abundance.'},
  {q:'Final unlock: what begins today?', a:['A family','A promise','A forever story','All of the above and more'], img:ASSETS.image5, msg:'Today is not the end of the story. It is the first page of forever.'}
];

function Experience(){const [loading,setLoading]=useState(true); const [idx,setIdx]=useState(0); const [revealed,setRevealed]=useState(false); const [typed,setTyped]=useState(''); const [final,setFinal]=useState(false); const [count,setCount]=useState(null); const videoRef=useRef(null); useEffect(()=>{const t=setTimeout(()=>setLoading(false),1800); return()=>clearTimeout(t)},[]); useEffect(()=>{if(count===null)return; if(count===0){setFinal(true); setCount(null); setTimeout(()=>videoRef.current?.play?.(),500); return;} const t=setTimeout(()=>setCount(count-1),1000); return()=>clearTimeout(t)},[count]); if(loading)return <section className="loading"><div><Sparkles/><h1>Someone has prepared something special just for you...</h1><p>Loading memories, music, petals and magic.</p></div></section>; const ch=chapters[idx]; if(final)return <section className="final-video"><video ref={videoRef} src={ASSETS.video1} controls autoPlay playsInline/><div className="final-copy glass"><h1>Forever begins now.</h1><p>This is your story: built from laughter, patience, memories and the quiet decision to choose each other every day.</p><button className="primary" onClick={()=>setFinal(false)}>Replay Experience</button></div><Confetti/></section>; return <section className="experience"><div className="glass story-card"><p className="eyebrow">Chapter {idx+1} of 5</p><h1>{ch.q}</h1>{ch.input?<div className="text-answer"><textarea placeholder="Type your answer here..." value={typed} onChange={e=>setTyped(e.target.value)} /><button className="primary" onClick={()=>{setRevealed(true); navigator.vibrate?.(30)}}>Enter Memory</button></div>:<div className="answers">{ch.a.map(ans=><button key={ans} onClick={()=>{setRevealed(true); navigator.vibrate?.(30)}}>{ans}</button>)}</div>}{revealed&&<div className="reveal"><img src={ch.img}/><p className="typewriter">{ch.input && typed ? `You said: “${typed}.” ${ch.msg}` : ch.msg}</p>{idx<chapters.length-1?<button className="primary" onClick={()=>{setIdx(idx+1);setRevealed(false);setTyped('')}}>Continue</button>:<button className="primary" onClick={()=>setCount(5)}>Begin Final Reveal</button>}</div>}{count!==null&&<div className="countdown">{count}</div>}</div><GuestTools/></section>}

function GuestTools(){return <div className="guest-tools glass"><h3>Guest Interaction</h3><button><QrCode/> QR Join</button><button><MessageCircle/> Guestbook</button><button><Gift/> Send Gift — Demo</button><button><PartyPopper/> Reactions</button></div>}
function Confetti(){return <div className="confetti">{Array.from({length:50},(_,i)=><span key={i} style={{left:Math.random()*100+'%',animationDelay:Math.random()*2+'s'}} />)}</div>}
function Customer(){return <Dashboard title="Customer Dashboard" items={[['My Experiences',BookOpen],['Create New',Wand2],['Guestbook',MessageCircle],['Gifts',Gift],['RSVP',CalendarDays],['Analytics',BarChart3],['Settings',Settings]]}/>}
function Planner(){return <Dashboard title="Planner Portal" items={[['Clients',Users],['Templates',Sparkles],['White-label Branding',ShieldCheck],['Reports',BarChart3],['Subscriptions',CreditCard],['Team',Users]]}/>}
function Admin(){return <Dashboard title="Admin Console" items={[['Users',Users],['Experiences',LayoutDashboard],['Themes',Sparkles],['Payments',CreditCard],['Analytics',BarChart3],['System Settings',Settings]]}/>}
function Dashboard({title,items}){return <section className="page"><h1>{title}</h1><p className="sub">Frontend-only dashboard. Data is sample/demo pending Version 1 database.</p><div className="dash-grid">{items.map(([name,Icon])=><div className="glass dash" key={name}><Icon/><h3>{name}</h3><p>Status: UI placeholder. Ready for backend connection in Version 1.</p></div>)}</div><div className="glass chart"><h2>Mock Analytics</h2><div className="bars"><i style={{height:'70%'}}/><i style={{height:'45%'}}/><i style={{height:'82%'}}/><i style={{height:'60%'}}/><i style={{height:'92%'}}/></div></div></section>}
function Pricing(){return <section className="page"><h1>Pricing Model</h1><div className="pricing"><div className="glass plan"><h2>Basic</h2><b>₦10,000</b><p>Simple experience, link and QR.</p></div><div className="glass plan featured"><h2>Premium</h2><b>₦50,000</b><p>Cinematic experience, video reveal, guestbook, gift UI.</p></div><div className="glass plan"><h2>Planner</h2><b>₦50,000/mo</b><p>White-label planner dashboard and reusable templates.</p></div></div></section>}

createRoot(document.getElementById('root')).render(<Shell/>);
