'use client';
import { useEffect, useState } from 'react';
export default function Flow({searchParams}:{searchParams:any}){
  const aid = searchParams.aid; const [item,setItem]=useState<any>(null);
  useEffect(()=>{ if(!aid) return; (async ()=>{ const r=await fetch('/api/assessment/next?assessmentId='+aid); const j=await r.json(); if(j.finished){ window.location.href = '/ad-break?assessmentId='+aid; } else setItem(j.nextItem); })(); },[aid]);
  async function submit(resp:any){ await fetch('/api/assessment/next',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({ assessmentId: aid, response: resp, questionId: item.questionId })}); const r = await fetch('/api/assessment/next?assessmentId='+aid); const j = await r.json(); if(j.finished){ window.location.href = '/ad-break?assessmentId='+aid; } else setItem(j.nextItem); }
  if(!item) return <div className="card">Loading...</div>;
  return (<div className="card"><h3>{item.prompt}</h3>{item.options? item.options.map((o:any,i:number)=>(<div key={i}><button onClick={()=>submit({option:o.id})}>{o.text}</button></div>)) : <div><button onClick={()=>submit({text:'answer'})}>Submit</button></div>}</div>);
}
