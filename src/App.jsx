import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/images.png';
import ProfCard from './Components/ProfCard';

function App() {
  const [professors, setProfessors] = useState([]);

  // Fetch professor details from the backend
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch('http://localhost:5000/professors'); // Adjust the URL if necessary
        const data = await response.json();
        // Map the data to the expected format for ProfCard
        const formattedData = data.map(prof => ({
          name: prof.profName,
          src: prof.image,
          rating: 'N/A', // Assuming no rating is available from the backend
          feedback: 'No feedback available' // Assuming no feedback is available from the backend
        }));
        setProfessors(formattedData);
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };

    fetchProfessors();
  }, []);
  return (
    <>
      <img src={logo} alt="logo" />
      <div className="profCards">
        {professors.map(({ name, src, rating, feedback }, index) => (
          <ProfCard key={index} name={name} imgSrc={src} rating={rating} feedback={feedback} />
        ))}
      </div>
    </>
  );
}

export default App;
