import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const response =
                    await api.get("/dashboard/summary");

                setDashboard(response.data);

            } catch (error) {

                console.error(
                    "Dashboard error:",
                    error
                );

                if (error.response?.status === 401) {

                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    navigate("/login");

                    return;
                }

                setError(
                    "Unable to load dashboard"
                );
            }
        };

        loadDashboard();

    }, [navigate]);


    const handleLogout = () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to logout?"
            );

        if (!confirmed) {
            return;
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };


    if (error) {

        return (
            <div className="page-message">

                <h2>{error}</h2>

                <button
                    onClick={handleLogout}
                >
                    Back to Login
                </button>

            </div>
        );
    }


    if (!dashboard) {

        return (
            <div className="page-message">

                <h2>
                    Loading dashboard...
                </h2>

            </div>
        );
    }


    const user =
        JSON.parse(
            localStorage.getItem("user") || "{}"
        );


    return (

        <div className="dashboard-page">


            {/* =====================================
                WELCOME SECTION
            ===================================== */}

            <section className="dashboard-welcome">

                <div className="welcome-content">

                    <div className="welcome-icon">
                        🅿️
                    </div>

                    <div>

                        <span className="welcome-label">
                            Welcome back!
                        </span>

                        <h2>
                            Welcome to Parking
                            Management System
                        </h2>

                        <p>
                            Manage parking access,
                            vehicles, payments and
                            parking operations from
                            one place.
                        </p>

                    </div>

                </div>


 <div className="welcome-user">

    <div className="welcome-user-info">

        <div className="welcome-avatar">
            {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"
            }
        </div>

        <div className="welcome-user-details">

            <span className="logged-label">
                Logged in as
            </span>

            <strong>
                {user.name || "Parking Admin"}
            </strong>

            <span className="admin-role">
                {user.role || "ADMIN"}
            </span>

        </div>

    </div>


    <button
        className="welcome-logout-button"
        onClick={handleLogout}
        title="Logout"
    >
        <span className="logout-icon">
            🚪
        </span>

        <span>
            Logout
        </span>
    </button>

</div>

            </section>


            {/* =====================================
                PAGE TITLE
            ===================================== */}

            <div className="dashboard-title">

                <div>

                    <h1>
                        Parking Dashboard
                    </h1>

                    <p>
                        Overview of your parking
                        operations and activity.
                    </p>

                </div>

            </div>


            {/* =====================================
                STATISTICS
            ===================================== */}

            <div className="dashboard-stats">


                {/* TOTAL USERS */}

                <div className="dashboard-stat-card users-card">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            👥
                        </div>

                        <span>
                            Users
                        </span>

                    </div>

                    <strong>
                        {dashboard.totalUsers}
                    </strong>

                    <p>
                        Registered users
                    </p>

                </div>


                {/* TOTAL VEHICLES */}

                <div className="dashboard-stat-card vehicles-card">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            🚘
                        </div>

                        <span>
                            Vehicles
                        </span>

                    </div>

                    <strong>
                        {dashboard.totalVehicles}
                    </strong>

                    <p>
                        Registered vehicles
                    </p>

                </div>


                {/* TOTAL SLOTS */}

                <div className="dashboard-stat-card slots-card">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            🅿️
                        </div>

                        <span>
                            Parking Slots
                        </span>

                    </div>

                    <strong>
                        {dashboard.totalParkingSlots}
                    </strong>

                    <p>
                        Total parking capacity
                    </p>

                </div>


                {/* AVAILABLE */}

                <div className="dashboard-stat-card available-card">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            ✓
                        </div>

                        <span>
                            Available
                        </span>

                    </div>

                    <strong>
                        {dashboard.availableSlots}
                    </strong>

                    <p>
                        Slots available
                    </p>

                </div>


                {/* OCCUPIED */}

                <div className="dashboard-stat-card occupied-card">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            🚗
                        </div>

                        <span>
                            Occupied
                        </span>

                    </div>

                    <strong>
                        {dashboard.occupiedSlots}
                    </strong>

                    <p>
                        Currently occupied
                    </p>

                </div>


                {/* ACTIVE SESSIONS */}

                <div className="dashboard-stat-card active-card">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            ⏱
                        </div>

                        <span>
                            Active Sessions
                        </span>

                    </div>

                    <strong>
                        {dashboard.activeSessions}
                    </strong>

                    <p>
                        Vehicles currently parked
                    </p>

                </div>


                {/* COMPLETED */}

                <div className="dashboard-stat-card completed-card">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            ✓
                        </div>

                        <span>
                            Completed
                        </span>

                    </div>

                    <strong>
                        {dashboard.completedSessions}
                    </strong>

                    <p>
                        Completed sessions
                    </p>

                </div>


                {/* PAYMENTS */}

                <div className="dashboard-stat-card payments-card">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            💳
                        </div>

                        <span>
                            Payments
                        </span>

                    </div>

                    <strong>
                        {dashboard.totalPayments}
                    </strong>

                    <p>
                        Successful payments
                    </p>

                </div>


                {/* REVENUE */}

                <div className="dashboard-stat-card revenue-dashboard-card">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon revenue-icon">
                            ₹
                        </div>

                        <span>
                            Total Revenue
                        </span>

                    </div>

                    <strong>
                        ₹
                        {Number(
                            dashboard.totalRevenue || 0
                        ).toFixed(2)}
                    </strong>

                    <p>
                        Total parking revenue
                    </p>

                </div>


            </div>


            {/* =====================================
                PARKING OVERVIEW
            ===================================== */}

            <section className="dashboard-overview">

                <div className="overview-header">

                    <div>

                        <h3>
                            Parking Overview
                        </h3>

                        <p>
                            Current parking capacity
                            and availability.
                        </p>

                    </div>

                    <div className="overview-icon">
                        📊
                    </div>

                </div>


                <div className="overview-content">

                    <div className="overview-item">

                        <span>
                            Total Capacity
                        </span>

                        <strong>
                            {dashboard.totalParkingSlots}
                        </strong>

                    </div>


                    <div className="overview-item">

                        <span>
                            Available
                        </span>

                        <strong className="available-number">
                            {dashboard.availableSlots}
                        </strong>

                    </div>


                    <div className="overview-item">

                        <span>
                            Occupied
                        </span>

                        <strong className="occupied-number">
                            {dashboard.occupiedSlots}
                        </strong>

                    </div>


                    <div className="overview-item">

                        <span>
                            Occupancy
                        </span>

                        <strong>

                            {dashboard.totalParkingSlots
                                ? Math.round(
                                    (
                                        dashboard.occupiedSlots /
                                        dashboard.totalParkingSlots
                                    ) * 100
                                )
                                : 0
                            }%

                        </strong>

                    </div>

                </div>


                {/* OCCUPANCY BAR */}

                <div className="occupancy-section">

                    <div className="occupancy-label">

                        <span>
                            Parking Occupancy
                        </span>

                        <strong>

                            {dashboard.totalParkingSlots
                                ? Math.round(
                                    (
                                        dashboard.occupiedSlots /
                                        dashboard.totalParkingSlots
                                    ) * 100
                                )
                                : 0
                            }%

                        </strong>

                    </div>


                    <div className="occupancy-bar">

                        <div
                            className="occupancy-progress"
                            style={{
                                width: `${
                                    dashboard.totalParkingSlots
                                        ? (
                                            dashboard.occupiedSlots /
                                            dashboard.totalParkingSlots
                                        ) * 100
                                        : 0
                                }%`
                            }}
                        />

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;