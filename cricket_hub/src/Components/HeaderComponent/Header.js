import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const Header = ({ user, logout }) => {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const [User, setUser] = useState(null);
  const handleLogout = () => {
    setUser(null); // Set user state to null after logout
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">Cricket Website</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
      
        </Nav>
        <Nav> {/* Use inline style for margin-left */}
          {user ? (
            <>
              <Nav.Link as={NavLink} to="/add-teams">Add Teams</Nav.Link>
          <Nav.Link as={NavLink} to="/add-player">Add Player</Nav.Link>
          <Nav.Link as={NavLink} to="/add-match">Add Match</Nav.Link>
          <Nav.Link as={NavLink} to="/Match-details">Match Details</Nav.Link>
          <Nav.Link as={NavLink} to="/add-Blog-Post">Add Blog Post</Nav.Link>
          <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
              <Nav.Link  style={{ color: 'black',marginLeft:'30px' }}>Welcome, {user}</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
        
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
