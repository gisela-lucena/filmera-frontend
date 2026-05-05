import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
    const location = useLocation();
    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="notfound">
            <div className="notfound__box">
                <h1 className="notfound__code">404</h1>
                <p className="notfound__text">Oops! Page not found</p>
                <a href="/" className="notfound__link">Return to Home</a>
            </div>
        </div>
    );
};

export default NotFound;
