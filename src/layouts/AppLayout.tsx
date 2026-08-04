import { useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router";
import { LayoutDashboard, Archive, PlusSquare, Users, BarChart2, LogOut } from "lucide-react";
import { PhoneFrame } from "../components/PhoneFrame";
import { useAuth } from "../context/AuthContext";

const NAVY = "#1B3A6B";

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/estoque", label: "Estoque", icon: Archive },
  { path: "/registrar", label: "Registrar", icon: PlusSquare },
  { path: "/pessoas", label: "Pessoas", icon: Users },
  { path: "/relatorios", label: "Relatórios", icon: BarChart2 },
];

function BottomNav() {
  const location = useLocation();
  return (
    <div className="flex-shrink-0 bg-white border-t border-slate-100">
      <div className="flex items-stretch">
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors"
            >
              <item.icon
                size={21}
                strokeWidth={active ? 2.5 : 1.8}
                style={{ color: active ? NAVY : "#94a3b8" }}
              />
              <span className="text-[9px] font-bold tracking-wide" style={{ color: active ? NAVY : "#94a3b8" }}>
                {item.label}
              </span>
              {active && <div className="w-1 h-1 rounded-full" style={{ background: NAVY }} />}
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center py-1.5">
        <div className="w-28 h-1 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
}

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else if (!user.isAdmin && !user.plan) {
      navigate("/planos", { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <PhoneFrame>
      {/* Flex column: scrollable content + fixed bottom nav */}
      <div className="h-full flex flex-col">
        {/* Top-right logout */}
        <div className="absolute top-2 right-4 z-30">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-400 text-[10px] font-semibold hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={11} />
            Sair
          </button>
        </div>

        {/* Scrollable page content */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <Outlet />
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
