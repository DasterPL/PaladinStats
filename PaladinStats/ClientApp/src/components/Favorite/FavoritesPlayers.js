import React from 'react';
import { useNavigate } from 'react-router'
import useLocalStorage from '../../Utils/useLocalStorage';
import HandleErrorImg from '../../Utils/HandleErrorImg';
import './Favorite.scss';

const SortablePlayerItem = ({ id, avatar, name }) => {
    const navigate = useNavigate();
    return (
        <li onClick={() => { navigate(`/player/${id}`) }}>
            <img onError={HandleErrorImg} src={avatar} alt='' />
            <span>{name}</span>
        </li>
    )
}

const FavoritesPlayersList = ({ favourites }) => {
    return <ul className='favoritesPlayers'>
        {favourites.map(({ name, avatar, id }) => <SortablePlayerItem key={id} name={name} avatar={avatar} id={id} />)}
    </ul>;
}

export default function FavoritesPlayers() {
    const [favourites, setFavourites] = useLocalStorage('favouritesPlayers', []);
    if (favourites.length === 0) {
        return null;
    }
    return <FavoritesPlayersList favourites={favourites} />
};