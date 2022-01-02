import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./CoinPage.css";

const CoinPage = () => {
  let { id } = useParams();
  // === STATES ===
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        setCoin(response.data);
      });
  }, [id]);

  if (coin) {
    return (
      <div className="coinpage">
        <div className="coinpage-wrapper">
          <h2 className="coinpage-name">{coin.name}</h2>
          <img
            className="coinpage-image"
            src={coin.image.large}
            alt="symbol img"
          />
          <div className="coinpage-row">
            <h3 className="coinpage-header">Symbol: </h3>
            <p className="coinpage-data">{coin.symbol}</p>
          </div>
          <div className="coinpage-row">
            <h3 className="coinpage-header">Current Price: </h3>
            <p className="coinpage-data">
              $ {coin.market_data.current_price.usd.toLocaleString()}
            </p>
          </div>
          <div className="coinpage-row">
            <h3 className="coinpage-header">Market Cap: </h3>
            <p className="coinpage-data">
              $ {coin.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>
          <div className="coinpage-row">
            <h3 className="coinpage-header">Total Valume: </h3>
            <p className="coinpage-data">
              $ {coin.market_data.total_volume.usd.toLocaleString()}
            </p>
          </div>
          <div className="coinpage-row">
            <h3 className="coinpage-header">24hr High: </h3>
            <p className="coinpage-data green">
              $ {coin.market_data.high_24h.usd.toLocaleString()}
            </p>
          </div>
          <div className="coinpage-row">
            <h3 className="coinpage-header">24hr Low: </h3>
            <p className="coinpage-data red">
              $ {coin.market_data.low_24h.usd.toLocaleString()}
            </p>
          </div>
          <Link className="coinpage-link" to="/">
            Go Back
          </Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CoinPage;
