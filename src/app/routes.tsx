import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import PlansLayout from "../layouts/PlansLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PlansPage from "../pages/PlansPage";
import DashboardPage from "../pages/DashboardPage";
import EstoquePage from "../pages/EstoquePage";
import RegistrarPage from "../pages/RegistrarPage";
import PessoasPage from "../pages/PessoasPage";
import RelatoriosPage from "../pages/RelatoriosPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", Component: LoginPage },
      { path: "/register", Component: RegisterPage },
    ],
  },
  {
    element: <PlansLayout />,
    children: [
      { path: "/planos", Component: PlansPage },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: "/dashboard", Component: DashboardPage },
      { path: "/estoque", Component: EstoquePage },
      { path: "/registrar", Component: RegistrarPage },
      { path: "/pessoas", Component: PessoasPage },
      { path: "/relatorios", Component: RelatoriosPage },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
