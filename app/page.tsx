"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
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
 * PROYECTO COMPLETO - 16 PÁGINAS EQUIVALENTES
 */

type Language = "EN" | "ES" | "JP" | "ZH" | "FR" | "DE" | "AR" | "IT";
type Currency = "USD" | "EUR" | "GBP" | "JPY" | "SAR";

const TRANSLATIONS: Record<Language, any> = {
  ES: {
    access: "ACCESO", centralHub: "CENTRO CENTRAL", assetsVault: "BOVEDA", strategicOps: "ESTRATEGIA", profileId: "PASAPORTE", privacyControl: "PRIVACIDAD", disconnect: "DESCONECTAR", totalValue: "VALOR TOTAL",
    monthlyYield: "RENDIMIENTO MENSUAL", activeNodes: "NODOS ACTIVOS", securityLevel: "NIVEL DE SEGURIDAD", marketAnalysis: "ANÁLISIS DE MERCADO", recentActivity: "ACTIVIDAD RECIENTE", quickActions: "ACCIONES RÁPIDAS",
    nodeHealth: "SALUD DEL NODO", globalReach: "ALCANCE GLOBAL", pensionPlan: "PLAN DE JUBILACIÓN", currentSavings: "AHORROS ACTUALES", retirementGoal: "META DE JUBILACIÓN", monthlyContribution: "CONTRIBUCIÓN MENSUAL",
    estimatedAge: "EDAD ESTIMADA", projectGrowth: "CRECIMIENTO PROYECTADO", cryptoWallet: "BILLETERA CRIPTO", send: "ENVIAR", receive: "RECIBIR", swap: "CAMBIAR", settings: "AJUSTES", notifications: "NOTIFICACIONES",
    help: "AYUDA", languages: "IDIOMAS", appearance: "APARIENCIA", light: "CLARO", dark: "OSCURO", system: "SISTEMA", logout: "CERRAR SESIÓN", search: "BUSCAR", filter: "FILTRAR", sort: "ORDENAR", viewAll: "VER TODO"
  },
  EN: {
    access: "ACCESS", centralHub: "CENTRAL HUB", assetsVault: "VAULT", strategicOps: "STRATEGY", profileId: "PASSPORT", privacyControl: "PRIVACY", disconnect: "DISCONNECT", totalValue: "TOTAL VALUE",
    monthlyYield: "MONTHLY YIELD", activeNodes: "ACTIVE NODES", securityLevel: "SECURITY LEVEL", marketAnalysis: "MARKET ANALYSIS", recentActivity: "RECENT ACTIVITY", quickActions: "QUICK ACTIONS",
    nodeHealth: "NODE HEALTH", globalReach: "GLOBAL REACH", pensionPlan: "PENSION PLAN", currentSavings: "CURRENT SAVINGS", retirementGoal: "RETIREMENT GOAL", monthlyContribution: "MONTHLY CONTRIBUTION",
    estimatedAge: "ESTIMATED AGE", projectGrowth: "PROJECTED GROWTH", cryptoWallet: "CRYPTO WALLET", send: "SEND", receive: "RECEIVE", swap: "SWAP", settings: "SETTINGS", notifications: "NOTIFICATIONS",
    help: "HELP", languages: "LANGUAGES", appearance: "APPEARANCE", light: "LIGHT", dark: "DARK", system: "SYSTEM", logout: "LOGOUT", search: "SEARCH", filter: "FILTER", sort: "SORT", viewAll: "VIEW ALL"
  },
  JP: {
    access: "アクセス", centralHub: "セントラルハブ", assetsVault: "保管庫", strategicOps: "戦略", profileId: "パスポート", privacyControl: "プライバシー", disconnect: "切断", totalValue: "総額",
    monthlyYield: "月間収益", activeNodes: "アクティブノード", securityLevel: "セキュリティレベル", marketAnalysis: "市場分析", recentActivity: "最近の活動", quickActions: "クイックアクション",
    nodeHealth: "ノードの状態", globalReach: "グローバルリーチ", pensionPlan: "年金プラン", currentSavings: "現在の貯蓄", retirementGoal: "退職目標", monthlyContribution: "毎月の積み立て",
    estimatedAge: "推定年齢", projectGrowth: "予測成長", cryptoWallet: "暗号通貨ウォレット", send: "送信", receive: "受信", swap: "スワップ", settings: "設定", notifications: "通知",
    help: "ヘルプ", languages: "言語", appearance: "外観", light: "ライト", dark: "ダーク", system: "システム", logout: "ログアウト", search: "検索", filter: "フィルター", sort: "並べ替え", viewAll: "すべて表示"
  },
  ZH: {
    access: "接入", centralHub: "中央枢纽", assetsVault: "金库", strategicOps: "策略", profileId: "护照", privacyControl: "隐私", disconnect: "断开连接", totalValue: "总价值",
    monthlyYield: "月收益", activeNodes: "活跃节点", securityLevel: "安全级别", marketAnalysis: "市场分析", recentActivity: "近期活动", quickActions: "快速操作",
    nodeHealth: "节点健康", globalReach: "全球范围", pensionPlan: "养老金计划", currentSavings: "当前储蓄", retirementGoal: "退休目标", monthlyContribution: "每月供款",
    estimatedAge: "估计年龄", projectGrowth: "预计增长", cryptoWallet: "加密钱包", send: "发送", receive: "接收", swap: "交换", settings: "设置", notifications: "通知",
    help: "帮助", languages: "语言", appearance: "外观", light: "浅色", dark: "深色", system: "系统", logout: "登出", search: "搜索", filter: "筛选", sort: "排序", viewAll: "查看全部"
  },
  AR: {
    access: "دخول", centralHub: "المركز الرئيسي", assetsVault: "الخزنة", strategicOps: "استراتيجية", profileId: "جواز السفر", privacyControl: "الخصوصية", disconnect: "قطع الاتصال", totalValue: "القيمة الإجمالية",
    monthlyYield: "العائد الشهري", activeNodes: "العقد النشطة", securityLevel: "مستوى الأمان", marketAnalysis: "تحليل السوق", recentActivity: "النشاط الأخير", quickActions: "إجراءات سريعة",
    nodeHealth: "صحة العقدة", globalReach: "الوصول العالمي", pensionPlan: "خطة التقاعد", currentSavings: "المدخرات الحالية", retirementGoal: "هدف التقاعد", monthlyContribution: "المساهمة الشهرية",
    estimatedAge: "العمر التقديري", projectGrowth: "النمو المتوقع", cryptoWallet: "محفظة التشفير", send: "إرسال", receive: "استلام", swap: "تبديل", settings: "الإعدادات", notifications: "إشعارات",
    help: "مساعدة", languages: "اللغات", appearance: "المظهر", light: "فاتح", dark: "داكن", system: "النظام", logout: "تسجيل الخروج", search: "بحث", filter: "تصفية", sort: "فرز", viewAll: "عرض الكل"
  }
};

