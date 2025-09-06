import './globals.css';
export const metadata = { title: 'LNS Final LAN Complete' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{fontFamily:'Inter, system-ui', background:'#f8fafc'}}>
        <div style={{maxWidth:1200,margin:'24px auto',padding:16}}>
          <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><strong>LNS — Final LAN</strong></div>
            <nav><a href="/">Home</a> | <a href="/goal">Goal</a> | <a href="/onboarding">Onboard</a> | <a href="/dashboard">Dashboard</a> | <a href="/admin">Admin</a></nav>
          </header>
          <main style={{marginTop:20}}>{children}</main>
        </div>
      </body>
    </html>
  );
}
