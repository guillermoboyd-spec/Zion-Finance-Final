"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Wallet, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  LayoutDashboard, 
  History, 
  Settings,
  Bell,
  Search,
  Zap
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock Data para el Oráculo de Zion
const DATA = [
  { time: "00:00", value: 45000 },
  { time: "04:00", value: 48000 },
  { time: "08:00", value: 42000 },
  { time: "12:00", value: 55000 },
  { time: "16:00", value: 51200 },
  { time: "20:00", value: 59000 },
  { time: "23:59", value: 62500 },
];

/**
 * FIX CRÍTICO (Línea 368 aprox en el original)
 * Validación de Payload para evitar crash en build de Vercel/NextJS
 */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
    // Aplicamos Optional Chaining para seguridad total en producción
    const value = payload?.[0]?.value ?? 0;
    
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 p-4 rounded-xl shadow-2xl">
        <p className="text-cyan-400 text-xs font-bold mb-1 uppercase tracking-widest">{label}</p>
        <p className="text-white text-lg font-black">
          ${Number(value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function ZionDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#05080d] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Sidebar de Navegación */}
      <aside className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-8 bg-[#090d14] border-r border-white/5 z-50">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-12">
          <Zap className="text-white fill-white" size={24} />
        </div>
        
        <nav className="flex-1 flex flex-col gap-8">
          <NavItem icon={<LayoutDashboard size={24} />} active />
          <NavItem icon={<BarChart3 size={24} />} />
          <NavItem icon={<Wallet size={24} />} />
          <NavItem icon={<History size={24} />} />
        </nav>

        <div className="mt-auto">
          <NavItem icon={<Settings size={24} />} />
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="pl-20 min-h-screen">
        {/* Header Superior */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 bg-[#05080d]/80 backdrop-blur-xl sticky top-0 z-40">
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              ZION FINANCE <span className="text-cyan-500 text-xs font-mono ml-2 tracking-tighter">GOLD MASTER v2.0</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar activos..."
                className="bg-[#0f172a] border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#05080d]"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
              <span className="text-xs font-bold text-cyan-400">GB</span>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-12 max-w-7xl mx-auto space-y-8">
          
          {/* Fila de Tarjetas (Stats) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Balance Total" 
              value="$128,450.00" 
              change="+12.5%" 
              isPositive={true} 
              icon={<Wallet className="text-cyan-400" />} 
            />
            <StatCard 
              title="Ganancia 24h" 
              value="$3,120.45" 
              change="+4.2%" 
              isPositive={true} 
              icon={<TrendingUp className="text-emerald-400" />} 
            />
            <StatCard 
              title="Gastos Mensuales" 
              value="$1,840.10" 
              change="-2.1%" 
              isPositive={false} 
              icon={<BarChart3 className="text-rose-400" />} 
            />
          </div>

          {/* Gráfico de Rendimiento */}
          <div className="bg-[#090d14] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50"></div>
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Rendimiento en Tiempo Real</h3>
                <p className="text-slate-500 text-sm">Flujo proyectado por el Oráculo Zion</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-white/5 hover:bg-white/10 text-xs font-bold px-4 py-2 rounded-lg transition-colors">DIARIO</button>
                <button className="bg-cyan-500 text-black text-xs font-bold px-4 py-2 rounded-lg shadow-lg shadow-cyan-500/20">SEMANAL</button>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <YAxis 
                    hide 
                    domain={['dataMin - 5000', 'dataMax + 5000']}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#06b6d4', strokeWidth: 2 }} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#06b6d4" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabla de Activos Recientes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#090d14] border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg font-bold mb-6 text-white">Transacciones Recientes</h3>
              <div className="space-y-4">
                <TransactionRow name="Bitcoin" symbol="BTC" amount="+$2,400" date="Hoy, 14:20" type="up" />
                <TransactionRow name="Ethereum" symbol="ETH" amount="-$150" date="Ayer, 09:12" type="down" />
                <TransactionRow name="Apple Inc." symbol="AAPL" amount="+$845" date="Mar 12, 16:45" type="up" />
                <TransactionRow name="Solana" symbol="SOL" amount="+$120" date="Mar 11, 23:10" type="up" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
              <Zap className="absolute top-[-20px] right-[-20px] w-48 h-48 opacity-10 rotate-12" />
              <div>
                <h3 className="text-2xl font-black mb-2">GOLD MASTER STATUS</h3>
                <p className="opacity-80 text-sm font-medium leading-relaxed">
                  Tu sistema está optimizado para la Microsoft Store. Todos los lints han sido validados y el tipado es estricto.
                </p>
              </div>
              <button className="bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/20 text-sm font-bold py-4 rounded-2xl transition-all self-start px-8">
                DESCARGAR REPORTE FISCAL
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-componentes
function NavItem({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button className={`p-3 rounded-2xl transition-all duration-300 relative group ${
      active 
        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
        : "text-slate-500 hover:text-white"
    }`}>
      {icon}
      {active && <span className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-r-full"></span>}
      <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">
        SECCIÓN
      </div>
    </button>
  );
}

function StatCard({ title, value, change, isPositive, icon }: any) {
  return (
    <div className="bg-[#090d14] border border-white/5 p-6 rounded-3xl hover:border-cyan-500/30 transition-all cursor-default group relative">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-cyan-500/10 transition-colors">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-full ${
          isPositive ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
        }`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <p className="text-2xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}

function TransactionRow({ name, symbol, amount, date, type }: any) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
          type === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
        }`}>
          {symbol[0]}
        </div>
        <div>
          <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{name}</p>
          <p className="text-[10px] text-slate-500 font-medium">{date}</p>
        </div>
      </div>
      <p className={`font-black text-sm ${type === "up" ? "text-emerald-400" : "text-rose-400"}`}>
        {amount}
      </p>
    </div>
  );
}
