import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useMeQuery } from "@/feature/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { data: user, isLoading, error } = useMeQuery();
    const currentUser = user;
    console.log(currentUser)
    if (isLoading) {
        return (
        <div className="flex items-center justify-center min-h-screen bg-[#030306]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>  
        );
    }

    // If no user or there's an error, user is not authenticated
    if (!currentUser || error) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;