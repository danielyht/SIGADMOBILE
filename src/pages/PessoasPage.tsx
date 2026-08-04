import { useState } from "react";
import { Heart, Gift, UserPlus, Search, Info } from "lucide-react";

type PeopleTab = "doa" | "recebe";

const NAVY = "#1B3A6B";

export default function PessoasPage() {
  const [tab, setTab] = useState<PeopleTab>("doa");
  const [search, setSearch] = useState("");
  const isDoa = tab === "doa";

  return (
    <div className="flex flex-col pb-6">
      <div className="px-5 pt-4 pb-4">
        <h1 className="text-xl font-bold text-slate-800">Pessoas</h1>
        <p className="text-sm text-slate-500 mt-0.5">Gerencie beneficiários e beneficiados</p>
      </div>

      <div className="px-5 flex flex-col gap-3">
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          {([
            { id: "doa" as PeopleTab, label: "Quem doa", icon: Heart },
            { id: "recebe" as PeopleTab, label: "Quem recebe", icon: Gift },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? "bg-white shadow-sm" : "text-slate-500"}`}
              style={tab === t.id ? { color: NAVY } : {}}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        <button
          className="w-full h-10 rounded-lg text-white text-sm font-semibold flex items-center justify-center gap-2"
          style={{ background: NAVY }}
        >
          <UserPlus size={15} />
          {isDoa ? "+ Novo beneficiário" : "+ Cadastrar beneficiado"}
        </button>

        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full h-10 pl-9 pr-3.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-white placeholder:text-slate-400 outline-none focus:border-[#1B3A6B] transition-all"
            placeholder="Buscar por nome, e-mail ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex-1">Nome</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide w-20 text-right">Contato</span>
          </div>
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center">
              {isDoa ? <Heart size={24} className="text-slate-400" /> : <Gift size={24} className="text-slate-400" />}
            </div>
            <p className="text-sm text-slate-400 max-w-[220px] leading-relaxed">
              {isDoa ? "Nenhum beneficiário cadastrado." : "Nenhum beneficiado cadastrado."}
            </p>
          </div>
        </div>

        <div className={`rounded-xl p-3 flex items-start gap-2.5 border ${isDoa ? "bg-green-50 border-green-100" : "bg-purple-50 border-purple-100"}`}>
          <Info size={15} className={`flex-shrink-0 mt-0.5 ${isDoa ? "text-green-600" : "text-purple-600"}`} />
          <p className={`text-xs leading-relaxed ${isDoa ? "text-green-800" : "text-purple-800"}`}>
            {isDoa
              ? "Beneficiários são pessoas ou organizações que realizam doações de itens ao estoque."
              : "Beneficiados são pessoas que recebem itens do estoque através das distribuições."}
          </p>
        </div>
      </div>
    </div>
  );
}
