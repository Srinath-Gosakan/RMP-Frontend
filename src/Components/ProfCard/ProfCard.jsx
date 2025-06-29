import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import default_dp from '/default.jpg';
import { ImageCacheContext } from '../../App';
import ProfModal from '../ProfModal/ProfModal';
import './ProfCard.css';

const ProfCard = ({ name, profID, rating, feedbacks = [], user }) => {
  const [image, setImage] = useState(default_dp);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const cardRef = useRef();
  const imageCache = useContext(ImageCacheContext);
  const navigate = useNavigate();

  // Lazy load image
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
            const res = await axios.get(`https://rmp-backend.onrender.com/api/professor/${profID}/image`);
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

  // Check if user already rated
  useEffect(() => {
    const fetchUserRating = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`https://rmp-backend.onrender.com/api/rate/${profID}`, {
          withCredentials: true,
        });
        if (res.data?.rated) {
          setHasRated(true);
        }
      } catch (error) {
        console.error('Error checking rating status:', error);
      }
    };

    fetchUserRating();
  }, [user, profID]);

  const handleRateClick = (e) => {
    e.stopPropagation();
    if (user) {
      if (!hasRated) {
        navigate(`/rate?profID=${profID}`);
      }
    } else {
      alert('Please log in to rate this professor.');
    }
  };

  const handleNextFeedback = () => {
    setCurrentFeedbackIndex((prev) => Math.min(prev + 1, feedbacks.length - 1));
  };

  const handlePreviousFeedback = () => {
    setCurrentFeedbackIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <div className="card" ref={cardRef} onClick={() => setModalOpen(true)}>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <img src={image} alt={`Professor ${name}`} className="professor-image" />
        )}
        <h2>{name}</h2>

        {typeof rating === 'number' && rating > 0 ? (
          <>
            <h3>Rating: {rating.toFixed(1)} ⭐</h3>
            <p className="rating-count">({feedbacks.length} {feedbacks.length === 1 ? 'rating' : 'ratings'})</p>
          </>
        ) : (
          <h3 className="no-rating">No ratings yet</h3>
        )}

        <button
          className="rate-button"
          onClick={handleRateClick}
          disabled={hasRated}
          title={hasRated ? 'You have already rated this professor' : ''}
        >
          {hasRated ? 'Rated' : 'Rate'}
        </button>
      </div>

      {modalOpen && (
        <ProfModal
          image={image}
          name={name}
          rating={rating}
          feedbacks={feedbacks}
          currentIndex={currentFeedbackIndex}
          onPrev={handlePreviousFeedback}
          onNext={handleNextFeedback}
          onRate={handleRateClick}
          onClose={() => setModalOpen(false)}
          reviewed={hasRated} 
        />
      )}
    </>
  );
};

export default ProfCard;
