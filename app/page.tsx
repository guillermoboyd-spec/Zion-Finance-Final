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
  Fingerprint, Newspaper, DollarSign, Euro, PoundSterling, Landmark, CheckCircle2,
  RefreshCw
} from "lucide-react";

/**
 * ZION OMNIVERSE v17.0 - GOLD MASTER STORE EDITION
 * Final optimization for Microsoft Store distribution.
 */

type Language = "EN" | "ES" | "JP" | "ZH" | "FR" | "DE" | "AR" | "IT";
type Currency = "USD" | "EUR" | "GBP" | "JPY" | "SAR";

const TRANSLATIONS: Record<Language, any> = {
  EN: {
    access: "ACCESS", centralHub: "CENTRAL HUB", assetsVault: "VAULT", strategicOps: "STRATEGY", profileId: "PASSPORT", privacyControl: "PRIVACY", disconnect: "DISCONNECT", totalValue: "TOTAL NET ASSETS", goal: "GOAL", projection: "PROJECTION", cashflow: "CASHFLOW", calibration: "NODE CONFIGURATION", currentAge: "CURRENT AGE", targetAge: "TARGET AGE", allocation: "MONTHLY SAVING", mainTarget: "FINANCIAL GOAL", yield: "YIELD", infl: "INFLATION", trajectory: "WEALTH TRAJECTORY", appendCapital: "DEPLOY CAPITAL", assetLabel: "ASSET LABEL", valuationUsd: "VALUE", secureAsset: "COMMIT", targetMsg: "Protocol predicts financial sovereignty at age", withCapital: "with a total reserve of", yielding: "yielding a perpetual monthly stream of", legacyReport: "STRATEGIC INSIGHT", entityCal: "IDENTITY VERIFICATION", nodeMaster: "HOLDER NAME", nodeActive: "ZION SOVEREIGN IDENTITY ACTIVE", legal: "LEGAL & COMPLIANCE", disclaimer: "DISCLAIMER", privacy: "PRIVACY POLICY", support: "TECHNICAL SUPPORT", privacyMsg: "Zion Protocol ensures 100% data sovereignty. All calculations are local and encrypted.", disclaimerMsg: "Zion is a projection tool. Financial markets involve risk. No financial advice provided.", supportMsg: "Contact: support@zionfinance.io", securedBy: "SECURED BY ZION PROTOCOL", deleteSuccess: "Asset removed", healthScore: "PORTFOLIO HEALTH", marketLive: "LIVE MARKET DATA", serial: "SERIAL NO.", expiry: "SECURE UNTIL", news: "NEWS FEED", export: "EXPORT PDF", scan: "BIOMETRIC SCANNING...", auth: "IDENTITY AUTHORIZED", reset: "RESET NODE",
  },
  ES: {
    access: "ACCEDER", centralHub: "PANEL CENTRAL", assetsVault: "BÓVEDA", strategicOps: "ESTRATEGIA", profileId: "PASAPORTE", privacyControl: "PRIVACIDAD", disconnect: "DESCONECTAR", totalValue: "ACTIVOS NETOS TOTALES", goal: "META", projection: "PROYECCIÓN", cashflow: "FLUJO CAJA", calibration: "CONFIGURACIÓN NODO", currentAge: "EDAD ACTUAL", targetAge: "EDAD RETIRO", allocation: "AHORRO MENSUAL", mainTarget: "META FINANCIERA", yield: "RENDIMIENTO", infl: "INFLACIÓN", trajectory: "TRAYECTORIA CAPITAL", appendCapital: "ANEXAR CAPITAL", assetLabel: "ETIQUETA ACTIVO", valuationUsd: "VALUACIÓN", secureAsset: "ASEGURAR", targetMsg: "El protocolo predice soberanía financiera a los", withCapital: "con una reserva total de", yielding: "generando un flujo mensual vitalicio de", legacyReport: "ANÁLISIS ESTRATÉGICO", entityCal: "VERIFICACIÓN DE IDENTIDAD", nodeMaster: "NOMBRE TITULAR", nodeActive: "IDENTIDAD SOBERANA ZION ACTIVA", legal: "LEGAL Y CUMPLIMIENTO", disclaimer: "AVISO LEGAL", privacy: "POLÍTICA DE PRIVACIDAD", support: "SOPORTE TÉCNICO", privacyMsg: "El Protocolo Zion garantiza soberanía total de datos. Todos los cálculos son locales y encriptados.", disclaimerMsg: "Zion es una herramienta de proyección. Los mercados financieros implican riesgo. No es asesoría financiera.", supportMsg: "Contacto: support@zionfinance.io", securedBy: "PROTEGIDO POR PROTOCOLO ZION", deleteSuccess: "Activo eliminado", healthScore: "SALUD DE PORTAFOLIO", marketLive: "MERCADOS EN VIVO", serial: "SERIE NO.", expiry: "SEGURO HASTA", news: "NOTICIAS", export: "EXPORTAR PDF", scan: "ESCANEANDO BIOMETRÍA...", auth: "IDENTIDAD AUTORIZADA", reset: "REINICIAR NODO",
  },
  JP: { access: "アクセス", centralHub: "ハブ", assetsVault: "金庫", strategicOps: "戦略", news: "ニュース", profileId: "パスポート", totalValue: "総資産", currentAge: "年齢", targetAge: "目標" },
  ZH: { access: "进入", centralHub: "枢纽", assetsVault: "保险库", strategicOps: "战略", news: "全球情报", profileId: "护照", totalValue: "总净资产", currentAge: "年龄", targetAge: "目标" },
  FR: { access: "ACCÉDER", centralHub: "CENTRE", assetsVault: "COFFRE", strategicOps: "STRATÉGIE", news: "NOUVELLES", profileId: "PASSEPORT", totalValue: "TOTAL", currentAge: "ÂGE", targetAge: "CIBLE" },
  DE: { access: "ZUGANG", centralHub: "ZENTRALE", assetsVault: "TRESOR", strategicOps: "STRATEGIE", news: "NEWS", profileId: "PASS", totalValue: "WERT", currentAge: "ALTER", targetAge: "ZIELALTER" },
  AR: { access: "الدخول", centralHub: "المركز", assetsVault: "الخزنة", strategicOps: "استراتيجية", news: "أخبار", profileId: "جواز", totalValue: "إجمالي", currentAge: "العمر", targetAge: "الهدف" },
  IT: { access: "ACCEDI", centralHub: "HUB", assetsVault: "CAVEAU", strategicOps: "STRATEGIA", news: "NOTIZIE", profileId: "PASSA PORTO", totalValue: "TOTALE", currentAge: "ETÀ", targetAge: "TARGET" },
};

