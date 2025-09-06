export function irtProbability(theta:number,a:number,b:number,c:number){
  const exp = Math.exp(-a*(theta-b));
  return c + (1-c)/(1+exp);
}
export function fisherInformation(theta:number,a:number,b:number,c:number){
  const P = irtProbability(theta,a,b,c);
  const Q = 1-P;
  if(P<=0||Q<=0) return 0;
  const num = a*a * ( (P - c)*(1 - P) );
  const den = (1 - c)**2 * P * (1 - P);
  if(!den) return 0;
  return num/den;
}
export function updateThetaMLE(prior:number,responses:any[]){
  let theta=prior;
  for(let iter=0;iter<20;iter++){
    let L1=0,L2=0;
    for(const r of responses){
      const P=irtProbability(theta,r.a,r.b,r.c);
      const u=r.correct||0;
      const d1 = r.a * (u - P) / (P*(1-P));
      const d2 = - r.a * r.a * ( (u - P)*(1 - 2*P) ) / (P*P*(1-P)*(1-P));
      if(isFinite(d1)) L1 += d1;
      if(isFinite(d2)) L2 += d2;
    }
    if(Math.abs(L1) < 1e-4) break;
    if(L2===0) break;
    theta = theta - L1 / L2;
    if(!isFinite(theta)) break;
  }
  return theta;
}
export function thetaToScore(theta:number){
  const scaled = 50 + theta*12.5;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}
