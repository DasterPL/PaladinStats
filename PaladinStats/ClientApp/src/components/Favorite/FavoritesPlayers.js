import React from 'react'
import { useNavigate } from 'react-router';
import HandleErrorImg from '../../HandleErrorImg';
import useLocalStorage from '../../useLocalStorage';
import './Favorite.scss';

export default function FavoritesPlayers() {
    const navigate = useNavigate();
    const [favourites, setFavourites] = useLocalStorage('favouritesPlayers', []);

    return favourites.length > 0 ? <ul className='favoritesPlayers'>
        {favourites.map(({ name, avatar, id }, index) => <li key={index} onClick={() => { navigate(`/player/${id}`) }}>
            <img onError={HandleErrorImg} src={avatar} alt='' />
            <span>{name}</span>
        </li>)}
    </ul> : null;
}
