import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Registraion from "./pages/Registration";
import PrivateRoute from "./controllers/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategory from "./pages/AdminCategory";
import AdminProducts from "./pages/AdminProducts";
import AdminBanners from "./pages/AdminBanners";
import Product from "./pages/Product";
import TrackOrders from "./pages/TrackOrders";
import AdminOrders from "./pages/AdminOrders";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/registration",
        element: <Registraion />
    },
    {
        path: "/admin-dashboard",
        element: <PrivateRoute Component={AdminDashboard} />
    },
    {
        path: "/admin-dashboard/category",
        element: <PrivateRoute Component={AdminCategory} />
    },
    {
        path: "/admin-dashboard/products",
        element: <PrivateRoute Component={AdminProducts} />
    },
    {
        path: "/admin-dashboard/banners",
        element: <PrivateRoute Component={AdminBanners} />
    }, {
        path: "/product/:id",
        element: <Product />
    },
    {
        path: "/myorders",
        element: <PrivateRoute Component={TrackOrders} />
    },
    {
        path: "/admin-dashboard/orders",
        element: <PrivateRoute Component={AdminOrders} />
    }
])

export default routes;