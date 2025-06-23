import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import default_dp from '/default.jpg';
import { ImageCacheContext } from '../../App';
import './ProfCard.css';

const ProfCard = ({ name, profID, rating, feedbacks = [], user }) => {
  const [image, setImage] = useState(default_dp);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const cardRef = useRef();
  const imageCache = useContext(ImageCacheContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (imageCache.has(profID)) {
      setImage(imageCache.get(profID));
      setLoading(false);
      return;
    }

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            const res = await axios.get(`http://localhost:8080/api/professor/${profID}/image`);
            const cloudinaryUrl = res.data.imageUrl;
            imageCache.set(profID, cloudinaryUrl);
            setImage(cloudinaryUrl);
          } catch (err) {
            console.error(`Error fetching image for professor ${profID}:`, err);
          } finally {
            setLoading(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [profID, imageCache]);

  const handleRateClick = (e) => {
    e.stopPropagation();
    if (user) {
      navigate(`/rate?profID=${profID}`);
    } else {
      alert('Please log in to rate this professor.');
    }
  };

  const handleNextFeedback = (e) => {
    e.stopPropagation();
    setCurrentFeedbackIndex((prev) => Math.min(prev + 1, feedbacks.length - 1));
  };

  const handlePreviousFeedback = (e) => {
    e.stopPropagation();
    setCurrentFeedbackIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div
      className={`card ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
      onClick={() => setExpanded((prev) => !prev)}
    >
      {loading ? (
        <div className="loader"></div>
      ) : (
        <img src={image} alt={`Professor ${name}`} className="professor-image" />
      )}
      <h2>{name}</h2>
      <h3>Rating: {rating?.toFixed(1)} ⭐</h3>

      <button className="rate-button" onClick={handleRateClick}>
        Rate
      </button>

      {expanded && (
        <div className="feedback-section">
          <h4>Feedback:</h4>
          {feedbacks.length > 0 ? (
            <>
              <p className="single-feedback">{feedbacks[currentFeedbackIndex]}</p>
              <div className="slider-buttons">
                <button onClick={handlePreviousFeedback} disabled={currentFeedbackIndex === 0}>
                  Previous
                </button>
                <button
                  onClick={handleNextFeedback}
                  disabled={currentFeedbackIndex === feedbacks.length - 1}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No feedback available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfCard;