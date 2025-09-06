/**
 * Calibration helper for IRT (simple proportion-based initial b estimate).
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env.
 */
const { createClient } = require('@supabase/supabase-js');
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL||'').replace(/\/$/,'');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key){ console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }
const supabase = createClient(url, key);
(async ()=>{
  const { data: qs } = await supabase.from('questions').select('*');
  const updates = [];
  for(const q of qs || []){
    const { data: items } = await supabase.from('assessment_items').select('score_obtained').eq('question_id', q.id);
    const correct = (items || []).filter(i=>i.score_obtained>0).length;
    const total = (items || []).length || 1;
    let p = correct/total;
    p = Math.max(0.01, Math.min(0.99, p));
    const b_new = -Math.log((1-p)/p);
    await supabase.from('questions').update({ b: b_new }).eq('id', q.id);
    updates.push({ id: q.id, p, b_new });
  }
  console.log('Calibrated', updates.length, 'questions');
  process.exit(0);
})();