const NEWS_FEED = [
  { id: 1, title: "Federal Reserve hints at interest rate stability through Q4.", time: "2m ago" },
  { id: 2, title: "Gold hits all-time high amid global liquidity expansion.", time: "15m ago" },
  { id: 3, title: "Bitcoin institutional adoption reaches new milestones.", time: "44m ago" },
  { id: 4, title: "Zion Protocol v17.0 Gold Master deployment successful.", time: "1h ago" }
];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", SAR: "﷼"
};

const ASSET_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#1e40af", "#1d4ed8"];

// --- AUXILIARY COMPONENTS ---
function KPIpro({ label, value, sub, icon, progress }: any) {
  return (
    <div className="card-sovereign" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
          <p style={{ fontSize: '2.4rem', fontWeight: 950, margin: '0.4rem 0' }}>{value}</p>
          <p style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 900 }}>{sub}</p>
        </div>
        <div style={{ padding: '1rem', background: 'rgba(37,99,235,0.1)', borderRadius: '20px', color: '#2563eb' }}>{icon}</div>
      </div>
      {progress !== undefined && (
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '1rem', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#2563eb', width: `${progress}%`, transition: '1s ease-out' }} />
        </div>
      )}
    </div>
  );
}

function UniversalInput({ label, value, onChange, isMoney, isText, unit, currencySymbol }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <label style={{ fontSize: '0.75rem', fontWeight: 950, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {isMoney && <span style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 950, color: '#2563eb' }}>{currencySymbol}</span>}
        <input
          type={isText ? "text" : "number"}
          className="input-sovereign"
          value={value}
          onChange={(e) => onChange(isText ? e.target.value : parseFloat(e.target.value) || 0)}
          style={{ paddingLeft: isMoney ? '2.5rem' : '1.3rem' }}
        />
        {unit && <span style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 950, color: '#4b5563' }}>{unit}</span>}
      </div>
    </div>
  );
}

