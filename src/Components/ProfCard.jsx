
const ProfCard = ({ name, imgSrc, rating, feedback}) => {
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
