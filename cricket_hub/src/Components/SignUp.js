import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    passwordHash: '',
    email: '',
    fullName: ''
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost:7191/api/Users');
      setUsers(response.data); // Assuming response.data is an array of user objects
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (editingUserId) {
        // Update existing user
        await axios.put(`https://localhost:7191/api/Users/${editingUserId}`, formData);
        setSuccessMessage('User updated successfully!');
      } else {
        // Create new user
        await axios.post('https://localhost:7191/api/Users', formData);
        setSuccessMessage('User registered successfully!');
      }

      // Reset form data and reload users list
      setFormData({
        username: '',
        passwordHash: '',
        email: '',
        fullName: ''
      });
      setEditingUserId(null); // Reset editing mode
      fetchUsers(); // Refresh user list
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      UserId: user.userId,
      username: user.username,
      passwordHash: '', // You may choose not to populate password for security reasons
      email: user.email,
      fullName: user.fullName
    });
    setEditingUserId(user.userId);
    setShowForm(true); // Show form when editing
  };

  const handleDelete = async (userID) => {
    try {
      await axios.delete(`https://localhost:7191/api/Users/${userID}`);
      setSuccessMessage('User deleted successfully!');
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
    setEditingUserId(null);
    setFormData({
      username: '',
      passwordHash: '',
      email: '',
      fullName: ''
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="row mt-3">
          <div className="col-md-6">
            <button className="btn btn-primary" onClick={toggleFormVisibility}>
              {showForm ? 'Back to List' : 'Add New User'}
            </button>
          </div>
        </div>
        <div className={`col-md-12 ${showForm ? 'd-none' : ''}`}>
          <h2>List of Users</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover" style={{ width: '100%' }}>
              <thead className="thead-dark">
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.userId}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.fullName}</td>
                    <td>
                      <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(user)}>Edit</button>|
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.userId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={`col-md-6 ${showForm ? '' : 'd-none'}`}>
          <h2>User Management</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {!editingUserId && (
              <div className="mb-3">
                <label htmlFor="passwordHash" className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordHash"
                  name="passwordHash"
                  value={formData.passwordHash}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name:</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editingUserId ? 'Update User' : 'Save User'}
            </button>
          </form>
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </div>
      </div>
    </div>
  );
}
