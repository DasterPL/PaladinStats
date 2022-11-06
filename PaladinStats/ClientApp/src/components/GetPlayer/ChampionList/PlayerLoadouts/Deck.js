import React from 'react'
import GetItem from '../../../../Utils/GetItem'

export default function Deck({ data }) {
  return (
    <li className='deck'>
      <span className='deckName'>{data.DeckName}</span>
      <ul>
        {data.LoadoutItems.map(({ItemId, Points}, i) => {
          const {src, name, description} = GetItem(ItemId, Points);
          return <li key={i}>
            <img src={src} title={`${name}(${Points}): ${description}`}/>
            <span className='cardName'>{name}</span>
            <ul className='points'>
              {[...Array(Points)].map((index)=><li key={index}></li>)}
            </ul>
          </li>
        })}
      </ul>
    </li>
  )
}
