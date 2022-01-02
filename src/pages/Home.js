import axios from "axios";
import { useEffect, useState } from "react";

import refreshImage from "../assets/images/refresh.png";
import Coin from "../components/Coin";

const Home = () => {
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
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false",
      )
      .then((response) => {
        setIsLoading(false);
        setCoins(response.data);
        setFilteredCoins(response.data);
      });
  };

  const handleInput = (event) => {
    setSearchValue(event.target.value);
    const newList = coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchValue.toLowerCase());
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

  if (coins) {
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
        <div className="coins-wrapper">{coinsElements}</div>
      </div>
    );
  } else {
    return <h2 className="loadingMssg">Data Loading...</h2>;
  }
};

export default Home;
