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
 * VERSIÓN CORREGIDA: NÚMEROS VISIBLES (NEGRO SOBRE BLANCO)
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

// --- COMPONENTE DE ENTRADA CORREGIDO ---
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
          width: "100%",
          padding: "1.2rem",
          borderRadius: "16px",
          border: "2px solid #2563eb33",
          backgroundColor: "white", // FONDO BLANCO
          color: "black",          // LETRAS NEGRAS
          fontSize: "1.2rem",
          fontWeight: "800",
          outline: "none"
        }}
      />
    </div>
  );
}

function KPIpro({ label, value, sub, icon, progress }: any) {
  return (
    <div style={{ background: 'rgba(37,99,235,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '2.5rem', borderRadius: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ color: '#2563eb' }}>{icon}</div>
      </div>
      <p style={{ fontSize: '0.75rem', fontWeight: 950, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>{label}</p>
      <h3 style={{ fontSize: '2.4rem', fontWeight: 950, margin: 0, letterSpacing: '-0.04em' }}>{value}</h3>
      <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', marginTop: '0.5rem' }}>{sub}</p>
      {progress !== undefined && (
        <div style={{ width: '100%', height: '6px', background: 'rgba(37,99,235,0.1)', borderRadius: '
