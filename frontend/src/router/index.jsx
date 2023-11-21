import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Staff from "../pages/Staff/Staff";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/staff',
                element: <Staff/>
            }
        ]
    }
])

export default router