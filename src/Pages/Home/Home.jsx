import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import ProfCard from '../../Components/ProfCard/ProfCard.jsx';
import './Home.css';

const Home = ({ user }) => {
  const [professors, setProfessors] = useState([]);
  const [reviewedIDs, setReviewedIDs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProfessors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://rmp-backend.onrender.com/api/professors`);
      setProfessors(res.data);
    } catch (error) {
      console.error('Error fetching professors:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReviewed = useCallback(async () => {
    if (!user) return;
    try {
      const res = await axios.get(`https://rmp-backend.onrender.com/api/reviewed`, {
        withCredentials: true,
      });
      const ids = res.data.map((p) => p.profID);
      setReviewedIDs(ids);
    } catch (err) {
      console.error('Failed to fetch reviewed professors');
    }
  }, [user]);

  useEffect(() => {
    fetchProfessors();
    fetchReviewed();
  }, [fetchProfessors, fetchReviewed]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredProfessors = useMemo(
    () =>
      professors.filter((prof) =>
        prof.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [professors, searchTerm]
  );

  return (
    <div className="main-content">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search professors..."
          className="search-input"
          onChange={handleSearch}
        />
      </div>

      {loading && (
        <div className="loading-indicator">
          <div className="loader"></div>
          <p>Loading professors...</p>
        </div>
      )}

      {!loading && filteredProfessors.length > 0 && (
        <div className="professors-grid">
          {filteredProfessors.map((professor) => (
            <ProfCard
              key={professor.profID}
              name={professor.name}
              profID={professor.profID}
              rating={professor.rating}
              ratingCount={professor.ratingCount}
              feedbacks={professor.feedback}
              user={user}
              reviewed={reviewedIDs.includes(professor.profID)}
            />
          ))}
        </div>
      )}

      {!loading && filteredProfessors.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No professors found for "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
};

export default Home;
