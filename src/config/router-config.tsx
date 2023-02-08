import { createBrowserRouter } from "react-router-dom";

import Main from "../main";
import MouseDrawingPage from "../pages/mouse-drawing-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "mouse-drawing",
        element: <MouseDrawingPage />,
      },
    ],
  },
]);

export default router;
