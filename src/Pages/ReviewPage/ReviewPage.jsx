import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import default_dp from '/default.jpg';
import './ReviewPage.css';
import { ImageCacheContext } from '../../App';

const ReviewedProfessorsPage = () => {
  const [professors, setProfessors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const imageCache = useContext(ImageCacheContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviewedProfessors = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/reviewed', {
          withCredentials: true,
        });
        setProfessors(res.data);
      } catch (error) {
        console.error('Failed to fetch reviewed professors:', error);
      }
    };

    fetchReviewedProfessors();
  }, []);

  const handleModify = (profID) => {
    navigate(`/rate?profID=${profID}`);
  };

  const handleDelete = async (profID, name) => {
    const confirm = window.confirm(
      `Are you sure you want to delete your review for ${name}?`
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(`http://localhost:8080/api/review/${profID}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(res.data.message);
        setProfessors((prev) => prev.filter((p) => p.profID !== profID));
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Something went wrong while deleting the review.');
    }
  };

  const filtered = professors.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.profID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="reviewed-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="professor-grid">
      {filtered.length === 0 ? (
        <div className="no-reviews-message">No professors reviewed yet.</div>
      ) : (
        filtered.map((prof) => {
          const cachedImage = imageCache.get(prof.profID);
          const image = cachedImage || default_dp;
          return (
            <div className="prof-card" key={prof.profID}>
              <img src={image} alt={prof.name} className="prof-image" />
              <div className="prof-info">
                <h3>{prof.name}</h3>
                <p><strong>Rating:</strong> {prof.rating} ⭐</p>
                <p className="prof-feedback">{prof.feedback}</p>
                <div className="button-group">
                  <button className="modify-btn" onClick={() => handleModify(prof.profID)}>
                    Modify
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(prof.profID, prof.name)}>
                    Delete Review
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
    </div>
  );
};

export default ReviewedProfessorsPage;
