'use client';
import { useState } from 'react';
export default function Onboard(){
  const [role,setRole]=useState('product_manager');
  async function start(){ const r = await fetch('/api/onboard',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({role})}); const j=await r.json(); if(j.clarity) alert('Goal created. Clarity: '+j.clarity); window.location.href='/assessment/start?role='+encodeURIComponent(role); }
  return (<div className="card"><h2>Onboarding</h2><label>Role (required)</label><input value={role} onChange={e=>setRole(e.target.value)} /><div style={{marginTop:12}}><button onClick={start}>Start</button></div></div>);
}
