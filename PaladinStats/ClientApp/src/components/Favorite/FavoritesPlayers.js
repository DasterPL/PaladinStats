import React from 'react'
import { useNavigate } from 'react-router';
import Cookies from '../../CookieSingleton';
import HandleErrorImg from '../../HandleErrorImg';
import './Favorite.scss';

export default function FavoritesPlayers() {
    const navigate = useNavigate();
    const favourites = Cookies().get('favouritesPlayers') || [];

    while(favourites.length % 4 !== 0){
        favourites.push({name: null, avatar: null, id: null});
    }

    return favourites.length > 0 ? <ul className='favoritesPlayers'>
        {favourites.map(({ name, avatar, id }, index) => id===null ? 
        <li key={index} className="empty"></li> : 
        <li key={index} onClick={() => { navigate(`/player/${id}`) }}>
            <img onError={HandleErrorImg} src={avatar} alt='' />
            <span>{name}</span>
        </li>)}
    </ul> : null;
}
