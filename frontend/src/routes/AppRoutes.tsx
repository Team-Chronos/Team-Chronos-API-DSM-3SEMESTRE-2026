import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import CadastroProfissional  from "../pages/cadastroProfissionail";
import GestaoProfissionais from "../pages/gestaoDeProfissionais";
import Login from "../pages/login";

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
            },
            {
                path:"/login",
                element: <Login/>
            }
            
        ]
    }
])

export default AppRoutes