import React from 'react';
import './App.css';

import {useState, useEffect} from 'react';
import axios from 'axios';
import { Route, Router, Routes } from 'react-router-dom';

import Coins from './Components/Coins';
import Navbar from './Components/Navbar';
import Coin from './Routes/Coin'

function App() {


  /* Definimos el estado del componente APP */

  const [coins, setCoins] = useState([]);

  /* Guardamos el ENDPONT que hara la consulta a la API */


                                                                                                  //Cambiado el page -> para obtener mas objetos
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"

  /* HOOK useEffect -> Se aplica cada ves que se renderiza la pagina */
  /* Osea que cada ves que se carge la pagina , se realizara una consulta a la api para obtener los datos. */

  useEffect( () => {
    /* get -> hace una solicitud al endpoint. */
    /* then -> promesa , si hay respuesta (rsponse) , cambiaramos el estado , metiendo los datos que obtenemos de la API */
    axios.get(url).then( (response) => {
      setCoins(response.data)
      console.log(response.data[0])

      /* Si no se cumple la promesa , se cumple el catch que obtendra un "error" , y lo imprimira en la pantalla */
    }).catch( (error) => {
      console.log(error)
    })
  }, [])



  return (
    <div className="App">
      <Navbar />

      {/* Dentro de Routes - Van todas las rutas que definiremos */}
      <Routes>
        <Route path='/' element={<Coins coins={coins}/>} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coindId' element={<Coin />} />

        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
