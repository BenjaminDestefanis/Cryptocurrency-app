import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
import DOMPurify from 'dompurify';

import './Coin.css'

function Coin() {

  const [coin, setCoin] = useState({});



  //useParams obtiene el valor de la ruta - y lo guardamos en una variable "params"
  
  const params = useParams()

  /* useParams() -> HOOK de 'react-router-dom' / saca el path donde se renderiza el componente */
  console.log(params)
  console.log(params.coindId)
  


  /* Lo colocamos en el ENDPOINT para que renderize el dato de la moneda , segun la moneda que seleccionamos */

  const url = `https://api.coingecko.com/api/v3/coins/${params.coindId}`

  useEffect( () => {
    axios.get(url).then( (response) => {
      setCoin(response.data)
      //console.log(response)
    }).catch( (error) => {
      console.log(error)
    })
  }, [])



  return (
    <div className='coin-container'>

      {/* ID de la moneda */}
      <div className='content'>
          <h1>{coin.id}</h1>
      </div>
        
        <div className='content'>
          <div className='rank'>
            <span className='rank-btn'>Rank # {coin.market_cap_rank}</span>
          </div>

          <div className='info'>
            <div className='coin-heading'>

              {/* Pregunta si contiene la imagen la moneda - si no la tiene - no coloca nada */}
              {coin.image ? <img src={coin.image.small} alt="" /> : null} 

              <p>{coin.name}</p>
              {coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p> : null}
              

              <div className='coin-price'>
                {coin.market_data?.current_price ? <p>${coin.market_data.current_price.usd.toLocaleString()}</p> : null}
              </div>
              
            </div>
          </div>

          <div className='content'>
            <table>
              <thead>
                <tr>
                  <th>1h</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>14d</th>
                  <th>30d</th>
                  <th>1yr</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{coin.market_data?.price_change_percentage_1h_in_currency ?   <p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                  <td>{coin.market_data?.price_change_percentage_24h_in_currency ?  <p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                  <td>{coin.market_data?.price_change_percentage_7d_in_currency ?   <p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                  <td>{coin.market_data?.price_change_percentage_14d_in_currency ?  <p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                  <td>{coin.market_data?.price_change_percentage_30d_in_currency ?  <p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                  <td>{coin.market_data?.price_change_percentage_1yr_in_currency ?  <p>{coin.market_data.price_change_percentage_1yr_in_currency.usd.toFixed(1)}%</p> : null}</td>



                </tr>
              </tbody>
            </table>
          </div>

          <div className='content'>
            <div className='stats'>
                <div className='left'>
                  <div className='row'>
                    <h4>24 Hour Low</h4>
                    {coin.market_data?.low_24h ? <p>{coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
                    {/* <p>{coin.market_data.low_24h.usd}</p> */}
                  </div>

                  <div className='row'>
                    <h4>24 Hour High</h4>
                    {coin.market_data?.high_24h ? <p>{coin.market_data.high_24h.usd.toLocaleString()}</p> : null}
                    
                  </div>
                    
                </div>

                <div className='right'>
                  <div className='row'>
                    <h4>Market Cap</h4>
                    {coin.market_data ? <p>{coin.market_data.market_cap.usd.toLocaleString()}</p> : null}
                    
                  </div>

                  <div className='row'>
                    <h4>Circulating Supply</h4>
                    {coin.market_data ? <p>{coin.market_data.circulating_supply}</p> : null}
                    
                  </div>
                    
                </div>

                
            </div>
          </div>
          
          <div className='content'>
            <div className='about'>
              <h3>about</h3>
             
              <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),
                        }}>
                        
                        </p>
            </div>

          </div>
        </div>


    </div>
  )
}

export default Coin;