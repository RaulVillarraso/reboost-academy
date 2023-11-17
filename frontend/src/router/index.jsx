import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Root from "../layouts/Root";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
])

export default router