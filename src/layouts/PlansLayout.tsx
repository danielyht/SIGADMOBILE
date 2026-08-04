import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { PhoneFrame } from "../components/PhoneFrame";
import { useAuth } from "../context/AuthContext";

export default function PlansLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
    else if (user.isAdmin || user.plan) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <PhoneFrame>
      <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <Outlet />
      </div>
    </PhoneFrame>
  );
}
