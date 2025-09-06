'use client';
export default function Gauge({value}:{value:number}){
  const size=140; const angle=Math.round((value/100)*180);
  return (<div style={{width:size}}><svg width={size} height={size/2} viewBox={`0 0 ${size} ${size/2}`}><path d={`M10 ${size/2-10} A ${size/2-10} ${size/2-10} 0 0 1 ${size-10} ${size/2-10}`} fill="none" stroke="#e6eef5" strokeWidth="16"/><path d={`M10 ${size/2-10} A ${size/2-10} ${size/2-10} 0 0 1 ${10 + (size-20)*(angle/180)} ${size/2-10}`} fill="none" stroke="#06b6d4" strokeWidth="16" strokeLinecap="round"/></svg><div style={{textAlign:'center',marginTop:-8}}><strong>{value}</strong><div style={{fontSize:12}}>Readiness</div></div></div>);
}
