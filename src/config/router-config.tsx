import { createBrowserRouter } from "react-router-dom";

import Main from "../main";
import MouseDrawing from "../page/mouse-drawing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "mouse-drawing",
        element: <MouseDrawing />,
      },
    ],
  },
]);

export default router;
