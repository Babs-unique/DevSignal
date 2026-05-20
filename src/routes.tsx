import { createBrowserRouter } from 'react-router-dom'
import {HomePage } from './HomePage'
import LoginPage from './auth/login'
import { SignupPage } from './auth/signUp'
import ResetPasswordPage from './auth/reset'
import { DashboardLayout } from './layout/dashboardLayout'
import { Dashboard } from './pages/Dashboard'
import { AnalysisPage } from './pages/AnalysisPage'
import { HistoryPage } from './pages/HistoryPage'
import { SettingsPage } from './pages/SettingsPage'


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
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/reset",
        element: <ResetPasswordPage />
    },
    {
        path: "/dashboard",
        element: (
            <DashboardLayout />
        ),
        children: [
            {index: true, element: <Dashboard/>},
            {path: 'analysis',  element : <AnalysisPage/>},
            {path: 'history',  element: <HistoryPage/>},
            {path: 'settings' , element : <SettingsPage/>}

        ]
    }
]);
