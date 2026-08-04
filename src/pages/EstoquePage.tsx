import { useState } from "react";
import { Search, Filter, Archive, Package } from "lucide-react";

const inputCls = "w-full h-10 px-3 border border-slate-200 rounded-xl text-sm text-slate-800 bg-white placeholder:text-slate-400 outline-none focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/10 transition-all";
const selectCls = "w-full h-10 px-3 border border-slate-200 rounded-xl text-sm text-slate-500 bg-white outline-none focus:border-[#1B3A6B] transition-all appearance-none";

export default function EstoquePage() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("todas");

  return (
    <div className="flex flex-col pb-6">
      <div className="px-5 pt-4 pb-4">
        <h1 className="text-xl font-bold text-slate-800">Estoque</h1>
        <p className="text-sm text-slate-500 mt-0.5">Visualize e gerencie todos os itens em estoque</p>
      </div>

      <div className="px-5 flex flex-col gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className={`${inputCls} pl-9`} placeholder="Buscar por item..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <select className={selectCls} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="todas">Todas as categorias</option>
              <option value="alimentos">Alimentos</option>
              <option value="higiene">Higiene</option>
              <option value="roupas">Roupas</option>
              <option value="medicamentos">Medicamentos</option>
            </select>
          </div>
          <button className="flex items-center gap-1.5 px-4 h-10 rounded-xl text-sm font-semibold flex-shrink-0 text-white" style={{ background: "#1B3A6B" }}>
            <Filter size={14} />
            Filtrar
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            {["Item", "Categoria", "Qtd"].map((h) => (
              <span key={h} className="text-xs font-bold text-slate-400 uppercase tracking-wide">{h}</span>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center">
              <Package size={24} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-400 max-w-[220px] leading-relaxed">
              Nenhum item encontrado com os filtros atuais.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Archive size={15} className="text-slate-400" />
            <span className="text-sm text-slate-500">Total de unidades em estoque:</span>
          </div>
          <span className="text-sm font-bold text-slate-800">0 unidades</span>
        </div>
      </div>
    </div>
  );
}
