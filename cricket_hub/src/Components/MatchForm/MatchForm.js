import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const apiUrl = 'https://localhost:7191/api/Match'; // Replace with your API URL

const MatchForm = () => {
    const [formData, setFormData] = useState({
        homeTeamId: '',
        awayTeamId: '',
        matchDate: '',
        venue: '',
        homeTeamScore: '',
        awayTeamScore: ''
    });

    const [matches, setMatches] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(apiUrl);
            setMatches(response.data);
        } catch (error) {
            setError('Error fetching matches. Please try again.');
        } finally {
            setLoading(false);
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
        setLoading(true);
        setError(null);
        try {
            if (editingId) {
                await axios.put(`${apiUrl}/${editingId}`, formData);
            } else {
                await axios.post(apiUrl, formData);
            }
            fetchMatches();
            setFormData({
                homeTeamId: '',
                awayTeamId: '',
                matchDate: '',
                venue: '',
                homeTeamScore: '',
                awayTeamScore: ''
            });
            setEditingId(null);
        } catch (error) {
            setError('Error submitting form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (match) => {
        setFormData(match);
        setEditingId(match.matchId); // Assuming `id` is the unique identifier
    };

    const handleDelete = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchMatches();
        } catch (error) {
            setError('Error deleting match. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">{editingId ? 'Edit Match' : 'Create Match'}</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group mb-3">
                    <label htmlFor="homeTeamId" className="form-label">Home Team ID:</label>
                    <input
                        type="number"
                        id="homeTeamId"
                        name="homeTeamId"
                        className="form-control"
                        value={formData.homeTeamId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="awayTeamId" className="form-label">Away Team ID:</label>
                    <input
                        type="number"
                        id="awayTeamId"
                        name="awayTeamId"
                        className="form-control"
                        value={formData.awayTeamId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="matchDate" className="form-label">Match Date:</label>
                    <input
                        type="datetime-local"
                        id="matchDate"
                        name="matchDate"
                        className="form-control"
                        value={formData.matchDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="venue" className="form-label">Venue:</label>
                    <input
                        type="text"
                        id="venue"
                        name="venue"
                        className="form-control"
                        value={formData.venue}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="homeTeamScore" className="form-label">Home Team Score:</label>
                    <input
                        type="number"
                        id="homeTeamScore"
                        name="homeTeamScore"
                        className="form-control"
                        value={formData.homeTeamScore}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="awayTeamScore" className="form-label">Away Team Score:</label>
                    <input
                        type="number"
                        id="awayTeamScore"
                        name="awayTeamScore"
                        className="form-control"
                        value={formData.awayTeamScore}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : (editingId ? 'Update Match' : 'Create Match')}
                </button>
                {error && <p className="text-danger mt-2">{error}</p>} {/* Display error if any */}
            </form>

            <h2>Matches List</h2>
            {loading ? <p>Loading...</p> : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Home Team ID</th>
                            <th>Away Team ID</th>
                            <th>Match Date</th>
                            <th>Venue</th>
                            <th>Home Team Score</th>
                            <th>Away Team Score</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">No matches available</td>
                            </tr>
                        ) : (
                            matches.map((match) => (
                                <tr key={match.MatchId}>
                                    <td>{match.homeTeamId}</td>
                                    <td>{match.awayTeamId}</td>
                                    <td>{new Date(match.matchDate).toLocaleString()}</td>
                                    <td>{match.venue}</td>
                                    <td>{match.homeTeamScore}</td>
                                    <td>{match.awayTeamScore}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(match)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(match.matchId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MatchForm;
