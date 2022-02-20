import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as starFill } from '@fortawesome/free-solid-svg-icons';
import { faStar as starHollow } from '@fortawesome/free-regular-svg-icons';
import Cookies from '../../CookieSingleton';

import './Favorite.scss';

export default function FavoriteIcon({ playerName, avatar, id }) {
    const [favoritesIcon, setFavoritesIcon] = useState(starHollow);
    const favourites = Cookies().get('favouritesPlayers') || [];

    const favoriteIndex = favourites.findIndex(fav => fav.id === id);
    const player = {
        name: playerName,
        id: id,
        avatar: avatar
    };

    useEffect(() => {
        if (favoriteIndex !== -1) {
            setFavoritesIcon(starFill);
            favourites[favoriteIndex] = player;
            Cookies().set('favouritesPlayers', favourites, { path: '/' })
        }
    }, []);

    function handleFavModify() {
        if (favoriteIndex !== -1) {
            const filtered = favourites.filter(value => value.id !== id);
            Cookies().set('favouritesPlayers', filtered, { path: '/' });
            setFavoritesIcon(starHollow);
        } else {
            favourites.push(player);
            Cookies().set('favouritesPlayers', favourites, { path: '/' });
            setFavoritesIcon(starFill);
        }
    }
    return <FontAwesomeIcon className='favoritesIcon' icon={favoritesIcon} color={'gold'} onClick={handleFavModify} />
}