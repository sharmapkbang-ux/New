/**
 * Seed demo auth users. Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env.
 */
const fetch = require('node-fetch');
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL||'').replace(/\/$/,'');
const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url || !adminKey){ console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }
const users = [
  { email:'learner@demo.com', password:'Demo123!', role:'learner' },
  { email:'coach@demo.com', password:'Demo123!', role:'coach' },
  { email:'provider@demo.com', password:'Demo123!', role:'provider' },
  { email:'hiring@demo.com', password:'Demo123!', role:'hiring' },
  { email:'evaluator@demo.com', password:'Demo123!', role:'evaluator' },
  { email:'manager@demo.com', password:'Demo123!', role:'manager' },
  { email:'admin@demo.com', password:'Demo123!', role:'admin' }
];
(async ()=>{
  for(const u of users){
    console.log('Creating', u.email);
    const r = await fetch(`${url}/auth/v1/admin/users`, { method:'POST', headers:{ 'Content-Type':'application/json', 'apikey': adminKey, 'Authorization': 'Bearer ' + adminKey }, body: JSON.stringify({ email: u.email, password: u.password, email_confirm: true }) });
    const j = await r.json();
    if(!j.id){ console.error('Failed to create user', j); continue; }
    await fetch(`${url}/rest/v1/profiles`, { method:'POST', headers:{ 'Content-Type':'application/json', 'apikey': adminKey, 'Authorization': 'Bearer ' + adminKey }, body: JSON.stringify({ auth_id: j.id, full_name: u.email.split('@')[0], email: u.email, actor_type: u.role, role_key: 'data_analyst', goal_clarity_score: 60 }) });
    console.log('Seeded profile for', u.email);
  }
  console.log('Auth seeding complete.');
})();
