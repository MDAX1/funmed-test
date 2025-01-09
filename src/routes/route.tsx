import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import TestSearch from "../components/TestSearch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TestSearch />,
      },
    ],
  },
]);