'use client';
import { useEffect, useState } from 'react';
import Gauge from '../../components/Gauge';
import BarChart from '../../components/BarChart';
export default function Results({searchParams}:{searchParams:any}){
  const aid = searchParams.assessmentId; const [data,setData]=useState<any>(null);
  useEffect(()=>{ if(!aid) return; (async ()=>{ const r=await fetch('/api/assessment/results?assessmentId='+aid); const j=await r.json(); setData(j); })(); },[aid]);
  if(!data) return <div className="card">Loading...</div>;
  return (<div className="card"><h2>Results</h2><div style={{display:'flex',gap:20}}><Gauge value={data.overall||0} /><div style={{flex:1}}><h4>Skills</h4><BarChart data={data.breakdown} /><h4>Recommendations</h4>{data.recommendations?.courses.map((c:any,i:number)=>(<div key={i} style={{border:'1px solid #e6eef5',padding:8,marginTop:8}}><div><strong>{c.title}</strong> - {c.provider}</div><div><a href={c.affiliate_url} target='_blank'>Open provider</a></div></div>))}</div></div></div>);
}
