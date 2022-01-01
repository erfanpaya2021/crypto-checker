import axios from "axios";
import { useEffect, useState } from "react";

import refreshImage from "./assets/images/refresh.png";
import "./App.css";
import Coin from "./components/Coin";

const App = () => {
  // === STATES ===
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchValue, setSearchValue] = useState("");
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
        setFilteredCoins(response.data)
      });
  };

  const handleInput = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    const newList = coins.filter((coin) => {
      return coin.name.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredCoins(newList);
  };

  // === COIN ELEMENTS ===
  const coinsElements = filteredCoins.map((coin) => {
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
        <div className="search-flex">
          <input
            className="search-input"
            type="text"
            value={searchValue}
            name="searchValue"
            onChange={handleInput}
            placeholder="Search for a Coin"
          />
          <img
            onClick={refreshPage}
            className="refresh-image"
            src={refreshImage}
            alt="refresh"
          />
        </div>
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
