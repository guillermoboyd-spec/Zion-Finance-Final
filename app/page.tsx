"use client";

import React, { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import {
  Cpu, Wallet, TrendingUp, Activity, ShieldCheck, Sun, Moon, 
  Fingerprint, Trophy, Globe, Landmark, Zap, Target
} from "lucide-react";

/**
 * ZION OMNIVERSE v17.0 - RESTAURACIÓN TOTAL
 * El diseño original con los cálculos corregidos.
 */

export default function ZionPlatform() {
  const [lang, setLang] = useState("ES");
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Estados de la calculadora
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [yieldRate, setYieldRate] = useState(8);

  const projection = useMemo(() => {
    const years = retirementAge - currentAge;
    if (years <= 0) return 0;
    const r = yieldRate / 100 / 12;
    const futureValue = monthlyContribution * ((Math.pow(1 + r, years * 12) - 1) / r);
    return Math.round(futureValue);
  }, [currentAge, retirementAge, monthlyContribution, yieldRate]);

  const chartData = [
    { name: "ENE", v: 4000 }, { name: "FEB", v: 5500 }, { name: "MAR", v: 4800 },
    { name: "ABR", v: 7000 }, { name: "MAY", v: 6500 }, { name: "JUN", v: 9000 }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-black text-white" : "bg-slate-50 text-slate-900"} font-sans transition-all duration-500`}>
      {/* NAVEGACIÓN ORIGINAL */}
      <nav className="border-b border-blue-500/20 px-8 py-6 flex justify-between items-center backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Cpu className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="font-black tracking-tighter text-2xl">ZION <span className="text-blue-500">OMNIVERSE</span></h1>
            <p className="text-[10px] font-mono text-blue-400 font-bold">V17.0 GOLD MASTER EDITION</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex space-x-3 text-[10px] font-black">
            <button onClick={() => setLang("ES")} className={lang === "ES" ? "text-blue-500" : "text-slate-500"}>ES</button>
            <button onClick={() => setLang("EN")} className={lang === "EN" ? "text-blue-500" : "text-slate-500"}>EN</button>
            <button onClick={() => setLang("JP")} className={lang === "JP" ? "text-blue-500" : "text-slate-500"}>JP</button>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
          <button className="bg-blue-600 px-6 py-3 rounded-xl text-xs font-black flex items-center space-x-2 shadow-lg shadow-blue-600/20">
            <Fingerprint className="w-4 h-4" />
            <span>ACCESO</span>
          </button>
        </div>
      </nav>

      <main className="p-10 max-w-[1600px] mx-auto space-y-10">
        {/* TARJETAS DE VALORES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "VALOR TOTAL", val: "$428,590.22", icon: Wallet, col: "text-blue-500" },
            { label: "RENDIMIENTO", val: "+12.4%", icon: TrendingUp, col: "text-emerald-500" },
            { label: "NODOS ACTIVOS", val: "1,024", icon: Activity, col: "text-blue-400" },
            { label: "SEGURIDAD", val: "TITANIUM", icon: ShieldCheck, col: "text-purple-500" }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/40 border border-blue-500/10 p-8 rounded-[30px] backdrop-blur-md">
              <item.icon className={`${item.col} w-8 h-8 mb-4`} />
              <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">{item.label}</p>
              <h3 className="text-3xl font-black font-mono">{item.val}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* GRÁFICO PROFESIONAL */}
          <div className="lg:col-span-2 bg-slate-900/20 border border-blue-500/10 rounded-[40px] p-10 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black tracking-tighter uppercase">ANÁLISIS DE MERCADO</h2>
              <div className="bg-black/40 p-1 rounded-lg border border-blue-500/10">
                <button className="px-4 py-1 text-[10px] font-black bg-blue-600 rounded">1M</button>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={4} fill="url(#colorV)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CALCULADORA CON TU ESTILO */}
          <div className="bg-blue-600 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center space-x-4 mb-4">
                <Trophy className="w-10 h-10" />
                <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">PLAN DE<br/>JUBILACIÓN</h2>
              </div>

              <div className="space-y-4">
                {[
                  { label: "EDAD ACTUAL", val: currentAge, set: setCurrentAge, u: "AÑOS" },
                  { label: "EDAD OBJETIVO", val: retirementAge, set: setRetirementAge, u: "AÑOS" },
                  { label: "AHORRO MENSUAL", val: monthlyContribution, set: setMonthlyContribution, u: "$" },
                  { label: "RENDIMIENTO (%)", val: yieldRate, set: setYieldRate, u: "%" }
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-[10px] font-black opacity-70 tracking-widest uppercase mb-2 block">{f.label}</label>
                    <input 
                      type="number" 
                      value={f.val} 
                      onChange={(e) => f.set(Number(e.target.value))}
                      className="w-full bg-white text-black font-black text-xl p-4 rounded-2xl outline-none border-2 border-transparent focus:border-black/20 shadow-inner"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-[10px] font-black opacity-70 tracking-widest mb-1">PROYECCIÓN FINAL</p>
                <h3 className="text-5xl font-black font-mono">${projection.toLocaleString()}</h3>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-blue-500/10 p-10 text-center opacity-40">
        <p className="text-[10px] font-mono tracking-[0.4em]">ZION OMNIVERSE © 2026 - MASTER STORE EDITION</p>
      </footer>
    </div>
  );
}
