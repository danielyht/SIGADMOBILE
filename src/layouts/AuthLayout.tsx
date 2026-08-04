import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { PhoneFrame } from "../components/PhoneFrame";
import { useAuth } from "../context/AuthContext";

export default function AuthLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.isAdmin || user.plan) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/planos", { replace: true });
      }
    }
  }, [user, navigate]);

  return (
    <PhoneFrame>
      {/* h-full + overflow-y-auto enables scroll within the flex-1 content area */}
      <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <Outlet />
      </div>
    </PhoneFrame>
  );
}
