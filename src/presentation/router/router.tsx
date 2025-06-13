import { Navigate, createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { MarketplacePage } from "../pages/marketplace/MarketplacePage";

export const menuRoutes = [
  {
    to: "/chat-bot-marketplace",
    icon: "/home.svg",
    title: "Inicio",
    message: "Hola",
    restart: true,
    component: <MarketplacePage />,
  },
  {
    to: "/chat-bot-logo",
    icon: "/edit-logo.svg",
    title: "Cambiar Logo",
    message: "Hola, ayúdame a actualizar el logo.",
    restart: true,
    component: <MarketplacePage />,
  },
  {
    to: "/chat-bot-banner",
    icon: "/edit-banner.svg",
    title: "Cambiar banner",
    message: "Hola, ayúdame a cambiar el banner.",
    restart: true,
    component: <MarketplacePage />,
  },
  {
    to: "/chat-bot-description",
    icon: "/edit-description.svg",
    title: "Descripción de exhibidor",
    message: "Hola, ayúdame a cambiar la descripción del exhibidor.",
    restart: true,
    component: <MarketplacePage />,
  },
  {
    to: "/chat-bot-product",
    icon: "/create-product.svg",
    title: "Crear Producto",
    message: "Hola, ayúdame a crear el producto.",
    restart: true,
    component: <MarketplacePage />,
  },
  {
    to: "/chat-bot-proforma",
    icon: "/create-proforma.svg",
    title: "Crear Proforma",
    message: "Hola, ayúdame a crear la proforma.",
    restart: true,
    component: <MarketplacePage />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
      })),
      {
        path: "",
        element: <Navigate to={menuRoutes[0].to} />,
      },
    ],
  },
]);
