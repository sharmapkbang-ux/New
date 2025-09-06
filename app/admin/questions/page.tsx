'use client';
import { useEffect, useState } from 'react';
export default function QuestionsAdmin(){
  const [questions,setQuestions] = useState<any[]>([]);
  useEffect(()=>{ (async ()=>{ const r=await fetch('/api/admin/questions'); const j=await r.json(); setQuestions(j.questions||[]); })(); },[]);
  async function save(q:any){ await fetch('/api/admin/questions',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify(q)}); alert('Saved'); }
  async function calibrate(){ const r = await fetch('/api/admin/calibrate',{method:'POST'}); const j = await r.json(); alert('Calibration: ' + JSON.stringify(j)); }
  return (<div className="card"><h2>Questions Admin</h2><div><button onClick={calibrate}>Run Calibration</button></div><div style={{marginTop:12}}>{questions.map((q,i)=>(<div key={i} style={{border:'1px solid #e6eef5',padding:8,marginTop:8}}><div><b>{q.skill_name}</b></div><div><textarea value={q.prompt_template} onChange={e=>q.prompt_template=e.target.value} style={{width:'100%'}} /></div><div style={{display:'flex',gap:8,marginTop:8}}><input value={q.a} onChange={e=>q.a=e.target.value} style={{width:80}} /><input value={q.b} onChange={e=>q.b=e.target.value} style={{width:80}} /><input value={q.c} onChange={e=>q.c=e.target.value} style={{width:80}} /><button onClick={()=>save(q)}>Save</button></div></div>))}</div></div>);
}
