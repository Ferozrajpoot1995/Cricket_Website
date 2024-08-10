import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SportsHomePage from './Components/HomeComponent/SportsHomePage';
import AddTeams from './Components/AddTeamComponent/AddTeamForm';
import Addplayer from './Components/AddPlayer/PlayerForm';
import AddMatch from './Components/MatchForm/MatchForm';
import AddBlogPost from './Components/AddBlogtoSite/PostBlog';
import BlogPostDetail from './Components/BlogComponent/BlogPostDetail';
import Header from './Components/HeaderComponent/Header';
import MatchDetails from './Components/MatchDetails/MatchList';
import MatchDetailsInformation from './Components/MatchDetails/MatchDetails';
import Login from './Components/Login/LoginPage';
import SignUp from './Components/SignUp';

const App = () => {
  const [user, setUser] = useState(null); // Define user state

  // Define handleLogout function
  const handleLogout = () => {
    setUser(null); // Set user state to null after logout
    // Optionally, perform any additional logout-related tasks here
  };

  return (
    <Router>
      <Header user={user} logout={handleLogout} /> {/* Pass user state and logout function as props */}
      <Routes>
        <Route path="/" element={<SportsHomePage />} />
        <Route path="/add-teams" element={<AddTeams />} />
        <Route path="/add-player" element={<Addplayer />} />
        <Route path="/add-match" element={<AddMatch />} />
        <Route path="/Match-details" element={<MatchDetails />} />
        <Route path="/add-Blog-Post" element={<AddBlogPost />} />
        <Route path="/:id" element={<BlogPostDetail />} />
        <Route path="matchDetails/:matchId" element={<MatchDetailsInformation />} />

        <Route path="/login" element={<Login setUser={setUser} />} /> {/* Pass setUser as prop */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
