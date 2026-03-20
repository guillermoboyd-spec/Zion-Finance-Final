"use client";

import React, { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  LayoutDashboard, Wallet, TrendingUp, ShieldCheck, 
  Target, Trophy, Trash2, Fingerprint
} from "lucide-react";

// --- DICCIONARIO ---
const TRANSLATIONS = {
  EN: { access: "ACCESS", centralHub: "HUB", assetsVault: "VAULT", strategicOps: "STRATEGY", totalValue: "TOTAL ASSETS", goal: "GOAL", projection: "PROJECTION", currentAge: "CURRENT AGE", targetAge: "RETIRE AGE", allocation: "MONTHLY SAVING", trajectory: "WEALTH PATH", appendCapital: "ADD ASSET", secureAsset: "COMMIT", healthScore: "HEALTH" },
  ES: { access: "ACCEDER", centralHub: "PANEL", assetsVault: "BÓVEDA", strategicOps: "ESTRATEGIA", totalValue: "ACTIVOS TOTALES", goal: "META", projection: "PROYECCIÓN", currentAge: "EDAD ACTUAL", targetAge: "EDAD RETIRO", allocation: "AHORRO MENSUAL", trajectory: "TRAYECTORIA", appendCapital: "AÑADIR ACTIVO", secureAsset: "GUARDAR", healthScore: "SALUD" }
};

const ASSET_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#1e40af"];

// --- COMPONENTES ---
const KPIpro = ({ label, value, sub, icon, progress }) => (
  <div style={{ background: 'rgba(37,99,235,0.05)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 900, opacity: 0.6 }}>{label}</span>
      {icon}
    </div>
    <div style={{ fontSize: '2.5rem', fontWeight: 950 }}>{value}</div>
    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>{sub}</div>
    {progress !== undefined && (
      <div style={{ height: '6px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#2563eb' }} />
      </div>
    )}
  </div>
);

const UniversalInput = ({ label, value, onChange, isText }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <label style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.6 }}>{label}</label>
    <input 
      type={isText ? "text" : "number"}
      value={value} 
      onChange={(e) => onChange(isText ? e.target.value : parseFloat(e.target.value) || 0)}
      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', color: '#fff', fontWeight: 800 }}
    />
  </div>
);

