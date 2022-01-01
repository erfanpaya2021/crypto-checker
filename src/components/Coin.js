import "./Coin.css";

const Coin = ({
  icon,
  coinName,
  coinSymbol,
  price,
  priceChange,
  marketCap,
}) => {
  return (
    <div className="coin">
      <img className="coin-image" src={icon} alt="img" />
      <h3 className="coin-name">{coinName}</h3>
      <p className="coin-symbol">{coinSymbol}</p>
      <p className="coin-price">$ {price.toFixed(2)}</p>
      {priceChange > 0 ? (
        <p className="coin-price-change" style={{ color: "#0f4" }}>
          +{priceChange.toFixed(2)} %
        </p>
      ) : (
        <p className="coin-price-change" style={{ color: "#f44" }}>
          {priceChange} %
        </p>
      )}
      <p className="coin-marketcap">$ {marketCap.toLocaleString()}</p>
      <button className="coin-info-btn">More Info</button>
    </div>
  );
};

export default Coin;
