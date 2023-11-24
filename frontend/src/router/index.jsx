import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Calendar from "../pages/Home/Calendar/Calendar";

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
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/calendar",
                element: <Calendar />
            },
        ],
    },
])

export default router