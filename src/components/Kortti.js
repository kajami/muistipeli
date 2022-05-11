import "./Kortti.css";

const audio = new Audio("/sounds/blopp.mp3")

export default function Kortti({ kortti, kortinValinta, flipped, disabled }) {

  const handleClick = () => {
    if(!disabled){
      audio.play()
      kortinValinta(kortti);
    }
  }

  return (
    <div>
      <div className="kortti">
        <div className={flipped ? "kaannetty" : ""}>
          <img src={kortti.src} className="etupuoli" alt="kortin etupuoli" />
          <img
            src="/images/takakansi.jpg"
            className="takapuoli"
            alt="kortin takapuoli"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
