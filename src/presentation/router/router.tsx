import { Navigate, createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { MarketplacePage } from "../pages/marketplace/MarketplacePage";
import homeIcon from "/home.svg";
import editLogoIcon from "/edit-logo.svg";
import editBannerIcon from "/edit-banner.svg";
import editDescriptionIcon from "/edit-description.svg";
import createProductIcon from "/create-product.svg";
import createProformaIcon from "/create-proforma.svg";

export const menuRoutes = [
  {
    to: "/chat-bot-marketplace",
    icon: homeIcon,
    title: "Inicio",
    message: "Hola",
    restart: true,
    component: <MarketplacePage message="" restart={false} />,
  },
  {
    to: "/chat-bot-logo",
    icon: editLogoIcon,
    title: "Cambiar Logo",
    message: "Hola, ayúdame a actualizar el logo.",
    restart: true,
    component: (
      <MarketplacePage
        message="Hola, ayúdame a actualizar el logo."
        restart={true}
      />
    ),
  },
  {
    to: "/chat-bot-banner",
    icon: editBannerIcon,
    title: "Cambiar banner",
    message: "Hola, ayúdame a cambiar el banner.",
    restart: true,
    component: (
      <MarketplacePage
        message="Hola, ayúdame a cambiar el banner."
        restart={true}
      />
    ),
  },
  {
    to: "/chat-bot-description",
    icon: editDescriptionIcon,
    title: "Descripción de exhibidor",
    message: "Hola, ayúdame a cambiar la descripción del exhibidor.",
    restart: true,
    component: (
      <MarketplacePage
        message="Hola, ayúdame a cambiar la descripción del exhibidor."
        restart={true}
      />
    ),
  },
  {
    to: "/chat-bot-product",
    icon: createProductIcon,
    title: "Crear Producto",
    message: "Hola, ayúdame a crear el producto.",
    restart: true,
    component: (
      <MarketplacePage
        message="Hola, ayúdame a crear el producto"
        restart={true}
      />
    ),
  },
  {
    to: "/chat-bot-proforma",
    icon: createProformaIcon,
    title: "Crear Proforma",
    message: "Hola, ayúdame a crear la proforma.",
    restart: true,
    component: (
      <MarketplacePage
        message="Hola, ayúdame a crear la proforma."
        restart={true}
      />
    ),
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
],{
  basename: "/ui-bot/",
});
