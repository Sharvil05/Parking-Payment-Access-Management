import { useEffect, useState } from "react";
import api from "../services/api";

function Payments() {

    const [sessionId, setSessionId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("CASH");

    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingPayments, setLoadingPayments] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================
    // LOAD PAYMENTS
    // =========================

    const loadPayments = async () => {

        try {

            setLoadingPayments(true);
            setError("");

            const response =
                await api.get("/payments");

            setPayments(response.data);

        } catch (error) {

            console.error(
                "Payment history error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load payment history."
            );

        } finally {

            setLoadingPayments(false);
        }
    };


    useEffect(() => {

        loadPayments();

    }, []);


    // =========================
    // MAKE PAYMENT
    // =========================

    const handlePayment = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (!sessionId) {

            setError(
                "Please enter parking session ID."
            );

            return;
        }

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/payments",
                    {
                        parkingSessionId:
                            Number(sessionId),

                        paymentMethod:
                            paymentMethod
                    }
                );

            setSuccess(
                `Payment successful. Transaction: ${
                    response.data.transactionReference
                }`
            );

            setSessionId("");

            await loadPayments();

        } catch (error) {

            console.error(
                "Payment error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to process payment."
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="payments-page">


            {/* ========================= */}
            {/* PAGE HEADER */}
            {/* ========================= */}

            <div className="page-header">

                <div>

                    <h2>
                        Payment Management
                    </h2>

                    <p>
                        Process and track parking payments.
                    </p>

                </div>

            </div>


            {/* ========================= */}
            {/* ERROR */}
            {/* ========================= */}

            {error && (

                <div className="payment-error">

                    <span>⚠️</span>

                    <span>
                        {error}
                    </span>

                </div>

            )}


            {/* ========================= */}
            {/* SUCCESS */}
            {/* ========================= */}

            {success && (

                <div className="payment-success">

                    <span>✓</span>

                    <span>
                        {success}
                    </span>

                </div>

            )}


            {/* ========================= */}
            {/* MAKE PAYMENT */}
            {/* ========================= */}

            <div className="payment-form-card">


                <div className="payment-title">

                    <div className="payment-title-icon">
                        💳
                    </div>

                    <div>

                        <h2>
                            Make Payment
                        </h2>

                        <p>
                            Enter the completed parking session ID
                            to process payment.
                        </p>

                    </div>

                </div>


                <form
                    className="payment-form"
                    onSubmit={handlePayment}
                >


                    {/* SESSION ID */}

                    <div className="payment-field">

                        <label>
                            Parking Session ID
                        </label>

                        <div className="payment-input-wrapper">

                            <span className="payment-input-icon">
                                📄
                            </span>

                            <input
                                type="number"
                                min="1"
                                placeholder="Enter session ID"
                                value={sessionId}
                                onChange={(event) =>
                                    setSessionId(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                    </div>


                    {/* PAYMENT METHOD */}

                    <div className="payment-field">

                        <label>
                            Payment Method
                        </label>

                        <div className="payment-select-wrapper">

                            <span className="payment-input-icon">
                                💳
                            </span>

                            <select
                                value={paymentMethod}
                                onChange={(event) =>
                                    setPaymentMethod(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="CASH">
                                    CASH
                                </option>

                                <option value="UPI">
                                    UPI
                                </option>

                                <option value="CARD">
                                    CARD
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* PAYMENT BUTTON */}

                    <button
                        type="submit"
                        className="payment-button"
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <span className="payment-spinner"></span>
                                Processing...
                            </>

                        ) : (

                            <>
                                💳
                                Make Payment
                                <span className="payment-arrow">
                                    →
                                </span>
                            </>

                        )}

                    </button>

                </form>

            </div>


            {/* ========================= */}
            {/* PAYMENT HISTORY */}
            {/* ========================= */}

            <div className="payment-history-card">


                {/* HEADER */}

                <div className="payment-history-header">

                    <div className="payment-history-title">

                        <div className="history-icon">
                            ↻
                        </div>

                        <div>

                            <h2>
                                Payment History
                            </h2>

                            <p>
                                View all payment transactions
                            </p>

                        </div>

                    </div>


                    <button
                        className="payment-refresh-button"
                        onClick={loadPayments}
                        disabled={loadingPayments}
                    >

                        ↻

                        {loadingPayments
                            ? " Loading..."
                            : " Refresh"
                        }

                    </button>

                </div>


                {/* ========================= */}
                {/* TABLE */}
                {/* ========================= */}

                {loadingPayments ? (

                    <div className="payment-loading">
                        Loading payment history...
                    </div>

                ) : payments.length === 0 ? (

                    <div className="payment-empty">

                        <div className="payment-empty-icon">
                            💳
                        </div>

                        <h3>
                            No payments found
                        </h3>

                        <p>
                            Completed payments will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="payment-table-wrapper">

                        <table className="payment-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Session ID
                                    </th>

                                    <th>
                                        Vehicle Number
                                    </th>

                                    <th>
                                        Amount
                                    </th>

                                    <th>
                                        Method
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Payment Time
                                    </th>

                                    <th>
                                        Transaction Ref.
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {payments.map(
                                    (payment) => (

                                        <tr
                                            key={
                                                payment.id
                                            }
                                        >

                                            <td>
                                                {payment.id}
                                            </td>

                                            <td>
                                                {payment.parkingSessionId}
                                            </td>

                                            <td className="vehicle-number">
                                                {payment.vehicleNumber}
                                            </td>

                                            <td>

                                                <span className="payment-amount">
                                                    ₹
                                                    {Number(
                                                        payment.amount || 0
                                                    ).toFixed(2)}
                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        `payment-method-badge ${
                                                            payment.paymentMethod
                                                                ?.toLowerCase()
                                                        }`
                                                    }
                                                >

                                                    {payment.paymentMethod}

                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        `payment-status ${
                                                            payment.paymentStatus
                                                                ?.toLowerCase()
                                                        }`
                                                    }
                                                >

                                                    <span className="status-dot"></span>

                                                    {payment.paymentStatus}

                                                </span>

                                            </td>


                                            <td>

                                                {payment.paymentTime
                                                    ? new Date(
                                                        payment.paymentTime
                                                    ).toLocaleString()
                                                    : "-"
                                                }

                                            </td>


                                            <td>

                                                <span className="transaction-reference">

                                                    {
                                                        payment.transactionReference
                                                    }

                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Payments;