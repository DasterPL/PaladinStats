import React from 'react';
import HandleErrorImg from '../../HandleErrorImg';
import './ItemsDeck.scss';

import itemsJSON from '../../resources/items.json';

export default function Deck({ list, type, levels }) {
    const items = list.map(id => itemsJSON.find(item => item.ItemId === id));
    return <ul className={`itemList ${type}`}>
        {items.map((item, index) => {
            if (item) {
                const level = type === 'items' ? levels[index] + 1 : levels[index];
                const descriptionScale = +item.Description.match(/{([^;]*)}/)[1].replace('scale=', '').split('|')[0];
                const scaleLevel = (descriptionScale * level).toPrecision(2);

                const description = item.Description.replace(/{([^;]*)}/, scaleLevel);

                return <li key={index} className='li_deck'>
                    <img onError={HandleErrorImg} src={item.itemIcon_URL} alt={item.DeviceName.substring(0, 4)} title={`${item.DeviceName}: ${description}`} />
                    <span className='itemLevel'>{level}</span>
                </li>
            } else {
                return <li key={index}></li>
            }
        })}
    </ul>;
}