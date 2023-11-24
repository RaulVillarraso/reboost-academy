import { createBrowserRouter } from "react-router-dom"

import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Staff from "../pages/Staff/Staff";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Classes from "../pages/Classes/Classes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/staff",
                element: <Staff />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/clase",
                element: <Classes />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
])

export default router
