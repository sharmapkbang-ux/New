'use client';
import { useRouter } from 'next/navigation';
import AdTimer from '../../components/AdTimer';
export default function AdBreak({searchParams}:{searchParams:any}){
  const aid = searchParams.assessmentId;
  const router = useRouter();
  function done(){ router.push('/results?assessmentId='+aid); }
  return (<div className="card"><h3>Advertisement</h3><div style={{border:'1px dashed #94a3b8',padding:12}}>Ad placeholder</div><AdTimer seconds={60} onDone={done} /></div>);
}
