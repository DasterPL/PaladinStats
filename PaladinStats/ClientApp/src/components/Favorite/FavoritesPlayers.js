import React from 'react'
import { useNavigate } from 'react-router';
import Cookies from '../../CookieSingleton';
import HandleErrorImg from '../../HandleErrorImg';
import './Favorite.scss';

export default function FavoritesPlayers() {
    const navigate = useNavigate();
    const favourites = Cookies().get('favouritesPlayers') || [];

    return <ul className='favoritesPlayers'>
        {favourites.map(({ name, avatar, id }, index) => <li key={index} onClick={() => { navigate(`/player/${id}`) }}>
            <img onError={HandleErrorImg} src={avatar} alt='' />
            <span>{name}</span>
        </li>)}
    </ul>
}
