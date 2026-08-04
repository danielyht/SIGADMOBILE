import { useState } from "react";
import { useNavigate } from "react-router";
import { Check, Shield, Zap, Building2, LogOut, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import type { PlanType } from "../context/AuthContext";

const NAVY = "#1B3A6B";

interface Plan {
  id: PlanType;
  name: string;
  price: string;
  period: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  badge?: string;
  features: string[];
  cta: string;
}

const PLANS: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    price: "R$ 29",
    period: "/mês",
    icon: Shield,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    features: [
      "Estoque com até 100 itens",
      "10 beneficiários cadastrados",
      "5 beneficiados cadastrados",
      "Relatórios básicos",
      "Suporte por e-mail",
    ],
    cta: "Assinar Básico",
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 79",
    period: "/mês",
    icon: Zap,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    badge: "Mais popular",
    features: [
      "Estoque ilimitado",
      "Beneficiários ilimitados",
      "Beneficiados ilimitados",
      "Relatórios completos + exportação",
      "Registro de distribuições",
      "Suporte prioritário",
    ],
    cta: "Assinar Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "R$ 149",
    period: "/mês",
    icon: Building2,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    features: [
      "Tudo do plano Pro",
      "Múltiplos usuários admin",
      "Integração via API",
      "Painel multi-ONG",
      "Onboarding personalizado",
      "Suporte dedicado 24/7",
    ],
    cta: "Assinar Enterprise",
  },
];

export default function PlansPage() {
  const { user, selectPlan, logout } = useAuth();
  const navigate = useNavigate();
  const [selecting, setSelecting] = useState<PlanType>(null);

  const handleSelect = (planId: PlanType) => {
    setSelecting(planId);
    setTimeout(() => {
      selectPlan(planId);
      navigate("/dashboard", { replace: true });
    }, 600);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col pb-8">
      {/* Header */}
      <div className="px-5 pt-4 pb-5" style={{ background: NAVY }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="text-white font-extrabold tracking-tight text-lg">SIGAD</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 text-white/80 text-[10px] font-semibold"
          >
            <LogOut size={11} />
            Sair
          </button>
        </div>

        <div className="text-center py-2">
          <p className="text-white/70 text-sm font-medium">
            Olá, <span className="text-white font-bold">{user?.nomeAdmin}</span>
          </p>
          <h1 className="text-white text-xl font-bold mt-1">Escolha seu plano</h1>
          <p className="text-white/60 text-xs mt-1.5 leading-relaxed">
            Para acessar o sistema, a ONG <strong className="text-white/80">{user?.nomeOng}</strong> precisa assinar um plano.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="px-5 flex flex-col gap-3 mt-4">
        {PLANS.map((plan) => {
          const isPro = plan.id === "pro";
          const isSelecting = selecting === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl border-2 overflow-hidden transition-all ${
                isPro ? "border-amber-400 shadow-lg shadow-amber-100" : "border-slate-200"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="bg-amber-400 px-4 py-1 flex items-center justify-center gap-1.5">
                  <Star size={11} className="text-amber-900" fill="currentColor" />
                  <span className="text-amber-900 text-xs font-bold">{plan.badge}</span>
                </div>
              )}

              <div className="bg-white p-4">
                {/* Plan header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl ${plan.iconBg} flex items-center justify-center`}>
                      <plan.icon size={18} className={plan.iconColor} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{plan.name}</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-xl font-extrabold" style={{ color: NAVY }}>{plan.price}</span>
                        <span className="text-xs text-slate-400">{plan.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-1.5 mb-4">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check size={13} className="text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleSelect(plan.id)}
                  disabled={selecting !== null}
                  className={`w-full h-10 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    isPro
                      ? "bg-amber-400 text-amber-900 hover:bg-amber-500"
                      : "text-white hover:opacity-90"
                  } ${selecting !== null && selecting !== plan.id ? "opacity-40" : ""}`}
                  style={!isPro ? { background: NAVY } : {}}
                >
                  {isSelecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Ativando...
                    </>
                  ) : (
                    plan.cta
                  )}
                </button>
              </div>
            </div>
          );
        })}

        <p className="text-center text-xs text-slate-400 mt-1">
          Pagamento seguro · Cancele quando quiser · Suporte em português
        </p>
      </div>
    </div>
  );
}
