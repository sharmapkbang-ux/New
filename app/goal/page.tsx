'use client';
import { useState } from 'react';
export default function GoalPage(){
  const [q,setQ]=useState('Become a product manager in 1 year, budget 50000');
  return (<div className="card"><h2>Goal Search</h2><input value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%'}} /><div style={{marginTop:8}}><button onClick={async ()=>{ const r=await fetch('/api/parse-goal',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({q})}); const j=await r.json(); alert(JSON.stringify(j.parsed)); }}>Parse</button></div></div>);
}
