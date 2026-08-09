import { useEffect, useState } from "react";
import api from "../services/api";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        vehicleNumber: "",
        vehicleType: "CAR",
        ownerId: ""
    });

    // =========================
    // LOAD VEHICLES
    // =========================

    const loadVehicles = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get("/vehicles");

            setVehicles(response.data);

        } catch (err) {

            console.error(
                "Load vehicles error:",
                err
            );

            if (err.response?.status === 403) {

                setError(
                    "You do not have permission to view vehicles."
                );

            } else {

                setError(
                    "Unable to load vehicles."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // LOAD USERS
    // =========================

    const loadUsers = async () => {

        try {

            const response =
                await api.get("/users");

            setUsers(response.data);

        } catch (err) {

            console.error(
                "Load users error:",
                err
            );

            setError(
                "Unable to load vehicle owners."
            );
        }
    };


    useEffect(() => {

        loadVehicles();
        loadUsers();

    }, []);


    // =========================
    // FORM CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };


    // =========================
    // RESET FORM
    // =========================

    const resetForm = () => {

        setForm({
            vehicleNumber: "",
            vehicleType: "CAR",
            ownerId: ""
        });

        setEditingId(null);
        setShowForm(false);
    };


    // =========================
    // ADD / UPDATE VEHICLE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");

            const request = {
                vehicleNumber:
                    form.vehicleNumber.trim().toUpperCase(),

                vehicleType:
                    form.vehicleType,

                ownerId:
                    Number(form.ownerId)
            };


            if (editingId) {

                await api.put(
                    `/vehicles/${editingId}`,
                    request
                );

                alert(
                    "Vehicle updated successfully."
                );

            } else {

                await api.post(
                    "/vehicles",
                    request
                );

                alert(
                    "Vehicle created successfully."
                );
            }


            resetForm();

            loadVehicles();

        } catch (err) {

            console.error(
                "Save vehicle error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to save vehicle."
            );
        }
    };


    // =========================
    // EDIT VEHICLE
    // =========================

    const handleEdit = (vehicle) => {

        setForm({
            vehicleNumber:
                vehicle.vehicleNumber || "",

            vehicleType:
                vehicle.vehicleType || "CAR",

            ownerId:
                vehicle.ownerId
                    ? String(vehicle.ownerId)
                    : ""
        });

        setEditingId(vehicle.id);

        setShowForm(true);
    };


    // =========================
    // DELETE VEHICLE
    // =========================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this vehicle?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(
                `/vehicles/${id}`
            );

            alert(
                "Vehicle deleted successfully."
            );

            loadVehicles();

        } catch (err) {

            console.error(
                "Delete vehicle error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to delete vehicle."
            );
        }
    };


    return (

        <div className="vehicles-page">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>

                    <h2>
                        Vehicle Management
                    </h2>

                    <p>
                        Manage registered vehicles
                        and their owners.
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={() => {

                        resetForm();

                        setShowForm(true);
                    }}
                >
                    + Add Vehicle
                </button>

            </div>


            {/* ERROR */}

            {error && (

                <div className="error-message">

                    {error}

                </div>

            )}


            {/* FORM */}

            {showForm && (

                <div className="form-card">

                    <div className="form-header">

                        <h3>

                            {editingId
                                ? "Edit Vehicle"
                                : "Add New Vehicle"
                            }

                        </h3>


                        <button
                            className="close-button"
                            onClick={resetForm}
                        >
                            ×
                        </button>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">


                            {/* VEHICLE NUMBER */}

                            <div className="form-group">

                                <label>
                                    Vehicle Number
                                </label>

                                <input
                                    type="text"
                                    name="vehicleNumber"
                                    value={
                                        form.vehicleNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="MH12AB1234"
                                    maxLength={20}
                                    required
                                />

                            </div>


                            {/* VEHICLE TYPE */}

                            <div className="form-group">

                                <label>
                                    Vehicle Type
                                </label>

                                <select
                                    name="vehicleType"
                                    value={
                                        form.vehicleType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="BIKE">
                                        BIKE
                                    </option>

                                    <option value="CAR">
                                        CAR
                                    </option>

                                    <option value="SUV">
                                        SUV
                                    </option>

                                    <option value="TRUCK">
                                        TRUCK
                                    </option>

                                </select>

                            </div>


                            {/* OWNER */}

                            <div className="form-group">

                                <label>
                                    Vehicle Owner
                                </label>

                                <select
                                    name="ownerId"
                                    value={
                                        form.ownerId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Owner
                                    </option>


                                    {users.map(
                                        (user) => (

                                            <option
                                                key={
                                                    user.id
                                                }
                                                value={
                                                    user.id
                                                }
                                            >
                                                {user.name}
                                                {" - "}
                                                {user.email}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        </div>


                        {/* FORM BUTTONS */}

                        <div className="form-actions">

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="primary-button"
                            >

                                {editingId
                                    ? "Update Vehicle"
                                    : "Create Vehicle"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* VEHICLE TABLE */}

            <div className="table-card">

                <div className="table-header">

                    <h3>
                        Registered Vehicles
                    </h3>

                    <span>
                        {vehicles.length} vehicles
                    </span>

                </div>


                {loading ? (

                    <div className="loading">
                        Loading vehicles...
                    </div>

                ) : vehicles.length === 0 ? (

                    <div className="empty-state">

                        No vehicles found.

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>
                                        Vehicle Number
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Owner
                                    </th>

                                    <th>
                                        Created
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {vehicles.map(
                                    (vehicle) => (

                                        <tr
                                            key={
                                                vehicle.id
                                            }
                                        >

                                            <td>
                                                #
                                                {vehicle.id}
                                            </td>


                                            <td>

                                                <strong>
                                                    {
                                                        vehicle.vehicleNumber
                                                    }
                                                </strong>

                                            </td>


                                            <td>

                                                <span
                                                    className="vehicle-type-tag"
                                                >
                                                    {
                                                        vehicle.vehicleType
                                                    }
                                                </span>

                                            </td>


                                            <td>

                                                <div>
                                                    <strong>
                                                        {
                                                            vehicle.ownerName
                                                        }
                                                    </strong>

                                                    <small>
                                                        ID: {
                                                            vehicle.ownerId
                                                        }
                                                    </small>
                                                </div>

                                            </td>


                                            <td>

                                                {vehicle.createdAt
                                                    ? new Date(
                                                        vehicle.createdAt
                                                    ).toLocaleDateString()
                                                    : "-"
                                                }

                                            </td>


                                            <td>

                                                <div
                                                    className="action-buttons"
                                                >

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                vehicle
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                vehicle.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

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

export default Vehicles;