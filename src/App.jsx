import './App.css'
import logo from './assets/images.png'
import ProfCard from './Components/ProfCard'


const professors = [
  {
    name : 'Dr.Kannan K',
    src : 'https://rmp-backend.vercel.app/images/image_C007.jpg',
    rating : 4.5,
    feedback :  'Great Professor'
  },
  {
    name : 'Dr.Uma Mageshwari',
    src : 'https://rmp-backend.vercel.app/images/image_C130.jpg',
    rating : 4.0,
    feedback :  'Good Professor'
  }
];

function App() {
  return (
      <>
        <img src={logo} alt="logo" />
        <div className="profCards">
          {professors.map(({name,src,rating,feedback},index)=>{ 
            return <ProfCard key={index} name={name} imgSrc={src} rating={rating} feedback={feedback}/>
          })
          }
        </div>
      </>
  );
};

export default App;
