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

type Language = "EN" | "ES" | "JP" | "ZH" | "FR" | "DE" | "AR" | "IT";
type Currency = "USD" | "EUR" | "GBP" | "JPY" | "SAR";

const TRANSLATIONS: Record<Language, any> = {
  EN: { access: "ACCESS", centralHub: "CENTRAL HUB", assetsVault: "VAULT", strategicOps: "STRATEGY", totalValue: "TOTAL NET ASSETS", goal: "GOAL", projection: "PROJECTION", calibration: "NODE CONFIGURATION", currentAge: "CURRENT AGE", targetAge: "TARGET AGE", allocation: "MONTHLY SAVING", mainTarget: "FINANCIAL GOAL", yield: "YIELD", infl: "INFLATION", trajectory: "WEALTH TRAJECTORY", news: "NEWS FEED", reset: "RESET NODE" },
  ES: { access: "ACCEDER", centralHub: "PANEL CENTRAL", assetsVault: "BÓVEDA", strategicOps: "ESTRATEGIA", totalValue: "ACTIVOS NETOS TOTALES", goal: "META", projection: "PROYECCIÓN", calibration: "CONFIGURACIÓN NODO", currentAge: "EDAD ACTUAL", targetAge: "EDAD RETIRO", allocation: "AHORRO MENSUAL", mainTarget: "META FINANCIERA", yield: "RENDIMIENTO", infl: "INFLACIÓN", trajectory: "TRAYECTORIA CAPITAL", news: "NOTICIAS", reset: "REINICIAR NODO" },
};

const NEWS_FEED = [
  { id: 1, title: "Federal Reserve hints at interest rate stability through Q4.", time: "2m ago" },
  { id: 4, title: "Zion Protocol v17.0 Gold Master deployment successful.", time: "1h ago" }
];

const CURRENCY_SYMBOLS: Record<Currency, string> = { USD: "$", EUR: "€", GBP: "£", JPY: "¥", SAR: "﷼" };
const ASSET_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];

// --- EL COMPONENTE QUE ARREGLA LOS NÚMEROS ---
function UniversalInput({ label, value, onChange, isMoney = false, isText = false, unit = "", currencySymbol = "$" }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 900, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
        {label}
      </label>
      <input
        type={isText ? "text" : "number"}
        value={value}
        onChange={(e) => onChange(isText ? e.target.value : parseFloat(e.target.value) || 0)}
        style={{
          width: "100%", padding: "1.2rem", borderRadius: "16px", border: "2px solid #2563eb33",
          backgroundColor: "white", color: "black", fontSize: "1.2rem", fontWeight: "800", outline: "none"
        }}
      />
    </div>
  );
}

function KPIpro({ label, value, sub, icon, progress }: any) {
  return (
    <div style={{ background: 'rgba(37,99,235,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '2.5rem', borderRadius: '30px' }}>
      <p style={{ fontSize: '0.75rem', fontWeight: 950, color: '#4b5563', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</p>
      <h3 style={{ fontSize: '2.4rem', fontWeight: 950, margin: 0 }}>{value}</h3>
      <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb' }}>{sub}</p>
    </div>
  );
}

export default function ZionDiamond() {
  const [isMounted, setIsMounted] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [lang, setLang] = useState<Language>("ES");

  const [userName, setUserName] = useState("GUILLERMO");
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContribution, setMonthlyContribution] = useState(3000);
  const [yieldRate, setYieldRate] = useState(8);
  const [inflationRate, setInflationRate] = useState(3);
  const [financialGoal, setFinancialGoal] = useState(1000000);
  const [assets, setAssets] = useState([{ id: 1, name: "TRUST FUND", value: 450000, color: "#2563eb" }]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.EN;

  const totalVault = useMemo(() => assets.reduce((acc, curr) => acc + curr.value, 0), [assets]);
  const goalProgress = useMemo(() => Math.min((totalVault / financialGoal) * 100, 100), [totalVault, financialGoal]);
  
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

  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;

  const formatMoney = (val: number) => {
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${Math.round(val).toLocaleString()}`;
  };

  if (!showApp) {
    return (
      <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
        <img src="/zion-logo.jpg" style={{ width: '300px', borderRadius: '60px', border: '2px solid #2563eb' }} onClick={() => setShowApp(true)} />
        <button style={{ background: '#2563eb', color: '#fff', padding: '1rem 4rem', borderRadius: '50px', fontWeight: 900, cursor: 'pointer', border: 'none' }} onClick={() => setShowApp(true)}>
          {t.access}
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: isDarkMode ? '#000' : '#f8fafc', color: isDarkMode ? '#fff' : '#000', fontFamily: 'sans-serif' }}>
      {/* HEADER CON TU LOGO */}
      <nav style={{ padding: '2rem 4rem', borderBottom: '1px solid rgba(37,99,235,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/zion-logo.jpg" style={{ width: '60px', borderRadius: '15px' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: 950 }}>NODE.<span style={{ color: '#2563eb' }}>ZION</span></h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>{t.totalValue}</p>
          <p style={{ fontSize: '3rem', fontWeight: 950 }}>{formatMoney(totalVault)}</p>
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', padding: '2rem' }}>
        {/* ASIDE */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button style={{ padding: '1rem', background: '#2563eb', color: '#fff', borderRadius: '15px', border: 'none', fontWeight: 900 }}>{t.centralHub}</button>
          <button style={{ padding: '1rem', borderRadius: '15px', border: 'none', background: 'transparent', color: '#4b5563', fontWeight: 900 }}>{t.assetsVault}</button>
          <button style={{ padding: '1rem', borderRadius: '15px', border: 'none', background: 'transparent', color: '#4b5563', fontWeight: 900 }}>{t.news}</button>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <KPIpro label={t.goal} value={`${goalProgress.toFixed(1)}%`} sub={formatMoney(financialGoal)} />
            <KPIpro label={t.projection} value={formatMoney(finalBalance)} sub={`EDAD: ${retirementAge}`} />
            <KPIpro label="SEGURIDAD" value="BIT-SHIELD" sub="AES-256" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '450px 1fr', gap: '2rem' }}>
            <div style={{ background: 'rgba(37,99,235,0.05)', padding: '2rem', borderRadius: '30px' }}>
              <h3 style={{ color: '#2563eb', fontWeight: 950, marginBottom: '2rem' }}>{t.calibration}</h3>
              <UniversalInput label={t.currentAge} value={currentAge} onChange={setCurrentAge} />
              <UniversalInput label={t.targetAge} value={retirementAge} onChange={setRetirementAge} />
              <UniversalInput label={t.allocation} value={monthlyContribution} onChange={setMonthlyContribution} />
              <UniversalInput label={t.mainTarget} value={financialGoal} onChange={setFinancialGoal} />
            </div>

            <div style={{ height: '500px', background: 'rgba(37,99,235,0.02)', borderRadius: '30px', padding: '2rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projection}>
                  <XAxis dataKey="age" stroke="#4b5563" />
                  <Tooltip contentStyle={{ background: '#000', border: '1px solid #2563eb', borderRadius: '15px' }} />
                  <Area type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={5} fillOpacity={0.1} fill="#2563eb" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
