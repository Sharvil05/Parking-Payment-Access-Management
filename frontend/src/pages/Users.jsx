import { useEffect, useState } from "react";
import api from "../services/api";

function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "USER"
    });


    // =========================
    // LOAD USERS
    // =========================

    const loadUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/users");

            setUsers(response.data);

        } catch (err) {

            console.error("Load users error:", err);

            if (err.response?.status === 403) {
                setError("You do not have permission to view users.");
            } else {
                setError("Unable to load users.");
            }

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
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
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "USER"
        });

        setEditingId(null);
        setShowForm(false);
    };


    // =========================
    // ADD / UPDATE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");

            if (editingId) {

                await api.put(
                    `/users/${editingId}`,
                    form
                );

                alert("User updated successfully.");

            } else {

                await api.post(
                    "/users",
                    form
                );

                alert("User created successfully.");
            }

            resetForm();
            loadUsers();

        } catch (err) {

            console.error("Save user error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to save user."
            );
        }
    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (user) => {

        setForm({
            name: user.name || "",
            email: user.email || "",
            password: "",
            phone: user.phone || "",
            role: user.role || "USER"
        });

        setEditingId(user.id);
        setShowForm(true);
    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(`/users/${id}`);

            alert("User deleted successfully.");

            loadUsers();

        } catch (err) {

            console.error("Delete user error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to delete user."
            );
        }
    };


    return (

        <div className="users-page">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="page-header">

                <div>

                    <h2>
                        👥 Users Management
                    </h2>

                    <p>
                        Manage system users and their roles.
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                >
                    + Add User
                </button>

            </div>


            {/* =========================
                ERROR
            ========================= */}

            {error && (

                <div className="error-message">

                    <span>
                        ⚠️
                    </span>

                    {error}

                </div>
            )}


            {/* =========================
                ADD / EDIT FORM
            ========================= */}

            {showForm && (

                <div className="form-card users-form-card">

                    <div className="form-header">

                        <div>

                            <h3>
                                {editingId
                                    ? "✏️ Edit User"
                                    : "➕ Add New User"
                                }
                            </h3>

                            <p>
                                {editingId
                                    ? "Update user information and role."
                                    : "Create a new system user."
                                }
                            </p>

                        </div>

                        <button
                            type="button"
                            className="close-button"
                            onClick={resetForm}
                            title="Close"
                        >
                            ×
                        </button>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-grid users-form-grid">

                            {/* NAME */}

                            <div className="form-group">

                                <label htmlFor="name">
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter full name"
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label htmlFor="email">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter email address"
                                />

                            </div>


                            {/* PASSWORD */}

                            <div className="form-group">

                                <label htmlFor="password">
                                    Password
                                    {!editingId && (
                                        <span className="required-star">
                                            *
                                        </span>
                                    )}
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required={!editingId}
                                    placeholder={
                                        editingId
                                            ? "Leave blank to keep current password"
                                            : "Enter password"
                                    }
                                />

                                {editingId && (
                                    <small className="form-help">
                                        Leave blank to keep the existing password.
                                    </small>
                                )}

                            </div>


                            {/* PHONE */}

                            <div className="form-group">

                                <label htmlFor="phone">
                                    Phone
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter phone number"
                                />

                            </div>


                            {/* ROLE */}

                            <div className="form-group">

                                <label htmlFor="role">
                                    Role
                                </label>

                                <select
                                    id="role"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                >

                                    <option value="USER">
                                        USER
                                    </option>

                                    <option value="STAFF">
                                        STAFF
                                    </option>

                                    <option value="ADMIN">
                                        ADMIN
                                    </option>

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
                                    ? "Update User"
                                    : "Create User"
                                }
                            </button>

                        </div>

                    </form>

                </div>
            )}


            {/* =========================
                USERS TABLE
            ========================= */}

            <div className="table-card">

                <div className="table-header">

                    <div>

                        <h3>
                            All Users
                        </h3>

                        <span>
                            {users.length} users
                        </span>

                    </div>

                    <button
                        className="secondary-button"
                        onClick={loadUsers}
                    >
                        🔄 Refresh
                    </button>

                </div>


                {loading ? (

                    <div className="loading">
                        Loading users...
                    </div>

                ) : users.length === 0 ? (

                    <div className="empty-state">

                        <div>
                            👥
                        </div>

                        <h3>
                            No users found
                        </h3>

                        <p>
                            Add your first user to get started.
                        </p>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {users.map((user) => (

                                    <tr key={user.id}>

                                        <td>
                                            #{user.id}
                                        </td>

                                        <td>

                                            <strong>
                                                {user.name}
                                            </strong>

                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            {user.phone}
                                        </td>

                                        <td>

                                            <span
                                                className={`role-tag ${user.role?.toLowerCase()}`}
                                            >
                                                {user.role}
                                            </span>

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    user.active
                                                        ? "status active"
                                                        : "status inactive"
                                                }
                                            >

                                                <span className="status-dot">
                                                    ●
                                                </span>

                                                {user.active
                                                    ? "Active"
                                                    : "Inactive"
                                                }

                                            </span>

                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        handleEdit(user)
                                                    }
                                                >
                                                    ✏️ Edit
                                                </button>

                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    🗑 Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Users;