export default function ZionDiamond() {
  const [showApp, setShowApp] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [lang, setLang] = useState("ES");
  const [assets, setAssets] = useState([
    { id: 1, name: "AHORROS", value: 50000, color: "#2563eb" },
    { id: 2, name: "INVERSIONES", value: 100000, color: "#3b82f6" }
  ]);
  
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [yieldRate, setYieldRate] = useState(7);
  const [inflationRate, setInflationRate] = useState(3);
  const [financialGoal, setFinancialGoal] = useState(500000);
  
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState(0);

  const t = TRANSLATIONS[lang];
  const totalVault = useMemo(() => assets.reduce((acc, curr) => acc + curr.value, 0), [assets]);
  const goalProgress = useMemo(() => Math.min((totalVault / (financialGoal || 1)) * 100, 100), [totalVault, financialGoal]);

  const { projection, finalBalance } = useMemo(() => {
    let balance = totalVault;
    const steps = [];
    const realRate = (yieldRate - inflationRate) / 100 / 12;
    for (let age = currentAge; age <= 85; age++) {
      steps.push({ age, balance: Math.round(balance) });
      for (let month = 0; month < 12; month++) {
        if (age < retirementAge) balance = (balance + monthlyContribution) * (1 + (realRate > 0 ? realRate : 0));
        else balance = balance * (1 + (realRate > 0 ? realRate : 0)) - (balance * 0.04) / 12;
      }
    }
    return { projection: steps, finalBalance: balance };
  }, [currentAge, retirementAge, monthlyContribution, yieldRate, inflationRate, totalVault]);

  if (!showApp) {
    return (
      <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <Fingerprint size={80} style={{ color: '#2563eb', marginBottom: '2rem' }} />
        <button onClick={() => setShowApp(true)} style={{ background: '#2563eb', color: '#fff', padding: '1rem 4rem', borderRadius: '50px', border: 'none', fontWeight: 900, cursor: 'pointer' }}>
          {t.access}
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', fontFamily: 'sans-serif', padding: '20px' }}>
      <style>{`
        .nav-btn { background: transparent; color: #aaa; border: none; padding: 1rem; border-radius: 12px; text-align: left; cursor: pointer; font-weight: 800; display: flex; align-items: center; gap: 10px; width: 100%; }
        .nav-btn.active { background: #2563eb; color: #fff; }
        .card-sovereign { background: #111; border: 1px solid #222; border-radius: 30px; padding: 2.5rem; }
        .btn-gold { background: #2563eb; color: #fff; padding: 1.5rem; border-radius: 16px; font-weight: 950; border: none; cursor: pointer; width: 100%; margin-top: 1rem; }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem', color: '#2563eb' }}>ZION.NODE</h1>
          <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={20}/> {t.centralHub}</button>
          <button className={`nav-btn ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}><Wallet size={20}/> {t.assetsVault}</button>
          <button className={`nav-btn ${activeTab === 'strategy' ? 'active' : ''}`} onClick={() => setActiveTab('strategy')}><TrendingUp size={20}/> {t.strategicOps}</button>
        </aside>

        <main>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <p style={{ opacity: 0.5, fontWeight: 800 }}>{t.totalValue}</p>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 950 }}>${totalVault.toLocaleString()}</h2>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['EN', 'ES'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? '#2563eb' : '#222', border: 'none', color: '#fff', padding: '5px 15px', borderRadius: '8px', cursor: 'pointer' }}>{l}</button>
              ))}
            </div>
          </header>

          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <KPIpro label={t.goal} value={`${goalProgress.toFixed(1)}%`} progress={goalProgress} icon={<Target color="#2563eb" />} />
                <KPIpro label={t.projection} value={`$${Math.round(finalBalance/1000)}k`} sub={`Edad: ${retirementAge}`} icon={<TrendingUp color="#2563eb" />} />
                <KPIpro label={t.healthScore} value="98" sub="SISTEMA ACTIVO" icon={<ShieldCheck color="#22c55e" />} />
              </div>
              <div style={{ background: '#111', padding: '2rem', borderRadius: '30px', height: '400px' }}>
                <h3 style={{ marginBottom: '2rem', fontWeight: 900 }}>{t.trajectory}</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={projection}>
                    <XAxis dataKey="age" stroke="#444" />
                    <Tooltip contentStyle={{ background: '#000', border: 'none', borderRadius: '10px' }} />
                    <Area type="monotone" dataKey="balance" stroke="#2563eb" fill="rgba(37,99,235,0.2)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'vault' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div className="card-sovereign">
                <h3 style={{ fontWeight: 900, marginBottom: '1.5rem' }}>{t.appendCapital}</h3>
                <UniversalInput label="NOMBRE" value={newName} onChange={setNewName} isText />
                <UniversalInput label="VALOR ($)" value={newValue} onChange={setNewValue} />
                <button className="btn-gold" onClick={() => {
                  if (newName && newValue > 0) {
                    setAssets([...assets, { id: Date.now(), name: newName.toUpperCase(), value: newValue, color: ASSET_COLORS[assets.length % ASSET_COLORS.length] }]);
                    setNewName(""); setNewValue(0);
                  }
                }}>{t.secureAsset}</button>
                <div style={{ marginTop: '2rem' }}>
                  {assets.map(a => (
                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #222' }}>
                      <span style={{ fontWeight: 800 }}>{a.name}</span>
                      <div>
                        <span style={{ marginRight: '15px' }}>${a.value.toLocaleString()}</span>
                        <Trash2 size={18} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => setAssets(assets.filter(x => x.id !== a.id))} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-sovereign" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={assets} innerRadius={80} outerRadius={120} dataKey="value" paddingAngle={5}>
                      {assets.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'strategy' && (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <Trophy size={100} color="#2563eb" style={{ marginBottom: '2rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>ESTRATEGIA Zion</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '3rem', textAlign: 'left' }}>
                <UniversalInput label={t.currentAge} value={currentAge} onChange={setCurrentAge} />
                <UniversalInput label={t.targetAge} value={retirementAge} onChange={setRetirementAge} />
                <UniversalInput label={t.allocation} value={monthlyContribution} onChange={setMonthlyContribution} />
                <UniversalInput label="META FINAL ($)" value={financialGoal} onChange={setFinancialGoal} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
