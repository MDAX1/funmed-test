import { createBrowserRouter } from "react-router-dom";
import { Assets } from "../pages/Assets";
import { AssetDetail } from "../pages/AssetDetail";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Assets />,
      },
      {
        path: "images",
        element: <Assets type="image" />,
      },
      {
        path: "documents",
        element: <Assets type="document" />,
      },
      {
        path: "videos",
        element: <Assets type="video" />,
      },
      {
        path: "favorites",
        element: <Assets favorite={true} />,
      },
      {
        path: "trash",
        element: <Assets trash={true} />,
      },
      {
        path: "asset/:id",
        element: <AssetDetail />,
      },
    ],
  },
]);