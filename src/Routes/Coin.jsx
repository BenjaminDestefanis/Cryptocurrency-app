import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';

import './'

function Coin() {

  
  const params = useParams()

  /* useParams() -> HOOK de 'react-router-dom' / saca el path donde se renderiza el componente */
  console.log(params)
  console.log(params.coindId)
  const [coin, setCoin] = useState({});

  const url = `https://api.coingecko.com/api/v3/coins/${params.coindId}`

  useEffect( () => {
    axios.get(url).then( (response) => {
      setCoin(response.data)
      console.log(response)
    }).catch( (error) => {
      console.log(error)
    })
  }, [])



  return (
    <div>
        <h1>{coin.id}</h1>
    </div>
  )
}

export default Coin;