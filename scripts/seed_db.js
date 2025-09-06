/**
 * Seed database with roles, courses, questions, coaches, demo assessments.
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env.
 */
const { createClient } = require('@supabase/supabase-js');
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL||'').replace(/\/$/,'');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key){ console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }
const supabase = createClient(url, key);
(async ()=>{
  const roles = [
    "product_manager","data_analyst","software_engineer","ux_designer","devops_engineer",
    "qa_engineer","sales_representative","marketing_manager","hr_manager","finance_analyst",
    "customer_success","project_manager","business_analyst","machine_learning_engineer","security_engineer",
    "cloud_architect","graphic_designer","content_writer","recruiter","operations_manager",
    "it_support","data_engineer","mobile_developer","network_engineer","legal_counsel"
  ];
  for(const r of roles){
    await supabase.from('roles').insert([{ key: r, label: r.replace('_',' ').toUpperCase() }]).catch(()=>{});
    // seed 3 courses per role
    for(let i=1;i<=3;i++){
      await supabase.from('courses').insert([{ role_key: r, title: `${r.replace('_',' ')} Course ${i}`, provider: 'DemoProvider', link: `https://example.com/${r}-course-${i}`, duration_text: '4 weeks', price_text: 'Free', mode: 'self-paced', type: 'certificate', tags: [r.split('_')[0]] }]).catch(()=>{});
    }
    // ai tutor
    await supabase.from('courses').insert([{ role_key: r, title: 'CareerPath AI Tutor', provider: 'LNS', link: '/ai-tutor', duration_text: 'Adaptive', price_text: '₹999/month', is_ai_path: true, tags: ['ai'] }]).catch(()=>{});
  }
  // seed coaches
  await supabase.from('coaches').insert([{ name:'Jane Coach', expertise: ['Communication','Interviewing'], booking_url:'https://calendly.com/jane_demo', bio:'Interview coach' }]).catch(()=>{});
  await supabase.from('coaches').insert([{ name:'Mark Mentor', expertise: ['SQL','Data Analysis'], booking_url:'https://calendly.com/mark_demo', bio:'Data mentor' }]).catch(()=>{});
  // seed questions (sample skills)
  const sample_skills = ['SQL','Communication','Problem Solving','System Design','A/B Testing','Python'];
  for(const s of sample_skills){
    for(let i=0;i<5;i++){
      const a = (Math.random()*0.8 + 0.8).toFixed(2);
      const b = (Math.random()*2 - 1).toFixed(2);
      const c = (Math.random()*0.15 + 0.1).toFixed(2);
      const prompt = `${s} sample question ${i+1}`;
      const q = await supabase.from('questions').insert([{ skill_name: s, prompt_template: prompt, a: parseFloat(a), b: parseFloat(b), c: parseFloat(c) }]).select().maybeSingle();
      const qid = q.data?.id;
      if(qid){
        await supabase.from('question_options').insert([{ question_id: qid, option_text: 'Correct', score_value: 1.0 }, { question_id: qid, option_text: 'Distractor', score_value: 0.0 }]).catch(()=>{});
      }
    }
  }
  console.log('DB seeding complete.');
  process.exit(0);
})();
