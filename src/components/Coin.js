import "./Coin.css";
import { useNavigate } from "react-router-dom";

const Coin = ({
  id,
  icon,
  coinName,
  coinSymbol,
  price,
  priceChange,
  marketCap,
}) => {
  let navigate = useNavigate();
  return (
    <div className="coin">
      <img className="coin-image" src={icon} alt="img" />
      <h3 className="coin-name">{coinName}</h3>
      <p className="coin-symbol">{coinSymbol}</p>
      <p className="coin-price">$ {price.toFixed(2)}</p>
      {priceChange > 0 ? (
        <p className="coin-price-change green">+{priceChange.toFixed(2)} %</p>
      ) : (
        <p className="coin-price-change red">{priceChange.toFixed(2)} %</p>
      )}
      <p className="coin-marketcap">$ {marketCap.toLocaleString()}</p>
      <button
        className="coin-info-btn"
        onClick={() => {
          console.log(navigate(`/coin/${id}`));
        }}
      >
        More Info
      </button>
    </div>
  );
};

export default Coin;
