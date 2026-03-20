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
 * ZION OMNIVERSE v17.0 - EDICIÓN GOLD MASTER STORE
 * Optimización final para la distribución de la Microsoft Store.
 */

type Language = "EN" | "ES" | "JP" | "ZH" | "FR" | "DE" | "AR" | "IT";
type Currency = "USD" | "EUR" | "GBP" | "JPY" | "SAR";

const TRANSLATIONS: Record<Language, any> = {
  ES: {
    access: "ACCESO", centralHub: "CENTRO CENTRAL", assetsVault: "BOVEDA", strategicOps: "ESTRATEGIA", profileId: "PASAPORTE", privacyControl: "PRIVACIDAD", disconnect: "DESCONECTAR", totalValue: "VALOR TOTAL",
    monthlyYield: "RENDIMIENTO MENSUAL", activeNodes: "NODOS ACTIVOS", securityLevel: "NIVEL DE SEGURIDAD", marketAnalysis: "ANÁLISIS DE MERCADO", recentActivity: "ACTIVIDAD RECIENTE", quickActions: "ACCIONES RÁPIDAS",
    nodeHealth: "SALUD DEL NODO", globalReach: "ALCANCE GLOBAL", pensionPlan: "PLAN DE JUBILACIÓN", currentSavings: "AHORROS ACTUALES", retirementGoal: "META DE JUBILACIÓN", monthlyContribution: "CONTRIBUCIÓN MENSUAL",
    estimatedAge: "EDAD ESTIMADA", projectGrowth: "CRECIMIENTO PROYECTADO", cryptoWallet: "BILLETERA CRIPTO", send: "ENVIAR", receive: "RECIBIR", swap: "CAMBIAR", settings: "AJUSTES", notifications: "NOTIFICACIONES",
    help: "AYUDA", languages: "IDIOMAS", appearance: "APARIENCIA", light: "CLARO", dark: "OSCURO", system: "SISTEMA", logout: "CERRAR SESIÓN", search: "BUSCAR", filter: "FILTRAR", sort: "ORDENAR", viewAll: "VER TODO",
    back: "VOLVER", save: "GUARDAR", cancel: "CANCELAR", edit: "EDITAR", delete: "ELIMINAR", success: "ÉXITO", error: "ERROR", warning: "ADVERTENCIA", info: "INFORMACIÓN"
  },
  EN: {
    access: "ACCESS", centralHub: "CENTRAL HUB", assetsVault: "VAULT", strategicOps: "STRATEGY", profileId: "PASSPORT", privacyControl: "PRIVACY", disconnect: "DISCONNECT", totalValue: "TOTAL VALUE",
    monthlyYield: "MONTHLY YIELD", activeNodes: "ACTIVE NODES", securityLevel: "SECURITY LEVEL", marketAnalysis: "MARKET ANALYSIS", recentActivity: "RECENT ACTIVITY", quickActions: "QUICK ACTIONS",
    nodeHealth: "NODE HEALTH", globalReach: "GLOBAL REACH", pensionPlan: "PENSION PLAN", currentSavings: "CURRENT SAVINGS", retirementGoal: "RETIREMENT GOAL", monthlyContribution: "MONTHLY CONTRIBUTION",
    estimatedAge: "ESTIMATED AGE", projectGrowth: "PROJECTED GROWTH", cryptoWallet: "CRYPTO WALLET", send: "SEND", receive: "RECEIVE", swap: "SWAP", settings: "SETTINGS", notifications: "NOTIFICATIONS",
    help: "HELP", languages: "LANGUAGES", appearance: "APPEARANCE", light: "LIGHT", dark: "DARK", system: "SYSTEM", logout: "LOGOUT", search: "SEARCH", filter: "FILTER", sort: "SORT", viewAll: "VIEW ALL",
    back: "BACK", save: "SAVE", cancel: "CANCEL", edit: "EDIT", delete: "DELETE", success: "SUCCESS", error: "ERROR", warning: "WARNING", info: "INFO"
  },
  JP: {
    access: "アクセス", centralHub: "セントラルハブ", assetsVault: "保管庫", strategicOps: "戦略", profileId: "パスポート", privacyControl: "プライバシー", disconnect: "切断", totalValue: "総額",
    monthlyYield: "月間収益", activeNodes: "アクティブノード", securityLevel: "セキュリティレベル", marketAnalysis: "市場分析", recentActivity: "最近の活動", quickActions: "クイックアクション",
    nodeHealth: "ノードの状態", globalReach: "グローバルリーチ", pensionPlan: "年金プラン", currentSavings: "現在の貯蓄", retirementGoal: "退職目標", monthlyContribution: "毎月の積み立て",
    estimatedAge: "推定年齢", projectGrowth: "予測成長", cryptoWallet: "暗号通貨ウォレット", send: "送信", receive: "受信", swap: "スワップ", settings: "設定", notifications: "通知",
    help: "ヘルプ", languages: "言語", appearance: "外観", light: "ライト", dark: "ダーク", system: "システム", logout: "ログアウト", search: "検索", filter: "フィルター", sort: "並べ替え", viewAll: "すべて表示",
    back: "戻る", save: "保存", cancel: "キャンセル", edit: "編集", delete: "削除", success: "成功", error: "エラー", warning: "警告", info: "情報"
  },
  ZH: {
    access: "接入", centralHub: "中央枢纽", assetsVault: "金库", strategicOps: "策略", profileId: "护照", privacyControl: "隐私", disconnect: "断开连接", totalValue: "总价值",
    monthlyYield: "月收益", activeNodes: "活跃节点", securityLevel: "安全级别", marketAnalysis: "市场分析", recentActivity: "近期活动", quickActions: "快速操作",
    nodeHealth: "节点健康", globalReach: "全球范围", pensionPlan: "养老金计划", currentSavings: "当前储蓄", retirementGoal: "退休目标", monthlyContribution: "每月供款",
    estimatedAge: "估计年龄", projectGrowth: "预计增长", cryptoWallet: "加密钱包", send: "发送", receive: "接收", swap: "交换", settings: "设置", notifications: "通知",
    help: "帮助", languages: "语言", appearance: "外观", light: "浅色", dark: "深色", system: "系统", logout: "登出", search: "搜索", filter: "筛选", sort: "排序", viewAll: "查看全部",
    back: "返回", save: "保存", cancel: "取消", edit: "编辑", delete: "删除", success: "成功", error: "错误", warning: "警告", info: "信息"
  },
  AR: {
    access: "دخول", centralHub: "المركز الرئيسي", assetsVault: "الخزنة", strategicOps: "استراتيجية", profileId: "جواز السفر", privacyControl: "الخصوصية", disconnect: "قطع الاتصال", totalValue: "القيمة الإجمالية",
    monthlyYield: "العائد الشهري", activeNodes: "العقد النشطة", securityLevel: "مستوى الأمان", marketAnalysis: "تحليل السوق", recentActivity: "النشاط الأخير", quickActions: "إجراءات سريعة",
    nodeHealth: "صحة العقدة", globalReach: "الوصول العالمي", pensionPlan: "خطة التقاعد", currentSavings: "المدخرات الحالية", retirementGoal: "هدف التقاعد", monthlyContribution: "المساهمة الشهرية",
    estimatedAge: "العمر التقديري", projectGrowth: "النمو المتوقع", cryptoWallet: "محفظة التشفير", send: "إرسال", receive: "استلام", swap: "تبديل", settings: "الإعدادات", notifications: "إشعارات",
    help: "مساعدة", languages: "اللغات", appearance: "المظهر", light: "فاتح", dark: "داكن", system: "النظام", logout: "تسجيل الخروج", search: "بحث", filter: "تصفية", sort: "فرز", viewAll: "عرض الكل",
    back: "رجوع", save: "حفظ", cancel: "إلغاء", edit: "تعديل", delete: "حذف", success: "نجاح", error: "خطأ", warning: "تحذير", info: "معلومات"
  }
};

