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
import { AnalysisDetails } from './components/AnalysisDetails'
import { ErrorPage } from './pages/ErrorPage'
import { AuthCallbackPage } from './pages/AuthCallbackPage'
import ProtectedRoute from './auth/ProtectedRoute'

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
        path:"/auth/callback",
        element: <AuthCallbackPage/>
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
            <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {index: true, element: <Dashboard/>},
            {path: 'analysis',  element : <AnalysisPage/>},
            {path: 'analysis-details/:id',  element : <AnalysisDetails/>},
            {path: 'history',  element: <HistoryPage/>},
            {path: 'settings' , element : <SettingsPage/>}

        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);
