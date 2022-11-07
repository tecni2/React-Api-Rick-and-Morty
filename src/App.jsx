import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
import 'normalize.css';
import './App.css'
import Header from './components/Header';
import axios from 'axios';
import ResidentInfo from './components/ResidentInfo';

function App() {
  const [dataMorty, setDataMorty] = useState({});
  const [locationType, setLocationType ] = useState("");

  useEffect(() => {
    const randomLocation = Math.floor(Math.random() * 126) + 1;
    axios.get(`https://rickandmortyapi.com/api/location/${randomLocation}`)
      .then(res => setDataMorty(res.data));
  }, []);
  console.log('Los de Api', dataMorty);

  const searchLocation = () => {
      if(Number(locationType) === 0 || Number(locationType) > 126){
        alert('Numero no permitido debe ser del rango entre 1 al 126');
        return;
      } 
    // console.log(dataMorty);
    axios.get(`https://rickandmortyapi.com/api/location/${locationType}`)
    .then(res => setDataMorty(res.data));
  }

  return (
    <div className="App">
      <Header/>
      <div className="card-info">
        <div>
          <h2>Nombre:</h2>
          <p>{dataMorty.name}</p>
        </div>
        <div>
          <h2>Tipo:</h2>
          <p>{dataMorty.type}</p>
        </div>
        <div>
          <h2>Dimension:</h2>
          <p>{dataMorty.dimension}</p>
        </div>
        <div>
          <h2>Población:</h2>
          <p>{dataMorty.residents?.length}</p>
        </div>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      </div>
      <div className='container-search'>
      
      <input type="text" name='Search' value={locationType} onChange={e => setLocationType(e.target.value)}/>
      
      <button type='submit' onClick={searchLocation}> Search </button>
     
      {/* console.log(`log ${locationType.residents?.map}`); */}
    </div>

    <div className='container-list-character'>
    <div className='container-character'>
      {dataMorty.residents?.map(listResidents => (
        <ResidentInfo 
        key={listResidents}
        urlCharacter={listResidents}/>
        ))}
      </div>

    </div>

    </div>
  )
}

export default App
