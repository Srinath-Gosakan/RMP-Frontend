import React from 'react';
import './ProfModal.css';

const ProfModal = ({
  image,
  name,
  rating,
  feedbacks,
  currentIndex,
  onPrev,
  onNext,
  onRate,
  onClose,
  reviewed
}) => {
  const validFeedbacks = [
    ...new Set(
      feedbacks
        .filter((f) => typeof f === 'string' && f.trim() !== '')
        .map((f) => f.trim())
    )
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <img src={image} alt={name} className="modal-image" />
          <div className="modal-info">
            <h2>{name}</h2>
            <div className="modal-rating">Rating: {rating?.toFixed(1)} ⭐</div>

            {validFeedbacks.length > 0 ? (
              <>
                <div className="modal-feedback">
                  "{validFeedbacks[currentIndex]}"
                </div>
                <div className="modal-nav">
                  <button onClick={onPrev} disabled={currentIndex === 0}>
                    Previous
                  </button>
                  <button
                    onClick={onNext}
                    disabled={currentIndex === validFeedbacks.length - 1}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="modal-feedback">No feedback available.</div>
            )}

            <button
              className="modal-rate-btn"
              onClick={onRate}
              disabled={reviewed}
            >
              {reviewed ? 'Already Rated' : 'Rate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfModal;
