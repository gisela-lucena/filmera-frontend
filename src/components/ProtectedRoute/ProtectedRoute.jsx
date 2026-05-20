import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ currentUser, children }) => {
    const location = useLocation();

    if (!currentUser) {
        return (
            <Navigate
                to="/"
                replace
                state={{
                    openLogin: true,
                    from: location.pathname,
                }}
            />
        );
    }
    return children;
};

export default ProtectedRoute;