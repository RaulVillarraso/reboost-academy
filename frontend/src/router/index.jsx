import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Staff from "../pages/Staff/Staff";
import Signup from "../pages/Signup/Signup";
import Classes from "../pages/Classes/Classes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/staff',
                element: <Staff/>
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/clase",
                element: <Classes />,
            }
        ]
        
    }
])

export default router