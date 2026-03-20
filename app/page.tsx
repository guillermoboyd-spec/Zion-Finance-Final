"use client";

import React, { useState, useMemo } from "react";
import { Cpu, Trophy, Wallet, TrendingUp, Activity, ShieldCheck, Sun, Moon, Fingerprint } from "lucide-react";

/**
 * ZION MASTER - VERSIÓN CORREGIDA
 * Los números se verán NEGROS dentro de los cuadros BLANCOS.
 */

export default function ZionFinal() {
  const [currentAge, setCurrentAge] = useState(30);
  const [targetAge, setTargetAge] = useState(65);
  const [monthlySaving, setMonthlySaving] = useState(500);
  const [yieldRate, setYieldRate] = useState(8);

  const projection = useMemo(() => {
    const years = targetAge - currentAge;
    if (years <= 0) return 0;
    const r = yieldRate / 100 / 12;
    const futureValue = monthlySaving * ((Math.pow(1 + r, years * 12) - 1) / r);
    return Math.round(futureValue);
  }, [currentAge, targetAge, monthlySaving, yieldRate]);

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 md:p-10">
      {/* CABECERA */}
      <nav className="flex justify-between items-center mb-10 border-b border-blue-500/20 pb-6">
        <div className="flex items-center space-x-3">
          <Cpu className="text-blue-500 w-10 h-10 animate-pulse" />
          <h1 className="text-2xl font-black tracking-tighter">NODE.<span className="text-blue-500">ZION</span></h1>
        </div>
        <div className="flex items-center space-x-4">
           <div className="text-[10px] font-bold text-emerald-500 flex items-center bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
             <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-ping" />
             LIVE_SYNC
           </div>
           <Fingerprint className="text-blue-500 w-6 h-6" />
        </div>
      </nav>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LADO IZQUIERDO: CONFIGURACIÓN */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-blue-500/20 p-8 rounded-[35px] backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-8">
            <Activity className="text-blue-500 w-6 h-6" />
            <h2 className="text-xl font-black uppercase tracking-widest text-blue-400">Node Configuration</h2>
          </div>

          <div className="space-y-6">
            {/* CUADRO 1 */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Current Age</label>
              <input 
                type="number" 
                value={currentAge} 
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full bg-white text-black font-black text-2xl p-4 rounded-xl border-2 border-blue-500/30 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* CUADRO 2 */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Target Age</label>
              <input 
                type="number" 
                value={targetAge} 
                onChange={(e) => setTargetAge(Number(e.target.value))}
                className="w-full bg-white text-black font-black text-2xl p-4 rounded-xl border-2 border-blue-500/30 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* CUADRO 3 */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Monthly Saving ($)</label>
              <input 
                type="number" 
                value={monthlySaving} 
                onChange={(e) => setMonthlySaving(Number(e.target.value))}
                className="w-full bg-white text-black font-black text-2xl p-4 rounded-xl border-2 border-blue-500/30 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* CUADRO 4 */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Expected Yield (%)</label>
              <input 
                type="number" 
                value={yieldRate} 
                onChange={(e) => setYieldRate(Number(e.target.value))}
                className="w-full bg-white text-black font-black text-2xl p-4 rounded-xl border-2 border-blue-500/30 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* LADO DERECHO: RESULTADOS */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-blue-600 p-10 rounded-[40px] shadow-[0_0_50px_rgba(37,99,235,0.3)] relative overflow-hidden">
             <Trophy className="text-white/20 w-32 h-32 absolute -right-5 -bottom-5" />
             <p className="text-xs font-black tracking-[0.3em] uppercase opacity-80 mb-2">Financial Goal Projection</p>
             <h3 className="text-6xl md:text-7xl font-black font-mono tracking-tighter">
               ${projection.toLocaleString()}
             </h3>
             <div className="mt-8 flex items-center space-x-2 bg-black/20 w-fit px-4 py-2 rounded-full border border-white/10">
               <ShieldCheck className="w-4 h-4 text-emerald-400" />
               <span className="text-[10px] font-bold tracking-widest uppercase">Secured by Zion Protocol</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-blue-500/10 p-6 rounded-3xl">
               <TrendingUp className="text-blue-500 mb-4" />
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Monthly Growth</p>
               <h4 className="text-xl font-black">+12.4%</h4>
            </div>
            <div className="bg-slate-900 border border-blue-500/10 p-6 rounded-3xl">
               <Wallet className="text-purple-500 mb-4" />
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Nodes</p>
               <h4 className="text-xl font-black">1,024</h4>
            </div>
          </div>
        </div>

      </div>
      
      <footer className="mt-20 text-center opacity-30 text-[10px] font-mono tracking-[0.5em] uppercase">
        Zion Omniverse © 2026 - Master Store Edition
      </footer>
    </div>
  );
}
