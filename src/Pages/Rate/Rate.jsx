import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import default_dp from '/default.jpg';
import { ImageCacheContext } from '../../App';
import StarRating from '../../Components/StarRating/StarRating';
import './Rate.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profID = new URLSearchParams(location.search).get('profID');
  const imageCache = useContext(ImageCacheContext);

  const [professor, setProfessor] = useState(null);
  const [image, setImage] = useState(default_dp);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profRes = await axios.get(`https://rmp-backend.vercel.app/api/professor/${profID}`);
        setProfessor(profRes.data);

        if (imageCache.has(profID)) {
          setImage(imageCache.get(profID));
        } else {
          const imgRes = await axios.get(`https://rmp-backend.vercel.app/api/professor/${profID}/image`);
          imageCache.set(profID, imgRes.data.imageUrl);
          setImage(imgRes.data.imageUrl);
        }

        const ratingRes = await axios.get(`https://rmp-backend.vercel.app/api/rate/${profID}`, {
          withCredentials: true,
        });

        if (ratingRes.data.rated) {
          setRating(ratingRes.data.rating);
          setFeedback(ratingRes.data.feedback);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchData();
  }, [profID, imageCache]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        `https://rmp-backend.vercel.app/api/rate/${profID}`,
        { rating, feedback },
        { withCredentials: true }
      );
      toast.success('Rating submitted successfully!');
    } catch (err) {
      toast.error('Error submitting rating!');
    }
  };

  return (
    <div className="rate-container">
      {professor ? (
        <>
          <div className="prof-header">
            <img src={image || default_dp} alt={professor.name} />
            <h2>{professor.name}</h2>
          </div>

          <StarRating rating={rating} setRating={setRating} interactive={true} />

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback..."
          />

          <div className="rate-buttons">
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            <button className="clear-btn" onClick={() => { setRating(0); setFeedback(''); }}>Clear</button>
          </div>

          <button className="home-btn" onClick={() => navigate('/')}>Go to Home</button>
          <ToastContainer position="top-center" autoClose={2000} hideProgressBar newestOnTop closeOnClick pauseOnHover />
        </>
      ) : (
        <p>Loading professor details...</p>
      )}
    </div>
  );
};

export default RatePage;
