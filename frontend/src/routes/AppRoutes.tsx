import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import CadastroProfissional  from "../pages/CadastroProfissionais";

const Layout = lazy(() => import("../components/Layout"))

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "profissionais",
                element: <CadastroProfissional />
            }
        ]
    }
])

export default AppRoutes