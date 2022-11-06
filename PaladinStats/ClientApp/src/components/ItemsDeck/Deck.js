import React from 'react';
import HandleErrorImg from '../../Utils/HandleErrorImg';
import GetItem from '../../Utils/GetItem';
import './ItemsDeck.scss';

export default function Deck({ list, type, levels }) {

    return <ul className={`itemList ${type}`}>
        {list.map((element, index) => {
            const level = type === 'items' ? levels[index] + 1 : levels[index];
            const item = GetItem(element, level);
            if (!item) {
                return <li key={index}></li>
            }
            return <li key={index} className='li_deck'>
                <img onError={HandleErrorImg} src={item.src} alt={item.name.substring(0, 4)} title={`${item.name}: ${item.description}`} />
                <span className='itemLevel'>{level}</span>
            </li>
        })}
    </ul>;
}