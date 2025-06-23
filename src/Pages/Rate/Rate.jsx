// src/Pages/Rate/Rate.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ImageCacheContext } from '../../App';
import default_dp from '/default.jpg';
import axios from 'axios';
import './Rate.css';

const RatePage = ({ user }) => {
  const location = useLocation();
  const profID = new URLSearchParams(location.search).get('profID');
  const [professor, setProfessor] = useState(null);
  const [existingRating, setExistingRating] = useState(null);
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(default_dp);
  const [loadingImage, setLoadingImage] = useState(true);
  const imageCache = useContext(ImageCacheContext);
  

  useEffect(() => {
    if (!profID) return;

    const fetchProfessor = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/professor/${profID}`);
        setProfessor(res.data);
        if (imageCache.has(profID)) {
          setImage(imageCache.get(profID));
          setLoadingImage(false);
        } else {
          const imgRes = await axios.get(`http://localhost:8080/api/professor/${profID}/image`);
          const imgUrl = imgRes.data.imageUrl;
          imageCache.set(profID, imgUrl);
          setImage(imgUrl);
          setLoadingImage(false);
        }
      } catch (err) {
        console.error('Error fetching professor:', err);
      }
    };

    const fetchRating = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/rate/${profID}`, {
          withCredentials: true,
        });

        if (res.data.rated) {
          setExistingRating(res.data);
          setStars(res.data.rating);
          setFeedback(res.data.feedback);
        }
      } catch (err) {
        console.error('Error fetching rating:', err);
      }
    };
    fetchProfessor();
    fetchRating();
  }, [profID]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/rate/${profID}`,
        { rating: stars, feedback },
        { withCredentials: true }
      );
      setStatus(res.data.message);
    } catch (err) {
      setStatus(err.response?.data?.message || 'Error submitting rating');
    }
  };

  const handleClear = () => {
    setStars(0);
    setFeedback('');
    setStatus('');
  };

  return (
    <div className="rate-container">
      {professor ? (
        <div className="rate-card">
          {loadingImage ? (
            <div className="loader"></div>
          ) : (
            <img src={image} alt={professor.name} className="rate-img" />
          )}
          <h2>{professor.name}</h2>

          <div className="stars">
            {[...Array(10)].map((_, i) => {
              const value = (i + 1) * 0.5;
              return (
                <span
                  key={value}
                  className={`star ${hover >= value || stars >= value ? 'filled' : ''}`}
                  onClick={() => setStars(value)}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              );
            })}
          </div>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback..."
          ></textarea>

          <div className="rate-actions">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleClear} className="clear">Clear</button>
          </div>

          {status && <p className="status">{status}</p>}
        </div>
      ) : (
        <p>Loading professor details...</p>
      )}
    </div>
  );
};

export default RatePage;
