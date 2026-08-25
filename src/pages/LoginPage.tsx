import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAVY = "#1B3A6B";
const inputCls =
  "w-full h-11 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-800 bg-white placeholder:text-slate-400 outline-none focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/10 transition-all";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error ?? "Erro ao entrar.");
      return;
    }
    // AuthLayout's useEffect will redirect based on isAdmin/plan
    // But we can also redirect directly here for speed:
    const stored = JSON.parse(localStorage.getItem("sigad_user") ?? "{}");
    if (stored.isAdmin || stored.plan) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/planos", { replace: true });
    }
  };

  return (
    <div className="flex flex-col min-h-full px-6 pt-10 pb-8">
      <div className="flex justify-center mb-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: NAVY }}>
            <Shield size={28} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight" style={{ color: NAVY }}>SIGAD</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-xl font-bold text-slate-800">Acesso do Administrador</h1>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
          Entre com suas credenciais para gerenciar a ONG
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">E-mail cadastrado</label>
          <input
            type="email"
            className={inputCls}
            placeholder="exemplo@ong.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Senha</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              className={`${inputCls} pr-11`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <div className="flex justify-end">
            <button type="button" className="text-xs font-semibold" style={{ color: NAVY }}>
              Esqueceu sua senha?
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-xl text-white text-sm font-bold shadow-md transition-opacity hover:opacity-90"
          style={{ background: NAVY }}
        >
          Entrar no Sistema
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400 font-medium">ou</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <p className="text-center text-sm text-slate-500">
        Não tem uma conta?{" "}
        <Link to="/register" className="font-bold" style={{ color: NAVY }}>
          Cadastrar nova ONG
        </Link>
      </p>

      <div className="mt-auto pt-8 flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <Shield size={12} />
        <span>Acesso protegido e criptografado</span>
      </div>
    </div>
  );
}
