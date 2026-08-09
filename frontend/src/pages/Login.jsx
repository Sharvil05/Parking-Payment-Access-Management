import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    // =========================
    // LOGIN
    // =========================

    const handleLogin = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email: email,
                    password: password
                }
            );

            const data = response.data;

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            if (error.response?.status === 401) {

                setError(
                    "Invalid email or password"
                );

            } else {

                setError(
                    error.response?.data?.message ||
                    "Unable to connect to server"
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="login-page">

            {/* LEFT BRANDING SECTION */}

            <div className="login-brand">

                <div className="brand-icon">
                    🚗
                </div>

                <h1>
                    Parking
                    <span>Management</span>
                </h1>

                <p>
                    Smart Parking Payment &
                    Access Management System
                </p>


                <div className="brand-features">

                    <div>
                        <span>🅿️</span>
                        <p>
                            Smart Slot Management
                        </p>
                    </div>

                    <div>
                        <span>🚘</span>
                        <p>
                            Vehicle Entry & Exit
                        </p>
                    </div>

                    <div>
                        <span>💳</span>
                        <p>
                            Secure Payment Management
                        </p>
                    </div>

                </div>

            </div>


            {/* LOGIN CARD */}

            <div className="login-container">

                <div className="login-card">


                    {/* HEADER */}

                    <div className="login-header">

                        <div className="mobile-logo">
                            🚗
                        </div>

                        <h2>
                            Welcome Back
                        </h2>

                        <p>
                            Sign in to your parking
                            management account
                        </p>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="error-message">

                            <span>
                                ⚠️
                            </span>

                            <span>
                                {error}
                            </span>

                        </div>

                    )}


                    {/* FORM */}

                    <form onSubmit={handleLogin}>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ✉️
                                </span>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    🔒
                                </span>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword
                                        ? "🙈"
                                        : "👁️"
                                    }
                                </button>

                            </div>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >

                            {loading ? (

                                <>
                                    <span className="login-spinner"></span>
                                    Logging in...
                                </>

                            ) : (

                                <>
                                    Login
                                    <span>→</span>
                                </>

                            )}

                        </button>

                    </form>


                    {/* FOOTER */}

                    <div className="login-info">

                        <span>
                            🔐
                        </span>

                        Secure Parking Management

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;