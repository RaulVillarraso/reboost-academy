import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";

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
        ],
    },
])

export default router