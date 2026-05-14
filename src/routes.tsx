import { createBrowserRouter } from 'react-router-dom'
import {HomePage } from './HomePage'
import LoginPage from './auth/login'
import { SignupPage } from './auth/signUp'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signUp",
        element: <SignupPage />
    }
]);
