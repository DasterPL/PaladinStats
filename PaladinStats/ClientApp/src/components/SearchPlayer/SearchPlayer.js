import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from '../../Utils/useLocalStorage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import FavoritesPlayers from '../Favorite/FavoritesPlayers';
import './SearchPlayer.scss';

export default function SearchPlayer() {
    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = useState('');

    const [lastSearched, setLastSearched] = useLocalStorage('lastSearched', []);

    
    useEffect(() => {
        lastSearched.addChangeListener((value)=>{
            setLastSearched(value);
        });
    }, []);
    
    function handleSubmit(event) {
        event.preventDefault();
        const playerName = event.target.playerName.value
        if (playerName !== '') {
            navigate(`/player/${playerName}`);
            setValue('');
        }
    }

    const isHome = location.pathname === '/';

    return <div className={`searchbox${!isHome ? ' mini' : ''}`}>
        <form onSubmit={handleSubmit}>
            <div className='input'>
                <input type='search' list="lastSearched" id="nick_input" placeholder=' ' name='playerName' value={value} onChange={e => { setValue(e.target.value) }} />
                <label htmlFor="nick_input">Nazwa gracza</label>
            </div>
            <datalist id="lastSearched" onDoubleClick={(e) => { console.log(e) }}>
                {lastSearched.map((player, index) => <option key={index} value={player} />)}
            </datalist>
            <button type='submit'><FontAwesomeIcon icon={faSearch} /></button>
        </form>
        {isHome ? <FavoritesPlayers /> : null}
    </div>;
}