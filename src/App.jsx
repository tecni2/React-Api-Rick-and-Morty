import { useState, useEffect } from "react";
import "normalize.css";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import ResidentInfo from "./components/ResidentInfo";

function App() {
  const [dataMorty, setDataMorty] = useState({});
  const [locationType, setLocationType] = useState("");

  useEffect(() => {
    const randomLocation = Math.floor(Math.random() * 126) + 1;
    axios
      .get(`https://rickandmortyapi.com/api/location/${randomLocation}`)
      .then((res) => setDataMorty(res.data));
  }, []);
  console.log("Los de Api", dataMorty);

  const searchLocation = () => {
    if (Number(locationType) === 0 || Number(locationType) > 126) {
      alert("Numero no permitido debe ser del rango entre 1 al 126");
      return;
    }

    axios
      .get(`https://rickandmortyapi.com/api/location/${locationType}`)
      .then((res) => setDataMorty(res.data));
  };

  return (
    <div className="App">
      <Header />
      <div className="card-info">
        <div>
          <h2>Name:</h2>
          <p>{dataMorty.name}</p>
        </div>
        <div>
          <h2>Type:</h2>
          <p>{dataMorty.type}</p>
        </div>
        <div>
          <h2>Dimension:</h2>
          <p>{dataMorty.dimension}</p>
        </div>
        <div>
          <h2>Population:</h2>
          <p>{dataMorty.residents?.length}</p>
        </div>
      </div>
      <div className="container-search">
        <input
          type="text"
          name="Search"
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
        />

        <button type="submit" onClick={searchLocation}>
          {" "}
          Search{" "}
        </button>
      </div>

      <div className="container-list-character">
        <div className="container-character">
          {dataMorty.residents?.map((listResidents) => (
            <ResidentInfo key={listResidents} urlCharacter={listResidents} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