const CHART_DATA = [
  { name: "JAN", value: 4500, flow: 2400 },
  { name: "FEB", value: 5200, flow: 1398 },
  { name: "MAR", value: 4800, flow: 9800 },
  { name: "APR", value: 6100, flow: 3908 },
  { name: "MAY", value: 5900, flow: 4800 },
  { name: "JUN", value: 7200, flow: 3800 }
];

const PIE_DATA = [
  { name: "BTC", value: 45 },
  { name: "ETH", value: 30 },
  { name: "SOL", value: 15 },
  { name: "USDT", value: 10 }
];

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

function InputField({ label, value, onChange, type = "number", isMoney = false, isText = false, unit = "" }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xs font-bold text-blue-400 tracking-widest uppercase">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(isText ? e.target.value : parseFloat(e.target.value) || 0)}
          className="w-full bg-slate-900/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-blue-500 transition-all"
          style={{ paddingLeft: isMoney ? "2.5rem" : "1.3rem" }}
        />
        {isMoney && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 font-bold">$</span>}
        {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-blue-400">{unit}</span>}
      </div>
    </div>
  );
}

export default function ZionDashboard() {
  const [lang, setLang] = useState<Language>("ES");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Pension States
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [yieldRate, setYieldRate] = useState(8);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.EN;

  const pensionCalculation = useMemo(() => {
    const years = retirementAge - currentAge;
    if (years <= 0) return 0;
    const months = years * 12;
    const r = yieldRate / 100 / 12;
    const futureValue = monthlyContribution * ((Math.pow(1 + r, months) - 1) / r);
    return Math.round(futureValue);
  }, [currentAge, retirementAge, monthlyContribution, yieldRate]);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-black text-white" : "bg-slate-50 text-slate-900"} font-sans transition-colors duration-500`}>
      {/* NAVEGACIÓN SUPERIOR */}
      <nav className="border-b border-blue-500/20 px-6 py-4 flex justify-between items-center backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black tracking-tighter text-xl">ZION <span className="text-blue-500">OMNIVERSE</span></h1>
            <p className="text-[10px] font-mono text-blue-400 leading-none">V17.0 GOLD MASTER</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <select 
            onChange={(e) => setLang(e.target.value as Language)}
            className="bg-transparent border-none text-xs font-bold focus:outline-none cursor-pointer"
          >
            <option value="ES">ESPAÑOL</option>
            <option value="EN">ENGLISH</option>
            <option value="JP">日本語</option>
            <option value="ZH">中文</option>
            <option value="AR">العربية</option>
          </select>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-blue-500/10 rounded-full transition-colors">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="h-8 w-[1px] bg-blue-500/20" />
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-blue-600/20">
            <Fingerprint className="w-4 h-4" />
            <span>{t.access}</span>
          </button>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* HEADER DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: t.totalValue, val: "$428,590.22", icon: Wallet, color: "text-blue-500" },
            { label: t.monthlyYield, val: "+12.4%", icon: TrendingUp, color: "text-emerald-500" },
            { label: t.activeNodes, val: "1,024", icon: Activity, color: "text-blue-400" },
            { label: t.securityLevel, val: "TITANIUM", icon: ShieldCheck, color: "text-purple-500" }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/40 border border-blue-500/10 p-6 rounded-2xl hover:border-blue-500/40 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <item.icon className={`${item.color} w-6 h-6`} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">{item.label}</p>
              <h3 className="text-2xl font-black font-mono">{item.val}</h3>
            </div>
          ))}
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* GRAFICO DE CRECIMIENTO */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-blue-500/10 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-black tracking-tight">{t.marketAnalysis}</h2>
                <p className="text-xs text-slate-500 font-mono">LIVE NETWORK FEED</p>
              </div>
              <div className="flex space-x-2">
                {['1D', '1W', '1M', '1Y'].map(t => (
                  <button key={t} className="px-3 py-1 text-[10px] font-bold border border-blue-500/20 rounded hover:bg-blue-500 hover:text-white transition-all">{t}</button>
                ))}
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CALCULADORA DE JUBILACIÓN */}
          <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-600/40">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8" />
                <h2 className="text-xl font-black uppercase tracking-tighter">{t.pensionPlan}</h2>
              </div>
              
              <div className="space-y-4">
                <InputField label={t.estimatedAge} value={currentAge} onChange={setCurrentAge} unit="AÑOS" />
                <InputField label={t.retirementGoal} value={retirementAge} onChange={setRetirementAge} unit="AÑOS" />
                <InputField label={t.monthlyContribution} value={monthlyContribution} onChange={setMonthlyContribution} isMoney />
                <InputField label="RENDIMIENTO ANUAL" value={yieldRate} onChange={setYieldRate} unit="%" />
              </div>

              <div className="pt-6 border-t border-white/20">
                <p className="text-[10px] font-bold opacity-80 tracking-widest mb-1">PROYECCIÓN FINAL</p>
                <h3 className="text-4xl font-black font-mono tracking-tighter">
                  ${pensionCalculation.toLocaleString()}
                </h3>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-blue-500/10 p-12 text-center">
        <div className="flex justify-center space-x-8 mb-8 grayscale opacity-50">
          <Landmark className="w-6 h-6" />
          <Globe className="w-6 h-6" />
          <ShieldCheck className="w-6 h-6" />
        </div>
        <p className="text-[10px] font-mono text-slate-500 tracking-[0.3em]">
          &copy; 2026 ZION OMNIVERSE FINANCIAL SYSTEMS. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
