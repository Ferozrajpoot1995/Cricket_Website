import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorldFlag from 'react-world-flags';
import { Link } from 'react-router-dom';

const countryCodes = {
  Pakistan: 'PK',
  India: 'IN',
  England: 'GB',
  Australia: 'AU',
  // Add other countries as needed
};

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('https://localhost:7191/api/MacthDetails');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!matches.length) return <div className="alert alert-warning">No matches found</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        {matches.map((match) => {
          const {
            matchId,
            homeTeamName,
            awayTeamName,
            homeTeamScore,
            awayTeamScore,
            matchDate,
            venue,
            resultMessage
          } = match;

          // Construct URL for detailed match information
          const detailsUrl = `https://localhost:7191/api/MacthDetails/${matchId}`;

          return (
            <div key={matchId} className="col-lg-4 col-md-6 mb-4">
              <div className="card border-primary shadow-lg">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">Match #{matchId}</h5>
                </div>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">
                    {new Date(matchDate).toLocaleDateString()}
                  </h6>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <WorldFlag code={countryCodes[homeTeamName] || 'ZZ'} alt={homeTeamName} style={{ width: 30, height: 20, marginRight: 8 }} />
                      <span className="font-weight-bold">{homeTeamName}</span>
                    </div>
                    <span className="mx-3 font-weight-bold">vs</span>
                    <div className="d-flex align-items-center">
                      <WorldFlag code={countryCodes[awayTeamName] || 'ZZ'} alt={awayTeamName} style={{ width: 30, height: 20, marginRight: 8 }} />
                      <span className="font-weight-bold">{awayTeamName}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="text-center">
                      <h6 className="font-weight-bold">{homeTeamName}</h6>
                      <p className="mb-0">{homeTeamScore !== null ? homeTeamScore : 'N/A'}</p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-weight-bold">{awayTeamName}</h6>
                      <p className="mb-0">{awayTeamScore !== null ? awayTeamScore : 'N/A'}</p>
                    </div>
                  </div>
                  <p className="card-text"><strong>Venue:</strong> {venue}</p>
                  <p className="card-text"><strong>Result:</strong> {resultMessage}</p>
                  <Link to={`/matchDetails/${matchId}`} className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchList;
