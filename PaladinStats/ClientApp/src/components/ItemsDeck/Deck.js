import React from 'react';
import HandleErrorImg from '../../HandleErrorImg';
import './ItemsDeck.scss';

import itemsJSON from '../../resources/items.json';

export default function Deck({ list, type, levels }) {
    const items = list.map(id => itemsJSON.find(item => item.ItemId === id));
    return <ul className={`itemList ${type}`}>
        {items.map((item, index) => {
            if (item) {
                const description = item.Description
                return <li key={index} className='li_deck'>
                    <img onError={HandleErrorImg} src={item.itemIcon_URL} alt={item.DeviceName.substring(0, 4)} title={`${item.DeviceName}: ${description}`} />
                    <span className='itemLevel'>{type === 'items' ? levels[index] + 1 : levels[index]}</span>
                </li>
            } else {
                return <li key={index}></li>
            }
        })}
    </ul>;
}