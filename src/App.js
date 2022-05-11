import { useState, useEffect } from "react";
import "./App.css";
import Kortti from "./components/Kortti";

const korttienKuvat = [
  { src: "/images/hedgehog.jpg", osuma: false },
  { src: "/images/dog.jpg", osuma: false },
  { src: "/images/puppy.jpg", osuma: false },
  { src: "/images/dolphin.jpg", osuma: false },
  { src: "/images/ducks.jpg", osuma: false },
  { src: "/images/kitten.jpg", osuma: false },
  { src: "/images/toucan.jpg", osuma: false },
  { src: "/images/bunny.jpg", osuma: false },
  { src: "/images/giraffe.jpg", osuma: false },
];

const audio = new Audio("/sounds/bell.mp3")

function App() {
  const [kortit, setKortit] = useState([]);
  const [vuorot, setVuorot] = useState(0);
  const [valinta1, setValinta1] = useState(null);
  const [valinta2, setValinta2] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    korttienSekoitus();
  }, [])

  /*Tarkistetaan, että molemmissa valinnoissa on arvo. Sen jälkeen käydään kortit läpi ja laitetaan osuma true matchiin.
  Estetään korttien kääntäminen (disabled:true) funktion suorittamisen ajaksi */ 
  useEffect(() => {
    if(valinta1 && valinta2){
      setDisabled(true)
      if(valinta1.src === valinta2.src){
        audio.play();
        setKortit(prevKortit => {
          return prevKortit.map(kortti => {
            if(kortti.src === valinta1.src){
              return {...kortti, osuma:true}
            }else{
              return kortti;
            }
          })
        })
        alustaValinnat();
      }else{
        setTimeout(() => alustaValinnat(), 1000);
      }
    }
  }, [valinta1, valinta2])

  const korttienSekoitus = () => {
    const sekoitetutKortit = [...korttienKuvat, ...korttienKuvat]
      .sort(() => Math.random() - 0.5) //Sekoittaa kortit. Negatiivinen numero pitää järjestyksen samana, positiivinen muuttaa kahden vertailtavan "kortin" järjestystä.
      .map((kortti) => ({ ...kortti, id: Math.random() })); //Luodaan id korteille.

    setValinta1(null);
    setValinta2(null);  
    setKortit(sekoitetutKortit);
    setVuorot(0);
  };

  //tarkistaa onko valinta1 jo arvo, jos on laitetaan valinta2 arvoksi kortti, muuten laitetaan valinta1 arvoksi kortti. 
  const kortinValinta = (kortti) => {
    if(valinta1){
      setValinta2(kortti);
    }else{
    setValinta1(kortti);
  }
  };

  const alustaValinnat = () => {
    setValinta1(null);
    setValinta2(null);
    setVuorot(prevVuorot => prevVuorot +1);
    setDisabled(false);
  }

  return (
    <div className="App">

      <h1>ISLAN MUISTIPELI</h1>
      <button onClick={korttienSekoitus}>UUSI PELI</button>
      <p>Arvauksia: {vuorot}</p>
      

      <div className="kortti-grid">
        {kortit.map((kortti) => (
          <Kortti
            key={kortti.id}
            kortti={kortti}
            kortinValinta={kortinValinta}
            flipped = {kortti === valinta1 || kortti === valinta2 || kortti.osuma}
            disabled = {disabled}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;
