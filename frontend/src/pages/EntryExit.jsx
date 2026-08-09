import { useEffect, useState } from "react";
import api from "../services/api";

function EntryExit() {

    const [vehicles, setVehicles] = useState([]);
    const [activeSessions, setActiveSessions] = useState([]);

    const [selectedVehicle, setSelectedVehicle] = useState("");

    const [entryResult, setEntryResult] = useState(null);
    const [exitResult, setExitResult] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingSessions, setLoadingSessions] = useState(true);

    const [error, setError] = useState("");


    // =========================================
    // LOAD VEHICLES
    // =========================================

    const loadVehicles = async () => {

        try {

            const response =
                await api.get("/vehicles");

            setVehicles(response.data);

        } catch (err) {

            console.error(
                "Load vehicles error:",
                err
            );

            setError(
                "Unable to load vehicles."
            );
        }
    };


    // =========================================
    // LOAD ACTIVE SESSIONS
    // =========================================

    const loadActiveSessions = async () => {

        try {

            setLoadingSessions(true);

            const response =
                await api.get("/parking/active");

            setActiveSessions(response.data);

        } catch (err) {

            console.error(
                "Load active sessions error:",
                err
            );

            setActiveSessions([]);

        } finally {

            setLoadingSessions(false);
        }
    };


    useEffect(() => {

        loadVehicles();
        loadActiveSessions();

    }, []);


    // =========================================
    // VEHICLE ENTRY
    // =========================================

    const handleEntry = async (e) => {

        e.preventDefault();

        if (!selectedVehicle) {

            setError(
                "Please select a vehicle."
            );

            return;
        }

        try {

            setLoading(true);
            setError("");
            setEntryResult(null);
            setExitResult(null);

            const response =
                await api.post(
                    "/parking/entry",
                    {
                        vehicleNumber:
                            selectedVehicle
                    }
                );

            setEntryResult(response.data);

            alert(
                "Vehicle entry recorded successfully."
            );

            setSelectedVehicle("");

            await loadActiveSessions();

        } catch (err) {

            console.error(
                "Vehicle entry error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to record vehicle entry."
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================
    // VEHICLE EXIT
    // =========================================

    const handleExit = async (sessionId) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to record vehicle exit?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setLoading(true);
            setError("");
            setExitResult(null);

            const response =
                await api.post(
                    `/parking/exit/${sessionId}`
                );

            setExitResult(response.data);

            alert(
                "Vehicle exit recorded successfully."
            );

            await loadActiveSessions();

        } catch (err) {

            console.error(
                "Vehicle exit error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to record vehicle exit."
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================
    // FORMAT DATE
    // =========================================

    const formatDateTime = (dateTime) => {

        if (!dateTime) {
            return "-";
        }

        return new Date(
            dateTime
        ).toLocaleString();
    };


    // =========================================
    // FORMAT CURRENCY
    // =========================================

    const formatCurrency = (amount) => {

        if (
            amount === null ||
            amount === undefined
        ) {
            return "₹0.00";
        }

        return `₹${Number(amount).toFixed(2)}`;
    };


    return (

        <div className="entry-exit-page">


            {/* ================================= */}
            {/* PAGE HEADER */}
            {/* ================================= */}

            <div className="page-header">

                <div>

                    <h2>
                        Vehicle Entry & Exit
                    </h2>

                    <p>
                        Manage parking access and
                        active parking sessions.
                    </p>

                </div>

            </div>


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && (

                <div className="entry-error-message">

                    <span>⚠️</span>

                    <span>
                        {error}
                    </span>

                </div>

            )}


            {/* ================================= */}
            {/* VEHICLE ENTRY CARD */}
            {/* ================================= */}

            <div className="entry-card">

                <div className="entry-card-header">

                    <div className="entry-card-icon">
                        🚗
                    </div>

                    <div>

                        <h3>
                            Vehicle Entry
                        </h3>

                        <p>
                            Select a registered vehicle
                            to record its parking entry.
                        </p>

                    </div>

                </div>


                <form
                    className="vehicle-entry-form"
                    onSubmit={handleEntry}
                >

                    <div className="entry-field">

                        <label>
                            Select Vehicle
                        </label>

                        <div className="vehicle-select-wrapper">

                            <span className="select-icon">
                                🚘
                            </span>

                            <select
                                value={selectedVehicle}
                                onChange={(e) =>
                                    setSelectedVehicle(
                                        e.target.value
                                    )
                                }
                                required
                            >

                                <option value="">
                                    Select vehicle
                                </option>

                                {vehicles.map(
                                    (vehicle) => (

                                        <option
                                            key={vehicle.id}
                                            value={
                                                vehicle.vehicleNumber
                                            }
                                        >

                                            {vehicle.vehicleNumber}
                                            {" - "}
                                            {vehicle.vehicleType}
                                            {" - "}
                                            {vehicle.ownerName}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="entry-submit-button"
                        disabled={loading}
                    >

                        <span>
                            🚗
                        </span>

                        {loading
                            ? "Processing..."
                            : "Record Entry"
                        }

                        {!loading && (
                            <span className="button-arrow">
                                →
                            </span>
                        )}

                    </button>

                </form>

            </div>


            {/* ================================= */}
            {/* ENTRY SUCCESS RESULT */}
            {/* ================================= */}

            {entryResult && (

                <div className="entry-result-card">

                    <div className="result-card-header">

                        <div>

                            <h3>
                                ✓ Entry Successful
                            </h3>

                            <p>
                                Vehicle has been assigned
                                a parking slot.
                            </p>

                        </div>

                        <span className="status-badge active">
                            {entryResult.status}
                        </span>

                    </div>


                    <div className="entry-result-grid">

                        <div className="result-item">

                            <span>
                                Session ID
                            </span>

                            <strong>
                                #{entryResult.sessionId}
                            </strong>

                        </div>


                        <div className="result-item">

                            <span>
                                Vehicle
                            </span>

                            <strong>
                                {entryResult.vehicleNumber}
                            </strong>

                        </div>


                        <div className="result-item">

                            <span>
                                Vehicle Type
                            </span>

                            <strong>
                                {entryResult.vehicleType}
                            </strong>

                        </div>


                        <div className="result-item">

                            <span>
                                Parking Slot
                            </span>

                            <strong>
                                {entryResult.slotNumber}
                            </strong>

                        </div>


                        <div className="result-item">

                            <span>
                                Floor
                            </span>

                            <strong>
                                Floor {entryResult.floor}
                            </strong>

                        </div>


                        <div className="result-item">

                            <span>
                                Entry Time
                            </span>

                            <strong>
                                {formatDateTime(
                                    entryResult.entryTime
                                )}
                            </strong>

                        </div>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* ACTIVE PARKING SESSIONS */}
            {/* ================================= */}

            <div className="sessions-card">

                <div className="sessions-header">

                    <div className="sessions-title">

                        <div className="sessions-icon">
                            🅿️
                        </div>

                        <div>

                            <h3>
                                Active Parking Sessions
                            </h3>

                            <p>
                                Vehicles currently inside
                                the parking area
                            </p>

                        </div>

                    </div>


                    <button
                        className="refresh-button"
                        onClick={loadActiveSessions}
                        disabled={loadingSessions}
                    >

                        <span>
                            ↻
                        </span>

                        {loadingSessions
                            ? "Loading..."
                            : "Refresh"
                        }

                    </button>

                </div>


                {loadingSessions ? (

                    <div className="entry-loading-state">

                        <div className="loading-spinner">
                        </div>

                        <p>
                            Loading active sessions...
                        </p>

                    </div>

                ) : activeSessions.length === 0 ? (

                    <div className="entry-empty-state">

                        <div className="empty-parking-icon">
                            🅿️
                        </div>

                        <h4>
                            No active sessions
                        </h4>

                        <p>
                            Vehicles currently inside
                            the parking area will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="entry-table-wrapper">

                        <table className="entry-session-table">

                            <thead>

                                <tr>

                                    <th>
                                        SESSION
                                    </th>

                                    <th>
                                        VEHICLE
                                    </th>

                                    <th>
                                        SLOT
                                    </th>

                                    <th>
                                        ENTRY TIME
                                    </th>

                                    <th>
                                        STATUS
                                    </th>

                                    <th>
                                        ACTION
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {activeSessions.map(
                                    (session) => {

                                        const sessionId =
                                            session.sessionId ||
                                            session.id;

                                        return (

                                            <tr
                                                key={sessionId}
                                            >

                                                <td>

                                                    <strong>
                                                        #{sessionId}
                                                    </strong>

                                                </td>


                                                <td>

                                                    <strong>
                                                        {
                                                            session.vehicleNumber
                                                        }
                                                    </strong>

                                                </td>


                                                <td>

                                                    <span className="slot-badge">
                                                        {
                                                            session.slotNumber
                                                        }
                                                    </span>

                                                </td>


                                                <td>

                                                    {
                                                        formatDateTime(
                                                            session.entryTime
                                                        )
                                                    }

                                                </td>


                                                <td>

                                                    <span className="status-badge active">

                                                        <span className="status-dot">
                                                        </span>

                                                        {
                                                            session.status
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <button
                                                        className="vehicle-exit-button"
                                                        onClick={() =>
                                                            handleExit(
                                                                sessionId
                                                            )
                                                        }
                                                        disabled={
                                                            loading
                                                        }
                                                    >

                                                        🚪
                                                        <span>
                                                            Vehicle Exit
                                                        </span>

                                                    </button>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* ================================= */}
            {/* EXIT RESULT */}
            {/* ================================= */}

            {exitResult && (

                <div className="exit-result-card">

                    <div className="exit-result-header">

                        <div>

                            <h3>
                                ✓ Vehicle Exit Completed
                            </h3>

                            <p>
                                Parking session has been
                                successfully completed.
                            </p>

                        </div>

                        <span className="status-badge completed">
                            {exitResult.status}
                        </span>

                    </div>


                    <div className="exit-result-grid">

                        <div className="exit-result-item">

                            <span>
                                Session ID
                            </span>

                            <strong>
                                #{exitResult.sessionId}
                            </strong>

                        </div>


                        <div className="exit-result-item">

                            <span>
                                Vehicle
                            </span>

                            <strong>
                                {exitResult.vehicleNumber}
                            </strong>

                        </div>


                        <div className="exit-result-item">

                            <span>
                                Slot
                            </span>

                            <strong>
                                {exitResult.slotNumber}
                            </strong>

                        </div>


                        <div className="exit-result-item">

                            <span>
                                Entry Time
                            </span>

                            <strong>
                                {formatDateTime(
                                    exitResult.entryTime
                                )}
                            </strong>

                        </div>


                        <div className="exit-result-item">

                            <span>
                                Exit Time
                            </span>

                            <strong>
                                {formatDateTime(
                                    exitResult.exitTime
                                )}
                            </strong>

                        </div>


                        <div className="exit-result-item">

                            <span>
                                Duration
                            </span>

                            <strong>
                                {exitResult.durationMinutes}
                                {" minutes"}
                            </strong>

                        </div>


                        <div className="exit-fee-item">

                            <span>
                                Parking Fee
                            </span>

                            <strong>
                                {formatCurrency(
                                    exitResult.parkingFee
                                )}
                            </strong>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default EntryExit;