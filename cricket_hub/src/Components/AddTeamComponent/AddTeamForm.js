// src/components/TeamCrud.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamCrud = () => {
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [newTeam, setNewTeam] = useState({
    teamName: '',
    city: '',
    coachName: '',
    foundedYear: ''
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    axios.get('https://localhost:7191/api/Teams') // Replace with your API endpoint
      .then(response => setTeams(response.data))
      .catch(error => console.error('Error fetching teams:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7191/api/Teams', newTeam) // Replace with your API endpoint
      .then(() => {
        fetchTeams();
        setNewTeam({ teamName: '', city: '', coachName: '', foundedYear: '' });
      })
      .catch(error => console.error('Error creating team:', error));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://localhost:7191/api/Teams/${editingTeam.teamId}`, newTeam) // Replace with your API endpoint
      .then(() => {
        fetchTeams();
        setNewTeam({ teamName: '', city: '', coachName: '', foundedYear: '' });
        setEditingTeam(null);
      })
      .catch(error => console.error('Error updating team:', error));
  };

  const handleSubmit = (e) => {
    if (editingTeam) {
      handleUpdate(e);
    } else {
      handleCreate(e);
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setNewTeam(team);
  };

  const handleDelete = (id) => {
    axios.delete(`https://localhost:7191/api/Teams/${id}`) // Replace with your API endpoint
      .then(() => fetchTeams())
      .catch(error => console.error('Error deleting team:', error));
  };

  return (
    <div className="container mt-5">
      <h2>{editingTeam ? 'Edit Team' : 'Add Team'}</h2>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Team Name</label>
          <input
            type="text"
            className="form-control w-100"
            name="teamName"
            value={newTeam.teamName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control w-100"
            name="city"
            value={newTeam.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Coach Name</label>
          <input
            type="text"
            className="form-control w-100"
            name="coachName"
            value={newTeam.coachName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Founded Year</label>
          <input
            type="number"
            className="form-control w-100"
            name="foundedYear"
            value={newTeam.foundedYear}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {editingTeam ? 'Update' : 'Add'}
        </button>
      </form>

      <h2 className="mt-5">Teams List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>City</th>
            <th>Coach Name</th>
            <th>Founded Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team.id}>
              <td>{team.teamName}</td>
              <td>{team.city}</td>
              <td>{team.coachName}</td>
              <td>{team.foundedYear}</td>
              <td>
                <button className="btn btn-secondary btn-sm me-2" onClick={() => handleEdit(team)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(team.teamId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamCrud;
