'use client';
export default function BarChart({data}:{data:Record<string,number>}){
  const entries = Object.entries(data); const max = Math.max(...entries.map(e=>e[1]),1);
  return (<div style={{display:'flex',flexDirection:'column',gap:8}}>{entries.map(([k,v])=>(<div key={k} style={{display:'flex',alignItems:'center'}}><div style={{width:140}}>{k}</div><div style={{flex:1,background:'#e6eef5',height:12,borderRadius:6,overflow:'hidden'}}><div style={{width:`${(v/max)*100}%`,height:'100%',background:'#06b6d4'}} /></div><div style={{width:40,textAlign:'right'}}>{v}</div></div>))}</div>);
}
