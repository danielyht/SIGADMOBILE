import { useState } from "react";
import { FileSpreadsheet, Shuffle, Package, Gift, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type ReportTab = "semanal" | "mensal" | "beneficiario" | "beneficiado" | "categoria";

const weekData = [
  { day: "Seg", value: 0 },
  { day: "Ter", value: 0 },
  { day: "Qua", value: 0 },
  { day: "Qui", value: 0 },
  { day: "Sex", value: 0 },
  { day: "Sáb", value: 0 },
  { day: "Dom", value: 0 },
];

const TABS: { id: ReportTab; label: string }[] = [
  { id: "semanal", label: "Semanal" },
  { id: "mensal", label: "Mensal" },
  { id: "beneficiario", label: "Por beneficiário" },
  { id: "beneficiado", label: "Por beneficiado" },
  { id: "categoria", label: "Por categoria" },
];

export default function RelatoriosPage() {
  const [tab, setTab] = useState<ReportTab>("semanal");

  return (
    <div className="flex flex-col pb-6">
      <div className="px-5 pt-4 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Relatórios</h1>
          <p className="text-sm text-slate-500 mt-0.5">Distribuições por período</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 h-9 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
          <FileSpreadsheet size={14} className="text-green-600" />
          Exportar Excel
        </button>
      </div>

      <div className="px-5 flex flex-col gap-4">
        <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === t.id ? "text-white" : "bg-white border border-slate-200 text-slate-500"}`}
              style={tab === t.id ? { background: "#1B3A6B" } : {}}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "DISTRIBUIÇÕES", value: "0", icon: Shuffle, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "UNIDADES", value: "0", icon: Package, color: "text-purple-500", bg: "bg-purple-50" },
            { label: "BENEFICIADOS", value: "0", icon: Gift, color: "text-green-500", bg: "bg-green-50" },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 text-center">
              <div className={`w-7 h-7 rounded-lg ${k.bg} flex items-center justify-center mx-auto mb-2`}>
                <k.icon size={14} className={k.color} />
              </div>
              <p className="text-xl font-extrabold text-slate-800">{k.value}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5 leading-tight">{k.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <h2 className="text-sm font-bold text-slate-800 mb-1">Unidades distribuídas por dia da semana</h2>
          <p className="text-xs text-slate-400 mb-4">
            {tab === "semanal" && "Esta semana"}
            {tab === "mensal" && "Este mês"}
            {tab === "beneficiario" && "Por beneficiário"}
            {tab === "beneficiado" && "Por beneficiado"}
            {tab === "categoria" && "Por categoria"}
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={weekData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "none", borderRadius: 10, fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                formatter={(v: number) => [v, "Unidades"]}
              />
              <Bar dataKey="value" fill="#1B3A6B" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <div className="w-3 h-3 rounded-sm" style={{ background: "#1B3A6B", opacity: 0.8 }} />
              Unidades distribuídas
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-800">Detalhamento</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center">
              <AlertCircle size={24} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-400 max-w-[220px] leading-relaxed">
              Nenhum dado disponível para o período selecionado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
