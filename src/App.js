import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";
import Coin from "./components/Coin";

const App = () => {
  // === STATES ===
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshPage();
  }, []);

  // === GET COINS ===
  const refreshPage = () => {
    setIsLoading(true);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      )
      .then((response) => {
        setIsLoading(false);
        setCoins(response.data);
      });
  };

  // === COIN ELEMENTS ===
  const coinsElements = coins.map((coin) => {
    return (
      <Coin
        key={coin.id}
        id={coin.id}
        icon={coin.image}
        coinName={coin.name}
        coinSymbol={coin.symbol}
        price={coin.current_price}
        priceChange={coin.price_change_percentage_24h}
        marketCap={coin.market_cap}
      />
    );
  });

  return (
    <div className="App">
      <header className="header">
        <h2>Welcome to the CryptoChecker</h2>
      </header>
      <div className="coins-wrapper">
        {isLoading ? (
          <h2 className="loadingMssg">Data Loading...</h2>
        ) : (
          coinsElements
        )}
      </div>
    </div>
  );
};

export default App;
