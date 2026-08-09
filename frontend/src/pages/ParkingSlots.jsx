import { useEffect, useState } from "react";
import api from "../services/api";

function ParkingSlots() {

    const [slots, setSlots] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        slotNumber: "",
        slotType: "CAR",
        floor: 1,
        description: ""
    });


    // =========================
    // LOAD SLOTS
    // =========================

    const loadSlots = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get("/parking-slots");

            setSlots(response.data);

        } catch (err) {

            console.error(
                "Load slots error:",
                err
            );

            if (err.response?.status === 403) {

                setError(
                    "You do not have permission to view parking slots."
                );

            } else {

                setError(
                    err.response?.data?.message ||
                    "Unable to load parking slots."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadSlots();

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
            slotNumber: "",
            slotType: "CAR",
            floor: 1,
            description: ""
        });

        setEditingId(null);
        setShowForm(false);
    };


    // =========================
    // CREATE / UPDATE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");

            const request = {

                slotNumber:
                    form.slotNumber
                        .trim()
                        .toUpperCase(),

                slotType:
                    form.slotType,

                floor:
                    Number(form.floor),

                description:
                    form.description.trim()
            };


            if (editingId) {

                await api.put(
                    `/parking-slots/${editingId}`,
                    request
                );

                alert(
                    "Parking slot updated successfully."
                );

            } else {

                await api.post(
                    "/parking-slots",
                    request
                );

                alert(
                    "Parking slot created successfully."
                );
            }


            resetForm();

            await loadSlots();

        } catch (err) {

            console.error(
                "Save slot error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to save parking slot."
            );
        }
    };


    // =========================
    // EDIT SLOT
    // =========================

    const handleEdit = (slot) => {

        setForm({

            slotNumber:
                slot.slotNumber || "",

            slotType:
                slot.slotType || "CAR",

            floor:
                slot.floor || 1,

            description:
                slot.description || ""
        });

        setEditingId(slot.id);
        setShowForm(true);
    };


    // =========================
    // DELETE SLOT
    // =========================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this parking slot?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await api.delete(
                `/parking-slots/${id}`
            );

            alert(
                "Parking slot deleted successfully."
            );

            await loadSlots();

        } catch (err) {

            console.error(
                "Delete slot error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to delete parking slot."
            );
        }
    };


    // =========================
    // PAGE
    // =========================

    return (

        <div className="parking-slots-page">


            {/* ========================= */}
            {/* PAGE HEADER */}
            {/* ========================= */}

            <div className="page-header">

                <div>

                    <h2>
                        Parking Slot Management
                    </h2>

                    <p>
                        Manage parking slots,
                        availability and status.
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={() => {

                        resetForm();
                        setShowForm(true);

                    }}
                >
                    + Add Slot
                </button>

            </div>


            {/* ========================= */}
            {/* ERROR */}
            {/* ========================= */}

            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {/* ========================= */}
            {/* FORM */}
            {/* ========================= */}

            {showForm && (

                <div className="slot-edit-card">


                    {/* FORM HEADER */}

                    <div className="slot-edit-header">

                        <div>

                            <h3>

                                {editingId
                                    ? "Edit Parking Slot"
                                    : "Add New Parking Slot"
                                }

                            </h3>

                            <p className="slot-form-subtitle">

                                {editingId
                                    ? "Update parking slot details."
                                    : "Enter the details for the new parking slot."
                                }

                            </p>

                        </div>


                        <button
                            type="button"
                            className="slot-close-button"
                            onClick={resetForm}
                        >
                            ×
                        </button>

                    </div>


                    {/* FORM */}

                    <form
                        className="parking-slot-form"
                        onSubmit={handleSubmit}
                    >


                        {/* SLOT NUMBER */}

                        <div className="slot-form-group">

                            <label>
                                Slot Number
                            </label>

                            <input
                                type="text"
                                name="slotNumber"
                                value={form.slotNumber}
                                onChange={handleChange}
                                placeholder="A-01"
                                required
                            />

                        </div>


                        {/* SLOT TYPE */}

                        <div className="slot-form-group">

                            <label>
                                Slot Type
                            </label>

                            <select
                                name="slotType"
                                value={form.slotType}
                                onChange={handleChange}
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


                        {/* FLOOR */}

                        <div className="slot-form-group">

                            <label>
                                Floor
                            </label>

                            <input
                                type="number"
                                name="floor"
                                value={form.floor}
                                onChange={handleChange}
                                min="1"
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="slot-form-group">

                            <label>
                                Description
                            </label>

                            <input
                                type="text"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Near main entrance"
                            />

                        </div>


                        {/* FORM BUTTONS */}

                        <div className="slot-form-actions">

                            <button
                                type="button"
                                className="slot-cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="slot-update-button"
                            >

                                {editingId
                                    ? "Update Slot"
                                    : "Create Slot"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* ========================= */}
            {/* SLOT TABLE */}
            {/* ========================= */}

            <div className="table-card">


                <div className="table-header">

                    <div>

                        <h3>
                            All Parking Slots
                        </h3>

                        <span>
                            {slots.length} slots
                        </span>

                    </div>

                </div>


                {loading ? (

                    <div className="loading">
                        Loading parking slots...
                    </div>

                ) : slots.length === 0 ? (

                    <div className="empty-state">
                        No parking slots found.
                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Slot Number
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Floor
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Description
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {slots.map(
                                    (slot) => (

                                        <tr
                                            key={slot.id}
                                        >

                                            <td>
                                                #{slot.id}
                                            </td>


                                            <td>

                                                <strong>
                                                    {slot.slotNumber}
                                                </strong>

                                            </td>


                                            <td>

                                                <span
                                                    className="vehicle-type-tag"
                                                >
                                                    {slot.slotType}
                                                </span>

                                            </td>


                                            <td>
                                                Floor {slot.floor}
                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        `slot-status ${
                                                            slot.status?.toLowerCase()
                                                        }`
                                                    }
                                                >
                                                    {slot.status}
                                                </span>

                                            </td>


                                            {/* DESCRIPTION */}

                                            <td>
                                                {slot.description || "-"}
                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div
                                                    className="action-buttons"
                                                >

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            handleEdit(slot)
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                slot.id
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

export default ParkingSlots;