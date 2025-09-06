'use client';
import { useEffect, useState } from 'react';
export default function AdTimer({seconds=60, onDone}:{seconds?:number, onDone:()=>void}){
  const [t,setT]=useState(seconds); useEffect(()=>{ if(t<=0){ onDone(); return; } const id=setTimeout(()=>setT(t-1),1000); return ()=>clearTimeout(id); },[t]); return (<div style={{padding:20,textAlign:'center'}}><div style={{fontSize:18}}>Ad ends in {t}s</div><div style={{marginTop:12}}>Ad placeholder</div><div style={{marginTop:12}}><button onClick={onDone}>Skip / Continue</button></div></div>);
}
