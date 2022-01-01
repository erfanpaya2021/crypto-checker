// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    getCoins();
  }, []);

  const getCoins = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      )
      .then((data) => setCoins(data.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
    </div>
  );
}

export default App;
