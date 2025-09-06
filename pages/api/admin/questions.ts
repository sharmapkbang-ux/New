import { supabaseServer } from '../../../lib/supabaseServer';
export default async function handler(req, res){
  if(req.method === 'GET'){
    const qs = await supabaseServer.from('questions').select('*').limit(500);
    return res.json({ questions: qs.data || [] });
  } else if(req.method === 'POST'){
    const q = req.body;
    if(q.id){
      await supabaseServer.from('questions').update({ prompt_template: q.prompt_template, a: q.a, b: q.b, c: q.c }).eq('id', q.id);
      return res.json({ ok:true });
    } else {
      const ins = await supabaseServer.from('questions').insert([{ skill_name: q.skill_name, prompt_template: q.prompt_template, a: q.a || 1, b: q.b || 0, c: q.c || 0.25 }]);
      return res.json({ ok:true, id: ins.data?.[0]?.id });
    }
  }
  res.status(405).end();
}
