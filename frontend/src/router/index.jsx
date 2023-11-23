import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Staff from "../pages/Staff/Staff";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Classes from "../pages/Classes/Classes";
import SkeletonChildren from "../pages/Suscriptions/Suscription";
import BasicStack from "../pages/Suscriptions/Suscription";
import Suscription from "../pages/Suscriptions/Suscription";

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
                path: "/login",
                element: <Login />
            },
            {
                path: "/clase",
                element: <Classes />,
            },
            {
                path: "/suscription",
                element: <Suscription />,
            }
        ],
    },
])

export default router