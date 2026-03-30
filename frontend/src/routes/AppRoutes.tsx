import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import CadastroProfissional  from "../pages/cadastroProfissionail";
import AssociacaoProfissionalProjeto from "../pages/associacaoProfissionalProjeto";

const Layout = lazy(() => import("../components/Layout"))

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/profissionais" replace />
            },
            {
                path: "profissionais",
                element: <CadastroProfissional />
            },
            {
                path: "associacoes",
                element: <AssociacaoProfissionalProjeto />
            }
        ]
    }
])

export default AppRoutes