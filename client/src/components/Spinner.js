import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/Spinner.css'
const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&
            navigate(`/${path}`, {
                state: location.pathname,
            });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);
    return (
        <>
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <h1 className="Text-center">redirecting to you in {count} second </h1>
                <span class="loader"></span>
            </div>
        </>
    );
};

export default Spinner;