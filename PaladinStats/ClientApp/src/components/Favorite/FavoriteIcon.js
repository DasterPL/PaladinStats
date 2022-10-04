import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as starFill } from '@fortawesome/free-solid-svg-icons';
import { faStar as starHollow } from '@fortawesome/free-regular-svg-icons';

import './Favorite.scss';
import useLocalStorage from '../../useLocalStorage';

export default function FavoriteIcon({ playerName, avatar, id }) {
    const [favoritesIcon, setFavoritesIcon] = useState(starHollow);

    const [favourites, setFavourites] = useLocalStorage('favouritesPlayers', []);

    const favoriteIndex = favourites.findIndex(fav => fav.id === id);
    const player = {
        name: playerName,
        id: id,
        avatar: avatar
    };

    useEffect(() => {
        if (favoriteIndex !== -1) {
            setFavoritesIcon(starFill);
            const updateFav = favourites.filter(value => value.id !== id);
            setFavourites([player, ...updateFav]);
        }
    }, []);

    function handleFavModify() {
        if (favoriteIndex !== -1) {
            const filtered = favourites.filter(value => value.id !== id);
            setFavourites(filtered);
            setFavoritesIcon(starHollow);
        } else {
            setFavourites([...favourites, player])
            setFavoritesIcon(starFill);
        }
    }
    return <FontAwesomeIcon className='favoritesIcon' icon={favoritesIcon} color={'gold'} onClick={handleFavModify} />
}