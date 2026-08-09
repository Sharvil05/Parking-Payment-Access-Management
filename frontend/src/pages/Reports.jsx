import { useEffect, useState } from "react";
import api from "../services/api";

function Reports() {

    const [report, setReport] = useState(null);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);


    // =========================
    // LOAD REPORT
    // =========================

    const loadReport = async () => {

        try {

            setError("");
            setRefreshing(true);

            const response =
                await api.get("/reports/summary");

            setReport(response.data);

        } catch (error) {

            console.error(
                "Report error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load reports."
            );

        } finally {

            setRefreshing(false);
        }
    };


    // =========================
    // INITIAL LOAD
    // =========================

    useEffect(() => {

        loadReport();

    }, []);


    // =========================
    // ERROR
    // =========================

    if (error) {

        return (

            <div className="page-message">

                <h2>
                    {error}
                </h2>

                <button
                    type="button"
                    className="primary-button"
                    onClick={loadReport}
                    disabled={refreshing}
                >
                    {refreshing
                        ? "Retrying..."
                        : "Retry"
                    }
                </button>

            </div>
        );
    }


    // =========================
    // LOADING
    // =========================

    if (!report) {

        return (

            <div className="page-message">

                <h2>
                    Loading reports...
                </h2>

            </div>
        );
    }


    // =========================
    // REPORT PAGE
    // =========================

    return (

        <div className="reports-page">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>

                    <h2>
                        Parking Reports
                    </h2>

                    <p>
                        Overview of parking operations
                        and payment activity.
                    </p>

                </div>


                {/* REFRESH BUTTON */}

                <button
                    type="button"
                    className="report-refresh-button"
                    onClick={loadReport}
                    disabled={refreshing}
                >

                    {refreshing
                        ? "Refreshing..."
                        : "⟳ Refresh"
                    }

                </button>

            </div>


            {/* SUMMARY CARDS */}

            <div className="stats-grid">

                <div className="stat-card">

                    <h3>
                        Total Users
                    </h3>

                    <strong>
                        {report.totalUsers}
                    </strong>

                </div>


                <div className="stat-card">

                    <h3>
                        Total Vehicles
                    </h3>

                    <strong>
                        {report.totalVehicles}
                    </strong>

                </div>


                <div className="stat-card">

                    <h3>
                        Total Parking Slots
                    </h3>

                    <strong>
                        {report.totalParkingSlots}
                    </strong>

                </div>


                <div className="stat-card">

                    <h3>
                        Available Slots
                    </h3>

                    <strong>
                        {report.availableSlots}
                    </strong>

                </div>


                <div className="stat-card">

                    <h3>
                        Occupied Slots
                    </h3>

                    <strong>
                        {report.occupiedSlots}
                    </strong>

                </div>


                <div className="stat-card">

                    <h3>
                        Active Sessions
                    </h3>

                    <strong>
                        {report.activeSessions}
                    </strong>

                </div>


                <div className="stat-card">

                    <h3>
                        Completed Sessions
                    </h3>

                    <strong>
                        {report.completedSessions}
                    </strong>

                </div>


                <div className="stat-card">

                    <h3>
                        Total Payments
                    </h3>

                    <strong>
                        {report.totalPayments}
                    </strong>

                </div>


                <div className="stat-card revenue-card">

                    <h3>
                        Total Revenue
                    </h3>

                    <strong>
                        ₹
                        {Number(
                            report.totalRevenue || 0
                        ).toFixed(2)}
                    </strong>

                </div>

            </div>


            {/* PARKING SUMMARY */}

            <div className="table-card">

                <div className="table-header">

                    <div>

                        <h3>
                            Parking Summary
                        </h3>

                        <span>
                            Current database statistics
                        </span>

                    </div>

                </div>


                <div className="report-summary">


                    {/* CAPACITY */}

                    <div className="report-row">

                        <span>
                            Parking Capacity
                        </span>

                        <strong>
                            {report.totalParkingSlots}
                        </strong>

                    </div>


                    {/* AVAILABLE */}

                    <div className="report-row">

                        <span>
                            Available Capacity
                        </span>

                        <strong>
                            {report.availableSlots}
                        </strong>

                    </div>


                    {/* OCCUPIED */}

                    <div className="report-row">

                        <span>
                            Occupied Capacity
                        </span>

                        <strong>
                            {report.occupiedSlots}
                        </strong>

                    </div>


                    {/* ACTIVE */}

                    <div className="report-row">

                        <span>
                            Active Parking Sessions
                        </span>

                        <strong>
                            {report.activeSessions}
                        </strong>

                    </div>


                    {/* COMPLETED */}

                    <div className="report-row">

                        <span>
                            Completed Sessions
                        </span>

                        <strong>
                            {report.completedSessions}
                        </strong>

                    </div>


                    {/* PAYMENTS */}

                    <div className="report-row">

                        <span>
                            Successful Payments
                        </span>

                        <strong>
                            {report.totalPayments}
                        </strong>

                    </div>


                    {/* REVENUE */}

                    <div className="report-row total-row">

                        <span>
                            Total Revenue
                        </span>

                        <strong>
                            ₹
                            {Number(
                                report.totalRevenue || 0
                            ).toFixed(2)}
                        </strong>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default Reports;