export default function ZionDiamond() {
  const [isMounted, setIsMounted] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [lang, setLang] = useState<Language>("ES");

  const [prices, setPrices] = useState<any>({
    btc: { usd: 73420, usd_24h_change: 2.4 },
    eth: { usd: 3940, usd_24h_change: 1.8 },
  });

  const defaultAssets = [
    { id: 1, name: "TRUST FUND", value: 450000, color: "#2563eb" },
    { id: 2, name: "ALPHA VENTURES", value: 150000, color: "#3b82f6" },
  ];

  const [userName, setUserName] = useState("GUILLERMO");
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContribution, setMonthlyContribution] = useState(3000);
  const [yieldRate, setYieldRate] = useState(8);
  const [inflationRate, setInflationRate] = useState(3);
  const [financialGoal, setFinancialGoal] = useState(1000000);
  const [assets, setAssets] = useState(defaultAssets);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");

  const t = TRANSLATIONS[lang] || TRANSLATIONS.EN;

  const totalVault = useMemo(() => assets.reduce((acc, curr) => acc + curr.value, 0), [assets]);
  const goalProgress = useMemo(() => Math.min((totalVault / financialGoal) * 100, 100), [totalVault, financialGoal]);
  
  const healthScore = useMemo(() => {
     let score = 50;
     if (goalProgress > 30) score += 20;
     if (assets.length > 2) score += 15;
     return Math.min(score, 100);
  }, [goalProgress, assets]);

  const { projection, finalBalance } = useMemo(() => {
    let balance = totalVault;
    const steps = [];
    const realRate = (yieldRate - inflationRate) / 100 / 12;
    for (let age = currentAge; age <= 95; age++) {
      steps.push({ age, balance: Math.round(balance) });
      for (let month = 0; month < 12; month++) {
        if (age < retirementAge) balance = (balance + monthlyContribution) * (1 + (realRate > 0 ? realRate : 0));
        else balance = balance * (1 + (realRate > 0 ? realRate : 0)) - (balance * 0.04) / 12;
      }
    }
    return { projection: steps, finalBalance: balance };
  }, [currentAge, retirementAge, monthlyContribution, yieldRate, inflationRate, totalVault]);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("zion_diamond_data");
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setUserName(d.userName || "GUILLERMO");
        setAssets(d.assets || defaultAssets);
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("zion_diamond_data", JSON.stringify({ 
        userName, currentAge, retirementAge, monthlyContribution, 
        yieldRate, inflationRate, financialGoal, assets, lang, 
        currency, isDarkMode 
      }));
    }
  }, [userName, currentAge, retirementAge, monthlyContribution, yieldRate, inflationRate, financialGoal, assets, isMounted, lang, currency, isDarkMode]);

  const handleAccess = () => { setIsScanning(true); setTimeout(() => { setIsScanning(false); setShowApp(true); }, 1500); };
  const formatMoney = (val: number) => {
    if (isPrivate) return "••••••";
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${Math.round(val).toLocaleString()}`;
  };

  if (!isMounted) return null;
  const isRTL = lang === 'AR';
  const theme = { bg: isDarkMode ? '#000' : '#f8fafc', window: isDarkMode ? 'rgba(8, 8, 10, 0.98)' : '#fff', text: isDarkMode ? '#fff' : '#0f172a', subText: isDarkMode ? '#4b5563' : '#64748b', aside: isDarkMode ? 'rgba(0,0,0,0.5)' : '#f1f5f9', border: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', card: isDarkMode ? 'rgba(37,99,235,0.03)' : '#fff', input: isDarkMode ? '#0d0d0d' : '#fff' };

  if (!showApp) {
    return (
      <div className="splash">
        <style jsx>{`
          .splash { position: fixed; inset: 0; background: #000; display: flex; align-items: center; justify-content: center; z-index: 9999; }
          .splash-box { display: flex; flex-direction: column; align-items: center; gap: 3rem; animation: fadeIn 0.8s ease-out; width: 100%; max-width: 800px; padding: 2rem; }
          .logo-clicker { width: 380px; max-width: 80vw; cursor: pointer; transition: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; }
          .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: #2563eb; box-shadow: 0 0 20px #2563eb; opacity: 0; }
          .scanning .scan-line { animation: scan 1.5s infinite linear; opacity: 1; }
          .logo-clicker img { width: 100%; border-radius: 60px; box-shadow: 0 40px 100px rgba(0,0,0,0.8); border: 2px solid rgba(255,255,255,0.1); }
          .btn-access { background: #2563eb; color: #fff; padding: 1.5rem 6.5rem; border-radius: 100px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.5em; border: none; cursor: pointer; transition: 0.4s; position: relative; overflow: hidden; }
          @keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
        <div className="splash-box">
          <div className={`logo-clicker ${isScanning ? 'scanning' : ''}`} onClick={handleAccess}>
             <div className="scan-line" />
             <img src="/zion-logo.jpg" alt="ZION" />
          </div>
          <button onClick={handleAccess} className="btn-access">{isScanning ? <Fingerprint className="animate-pulse" /> : t.access}</button>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center'}}>
            {Object.keys(TRANSLATIONS).map(l => (
              <div key={l} onClick={() => setLang(l as Language)} style={{cursor: 'pointer', color: lang === l ? '#2563eb' : '#4b5563', fontWeight: 950}}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="root" style={{direction: isRTL ? 'rtl' : 'ltr', color: theme.text, background: theme.bg}}>
      <style jsx>{`
        .root { min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; }
        .window { width: 100%; max-width: 1750px; height: 95vh; background: ${theme.window}; border: 1px solid ${theme.border}; border-radius: 44px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 100px 200px rgba(0,0,0,0.6); }
        .main-stage { flex: 1; display: flex; overflow: hidden; }
        .aside { width: 320px; background: ${theme.aside}; border-right: 1px solid ${theme.border}; padding: 2.5rem 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .scrollbox { flex: 1; overflow-y: auto; padding: 2rem 3.5rem; }
        .nav-btn { width: 100%; padding: 1.2rem 1.4rem; border-radius: 18px; border: none; background: transparent; color: ${theme.subText}; display: flex; align-items: center; gap: 1.2rem; cursor: pointer; font-weight: 850; }
        .nav-btn.active { background: #2563eb; color: #fff; }
        .card-sovereign { background: ${theme.card}; border: 1px solid ${theme.border}; border-radius: 30px; padding: 2.5rem; }
        .input-sovereign { background: ${theme.input}; border: 1px solid ${theme.border}; padding: 1.3rem; border-radius: 16px; color: ${theme.text}; font-weight: 800; width: 100%; outline: none; }
        .btn-gold { background: #2563eb; color: #fff; padding: 1.5rem; border-radius: 16px; font-weight: 950; border: none; cursor: pointer; text-transform: uppercase; width: 100%; margin-top: 1rem; }
      `}</style>
      <div className="window">
        <div className="main-stage">
          <div className="aside">
            <img src="/zion-logo.jpg" style={{width: '160px', borderRadius: '40px', alignSelf: 'center'}} alt="Logo" />
            <nav style={{display: 'flex', flexDirection: 'column', gap: '0.6rem'}}>
              <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard /> {t.centralHub}</button>
              <button className={`nav-btn ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}><Wallet /> {t.assetsVault}</button>
              <button className={`nav-btn ${activeTab === 'news' ? 'active' : ''}`} onClick={() => setActiveTab('news')}><Newspaper /> {t.news}</button>
              <button className={`nav-btn ${activeTab === 'strategy' ? 'active' : ''}`} onClick={() => setActiveTab('strategy')}><TrendingUp /> {t.strategicOps}</button>
            </nav>
            <div style={{marginTop: 'auto'}} className="card-sovereign">
               <p style={{fontSize: '0.7rem', fontWeight: 950}}>{t.healthScore}</p>
               <span style={{fontSize: '2.8rem', fontWeight: 950, color: '#2563eb'}}>{healthScore}</span>
            </div>
          </div>
          <div className="content">
            <div style={{padding: '3rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <h1 style={{fontSize: '3.5rem', fontWeight: 950}}>NODE.<span style={{color: '#2563eb'}}>ZION</span></h1>
               <div style={{textAlign: 'right'}}>
                  <p style={{fontSize: '0.9rem', color: theme.subText, fontWeight: 950}}>{t.totalValue}</p>
                  <p style={{fontSize: '5.2rem', fontWeight: 950, margin: 0}}>{formatMoney(totalVault)}</p>
               </div>
            </div>
            <div className="scrollbox">
              {activeTab === 'dashboard' && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '2.8rem'}}>
                   <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem'}}>
                      <KPIpro label={t.goal} value={`${goalProgress.toFixed(1)}%`} sub={`${t.mainTarget}: ${formatMoney(financialGoal)}`} icon={<Target size={28} />} progress={goalProgress} />
                      <KPIpro label={t.projection} value={formatMoney(finalBalance)} sub={`${t.targetAge}: ${retirementAge}`} icon={<TrendingUp size={28} />} />
                      <KPIpro label="SECURITY" value="BIT-SHIELD" sub="AES-256" icon={<ShieldCheck size={28} />} />
                   </div>
                   <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.8rem'}}>
                      <div className="card-sovereign" style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                         <h3 style={{fontSize: '1.2rem', fontWeight: 950, color: '#2563eb'}}>{t.calibration}</h3>
                         <UniversalInput label={t.currentAge} value={currentAge} onChange={setCurrentAge} />
                         <UniversalInput label={t.targetAge} value={retirementAge} onChange={setRetirementAge} />
                         <UniversalInput label={t.allocation} value={monthlyContribution} onChange={setMonthlyContribution} isMoney currencySymbol={CURRENCY_SYMBOLS[currency]} />
                         <UniversalInput label={t.mainTarget} value={financialGoal} onChange={setFinancialGoal} isMoney currencySymbol={CURRENCY_SYMBOLS[currency]} />
                      </div>
                      <div className="card-sovereign" style={{height: '400px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={projection}>
                            <XAxis dataKey="age" hide />
                            <Tooltip />
                            <Area type="monotone" dataKey="balance" stroke="#2563eb" fillOpacity={0.1} fill="#2563eb" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                   </div>
                </div>
              )}
              {activeTab === 'vault' && (
                <div className="card-sovereign">
                  <h3 style={{fontSize: '1.5rem', fontWeight: 950, marginBottom: '2rem'}}>{t.assetsVault}</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {assets.map(a => (
                      <div key={a.id} style={{display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '15px'}}>
                        <span style={{fontWeight: 950}}>{a.name}</span>
                        <span style={{fontWeight: 950, color: '#2563eb'}}>{formatMoney(a.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'strategy' && (
                <div style={{textAlign: 'center', padding: '5rem'}}>
                  <Trophy size={80} color="#2563eb" />
                  <h2 style={{fontSize: '2rem', fontWeight: 950, marginTop: '2rem'}}>{t.targetMsg} {retirementAge}</h2>
                  <p style={{fontSize: '1.2rem', opacity: 0.7}}>{t.withCapital} {formatMoney(finalBalance)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}"use client";

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
  Fingerprint, Newspaper, DollarSign, Euro, PoundSterling, Landmark, CheckCircle2,
  RefreshCw
} from "lucide-react";

/**
 * ZION OMNIVERSE v17.0 - GOLD MASTER STORE EDITION
 * Final optimization for Microsoft Store distribution.
 */

type Language = "EN" | "ES" | "JP" | "ZH" | "FR" | "DE" | "AR" | "IT";
type Currency = "USD" | "EUR" | "GBP" | "JPY" | "SAR";

const TRANSLATIONS: Record<Language, any> = {
  EN: {
    access: "ACCESS", centralHub: "CENTRAL HUB", assetsVault: "VAULT", strategicOps: "STRATEGY", profileId: "PASSPORT", privacyControl: "PRIVACY", disconnect: "DISCONNECT", totalValue: "TOTAL NET ASSETS", goal: "GOAL", projection: "PROJECTION", cashflow: "CASHFLOW", calibration: "NODE CONFIGURATION", currentAge: "CURRENT AGE", targetAge: "TARGET AGE", allocation: "MONTHLY SAVING", mainTarget: "FINANCIAL GOAL", yield: "YIELD", infl: "INFLATION", trajectory: "WEALTH TRAJECTORY", appendCapital: "DEPLOY CAPITAL", assetLabel: "ASSET LABEL", valuationUsd: "VALUE", secureAsset: "COMMIT", targetMsg: "Protocol predicts financial sovereignty at age", withCapital: "with a total reserve of", yielding: "yielding a perpetual monthly stream of", legacyReport: "STRATEGIC INSIGHT", entityCal: "IDENTITY VERIFICATION", nodeMaster: "HOLDER NAME", nodeActive: "ZION SOVEREIGN IDENTITY ACTIVE", legal: "LEGAL & COMPLIANCE", disclaimer: "DISCLAIMER", privacy: "PRIVACY POLICY", support: "TECHNICAL SUPPORT", privacyMsg: "Zion Protocol ensures 100% data sovereignty. All calculations are local and encrypted.", disclaimerMsg: "Zion is a projection tool. Financial markets involve risk. No financial advice provided.", supportMsg: "Contact: support@zionfinance.io", securedBy: "SECURED BY ZION PROTOCOL", deleteSuccess: "Asset removed", healthScore: "PORTFOLIO HEALTH", marketLive: "LIVE MARKET DATA", serial: "SERIAL NO.", expiry: "SECURE UNTIL", news: "NEWS FEED", export: "EXPORT PDF", scan: "BIOMETRIC SCANNING...", auth: "IDENTITY AUTHORIZED", reset: "RESET NODE",
  },
  ES: {
    access: "ACCEDER", centralHub: "PANEL CENTRAL", assetsVault: "BÓVEDA", strategicOps: "ESTRATEGIA", profileId: "PASAPORTE", privacyControl: "PRIVACIDAD", disconnect: "DESCONECTAR", totalValue: "ACTIVOS NETOS TOTALES", goal: "META", projection: "PROYECCIÓN", cashflow: "FLUJO CAJA", calibration: "CONFIGURACIÓN NODO", currentAge: "EDAD ACTUAL", targetAge: "EDAD RETIRO", allocation: "AHORRO MENSUAL", mainTarget: "META FINANCIERA", yield: "RENDIMIENTO", infl: "INFLACIÓN", trajectory: "TRAYECTORIA CAPITAL", appendCapital: "ANEXAR CAPITAL", assetLabel: "ETIQUETA ACTIVO", valuationUsd: "VALUACIÓN", secureAsset: "ASEGURAR", targetMsg: "El protocolo predice soberanía financiera a los", withCapital: "con una reserva total de", yielding: "generando un flujo mensual vitalicio de", legacyReport: "ANÁLISIS ESTRATÉGICO", entityCal: "VERIFICACIÓN DE IDENTIDAD", nodeMaster: "NOMBRE TITULAR", nodeActive: "IDENTIDAD SOBERANA ZION ACTIVA", legal: "LEGAL Y CUMPLIMIENTO", disclaimer: "AVISO LEGAL", privacy: "POLÍTICA DE PRIVACIDAD", support: "SOPORTE TÉCNICO", privacyMsg: "El Protocolo Zion garantiza soberanía total de datos. Todos los cálculos son locales y encriptados.", disclaimerMsg: "Zion es una herramienta de proyección. Los mercados financieros implican riesgo. No es asesoría financiera.", supportMsg: "Contacto: support@zionfinance.io", securedBy: "PROTEGIDO POR PROTOCOLO ZION", deleteSuccess: "Activo eliminado", healthScore: "SALUD DE PORTAFOLIO", marketLive: "MERCADOS EN VIVO", serial: "SERIE NO.", expiry: "SEGURO HASTA", news: "NOTICIAS", export: "EXPORTAR PDF", scan: "ESCANEANDO BIOMETRÍA...", auth: "IDENTIDAD AUTORIZADA", reset: "REINICIAR NODO",
  },
  JP: { access: "アクセス", centralHub: "ハブ", assetsVault: "金庫", strategicOps: "戦略", news: "ニュース", profileId: "パスポート", totalValue: "総資産", currentAge: "年齢", targetAge: "目標" },
  ZH: { access: "进入", centralHub: "枢纽", assetsVault: "保险库", strategicOps: "战略", news: "全球情报", profileId: "护照", totalValue: "总净资产", currentAge: "年龄", targetAge: "目标" },
  FR: { access: "ACCÉDER", centralHub: "CENTRE", assetsVault: "COFFRE", strategicOps: "STRATÉGIE", news: "NOUVELLES", profileId: "PASSEPORT", totalValue: "TOTAL", currentAge: "ÂGE", targetAge: "CIBLE" },
  DE: { access: "ZUGANG", centralHub: "ZENTRALE", assetsVault: "TRESOR", strategicOps: "STRATEGIE", news: "NEWS", profileId: "PASS", totalValue: "WERT", currentAge: "ALTER", targetAge: "ZIELALTER" },
  AR: { access: "الدخول", centralHub: "المركز", assetsVault: "الخزنة", strategicOps: "استراتيجية", news: "أخبار", profileId: "جواز", totalValue: "إجمالي", currentAge: "العمر", targetAge: "الهدف" },
  IT: { access: "ACCEDI", centralHub: "HUB", assetsVault: "CAVEAU", strategicOps: "STRATEGIA", news: "NOTIZIE", profileId: "PASSA PORTO", totalValue: "TOTALE", currentAge: "ETÀ", targetAge: "TARGET" },
};

const NEWS_FEED = [
  { id: 1, title: "Federal Reserve hints at interest rate stability through Q4.", time: "2m ago" },
  { id: 2, title: "Gold hits all-time high amid global liquidity expansion.", time: "15m ago" },
  { id: 3, title: "Bitcoin institutional adoption reaches new milestones.", time: "44m ago" },
  { id: 4, title: "Zion Protocol v17.0 Gold Master deployment successful.", time: "1h ago" }
];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", SAR: "﷼"
};

const ASSET_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#1e40af", "#1d4ed8"];

// --- AUXILIARY COMPONENTS ---
function KPIpro({ label, value, sub, icon, progress }: any) {
  return (
    <div className="card-sovereign" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
          <p style={{ fontSize: '2.4rem', fontWeight: 950, margin: '0.4rem 0' }}>{value}</p>
          <p style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 900 }}>{sub}</p>
        </div>
        <div style={{ padding: '1rem', background: 'rgba(37,99,235,0.1)', borderRadius: '20px', color: '#2563eb' }}>{icon}</div>
      </div>
      {progress !== undefined && (
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '1rem', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#2563eb', width: `${progress}%`, transition: '1s ease-out' }} />
        </div>
      )}
    </div>
  );
}

function UniversalInput({ label, value, onChange, isMoney, isText, unit, currencySymbol }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <label style={{ fontSize: '0.75rem', fontWeight: 950, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {isMoney && <span style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 950, color: '#2563eb' }}>{currencySymbol}</span>}
        <input
          type={isText ? "text" : "number"}
          className="input-sovereign"
          value={value}
          onChange={(e) => onChange(isText ? e.target.value : parseFloat(e.target.value) || 0)}
          style={{ paddingLeft: isMoney ? '2.5rem' : '1.3rem' }}
        />
        {unit && <span style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 950, color: '#4b5563' }}>{unit}</span>}
      </div>
    </div>
  );
}

export default function ZionDiamond() {
  const [isMounted, setIsMounted] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [lang, setLang] = useState<Language>("ES");

  const [prices, setPrices] = useState<any>({
    btc: { usd: 73420, usd_24h_change: 2.4 },
    eth: { usd: 3940, usd_24h_change: 1.8 },
  });

  const defaultAssets = [
    { id: 1, name: "TRUST FUND", value: 450000, color: "#2563eb" },
    { id: 2, name: "ALPHA VENTURES", value: 150000, color: "#3b82f6" },
  ];

  const [userName, setUserName] = useState("GUILLERMO");
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContribution, setMonthlyContribution] = useState(3000);
  const [yieldRate, setYieldRate] = useState(8);
  const [inflationRate, setInflationRate] = useState(3);
  const [financialGoal, setFinancialGoal] = useState(1000000);
  const [assets, setAssets] = useState(defaultAssets);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");

  const t = TRANSLATIONS[lang] || TRANSLATIONS.EN;

  const totalVault = useMemo(() => assets.reduce((acc, curr) => acc + curr.value, 0), [assets]);
  const goalProgress = useMemo(() => Math.min((totalVault / financialGoal) * 100, 100), [totalVault, financialGoal]);
  
  const healthScore = useMemo(() => {
     let score = 50;
     if (goalProgress > 30) score += 20;
     if (assets.length > 2) score += 15;
     return Math.min(score, 100);
  }, [goalProgress, assets]);

  const { projection, finalBalance } = useMemo(() => {
    let balance = totalVault;
    const steps = [];
    const realRate = (yieldRate - inflationRate) / 100 / 12;
    for (let age = currentAge; age <= 95; age++) {
      steps.push({ age, balance: Math.round(balance) });
      for (let month = 0; month < 12; month++) {
        if (age < retirementAge) balance = (balance + monthlyContribution) * (1 + (realRate > 0 ? realRate : 0));
        else balance = balance * (1 + (realRate > 0 ? realRate : 0)) - (balance * 0.04) / 12;
      }
    }
    return { projection: steps, finalBalance: balance };
  }, [currentAge, retirementAge, monthlyContribution, yieldRate, inflationRate, totalVault]);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("zion_diamond_data");
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setUserName(d.userName || "GUILLERMO");
        setAssets(d.assets || defaultAssets);
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("zion_diamond_data", JSON.stringify({ 
        userName, currentAge, retirementAge, monthlyContribution, 
        yieldRate, inflationRate, financialGoal, assets, lang, 
        currency, isDarkMode 
      }));
    }
  }, [userName, currentAge, retirementAge, monthlyContribution, yieldRate, inflationRate, financialGoal, assets, isMounted, lang, currency, isDarkMode]);

  const handleAccess = () => { setIsScanning(true); setTimeout(() => { setIsScanning(false); setShowApp(true); }, 1500); };
  const formatMoney = (val: number) => {
    if (isPrivate) return "••••••";
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${Math.round(val).toLocaleString()}`;
  };

  if (!isMounted) return null;
  const isRTL = lang === 'AR';
  const theme = { bg: isDarkMode ? '#000' : '#f8fafc', window: isDarkMode ? 'rgba(8, 8, 10, 0.98)' : '#fff', text: isDarkMode ? '#fff' : '#0f172a', subText: isDarkMode ? '#4b5563' : '#64748b', aside: isDarkMode ? 'rgba(0,0,0,0.5)' : '#f1f5f9', border: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', card: isDarkMode ? 'rgba(37,99,235,0.03)' : '#fff', input: isDarkMode ? '#0d0d0d' : '#fff' };

  if (!showApp) {
    return (
      <div className="splash">
        <style jsx>{`
          .splash { position: fixed; inset: 0; background: #000; display: flex; align-items: center; justify-content: center; z-index: 9999; }
          .splash-box { display: flex; flex-direction: column; align-items: center; gap: 3rem; animation: fadeIn 0.8s ease-out; width: 100%; max-width: 800px; padding: 2rem; }
          .logo-clicker { width: 380px; max-width: 80vw; cursor: pointer; transition: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; }
          .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: #2563eb; box-shadow: 0 0 20px #2563eb; opacity: 0; }
          .scanning .scan-line { animation: scan 1.5s infinite linear; opacity: 1; }
          .logo-clicker img { width: 100%; border-radius: 60px; box-shadow: 0 40px 100px rgba(0,0,0,0.8); border: 2px solid rgba(255,255,255,0.1); }
          .btn-access { background: #2563eb; color: #fff; padding: 1.5rem 6.5rem; border-radius: 100px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.5em; border: none; cursor: pointer; transition: 0.4s; position: relative; overflow: hidden; }
          @keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
        <div className="splash-box">
          <div className={`logo-clicker ${isScanning ? 'scanning' : ''}`} onClick={handleAccess}>
             <div className="scan-line" />
             <img src="/zion-logo.jpg" alt="ZION" />
          </div>
          <button onClick={handleAccess} className="btn-access">{isScanning ? <Fingerprint className="animate-pulse" /> : t.access}</button>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center'}}>
            {Object.keys(TRANSLATIONS).map(l => (
              <div key={l} onClick={() => setLang(l as Language)} style={{cursor: 'pointer', color: lang === l ? '#2563eb' : '#4b5563', fontWeight: 950}}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="root" style={{direction: isRTL ? 'rtl' : 'ltr', color: theme.text, background: theme.bg}}>
      <style jsx>{`
        .root { min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; }
        .window { width: 100%; max-width: 1750px; height: 95vh; background: ${theme.window}; border: 1px solid ${theme.border}; border-radius: 44px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 100px 200px rgba(0,0,0,0.6); }
        .main-stage { flex: 1; display: flex; overflow: hidden; }
        .aside { width: 320px; background: ${theme.aside}; border-right: 1px solid ${theme.border}; padding: 2.5rem 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .scrollbox { flex: 1; overflow-y: auto; padding: 2rem 3.5rem; }
        .nav-btn { width: 100%; padding: 1.2rem 1.4rem; border-radius: 18px; border: none; background: transparent; color: ${theme.subText}; display: flex; align-items: center; gap: 1.2rem; cursor: pointer; font-weight: 850; }
        .nav-btn.active { background: #2563eb; color: #fff; }
        .card-sovereign { background: ${theme.card}; border: 1px solid ${theme.border}; border-radius: 30px; padding: 2.5rem; }
        .input-sovereign { background: ${theme.input}; border: 1px solid ${theme.border}; padding: 1.3rem; border-radius: 16px; color: ${theme.text}; font-weight: 800; width: 100%; outline: none; }
        .btn-gold { background: #2563eb; color: #fff; padding: 1.5rem; border-radius: 16px; font-weight: 950; border: none; cursor: pointer; text-transform: uppercase; width: 100%; margin-top: 1rem; }
      `}</style>
      <div className="window">
        <div className="main-stage">
          <div className="aside">
            <img src="/zion-logo.jpg" style={{width: '160px', borderRadius: '40px', alignSelf: 'center'}} alt="Logo" />
            <nav style={{display: 'flex', flexDirection: 'column', gap: '0.6rem'}}>
              <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard /> {t.centralHub}</button>
              <button className={`nav-btn ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}><Wallet /> {t.assetsVault}</button>
              <button className={`nav-btn ${activeTab === 'news' ? 'active' : ''}`} onClick={() => setActiveTab('news')}><Newspaper /> {t.news}</button>
              <button className={`nav-btn ${activeTab === 'strategy' ? 'active' : ''}`} onClick={() => setActiveTab('strategy')}><TrendingUp /> {t.strategicOps}</button>
            </nav>
            <div style={{marginTop: 'auto'}} className="card-sovereign">
               <p style={{fontSize: '0.7rem', fontWeight: 950}}>{t.healthScore}</p>
               <span style={{fontSize: '2.8rem', fontWeight: 950, color: '#2563eb'}}>{healthScore}</span>
            </div>
          </div>
          <div className="content">
            <div style={{padding: '3rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <h1 style={{fontSize: '3.5rem', fontWeight: 950}}>NODE.<span style={{color: '#2563eb'}}>ZION</span></h1>
               <div style={{textAlign: 'right'}}>
                  <p style={{fontSize: '0.9rem', color: theme.subText, fontWeight: 950}}>{t.totalValue}</p>
                  <p style={{fontSize: '5.2rem', fontWeight: 950, margin: 0}}>{formatMoney(totalVault)}</p>
               </div>
            </div>
            <div className="scrollbox">
              {activeTab === 'dashboard' && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '2.8rem'}}>
                   <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem'}}>
                      <KPIpro label={t.goal} value={`${goalProgress.toFixed(1)}%`} sub={`${t.mainTarget}: ${formatMoney(financialGoal)}`} icon={<Target size={28} />} progress={goalProgress} />
                      <KPIpro label={t.projection} value={formatMoney(finalBalance)} sub={`${t.targetAge}: ${retirementAge}`} icon={<TrendingUp size={28} />} />
                      <KPIpro label="SECURITY" value="BIT-SHIELD" sub="AES-256" icon={<ShieldCheck size={28} />} />
                   </div>
                   <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.8rem'}}>
                      <div className="card-sovereign" style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                         <h3 style={{fontSize: '1.2rem', fontWeight: 950, color: '#2563eb'}}>{t.calibration}</h3>
                         <UniversalInput label={t.currentAge} value={currentAge} onChange={setCurrentAge} />
                         <UniversalInput label={t.targetAge} value={retirementAge} onChange={setRetirementAge} />
                         <UniversalInput label={t.allocation} value={monthlyContribution} onChange={setMonthlyContribution} isMoney currencySymbol={CURRENCY_SYMBOLS[currency]} />
                         <UniversalInput label={t.mainTarget} value={financialGoal} onChange={setFinancialGoal} isMoney currencySymbol={CURRENCY_SYMBOLS[currency]} />
                      </div>
                      <div className="card-sovereign" style={{height: '400px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={projection}>
                            <XAxis dataKey="age" hide />
                            <Tooltip />
                            <Area type="monotone" dataKey="balance" stroke="#2563eb" fillOpacity={0.1} fill="#2563eb" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                   </div>
                </div>
              )}
              {activeTab === 'vault' && (
                <div className="card-sovereign">
                  <h3 style={{fontSize: '1.5rem', fontWeight: 950, marginBottom: '2rem'}}>{t.assetsVault}</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {assets.map(a => (
                      <div key={a.id} style={{display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '15px'}}>
                        <span style={{fontWeight: 950}}>{a.name}</span>
                        <span style={{fontWeight: 950, color: '#2563eb'}}>{formatMoney(a.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'strategy' && (
                <div style={{textAlign: 'center', padding: '5rem'}}>
                  <Trophy size={80} color="#2563eb" />
                  <h2 style={{fontSize: '2rem', fontWeight: 950, marginTop: '2rem'}}>{t.targetMsg} {retirementAge}</h2>
                  <p style={{fontSize: '1.2rem', opacity: 0.7}}>{t.withCapital} {formatMoney(finalBalance)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
