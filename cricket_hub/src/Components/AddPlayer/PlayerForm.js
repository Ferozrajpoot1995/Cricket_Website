import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Player = () => {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [playerForm, setPlayerForm] = useState({
    id: null,
    playerName: '',
    teamId: null,
    position: '',
    jerseyNumber: null,
    age: null,
    nationality: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('https://localhost:7191/api/Players');
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerForm({ ...playerForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPlayer) {
      await updatePlayer(playerForm);
    } else {
      await addPlayer(playerForm);
    }
  };

  const addPlayer = async (player) => {
    try {
      await axios.post('https://localhost:7191/api/Players', player);
      setMessage('Player added successfully!');
      fetchPlayers();
      resetForm();
    } catch (error) {
      console.error('Error adding player:', error);
      setMessage('Error adding player');
    }
  };

  const updatePlayer = async (player) => {
    try {
      await axios.put(`https://localhost:7191/api/Players/${player.playerId}`, player);
      setMessage('Player updated successfully!');
      fetchPlayers();
      resetForm();
    } catch (error) {
      console.error('Error updating player:', error);
      setMessage('Error updating player');
    }
  };

  const handleEdit = (id) => {
    const playerToEdit = players.find(player => player.id === id);
    setEditingPlayer(playerToEdit);
    setPlayerForm(playerToEdit);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7191/api/Players/${id}`);
      setMessage('Player deleted successfully!');
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
      setMessage('Error deleting player');
    }
  };

  const resetForm = () => {
    setEditingPlayer(null);
    setPlayerForm({
      id: null,
      playerName: '',
      teamId: null,
      position: '',
      jerseyNumber: null,
      age: null,
      nationality: ''
    });
    setMessage(''); // Clear message when resetting the form
  };

  return (
    <div className="container">
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <div className="player-form">
            <h2>{editingPlayer ? 'Edit Player' : 'Add Player'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Player Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="playerName"
                  value={playerForm.playerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Team ID:</label>
                <input
                  type="number"
                  className="form-control"
                  name="teamId"
                  value={playerForm.teamId || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Position:</label>
                <input
                  type="text"
                  className="form-control"
                  name="position"
                  value={playerForm.position}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Jersey Number:</label>
                <input
                  type="number"
                  className="form-control"
                  name="jerseyNumber"
                  value={playerForm.jerseyNumber || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={playerForm.age || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Nationality:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nationality"
                  value={playerForm.nationality}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mr-2">
                {editingPlayer ? 'Update Player' : 'Add Player'}
              </button>
              {editingPlayer && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>
        <div className="col-md-12">
          <div className="player-list">
            <h2>Player List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Team ID</th>
                  <th>Position</th>
                  <th>Jersey Number</th>
                  <th>Age</th>
                  <th>Nationality</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr key={player.id}>
                    <td>{player.playerName}</td>
                    <td>{player.teamId}</td>
                    <td>{player.position}</td>
                    <td>{player.jerseyNumber}</td>
                    <td>{player.age}</td>
                    <td>{player.nationality}</td>
                    <td>
                      <button className="btn btn-sm btn-primary mr-1" onClick={() => handleEdit(player.id)}>Edit</button>|
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(player.playerId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
