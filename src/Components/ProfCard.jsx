import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import default_dp from '/default.jpg';
import { ImageCacheContext } from '../App';


const ProfCard = ({ name, profID, rating, feedbacks }) => {
  const [image, setImage] = useState(default_dp);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef();
  const imageCache = useContext(ImageCacheContext);

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
            const res = await axios.get(
              `http://localhost:5000/api/professor/${profID}/image`
            );
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

  return (
    <div className="card" ref={cardRef}>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <img src={image} alt={`Professor ${name}`} className="professor-image" />
      )}
      <h2>{name}</h2>
      <h3>Rating: {rating} ⭐</h3>
      <p>{feedbacks}</p>
    </div>
  );
};

export default ProfCard;
