import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Layout = lazy(() => import("../components/Layout"))
const ApontamentoTempo = lazy(() => (import("../pages/ApontamentoTempo")))
const DashboardPage = lazy(() => (import("../pages/Financeiro/FinanceiroPage")))

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "apontamento/tempo/",
                element: <ApontamentoTempo />
            },
            {
                path:"financeiro",
                element: <DashboardPage/>
            }
        ]
    }
])

export default AppRoutes