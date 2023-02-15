import { createBrowserRouter } from "react-router-dom";

import Main from "../main";
import MouseDrawingPage from "../pages/mouse-drawing-page";
import RainEffectPage from "src/pages/rain-effect-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "mouse-drawing",
        element: <MouseDrawingPage />,
      },
      {
        path: "rain-effect",
        element: <RainEffectPage />,
      },
    ],
  },
]);

export default router;
