import { supabaseServer } from '../../../lib/supabaseServer';
// lightweight calibration: set b = inverse_logit( proportion_correct ) centered
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  // fetch questions and responses
  const qs = await supabaseServer.from('questions').select('*');
  const results = [];
  for(const q of qs.data || []){
    const items = await supabaseServer.from('assessment_items').select('score_obtained').eq('question_id', q.id);
    const correct = (items.data || []).filter(x=>x.score_obtained>0).length;
    const total = (items.data || []).length || 1;
    const p = correct/total;
    // avoid extremes
    const p_adj = Math.max(0.01, Math.min(0.99, p));
    // simple inverse logit to get b (assuming theta mean ~0, a ~1): b = -log((1-p)/p)
    const b_new = -Math.log((1-p_adj)/p_adj);
    await supabaseServer.from('questions').update({ b: b_new }).eq('id', q.id);
    results.push({ id: q.id, old_b: q.b, new_b: b_new, p });
  }
  return res.json({ ok:true, updates: results });
}
