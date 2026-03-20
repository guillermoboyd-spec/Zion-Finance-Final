"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  LayoutDashboard, Wallet, TrendingUp, User as UserIcon,
  LogOut, Plus, X, ShieldCheck, ChevronRight,
  Target, Zap, Activity, Globe, Eye, EyeOff, Lock, Trophy, Trash2, Languages,
  QrCode, Cpu, CreditCard, ArrowUpRight, ArrowDownRight, Sun, Moon, Download,
  Fingerprint, Newspaper, CheckCircle2, RefreshCw
} from "lucide-react";

// --- DICCIONARIO DE IDIOMAS ---
const TRANSLATIONS = {
  EN: { access: "ACCESS", centralHub: "HUB", assetsVault: "VAULT", strategicOps: "STRATEGY", news: "NEWS", profileId: "PASSPORT", totalValue: "TOTAL ASSETS", goal: "GOAL", projection: "PROJECTION", calibration: "SETTINGS", currentAge: "CURRENT AGE", targetAge: "RETIRE AGE", allocation: "MONTHLY SAVING", mainTarget: "TARGET", yield: "YIELD", infl: "INFLATION", trajectory: "WEALTH PATH", appendCapital: "ADD ASSET", secureAsset: "COMMIT", healthScore: "HEALTH", reset: "RESET NODE" },
  ES: { access: "ACCEDER", centralHub: "PANEL", assetsVault: "BÓVEDA", strategicOps: "ESTRATEGIA", news: "NOTICIAS", profileId: "PASAPORTE", totalValue: "ACTIVOS TOTALES", goal: "META", projection: "PROYECCIÓN", calibration: "AJUSTES", currentAge: "EDAD ACTUAL", targetAge: "EDAD RETIRO", allocation: "AHORRO MENSUAL", mainTarget: "META FINAL", yield: "RENDIMIENTO", infl: "INFLACIÓN", trajectory: "TRAYECTORIA", appendCapital: "AÑADIR ACTIVO", secureAsset: "GUARDAR", healthScore: "SALUD", reset: "REINICIAR" }
};

const ASSET_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#1e40af"];

// --- COMPONENTES PEQUEÑOS ---
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

const UniversalInput = ({ label, value, onChange, isMoney, unit, isText }) => (
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
  
  // Variables de cálculo
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
  const goalProgress = useMemo(() => Math.min((totalVault / financialGoal) * 100, 100), [totalVault, financialGoal]);

  // --- EL MOTOR DE LAS MATEMÁTICAS ---
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
        <Fingerprint size={80} className="animate-pulse" style={{ color: '#2563eb', marginBottom: '2rem' }} />
        <button onClick={() => setShowApp(true)} style={{ background: '#2563eb', color: '#fff', padding: '1rem 4rem', borderRadius: '50px', border: 'none', fontWeight: 900, cursor: 'pointer' }}>
          {t.access}
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
        
        {/* MENU LATERAL */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem', color: '#2563eb' }}>ZION.NODE</h1>
          <button onClick={() => setActiveTab('dashboard')} style={{ background: activeTab === 'dashboard' ? '#2563eb' : 'transparent', border: 'none', color: '#fff', padding: '15px', borderRadius: '12px', textAlign: 'left', fontWeight: 800, cursor: 'pointer' }}>{t.centralHub}</button>
          <button onClick={() => setActiveTab('vault')} style={{ background: activeTab === 'vault' ? '#2563eb' : 'transparent', border: 'none', color: '#fff', padding: '15px', borderRadius: '12px', textAlign: 'left', fontWeight: 800, cursor: 'pointer' }}>{t.assetsVault}</button>
          <button onClick={() => setActiveTab('strategy')} style={{ background: activeTab === 'strategy' ? '#2563eb' : 'transparent', border: 'none', color: '#fff', padding: '15px', borderRadius: '12px', textAlign: 'left', fontWeight: 800, cursor: 'pointer' }}>{t.strategicOps}</button>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
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
              <div style={{ background: '#111', padding: '2rem', borderRadius: '30px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontWeight: 900 }}>{t.appendCapital}</h3>
                <UniversalInput label="NOMBRE" value={newName} onChange={setNewName} isText />
                <UniversalInput label="VALOR ($)" value={newValue} onChange={setNewValue} />
                <button 
                  onClick={() => {
                    if (newName && newValue > 0) {
                      setAssets([...assets, { id: Date.now(), name: newName.toUpperCase(), value: newValue, color: ASSET_COLORS[assets.length % ASSET_COLORS.length] }]);
                      setNewName(""); setNewValue(0);
                    }
                  }}
                  style={{ background: '#2563eb', color: '#fff', padding: '1rem', border: 'none', borderRadius: '12px', fontWeight: 900, cursor: 'pointer' }}
                >
                  {t.secureAsset}
                </button>
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
              <div style={{ background: '#111', padding: '2rem', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>¡ESTRATEGIA LISTA!</h2>
              <p style={{ opacity: 0.6, maxWidth: '500px', margin: '1rem auto' }}>
                Según tus datos, lograrás tu meta de <b>${financialGoal.toLocaleString()}</b> antes de los <b>{retirementAge} años</b>.
              </p>
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
<div className="content">
            <div style={{ padding: '3rem 4rem' }}>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                  <p style={{ opacity: 0.5, fontWeight: 800 }}>{t.totalValue}</p>
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 950 }}>${totalVault.toLocaleString()}</h2>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['EN', 'ES'].map(l => (
                    <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? '#2563eb' : '#222', border: 'none', color: '#fff', padding: '5px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 800 }}>{l}</button>
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
                  <div className="card-sovereign" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3 style={{ fontWeight: 900 }}>{t.appendCapital}</h3>
                    <UniversalInput label="NOMBRE" value={newName} onChange={setNewName} isText />
                    <UniversalInput label="VALOR ($)" value={newValue} onChange={setNewValue} />
                    <button className="btn-gold" onClick={() => {
                        if (newName && newValue > 0) {
                          setAssets([...assets, { id: Date.now(), name: newName.toUpperCase(), value: newValue, color: ASSET_COLORS[assets.length % ASSET_COLORS.length] }]);
                          setNewName(""); setNewValue(0);
                        }
                      }}>
                      {t.secureAsset}
                    </button>
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
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <Trophy size={80} color="#2563eb" style={{ marginBottom: '1rem' }} />
                  <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>ESTRATEGIA Zion</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '3rem', textAlign: 'left' }}>
                    <UniversalInput label={t.currentAge} value={currentAge} onChange={setCurrentAge} />
                    <UniversalInput label={t.targetAge} value={retirementAge} onChange={setRetirementAge} />
                    <UniversalInput label={t.allocation} value={monthlyContribution} onChange={setMonthlyContribution} />
                    <UniversalInput label="META FINAL ($)" value={financialGoal} onChange={setFinancialGoal} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