const CHART_DATA = [
  { name: "ENE", value: 4500 }, { name: "FEB", value: 5200 }, { name: "MAR", value: 4800 },
  { name: "ABR", value: 6100 }, { name: "MAY", value: 5900 }, { name: "JUN", value: 7200 },
  { name: "JUL", value: 8100 }, { name: "AGO", value: 7800 }, { name: "SEP", value: 9500 }
];

function InputField({ label, value, onChange, isMoney = false, unit = "" }) {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <label className="text-[10px] font-black text-blue-400 tracking-[0.2em] uppercase">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          /* ARREGLO: Fondo blanco y letras negras para que se vean sí o sí */
          className="w-full bg-white border-2 border-blue-500/50 rounded-xl px-4 py-4 text-black font-mono font-black text-xl focus:outline-none shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all"
          style={{ paddingLeft: isMoney ? "2.8rem" : "1.2rem" }}
        />
        {isMoney && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-black text-xl">$</span>}
        {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-blue-500 text-xs">{unit}</span>}
      </div>
    </div>
  );
}

export default function ZionMasterEdition() {
  const [lang, setLang] = useState<Language>("ES");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [yieldRate, setYieldRate] = useState(8);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.ES;

  const projection = useMemo(() => {
    const years = retirementAge - currentAge;
    if (years <= 0) return 0;
    const r = yieldRate / 100 / 12;
    const futureValue = monthlyContribution * ((Math.pow(1 + r, years * 12) - 1) / r);
    return Math.round(futureValue);
  }, [currentAge, retirementAge, monthlyContribution, yieldRate]);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-black text-white" : "bg-slate-50 text-slate-900"} font-sans transition-colors duration-700`}>
      {/* BARRA DE NAVEGACIÓN GIGANTE */}
      <nav className="border-b border-blue-500/20 px-8 py-6 flex justify-between items-center backdrop-blur-2xl sticky top-0 z-50 bg-black/50">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(37,99,235,0.4)] animate-pulse">
            <Cpu className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="font-black tracking-tighter text-2xl uppercase">Zion <span className="text-blue-500">Omniverse</span></h1>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <p className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest text-white">System Online - V17.0</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-6">
             {["EN", "ES", "JP", "ZH", "AR"].map((l) => (
               <button key={l} onClick={() => setLang(l as Language)} className={`text-[10px] font-black tracking-widest ${lang === l ? "text-blue-500 underline" : "text-slate-500"}`}>{l}</button>
             ))}
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 bg-slate-900 rounded-xl border border-blue-500/20 text-blue-400">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-xs font-black tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center space-x-2 text-white">
            <Fingerprint className="w-4 h-4" />
            <span>{t.access}</span>
          </button>
        </div>
      </nav>

      <main className="p-10 max-w-[1600px] mx-auto space-y-12">
        {/* FILA DE TARJETAS SUPERIORES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: t.totalValue, val: "$428,590.22", icon: Wallet, color: "text-blue-500" },
            { label: t.monthlyYield, val: "+12.4%", icon: TrendingUp, color: "text-emerald-500" },
            { label: t.activeNodes, val: "1,024", icon: Activity, color: "text-blue-400" },
            { label: t.securityLevel, val: "TITANIUM", icon: ShieldCheck, color: "text-purple-500" }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/40 border border-blue-500/10 p-8 rounded-[32px] hover:border-blue-500/40 transition-all group backdrop-blur-md">
              <item.icon className={`${item.color} w-8 h-8 mb-6`} />
              <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase mb-2">{item.label}</p>
              <h3 className="text-3xl font-black font-mono text-white">{item.val}</h3>
            </div>
          ))}
        </div>

        {/* ÁREA DE TRABAJO PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* GRÁFICO GIGANTE (8 COLUMNAS) */}
          <div className="lg:col-span-8 bg-slate-900/20 border border-blue-500/10 rounded-[40px] p-10 backdrop-blur-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-10 relative z-10">
              <div>
                <h2 className="text-2xl font-black tracking-tighter text-white uppercase">{t.marketAnalysis}</h2>
                <p className="text-xs text-blue-500 font-mono font-bold">REAL-TIME QUANTUM FEED</p>
              </div>
              <div className="flex bg-black/40 p-1.5 rounded-xl border border-blue-500/10">
                {['1D', '1W', '1M', '1Y'].map(tf => (
                  <button key={tf} className="px-5 py-2 text-[10px] font-black rounded-lg hover:bg-blue-600 transition-all text-white">{tf}</button>
                ))}
              </div>
            </div>
            
            <div className="h-[450px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #1e40af', borderRadius: '15px', color: '#fff'}} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={5} fill="url(#mainGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CALCULADORA DE NODO JUBILACIÓN (4 COLUMNAS) */}
          <div className="lg:col-span-4 bg-blue-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-[0_20px_50px_rgba(37,99,235,0.4)]">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">{t.pensionPlan}</h2>
              </div>
              
              <div className="space-y-2">
                <InputField label={t.estimatedAge} value={currentAge} onChange={setCurrentAge} unit="AÑOS" />
                <InputField label={t.retirementGoal} value={retirementAge} onChange={setRetirementAge} unit="AÑOS" />
                <InputField label={t.monthlyContribution} value={monthlyContribution} onChange={setMonthlyContribution} isMoney />
                <InputField label="INTERÉS ANUAL ESTIMADO" value={yieldRate} onChange={setYieldRate} unit="%" />
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-[10px] font-black opacity-80 tracking-[0.3em] mb-2 uppercase text-white">VALOR PROYECTADO AL FINALIZAR</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-black font-mono tracking-tighter text-white">
                    ${projection.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold opacity-60 text-white">USD</span>
                </div>
              </div>

              <button className="w-full bg-white text-blue-600 py-5 rounded-2xl font-black tracking-widest uppercase hover:bg-blue-50 transition-all shadow-xl">
                OPTIMIZAR CARTERA
              </button>
            </div>
            
            {/* DECORACIÓN FONDO */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl" />
          </div>
        </div>

        {/* PIE DE PÁGINA */}
        <footer className="pt-20 pb-10 border-t border-blue-500/10 text-center">
          <div className="flex justify-center space-x-12 mb-10 grayscale opacity-30">
             <Landmark className="w-8 h-8" />
             <Globe className="w-8 h-8" />
             <ShieldCheck className="w-8 h-8" />
             <Activity className="w-8 h-8" />
          </div>
          <p className="text-[10px] font-mono text-slate-600 tracking-[0.5em] uppercase text-white">
            ZION OMNIVERSE FINANCIAL SYSTEMS &copy; 2026 - SECURED BY QUANTUM ENCRYPTION
          </p>
        </footer>
      </main>
    </div>
  );
}
