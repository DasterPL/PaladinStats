import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from '../../CookieSingleton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import FavoritesPlayers from '../Favorite/FavoritesPlayers';
import './SearchPlayer.scss';

export default function SearchPlayer() {
    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = useState('');

    const lastSearchedCookie = Cookies().get('lastSearched') || [];
    const [lastSearched, setLastSearched] = useState(lastSearchedCookie.map((player, index) => <option key={index} value={player} />))

    useEffect(() => {
        Cookies().addChangeListener(cookie => {
            if (cookie.name === 'lastSearched') {
                const newCookie = Cookies().get('lastSearched')
                setLastSearched(newCookie.map((player, index) => <option key={index} value={player} />));
            }
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
                {lastSearched}
            </datalist>
            <button type='submit'><FontAwesomeIcon icon={faSearch} /></button>
        </form>
        {isHome ? <FavoritesPlayers /> : null}
    </div>;
}