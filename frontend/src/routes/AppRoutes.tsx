import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import CadastroProfissional  from "../pages/cadastroProfissionail";
import GestaoProfissionais from "../pages/gestaoDeProfissionais";

const Layout = lazy(() => import("../components/Layout"))

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "profissionais",
                element: <CadastroProfissional />
            },
            {
                path: "/gestao-profissionais",
                element: <GestaoProfissionais />
            }
        ]
    }
])

export default AppRoutes