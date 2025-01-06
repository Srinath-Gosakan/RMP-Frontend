import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Rate.css';

const RatePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [professors, setProfessors] = useState([]);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [studentId, setStudentId] = useState(''); 
  
  // Fetch professors data
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await axios.get('https://rmp-backend.vercel.app/api/professors');
        setProfessors(res.data);
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };
    fetchProfessors();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = professors.filter((prof) =>
      prof.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProfessors(filtered);
  };

  // Handle professor selection from the dropdown
  const handleSelectProfessor = (professorName) => {
    setSearchTerm(professorName);
    setFilteredProfessors([]);  // Hide the dropdown after selection
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!searchTerm || rating === 0 || !feedback.trim()) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    const selectedProfessor = professors.find((prof) => prof.name === searchTerm);
    if (!selectedProfessor) {
      alert('Professor not found.');
      return;
    }

    const profID = selectedProfessor.profID;

    // Prepare the data to be sent to the backend
    const data = {
      studentId,
      profID,
      rating,
      feedback
    };

    try {
      const res = await axios.post('https://rmp-backend.vercel.app/api/rate', data);
      alert(res.data.message);  // Display the response message from the backend
      setSearchTerm('');
      setRating(0);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Error submitting rating.');
    }
  };

  // Handle form clear
  const handleClear = () => {
    setSearchTerm('');
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="rate-page">
      <h1 className="rate-title">Rate Your Professor</h1>
      <div className="rate-container">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search professors..."
          value={searchTerm}
          onChange={handleSearch}
          className="professor-search"
        />
        {/* Dropdown for matching professors */}
        {searchTerm && filteredProfessors.length > 0 && (
          <ul className="dropdown">
            {filteredProfessors.map((professor) => (
              <li
                key={professor.profID}
                className="dropdown-item"
                onClick={() => handleSelectProfessor(professor.name)}  // Use handleSelectProfessor to hide dropdown
              >
                {professor.name}
              </li>
            ))}
          </ul>
        )}

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${hoverRating >= star || rating >= star ? 'filled' : ''}`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="feedback-textarea"
        />

        {/* Button container to align buttons side by side */}
        <div className="button-container">
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
          <button onClick={handleSubmit} className="submit-button">
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatePage;
