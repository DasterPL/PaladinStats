import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams } from 'react-router';
import Loading from '../../../Loading/Loading';
import ChampionIcon from '../../../ChampionIcon';
import championsList from '../../../../Resources/champions.json';
import './PlayerLoadouts.scss';
import Deck from './Deck';

function GetElement() {
    const playerloadoutsDOM = document.getElementById('playerloadouts');
    if (!playerloadoutsDOM) {
        const newElement = document.createElement('div');
        newElement.setAttribute('id', 'playerloadouts');
        document.body.appendChild(newElement);
        return newElement;
    } else {
        return playerloadoutsDOM;
    }
}

export default function PlayerLoadouts({ champion, target }) {
    const { playerName } = useParams();
    const [render, setRender] = useState(<Loading dark={true} />);
    const closeButton = useRef(0);

    useEffect(() => {
        if (target) {
            closeButton.current.focus();
        }
        const abortController = new AbortController()
        axios.get(`api/GetPlayerLoadouts/${playerName}`, { signal: abortController.signal }).then(({ data }) => {
            const loadouts = data.filter((element) => element.ChampionId === champion);
            if (loadouts.length === 0) {
                setRender(<span>Brak talii</span>)
            } else {
                setRender(<ul className='loadoutsList'>
                    {loadouts.map((deck, i) => <Deck key={i} data={deck} />)}
                </ul>);
            }
        });
        return () => {
            abortController.abort();
        }

    }, []);

    const handleClick = () => {
        GetElement().remove();
        target?.focus();
    }
    const championParams = championsList.find(c => c.id === champion);
    return createPortal(<>
        <div className='dialog'>
            <div className='topBar'>
                <ChampionIcon championId={champion} />
                <span className='championName'>{championParams.Name}</span>
                <button ref={closeButton} tabIndex={0} onClick={handleClick} className='closeButton'><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            {render}
        </div>
    </>, GetElement());
}