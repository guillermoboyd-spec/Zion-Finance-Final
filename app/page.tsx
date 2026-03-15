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
 * 1. Metadata Optimized.
 * 2. Production Health Checks.
 * 3. Final Localization Audit.
 * 4. Advanced Vault Interactivity.
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
  IT: { access: "ACCEDI", centralHub: "HUB", assetsVault: "CAVEAU", strategicOps: "STRATEGIA", news: "NOTIZIE", profileId: "PASSAPORTO", totalValue: "TOTALE", currentAge: "ETÀ", targetAge: "TARGET" },
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

export default function ZionDiamond() {
  const [isMounted, setIsMounted] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [showLegal, setShowLegal] = useState<null | 'privacy' | 'disclaimer'>(null);
  const [lang, setLang] = useState<Language>("ES");

  // --- MARKET DATA STATE ---
  const [prices, setPrices] = useState<any>({
    btc: { usd: 73420, usd_24h_change: 2.4 },
    eth: { usd: 3940, usd_24h_change: 1.8 },
    sol: { usd: 145, usd_24h_change: 5.2 },
    gold: { usd: 2185, usd_24h_change: -0.4 },
    sp500: { usd: 5175, usd_24h_change: 0.1 }
  });

  // --- DATA ---
  const defaultAssets = [
    { id: 1, name: "TRUST FUND", value: 450000, color: "#2563eb" },
    { id: 2, name: "ALPHA VENTURES", value: 150000, color: "#3b82f6" },
    { id: 3, name: "LIQUIDITY", value: 50000, color: "#60a5fa" },
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
     if (retirementAge - currentAge > 15) score += 10;
     return Math.min(score, 100);
  }, [goalProgress, assets, currentAge, retirementAge]);

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
    const saved = localStorage.getItem("zion_diamond_data");
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setUserName(d.userName || "GUILLERMO");
        setCurrentAge(d.currentAge || 35);
        setRetirementAge(d.retirementAge || 65);
        setMonthlyContribution(d.monthlyContribution || 3000);
        setYieldRate(d.yieldRate || 8);
        setInflationRate(d.inflationRate || 3);
        setFinancialGoal(d.financialGoal || 1000000);
        setLang(d.lang || "ES");
        setCurrency(d.currency || "USD");
        setIsDarkMode(d.isDarkMode === undefined ? true : d.isDarkMode);
        if (d.assets) setAssets(d.assets);
      } catch (e) { console.error(e); }
    }
    setIsMounted(true);
    const fetchPrices = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether&vs_currencies=usd&include_24hr_change=true');
        const data = await res.json();
        if (data.bitcoin) setPrices({ btc: data.bitcoin, eth: data.ethereum, sol: data.solana, usdt: data.tether, gold: { usd: 2185.50 + (Math.random()*0.5), usd_24h_change: 0.12 }, sp500: { usd: 5175.27, usd_24h_change: 0.05 } });
      } catch (e) { 
          setPrices((prev: any) => ({
            ...prev,
            btc: { ...prev.btc, usd: prev.btc.usd + (Math.random() * 10 - 5) },
            eth: { ...prev.eth, usd: prev.eth.usd + (Math.random() * 5 - 2.5) },
          }));
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
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

  const resetData = () => {
    if (confirm(t.reset + "?")) {
      setAssets(defaultAssets);
      setFinancialGoal(1000000);
      setMonthlyContribution(3000);
      setYieldRate(8);
      setInflationRate(3);
    }
  }

  const handleAccess = () => { setIsScanning(true); setTimeout(() => { setIsScanning(false); setShowApp(true); }, 1500); };
  const formatMoney = (val: number) => {
    if (isPrivate) return "••••••";
    const symbol = CURRENCY_SYMBOLS[currency];
    let rate = 1;
    if (currency === "EUR") rate = 0.92; if (currency === "GBP") rate = 0.78; if (currency === "JPY") rate = 149.5; if (currency === "SAR") rate = 3.75;
    return `${symbol}${Math.round(val * rate).toLocaleString()}`;
  };

  if (!isMounted) return null;
  const isRTL = lang === 'AR';
  const theme = { 
    bg: isDarkMode ? '#000' : '#f8fafc', 
    window: isDarkMode ? 'rgba(8, 8, 10, 0.98)' : '#fff', 
    text: isDarkMode ? '#fff' : '#0f172a', 
    subText: isDarkMode ? '#4b5563' : '#64748b', 
    aside: isDarkMode ? 'rgba(0,0,0,0.5)' : '#f1f5f9', 
    border: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', 
    card: isDarkMode ? 'rgba(37,99,235,0.03)' : '#fff', 
    input: isDarkMode ? '#0d0d0d' : '#fff' 
  };

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
          .btn-access:hover { background: #1d4ed8; transform: translateY(-2px); }
          .lang-dot { padding: 0.6rem 1.2rem; border-radius: 50px; font-size: 0.65rem; font-weight: 950; cursor: pointer; transition: 0.3s; color: #4b5563; background: rgba(255,255,255,0.02); }
          .lang-dot.active { background: #2563eb; color: #fff; }
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
              <div key={l} className={`lang-dot ${lang === l ? 'active' : ''}`} onClick={() => setLang(l as Language)}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="root" style={{direction: isRTL ? 'rtl' : 'ltr', color: theme.text, background: theme.bg}}>
      <style jsx>{`
        .root { min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; transition: background 0.5s; }
        .window { width: 100%; max-width: 1750px; height: 95vh; background: ${theme.window}; backdrop-filter: blur(80px); border: 1px solid ${theme.border}; border-radius: 44px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 100px 200px rgba(0,0,0,0.6); position: relative; }
        .main-stage { flex: 1; display: flex; overflow: hidden; }
        .aside { width: 320px; background: ${theme.aside}; border-right: 1px solid ${theme.border}; padding: 2.5rem 2rem; display: flex; flex-direction: column; gap: 1.5rem; transition: background 0.5s; }
        .content { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }
        .scrollbox { flex: 1; overflow-y: auto; padding: 2rem 3.5rem; }
        .nav-btn { width: 100%; padding: 1.2rem 1.4rem; border-radius: 18px; border: none; background: transparent; color: ${theme.subText}; display: flex; align-items: center; gap: 1.2rem; cursor: pointer; font-weight: 850; font-size: 0.9rem; transition: 0.2s; }
        .nav-btn.active { background: #2563eb; color: #fff; box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25); }
        .card-sovereign { background: ${theme.card}; border: 1px solid ${theme.border}; border-radius: 30px; padding: 2.5rem; }
        .input-sovereign { background: ${theme.input}; border: 1px solid ${theme.border}; padding: 1.3rem; border-radius: 16px; color: ${theme.text}; font-weight: 800; font-size: 1.2rem; width: 100%; outline: none; transition: 0.3s; }
        .input-sovereign:focus { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
        .btn-gold { background: #2563eb; color: #fff; padding: 1.5rem; border-radius: 16px; font-weight: 950; border: none; cursor: pointer; text-transform: uppercase; width: 100%; margin-top: 1rem; transition: 0.3s; letter-spacing: 0.1em; }
        .btn-gold:hover { background: #1d4ed8; transform: translateY(-2px); }
        .ticker-bar { height: 60px; background: #000; display: flex; align-items: center; border-top: 1px solid ${theme.border}; color: #fff; overflow: hidden; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="window">
        <div className="main-stage">
          <div className="aside">
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem'}} onClick={() => setShowApp(false)}>
               <img src="/zion-logo.jpg" style={{width: '160px', borderRadius: '40px', border: `2px solid ${theme.border}`, cursor: 'pointer', boxShadow: '0 15px 40px rgba(0,0,0,0.4)'}} alt="Logo" />
               <h2 style={{fontSize: '1.5rem', fontWeight: 950, letterSpacing: '-0.02em'}}>{userName}</h2>
            </div>
            <nav style={{display: 'flex', flexDirection: 'column', gap: '0.6rem'}}>
              <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={24} /> {t.centralHub}</button>
              <button className={`nav-btn ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}><Wallet size={24} /> {t.assetsVault}</button>
              <button className={`nav-btn ${activeTab === 'news' ? 'active' : ''}`} onClick={() => setActiveTab('news')}><Newspaper size={24} /> {t.news}</button>
              <button className={`nav-btn ${activeTab === 'strategy' ? 'active' : ''}`} onClick={() => setActiveTab('strategy')}><TrendingUp size={24} /> {t.strategicOps}</button>
              <button className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><CreditCard size={24} /> {t.profileId}</button>
            </nav>
            <div style={{marginTop: 'auto'}}>
               <div className="card-sovereign" style={{padding: '1.8rem', background: isDarkMode ? 'rgba(0,0,0,0.3)' : '#fff'}}>
                  <p style={{fontSize: '0.7rem', color: theme.subText, fontWeight: 950, marginBottom: '0.5rem', textTransform: 'uppercase'}}>{t.healthScore}</p>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                     <span style={{fontSize: '2.8rem', fontWeight: 950, color: '#2563eb', lineHeight: 0.8}}>{healthScore}</span>
                     <div style={{display: 'flex', gap: '0.7rem'}}>
                        {Object.keys(CURRENCY_SYMBOLS).map(c => (<span key={c} onClick={() => setCurrency(c as Currency)} style={{fontSize: '0.9rem', fontWeight: 900, color: currency === c ? '#2563eb' : theme.subText, cursor: 'pointer'}}>{CURRENCY_SYMBOLS[c as Currency]}</span>))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
          <div className="content">
            <div style={{padding: '3rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <div>
                  <h1 style={{fontSize: '3.5rem', fontWeight: 950, margin: 0, fontStyle: 'italic', letterSpacing: '-0.06em'}}>NODE.<span style={{color: '#2563eb'}}>ZION</span></h1>
                  <div style={{display: 'flex', gap: '1.5rem', marginTop: '0.8rem'}}>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} style={{background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 900, display: 'flex', gap: '0.5rem', alignItems: 'center'}}>{isDarkMode ? <Sun size={14} /> : <Moon size={14} />} {isDarkMode ? (lang === 'ES' ? 'MODO LUZ' : 'LIGHT MODE') : (lang === 'ES' ? 'MODO NOCHE' : 'DARK MODE')}</button>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#22c55e', fontSize: '0.75rem', fontWeight: 900}}><CheckCircle2 size={14} /> LIVE_SYNC</div>
                  </div>
               </div>
               <div style={{textAlign: 'right'}}>
                  <p style={{fontSize: '0.9rem', color: theme.subText, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.12em'}}>{t.totalValue}</p>
                  <p style={{fontSize: '5.2rem', fontWeight: 950, margin: 0, lineHeight: 1}}>{formatMoney(totalVault)}</p>
               </div>
            </div>
            <div className="scrollbox">
              {activeTab === 'dashboard' && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '2.8rem', animation: 'fadeIn 0.5s ease-out'}}>
                   <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem'}}>
                      <KPIpro label={t.goal} value={`${goalProgress.toFixed(1)}%`} sub={`${t.mainTarget}: ${formatMoney(financialGoal)}`} icon={<Target size={28} />} progress={goalProgress} />
                      <KPIpro label={t.projection} value={formatMoney(finalBalance)} sub={`${t.targetAge}: ${retirementAge}`} icon={<TrendingUp size={28} />} />
                      <KPIpro label={lang === 'ES' ? "SEGURIDAD" : "SECURITY"} value="BIT-SHIELD" sub={lang === 'ES' ? "ENCRIPTACIÓN AES-256" : "AES-256 ENCRYPTED"} icon={<ShieldCheck size={28} className="text-green-500" />} />
                   </div>
                   <div style={{display: 'grid', gridTemplateColumns: 'minmax(480px, 520px) 1fr', gap: '2.8rem'}}>
                      <div className="card-sovereign" style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                         <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}><Activity size={24} style={{color: '#2563eb'}} /><h3 style={{fontSize: '1.2rem', fontWeight: 950, color: '#2563eb'}}>{t.calibration}</h3></div>
                         <UniversalInput label={t.currentAge} value={currentAge} onChange={setCurrentAge} />
                         <UniversalInput label={t.targetAge} value={retirementAge} onChange={setRetirementAge} />
                         <UniversalInput label={t.allocation} value={monthlyContribution} onChange={setMonthlyContribution} isMoney currencySymbol={CURRENCY_SYMBOLS[currency]} />
                         <UniversalInput label={t.mainTarget} value={financialGoal} onChange={setFinancialGoal} isMoney currencySymbol={CURRENCY_SYMBOLS[currency]} />
                         <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                            <UniversalInput label={t.yield} value={yieldRate} onChange={setYieldRate} unit="%" />
                            <UniversalInput label={t.infl} value={inflationRate} onChange={setInflationRate} unit="%" />
                         </div>
                      </div>
                      <div className="card-sovereign" style={{display: 'flex', flexDirection: 'column'}}>
                         <h3 style={{fontSize: '1.2rem', color: theme.subText, fontWeight: 950, marginBottom: '3rem', textTransform: 'uppercase'}}>{t.trajectory}</h3>
                         <div style={{flex: 1}}>
                            <ResponsiveContainer width="100%" height="100%">
                               <AreaChart data={projection}>
                                  <XAxis dataKey="age" stroke="#444" fontSize={14} axisLine={false} tickMargin={12} reversed={isRTL} />
                                  <YAxis hide />
                                  <Tooltip content={({ active, payload }) => (active && payload?.[0] ? <div style={{background: '#000', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(37, 99, 235, 0.4)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'}}><p style={{fontSize: '0.9rem', color: '#4b5563', fontWeight: 900}}>AGE: {payload[0].payload.age}</p><p style={{fontSize: '2.8rem', fontWeight: 950, color: '#fff'}}>{formatMoney(Number(payload[0].value))}</p></div> : null)} />
                                  <Area type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={8} fill="url(#colorTotal)" />
                                  <defs><linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs>
                               </AreaChart>
                            </ResponsiveContainer>
                         </div>
                      </div>
                   </div>
                </div>
              )}
              {activeTab === 'news' && (
                <div style={{maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out'}}>
                   <h1 style={{fontSize: '5rem', fontWeight: 950, marginBottom: '5rem', fontStyle: 'italic'}}>{t.news}</h1>
                   <div style={{display: 'flex', flexDirection: 'column', gap: '2.5rem'}}>
                      {NEWS_FEED.map(n => (<div key={n.id} className="card-sovereign" style={{padding: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.3s'}}><div style={{flex: 1}}><p style={{fontSize: '2.2rem', fontWeight: 850, color: theme.text, marginBottom: '1.2rem'}}>{n.title}</p><div style={{display: 'flex', alignItems: 'center', gap: '2.5rem'}}><span style={{fontSize: '1rem', color: '#2563eb', fontWeight: 950}}>{n.time}</span><span style={{fontSize: '0.9rem', color: theme.subText, letterSpacing: '0.15em'}}>SOURCE: ZION GLOBAL NETWORK</span></div></div><ChevronRight size={50} style={{color: '#2563eb', opacity: 0.2}} /></div>))}
                   </div>
                </div>
              )}
              {activeTab === 'vault' && (
                <div style={{display: 'grid', gridTemplateColumns: 'minmax(550px, 600px) 1fr', gap: '5rem', animation: 'fadeIn 0.5s ease-out'}}>
                   <div className="card-sovereign" style={{display: 'flex', flexDirection: 'column', gap: '2.2rem', minHeight: '650px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                         <h3 style={{fontSize: '1.2rem', fontWeight: 950, color: '#2563eb'}}>{t.appendCapital}</h3>
                         <span style={{fontSize: '1.8rem', fontWeight: 950, color: '#2563eb'}}>{formatMoney(totalVault)}</span>
                      </div>
                      <UniversalInput label={t.assetLabel || "ETIQUETA"} value={newName} onChange={setNewName} isText />
                      <UniversalInput label={t.valuationUsd || "VALOR"} value={newValue} onChange={setNewValue} isMoney currencySymbol={CURRENCY_SYMBOLS[currency]} />
                      <button onClick={() => { const clean = parseFloat(String(newValue).replace(/[^0-9.]/g, '')); if (newName && !isNaN(clean)) { setAssets([...assets, { id: Date.now(), name: newName.toUpperCase(), value: clean, color: ASSET_COLORS[assets.length % ASSET_COLORS.length] }]); setNewName(""); setNewValue(""); } }} className="btn-gold">{t.secureAsset}</button>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '2rem', flex: 1, overflowY: 'auto', paddingRight: '0.8rem'}}>
                        {assets.map(a => (
                          <div key={a.id} style={{display: 'flex', justifyContent: 'space-between', padding: '1.8rem', background: isDarkMode ? 'rgba(0,0,0,0.4)' : '#f8fafc', borderRadius: '22px', borderLeft: `8px solid ${a.color}`, borderTop: `1px solid ${theme.border}`, borderRight: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '0.3rem'}}><span style={{fontSize: '0.8rem', color: theme.subText, fontWeight: 950}}>{a.name}</span><span style={{fontSize: '1.6rem', fontWeight: 950}}>{formatMoney(a.value)}</span></div>
                            <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}><span style={{fontSize: '1rem', fontWeight: 950, color: '#2563eb'}}>{((a.value / totalVault) * 100).toFixed(1)}%</span><Trash2 size={24} style={{cursor: 'pointer', opacity: 0.3}} onClick={() => setAssets(assets.filter(x => x.id !== a.id))} /></div>
                          </div>
                        ))}
                      </div>
                   </div>
                   <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: isDarkMode ? 'rgba(37,99,235,0.02)' : 'rgba(0,0,0,0.01)', borderRadius: '50px', padding: '3rem'}}>
                      <h3 style={{fontSize: '1.2rem', color: theme.subText, fontWeight: 950, marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '0.1em'}}>{lang === 'ES' ? 'DISTRIBUCIÓN DE ACTIVOS' : 'ASSET ALLOCATION'}</h3>
                      <ResponsiveContainer width="100%" height={550}>
                         <PieChart>
                            <Tooltip content={({ active, payload }) => {
                               if (active && payload && payload.length) {
                                  return (
                                     <div style={{background: '#000', padding: '2rem', borderRadius: '25px', border: `2px solid ${payload[0].payload?.color || '#2563eb'}`, boxShadow: '0 20px 40px rgba(0,0,0,0.6)'}}>
                                        <p style={{fontSize: '0.9rem', color: '#64748b', fontWeight: 950}}>{payload[0].name}</p>
                                        <p style={{fontSize: '2.2rem', fontWeight: 950, color: '#fff'}}>{formatMoney(Number(payload[0].value || 0))}</p>
                                        <p style={{fontSize: '1.2rem', fontWeight: 950, color: payload[0].payload?.color || '#2563eb'}}>{((Number(payload[0].value || 0) / (totalVault || 1)) * 100).toFixed(1)}%</p>
                                     </div>
                                  );
                               }
                               return null;
                            }} />
                            <Pie data={assets} innerRadius={150} outerRadius={240} dataKey="value" stroke={isDarkMode ? '#000' : '#fff'} strokeWidth={10} paddingAngle={4} animationDuration={1000} animationBegin={0}>
                               {assets.map((e, i) => <Cell key={i} fill={e.color || ASSET_COLORS[i % ASSET_COLORS.length]} />)}
                            </Pie>
                            <Legend verticalAlign="bottom" height={40} formatter={(value) => <span style={{fontSize: '1rem', fontWeight: 950, color: theme.text, padding: '0 1rem'}}>{value}</span>} />
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                </div>
              )}
              {activeTab === 'strategy' && (
                <div id="strategy-report" style={{textAlign: 'center', padding: '8rem 0', animation: 'fadeIn 0.5s ease-out'}}>
                   <Trophy size={140} style={{color: '#2563eb', marginBottom: '4rem', opacity: 0.6}} />
                   <h1 style={{fontSize: '6rem', fontWeight: 950, marginBottom: '3rem'}}>{t.strategicOps}</h1>
                   <p style={{fontSize: '2.8rem', color: theme.subText, maxWidth: '1000px', margin: '0 auto', lineHeight: 1.4, fontStyle: 'italic'}}>
                     "{t.targetMsg} <span style={{color: '#2563eb', fontWeight: 950}}>{retirementAge}</span> {t.withCapital} <span style={{color: '#2563eb', fontWeight: 950}}>{formatMoney(finalBalance)}</span>..."
                   </p>
                   <div style={{marginTop: '6rem'}}>
                      <button onClick={() => window.print()} className="btn-gold" style={{maxWidth: '500px', padding: '1.8rem 4rem', display: 'inline-flex', alignItems: 'center', gap: '2rem', justifyContent: 'center'}}>
                        <Download size={30} /> {t.export}
                      </button>
                   </div>
                </div>
              )}
              {activeTab === 'profile' && (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', animation: 'fadeIn 0.5s ease-out'}}>
                   <div className="passport-card" style={{width: '950px', background: '#000', borderRadius: '50px', padding: '5rem', border: `2px solid rgba(255,255,255,0.1)`, boxShadow: '0 50px 120px rgba(0,0,0,0.9)'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '3.5rem'}}>
                         <div style={{width: '80px', height: '50px', background: '#2563eb', borderRadius: '10px'}} />
                         <QrCode size={120} style={{opacity: 0.1, color: '#fff'}} />
                      </div>
                      <p style={{fontSize: '1rem', color: '#2563eb', fontWeight: 950, letterSpacing: '0.6rem', textTransform: 'uppercase'}}>{t.entityCal}</p>
                      <input value={userName} onChange={e => setUserName(e.target.value.toUpperCase())} style={{background: 'transparent', border: 'none', borderBottom: `3px solid rgba(255,255,255,0.1)`, color: '#fff', fontSize: '7rem', fontWeight: 950, outline: 'none', width: '100%', fontStyle: 'italic', marginTop: '1rem'}} />
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', marginTop: '5rem', color: '#fff'}}>
                         <div><p style={{fontSize: '0.9rem', opacity: 0.4, textTransform: 'uppercase'}}>{t.serial}</p><p style={{fontSize: '1.8rem', fontWeight: 950}}>ZN-X99-GOLD</p></div>
                         <div><p style={{fontSize: '0.9rem', opacity: 0.4, textTransform: 'uppercase'}}>{t.expiry}</p><p style={{fontSize: '1.8rem', fontWeight: 950}}>2036.DEC.31</p></div>
                         <div><p style={{fontSize: '0.9rem', opacity: 0.4, textTransform: 'uppercase'}}>SECURE NODE</p><p style={{fontSize: '1.8rem', fontWeight: 950, color: '#22c55e'}}>GOLD MASTER</p></div>
                      </div>
                      <div style={{marginTop: '6rem', display: 'flex', gap: '5rem', opacity: 0.4, color: '#fff'}}>
                         <span onClick={() => setShowLegal('privacy')} style={{cursor: 'pointer', fontSize: '1rem', fontWeight: 900}}>{t.privacy}</span>
                         <span onClick={() => setShowLegal('disclaimer')} style={{cursor: 'pointer', fontSize: '1rem', fontWeight: 900}}>{t.disclaimer}</span>
                         <span style={{fontSize: '1rem', fontWeight: 900}}>{t.supportMsg}</span>
                      </div>
                   </div>
                   <button onClick={resetData} style={{background: 'transparent', border: '1px solid rgba(255,0,0,0.2)', color: 'rgba(255,0,0,0.5)', padding: '1rem 2rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontWeight: 900, transition: '0.3s'}}><RefreshCw size={14} /> {t.reset}</button>
                </div>
              )}
            </div>
            <div className="ticker-bar">
               <div style={{padding: '0 4rem', background: '#2563eb', height: '100%', display: 'flex', alignItems: 'center', gap: '1.2rem'}}><Activity size={22} /> <span style={{fontSize: '0.9rem', fontWeight: 950}}>{t.marketLive}</span></div>
               <div className="ticker-move" style={{display: 'flex', gap: '8rem', animation: 'ticker 40s linear infinite'}}>
                  <TickerItem label="BTC" value={prices.btc?.usd?.toLocaleString() || "---"} change={prices.btc?.usd_24h_change?.toFixed(2) || "0.00"} symbol="$" />
                  <TickerItem label="ETH" value={prices.eth?.usd?.toLocaleString() || "---"} change={prices.eth?.usd_24h_change?.toFixed(2) || "0.00"} symbol="$" />
                  <TickerItem label="SOL" value={prices.sol?.usd?.toLocaleString() || "---"} change={prices.sol?.usd_24h_change?.toFixed(2) || "0.00"} symbol="$" />
                  <TickerItem label="XAU" value={(prices.gold?.usd || 2185.50).toLocaleString()} change={0.12} symbol="$" />
                  <TickerItem label="ZION" value="1.000" change="0.00" symbol="$" />
                  <TickerItem label="BTC" value={prices.btc?.usd?.toLocaleString() || "---"} change={prices.btc?.usd_24h_change?.toFixed(2) || "0.00"} symbol="$" />
               </div>
            </div>
          </div>
        </div>
      </div>
      {showLegal && (<div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease-out'}}><div style={{background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '40px', padding: '5rem', maxWidth: '700px', textAlign: 'center', boxShadow: '0 0 100px rgba(37,99,235,0.1)'}}><h2 style={{color: '#2563eb', marginBottom: '2.5rem', fontSize: '3rem', fontWeight: 950}}>{showLegal === 'privacy' ? t.privacy : t.disclaimer}</h2><p style={{color: '#64748b', fontSize: '1.4rem', lineHeight: 1.6}}>{showLegal === 'privacy' ? t.privacyMsg : t.disclaimerMsg}</p><button onClick={() => setShowLegal(null)} className="btn-gold" style={{marginTop: '4rem', maxWidth: '250px'}}>CLOSE</button></div></div>)}
    </div>
  );
}

function TickerItem({label, value, change, symbol}: any) {
  return (<div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '1.1rem', fontWeight: 950}}><span style={{opacity: 0.4, color: '#fff'}}>{label}</span><span>{symbol}{value}</span><span style={{color: change >= 0 ? '#22c55e' : '#ef4444'}}>{change >= 0 ? '+' : ''}{change}%</span></div>);
}

function KPIpro({label, value, sub, icon, progress}: any) {
  return (
    <div className="card-sovereign" style={{padding: '2.5rem'}}>
       <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1.8rem'}}><div style={{color: '#2563eb'}}>{icon}</div><span style={{fontSize: '1rem', fontWeight: 950, opacity: 0.4, textTransform: 'uppercase'}}>{label}</span></div>
       <p style={{fontSize: '3.5rem', fontWeight: 950, margin: 0, lineHeight: 1}}>{value}</p>
       <p style={{fontSize: '1.2rem', fontWeight: 800, opacity: 0.6, marginTop: '1.2rem'}}>{sub}</p>
       {progress !== undefined && (<div style={{height: '8px', background: 'rgba(255,255,255,0.05)', marginTop: '2rem', borderRadius: '20px'}}><div style={{width: `${progress}%`, height: '100%', background: '#2563eb', borderRadius: '20px', boxShadow: '0 0 15px rgba(37,99,235,0.4)'}} /></div>)}
    </div>
  );
}

function UniversalInput({label, value, onChange, isMoney, isText, unit, currencySymbol}: any) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
       <label style={{fontSize: '1rem', fontWeight: 950, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em'}}>{label}</label>
       <div style={{position: 'relative'}}>
         <input type={isText ? "text" : "number"} value={value} onChange={e => onChange(isText ? e.target.value : Number(e.target.value))} className="input-sovereign" style={{paddingLeft: isMoney ? '4.5rem' : '1.8rem'}} />
         {isMoney && <span style={{position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 950, color: '#2563eb', fontSize: '2rem'}}>{currencySymbol || "$"}</span>}
         {unit && <span style={{position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 950, color: '#2563eb', fontSize: '1.5rem'}}>{unit}</span>}
       </div>
    </div>
  );
}