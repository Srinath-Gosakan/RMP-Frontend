import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import ProfCard from '../../Components/ProfCard';
import './Home.css';

const Home = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProfessors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/professors');
      setProfessors(res.data);
    } catch (error) {
      console.error('Error fetching professors:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfessors();
  }, [fetchProfessors]);

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
              feedbacks={professor.feedback}
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
