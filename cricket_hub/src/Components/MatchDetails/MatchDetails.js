import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Flag from 'react-world-flags'; // Import the Flag component
import 'bootstrap/dist/css/bootstrap.min.css';

const countryCodeMap = {
  'United States': 'US',
  'United Kingdom': 'GB',
  England: 'GB', // Custom code for England
  'India': 'IN',
  'Pakistan': 'PK',
  'Australia': 'AU'
};

const MatchDetails = () => {
  const { matchId } = useParams(); // Get the matchId from the URL
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7191/api/MacthDetails/${matchId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMatch(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!match) return <div className="alert alert-warning">Match not found</div>;

  const homePlayers = Array.isArray(match.homePlayers) ? match.homePlayers : [];
  const awayPlayers = Array.isArray(match.awayPlayers) ? match.awayPlayers : [];

  // Map team names to their respective country codes
  const homeTeamFlagCode = countryCodeMap[match.homeTeamName] || 'US'; // Default to 'US' if no code is available
  const awayTeamFlagCode = countryCodeMap[match.awayTeamName] || 'US'; // Default to 'US' if no code is available

  return (
    <div className="container mt-4">
      <h2>Match Details</h2>
      <div className="card border-primary shadow-lg">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title mb-0">Match #{match.matchId}</h5>
        </div>
        <div className="card-body">
          <div className="text-center mb-3">
            <h4>
              <div className="d-flex justify-content-center align-items-center">
                <Flag code={homeTeamFlagCode} alt={`${match.homeTeamName} flag`} style={{ width: '30px', height: '20px', marginRight: '10px' }} />
                {match.homeTeamName}
                <span className="mx-3">vs</span>
                {match.awayTeamName}
                <Flag code={awayTeamFlagCode} alt={`${match.awayTeamName} flag`} style={{ width: '30px', height: '20px', marginLeft: '10px' }} />
              </div>
            </h4>
          </div>
          <p className="text-center"><strong>Score:</strong> {match.homeTeamScore} - {match.awayTeamScore}</p>
          <p><strong>Date:</strong> {new Date(match.matchDate).toLocaleDateString()}</p>
          <p><strong>Venue:</strong> {match.venue}</p>
          <p><strong>Result:</strong> {match.resultMessage}</p>

          <div className="row mt-4">
            <div className="col-md-6">
              <h4>
                <div className="d-flex align-items-center">
                  <Flag code={homeTeamFlagCode} alt={`${match.homeTeamName} flag`} style={{ width: '30px', height: '20px', marginRight: '10px' }} />
                  {match.homeTeamName}
                </div>
              </h4>
              <table className="table table-striped mt-2">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Jersey Number</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {homePlayers.map((player, index) => (
                    <tr key={index}>
                      <td>{player.playerName}</td>
                      <td>{player.jerseyNumber}</td>
                      <td>{player.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-md-6">
              <h4>
                <div className="d-flex align-items-center">
                  <Flag code={awayTeamFlagCode} alt={`${match.awayTeamName} flag`} style={{ width: '30px', height: '20px', marginRight: '10px' }} />
                  {match.awayTeamName}
                </div>
              </h4>
              <table className="table table-striped mt-2">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Jersey Number</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {awayPlayers.map((player, index) => (
                    <tr key={index}>
                      <td>{player.playerName}</td>
                      <td>{player.jerseyNumber}</td>
                      <td>{player.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
