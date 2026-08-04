import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Shield, ArrowLeft, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAVY = "#1B3A6B";
const inputCls =
  "w-full h-11 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-white placeholder:text-slate-400 outline-none focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/10 transition-all";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ nomeOng: "", cnpj: "", nomeAdmin: "", email: "", senha: "", confirmarSenha: "" });
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [termos, setTermos] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const passwordsMatch = form.senha && form.confirmarSenha && form.senha === form.confirmarSenha;
  const passwordMismatch = form.confirmarSenha && form.senha !== form.confirmarSenha;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.nomeOng || !form.nomeAdmin || !form.email || !form.senha) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    if (form.senha.length < 8) { setError("A senha deve ter no mínimo 8 caracteres."); return; }
    if (form.senha !== form.confirmarSenha) { setError("As senhas não coincidem."); return; }
    if (!termos) { setError("Aceite os Termos de Uso para continuar."); return; }
    register({ nomeOng: form.nomeOng, nomeAdmin: form.nomeAdmin, email: form.email, password: form.senha });
    // New accounts have no plan — send to plans page
    navigate("/planos", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-full px-6 pt-8 pb-8">
      <div className="flex items-center mb-6">
        <Link to="/login" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={16} /> Voltar
        </Link>
        <div className="flex-1 flex justify-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow" style={{ background: NAVY }}>
              <Shield size={22} className="text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight" style={{ color: NAVY }}>SIGAD</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-slate-800">Cadastrar Administrador</h1>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed max-w-[260px] mx-auto">
          Crie a conta da sua ONG para começar a gerenciar doações
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs text-red-600 font-medium">{error}</div>
        )}

        {/* Section 1 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: NAVY }}>1</div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dados da ONG</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Nome da ONG <span className="text-red-500">*</span></label>
              <input className={inputCls} placeholder="Ex: Amigos do Bem" value={form.nomeOng} onChange={set("nomeOng")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">CNPJ (opcional)</label>
              <input className={inputCls} placeholder="00.000.000/0001-00" value={form.cnpj} onChange={set("cnpj")} />
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Section 2 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: NAVY }}>2</div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dados do Administrador</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Nome completo <span className="text-red-500">*</span></label>
              <input className={inputCls} placeholder="Seu nome" value={form.nomeAdmin} onChange={set("nomeAdmin")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">E-mail corporativo <span className="text-red-500">*</span></label>
              <input type="email" className={inputCls} placeholder="adm@ong.org" value={form.email} onChange={set("email")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Criar Senha <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type={showSenha ? "text" : "password"} className={`${inputCls} pr-11`} placeholder="Mínimo 8 caracteres" value={form.senha} onChange={set("senha")} />
                <button type="button" onClick={() => setShowSenha(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showSenha ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {form.senha.length > 0 && form.senha.length < 8 && <p className="text-xs text-amber-500 font-medium">Mínimo de 8 caracteres</p>}
              {form.senha.length >= 8 && <p className="text-xs text-green-600 font-medium flex items-center gap-1"><Check size={12} /> Senha forte</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Confirmar Senha <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showConfirmar ? "text" : "password"}
                  className={`${inputCls} pr-11 ${passwordMismatch ? "border-red-400" : passwordsMatch ? "border-green-400" : ""}`}
                  placeholder="Digite a senha novamente"
                  value={form.confirmarSenha}
                  onChange={set("confirmarSenha")}
                />
                <button type="button" onClick={() => setShowConfirmar(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showConfirmar ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {passwordMismatch && <p className="text-xs text-red-500 font-medium">As senhas não coincidem</p>}
              {passwordsMatch && <p className="text-xs text-green-600 font-medium flex items-center gap-1"><Check size={12} /> Senhas coincidem</p>}
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        <button type="button" onClick={() => setTermos(v => !v)} className="flex items-start gap-3 text-left">
          <div
            className="mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all"
            style={termos ? { background: NAVY, borderColor: NAVY } : { borderColor: "#cbd5e1", background: "#fff" }}
          >
            {termos && <Check size={12} className="text-white" strokeWidth={3} />}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Estou de acordo com os{" "}
            <span className="font-semibold" style={{ color: NAVY }}>Termos de Uso</span>{" "}
            e{" "}
            <span className="font-semibold" style={{ color: NAVY }}>Política de Privacidade</span>.
          </p>
        </button>

        <button
          type="submit"
          className="w-full h-11 rounded-xl text-white text-sm font-bold shadow-md transition-opacity"
          style={{ background: NAVY, opacity: termos ? 1 : 0.5 }}
        >
          Criar Minha Conta
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Já possui acesso?{" "}
        <Link to="/login" className="font-bold" style={{ color: NAVY }}>Fazer Login</Link>
      </p>
    </div>
  );
}
