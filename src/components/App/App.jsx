import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../../pages/Index.jsx";
import NotFound from "../../pages/NotFound/NotFound.jsx";
import Room from "../../pages/Room/Room.jsx";
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import api from "../../utils/Api.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import InfoToolTip from "../InfoToolTip/InfoToolTip.jsx";

const queryClient = new QueryClient();

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [tooltip, setTooltip] = useState({
        isOpen: false,
        isSuccess: false,
        message: "",
    });

    const handleLogin = async ({ email, password }) => {
        const data = await api.signin({ email, password });

        localStorage.setItem("jwt", data.token);
        const user = await api.getCurrentUser();
        const currentUserData = user.user || user;
        flushSync(() => {
            setCurrentUser(currentUserData);
        });
        return currentUserData;
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
    };

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("jwt");
            if (!token) {
                setIsAuthChecked(true);
                return;
            }

            try {
                const user = await api.getCurrentUser();
                setCurrentUser(user.user || user);
            } catch {
                localStorage.removeItem("jwt");
                setCurrentUser(null);
            } finally {
                setIsAuthChecked(true);
            }
        };
        checkToken();
    }, []);
    if (!isAuthChecked) {
        return null;
    }
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Index
                                currentUser={currentUser}
                                onLogin={handleLogin}
                                onLogout={handleLogout}
                                isAuthChecked={isAuthChecked}
                                setTooltip={setTooltip}
                            />
                        } />
                    <Route path="/room" element={<ProtectedRoute currentUser={currentUser}>
                        <Room currentUser={currentUser} onLogin={handleLogin} />
                    </ProtectedRoute>} />
                    <Route path="/room/:code" element={<ProtectedRoute currentUser={currentUser}>
                        <Room currentUser={currentUser} onLogin={handleLogin} />
                    </ProtectedRoute>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <InfoToolTip
                    isOpen={tooltip.isOpen}
                    isSuccess={tooltip.isSuccess}
                    message={tooltip.message}
                    onClose={() =>
                        setTooltip({
                            isOpen: false,
                            isSuccess: false,
                            message: "",
                        })
                    }
                />
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
