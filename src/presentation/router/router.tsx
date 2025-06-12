import { Navigate, createBrowserRouter } from "react-router-dom";
import { BotProformaPage, OrthographyPage } from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { QuotationPage } from "../pages/quotation/QuotationPage";
import { MarketplacePage } from "../pages/marketplace/MarketplacePage";
import { CompareQuotationPage } from "../pages/compare-quotation/CompareQuotationPage";

export const menuRoutes = [
  {
    to: "/chat-bot-order",
    icon: "fa-solid fa-cart-shopping",
    title: "Chat Bot Order",
    hidden: true,
    component: <OrthographyPage />,
  },
  {
    to: "/chat-bot-proform",
    icon: "fa-solid fa-chart-pie",
    title: "Chat Bot Proform",
    hidden: true,
    component: <BotProformaPage />,
  },
  {
    to: "/chat-bot-quotation",
    icon: "fa-solid fa-edit",
    title: "Chat Bot Quotation",
    hidden: true,
    component: <QuotationPage />,
  },
  {
    to: "/chat-bot-compare-quotation",
    icon: "fa-solid fa-file-invoice",
    title: "Chat Bot Compare Quotation",
    hidden: true,
    component: <CompareQuotationPage />,
  },
  {
    to: "/chat-bot-marketplace",
    icon: "fa-solid fa-store",
    title: "Asistente Construex",
    hidden: false,
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
