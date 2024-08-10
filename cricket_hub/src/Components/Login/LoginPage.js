import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', passwordHash: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://localhost:7191/api/Users/verify?username=${formData.username}&passwordHash=${encodeURIComponent(formData.passwordHash)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data ) {
        console.log('Authentication successful');

        // Set user information in parent component or context
        navigate('/'); // Example redirection
        setUser(formData.username);
      } else {
        setError('Authentication failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error: Please try again later');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); // Clear any previous errors
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="passwordHash"
                    value={formData.passwordHash}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
