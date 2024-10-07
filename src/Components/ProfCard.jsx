
const ProfCard = ({ name = "saketh", imgSrc = "http://localhost:5000/images/image_C007.jpg", rating="4.69", feedback = "Waste Nayi"}) => {
  return (
    <div className="professor-card">
      <img src={imgSrc} alt={name} />
      <h3>{name}</h3>
      <p>Rating: {rating}</p>
      <p>{feedback}</p>
    </div>
  );
};

export default ProfCard;
