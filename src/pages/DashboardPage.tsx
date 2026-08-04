import { useNavigate } from "react-router";
import { Package, Heart, Gift, Shuffle, BarChart2, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const kpis = [
    { label: "ITENS NO ESTOQUE", value: "0", subtitle: "Total de itens cadastrados", icon: Package, bg: "bg-blue-50", iconColor: "text-blue-500" },
    { label: "BENEFICIÁRIOS", value: "0", subtitle: "Quem doa", icon: Heart, bg: "bg-green-50", iconColor: "text-green-500" },
    { label: "BENEFICIADOS", value: "0", subtitle: "Quem recebe", icon: Gift, bg: "bg-purple-50", iconColor: "text-purple-500" },
    { label: "DISTRIBUIÇÕES", value: "0", subtitle: "Total registrado", icon: Shuffle, bg: "bg-orange-50", iconColor: "text-orange-500" },
  ];

  const quickActions = [
    { label: "Registrar Item", icon: Package, color: "bg-blue-50 text-blue-600", path: "/registrar" },
    { label: "Registrar Distribuição", icon: Shuffle, color: "bg-purple-50 text-purple-600", path: "/registrar" },
    { label: "Novo Beneficiário", icon: Heart, color: "bg-green-50 text-green-600", path: "/pessoas" },
    { label: "Ver Relatórios", icon: BarChart2, color: "bg-orange-50 text-orange-600", path: "/relatorios" },
  ];

  return (
    <div className="flex flex-col pb-6">
      <div className="flex items-center justify-between px-5 pt-4 pb-4">
        <div>
          <p className="text-xs text-slate-400 font-medium">{user?.nomeOng}</p>
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">Visão geral do sistema de doações</p>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow"
          style={{ background: "#1B3A6B" }}
        >
          {user?.nomeAdmin?.charAt(0) ?? "A"}
        </div>
      </div>

      <div className="px-5 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <div className={`w-9 h-9 rounded-lg ${k.bg} flex items-center justify-center mb-3`}>
                <k.icon size={18} className={k.iconColor} />
              </div>
              <p className="text-3xl font-extrabold text-slate-800 leading-none">{k.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">{k.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{k.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Atividades Recentes</h2>
            <span className="text-xs text-slate-400">Hoje</span>
          </div>
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center">
              <Info size={24} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-400 max-w-[220px] leading-relaxed">
              Nenhuma atividade registrada ainda.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <h2 className="text-sm font-bold text-slate-800 mb-3">Acesso Rápido</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.path)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${a.color} text-xs font-semibold transition-opacity hover:opacity-80`}
              >
                <a.icon size={14} />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
