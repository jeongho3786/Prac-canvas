import { createBrowserRouter } from "react-router-dom";

import Main from "../main";
import MouseDrawingPage from "../pages/mouse-drawing-page";
import RainEffectPage from "src/pages/rain-effect-page";
import WaveEffectPage from "src/pages/wave-effect-page";
import TestPage from "src/pages/test-page";

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
      {
        path: "wave-effect",
        element: <WaveEffectPage />,
      },
      {
        path: "test",
        element: <TestPage />,
      },
    ],
  },
]);

export default router;
