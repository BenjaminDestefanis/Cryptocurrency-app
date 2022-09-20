import React from 'react'
import './CoinItem.css'

 const CoinItem = (props) => {
  return (
    <div className='coin-row'>
        <p>{props.coins.market_cap_rank}</p>
        <div className='img-symbol'>
            <img src={props.coins.image} alt='' />
            {/* toUpperCase() Devuelve el valor en mayusculas */}
            <p>{props.coins.symbol.toUpperCase()}</p>
        </div>

        {/* El método toLocaleString() devuelve un cadena con la representación al idioma de la fecha especificada. */}

        <p>${props.coins.current_price.toLocaleString()}</p>

        {/* El método toFixed() formatea un número usando notación de punto fijo. */}
        <p>{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
        <p className='hide-mobile'>${props.coins.total_volume.toLocaleString()}</p>
        <p className='hide-mobile'>${props.coins.market_cap.toLocaleString()}</p>

    </div>
  )
}

export default CoinItem;