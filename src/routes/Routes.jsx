import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/DashBoard/Dashboard";
import EmployeeDetails from "../pages/EmployeeDetails/EmployeeDetails";
import PaymentHistory from "../pages/PaymentHistory/PaymentHistory";
import WorkSheet from "../pages/WorkSheet/WorkSheet";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/employeeDetails/:id',
                element: <EmployeeDetails></EmployeeDetails>
            },
            {
                path: '/paymentHistory/:email',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: '/workSheet/:email',
                element: <WorkSheet></WorkSheet>
            },
        ]
    },
]);

export default router