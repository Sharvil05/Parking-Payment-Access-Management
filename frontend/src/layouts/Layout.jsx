// import { NavLink, Outlet, useNavigate } from "react-router-dom";

// function Layout() {

//     const navigate = useNavigate();

//     const user = JSON.parse(
//         localStorage.getItem("user") || "{}"
//     );


//     // =========================
//     // LOGOUT
//     // =========================

//     const handleLogout = () => {

//         const confirmed = window.confirm(
//             "Are you sure you want to logout?"
//         );

//         if (!confirmed) {
//             return;
//         }

//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         navigate("/login");
//     };


//     return (

//         <div className="app-layout">

//             {/* SIDEBAR */}

//             <aside className="sidebar">

//                 <div className="sidebar-logo">

//                     <div className="logo-icon">
//                         🚗
//                     </div>

//                     <div>

//                         <h2>
//                             Parking
//                         </h2>

//                         <span>
//                             Management
//                         </span>

//                     </div>

//                 </div>


//                 <nav className="sidebar-nav">

//                     <NavLink
//                         to="/dashboard"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "nav-item active"
//                                 : "nav-item"
//                         }
//                     >
//                         📊
//                         <span>
//                             Dashboard
//                         </span>
//                     </NavLink>


//                     <NavLink
//                         to="/users"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "nav-item active"
//                                 : "nav-item"
//                         }
//                     >
//                         👥
//                         <span>
//                             Users
//                         </span>
//                     </NavLink>


//                     <NavLink
//                         to="/vehicles"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "nav-item active"
//                                 : "nav-item"
//                         }
//                     >
//                         🚘
//                         <span>
//                             Vehicles
//                         </span>
//                     </NavLink>


//                     <NavLink
//                         to="/parking-slots"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "nav-item active"
//                                 : "nav-item"
//                         }
//                     >
//                         🅿️
//                         <span>
//                             Parking Slots
//                         </span>
//                     </NavLink>


//                     <NavLink
//                         to="/entry-exit"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "nav-item active"
//                                 : "nav-item"
//                         }
//                     >
//                         🚪
//                         <span>
//                             Entry / Exit
//                         </span>
//                     </NavLink>


//                     <NavLink
//                         to="/payments"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "nav-item active"
//                                 : "nav-item"
//                         }
//                     >
//                         💳
//                         <span>
//                             Payments
//                         </span>
//                     </NavLink>


//                     <NavLink
//                         to="/reports"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "nav-item active"
//                                 : "nav-item"
//                         }
//                     >
//                         📈
//                         <span>
//                             Reports
//                         </span>
//                     </NavLink>

//                 </nav>


//                 {/* SIDEBAR BOTTOM */}

//                 <div className="sidebar-bottom">

//                     <div className="sidebar-user">

//                         <div className="user-avatar">

//                             {user.name
//                                 ? user.name
//                                     .charAt(0)
//                                     .toUpperCase()
//                                 : "U"
//                             }

//                         </div>


//                         <div className="user-details">

//                             <strong>
//                                 {user.name || "User"}
//                             </strong>

//                             <span>
//                                 {user.role || "USER"}
//                             </span>

//                         </div>

//                     </div>


//                     {/* LOGOUT BUTTON */}

//                     <button
//                         type="button"
//                         className="sidebar-logout"
//                         onClick={handleLogout}
//                     >
//                         🚪
//                         <span>
//                             Logout
//                         </span>
//                     </button>

//                 </div>

//             </aside>


//             {/* MAIN CONTENT */}

//             <div className="main-area">

//                 <header className="topbar">

//                     <div>

//                         <h1>
//                             Parking Payment & Access
//                         </h1>

//                         <p>
//                             Parking Management System
//                         </p>

//                     </div>


//                     <div className="topbar-user">

//                         <span className="role-badge">
//                             {user.role || "USER"}
//                         </span>

//                     </div>

//                 </header>


//                 <main className="main-content">

//                     <Outlet />

//                 </main>

//             </div>

//         </div>
//     );
// }

// export default Layout;
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Layout() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );


    // =========================
    // THEME
    // =========================

    const [darkMode, setDarkMode] = useState(() => {

        return (
            localStorage.getItem("theme") === "dark"
        );

    });


    useEffect(() => {

        if (darkMode) {

            document.documentElement.setAttribute(
                "data-theme",
                "dark"
            );

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            document.documentElement.setAttribute(
                "data-theme",
                "light"
            );

            localStorage.setItem(
                "theme",
                "light"
            );
        }

    }, [darkMode]);


    const toggleTheme = () => {

        setDarkMode((previous) => !previous);

    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        const confirmed = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmed) {
            return;
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };


    return (

        <div className="app-layout">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="sidebar">

                <div className="sidebar-logo">

                    <div className="logo-icon">
                        🚗
                    </div>

                    <div>

                        <h2>
                            Parking
                        </h2>

                        <span>
                            Management
                        </span>

                    </div>

                </div>


                {/* =========================
                    NAVIGATION
                ========================= */}

                <nav className="sidebar-nav">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        📊
                        <span>
                            Dashboard
                        </span>
                    </NavLink>


                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        👥
                        <span>
                            Users
                        </span>
                    </NavLink>


                    <NavLink
                        to="/vehicles"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        🚘
                        <span>
                            Vehicles
                        </span>
                    </NavLink>


                    <NavLink
                        to="/parking-slots"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        🅿️
                        <span>
                            Parking Slots
                        </span>
                    </NavLink>


                    <NavLink
                        to="/entry-exit"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        🚪
                        <span>
                            Entry / Exit
                        </span>
                    </NavLink>


                    <NavLink
                        to="/payments"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        💳
                        <span>
                            Payments
                        </span>
                    </NavLink>


                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        📈
                        <span>
                            Reports
                        </span>
                    </NavLink>

                </nav>


                {/* =========================
                    SIDEBAR BOTTOM
                ========================= */}

                <div className="sidebar-bottom">

                    <div className="sidebar-user">

                        <div className="user-avatar">

                            {user.name
                                ? user.name
                                    .charAt(0)
                                    .toUpperCase()
                                : "U"
                            }

                        </div>


                        <div className="user-details">

                            <strong>
                                {user.name || "User"}
                            </strong>

                            <span>
                                {user.role || "USER"}
                            </span>

                        </div>

                    </div>


                    {/* LOGOUT */}

                    <button
                        type="button"
                        className="sidebar-logout"
                        onClick={handleLogout}
                    >
                        🚪

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>


            {/* =========================
                MAIN AREA
            ========================= */}

            <div className="main-area">

                <header className="topbar">

                    <div>

                        <h1>
                            Parking Payment & Access
                        </h1>

                        <p>
                            Parking Management System
                        </p>

                    </div>


                    {/* =========================
                        TOP RIGHT
                    ========================= */}

                    <div className="topbar-user">

                        {/* THEME BUTTON */}

                        <button
                            type="button"
                            className="theme-toggle"
                            onClick={toggleTheme}
                            title={
                                darkMode
                                    ? "Switch to light mode"
                                    : "Switch to dark mode"
                            }
                        >

                            <span className="theme-icon">

                                {darkMode
                                    ? "☀️"
                                    : "🌙"
                                }

                            </span>

                            <span className="theme-text">

                                {darkMode
                                    ? "Light"
                                    : "Dark"
                                }

                            </span>

                        </button>


                        {/* ROLE */}

                        <span className="role-badge">

                            {user.role || "USER"}

                        </span>

                    </div>

                </header>


                {/* =========================
                    PAGE CONTENT
                ========================= */}

                <main className="main-content">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default Layout;