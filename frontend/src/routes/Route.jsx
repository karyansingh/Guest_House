import { lazy } from "react"
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LandingPage from "../pages/LandingPage"

import DashboardComponent from "../components/dashboard/DashboardComponent"
import ProtectedRoute from "./ProtectedRoute"


const HomePage = lazy(() => import('../pages/HomePage'))
const RegistrationPage = lazy(() => import('../pages/RegistrationPage'))

//const Logout = lazy(() => import('../pages/Logout'))



const componentMap = {
    HomePage,
    //Logout,
};


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <LandingPage />
            },
            {
                path: "/registration",
                element: <RegistrationPage />
            },
            // {
            //     path: "/forgot-password",
            //     element: <ForgetPasswordPage />
            // },
            {
                path: "/dashboard",
                element: <ProtectedRoute component="HomePage" >
                    <DashboardComponent />
                </ProtectedRoute>,

                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute  component="HomePage">
                                <HomePage />
                            </ProtectedRoute>
                        ),
                       
                    },
                ]
            },
        ],
    },
])
