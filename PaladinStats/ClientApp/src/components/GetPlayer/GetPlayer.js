import React, { useState, useEffect } from 'react';
import Cookies from '../../CookieSingleton';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './GetPlayer.scss';

import Loading from '../Loading/Loading';
import ViewSwitcher from './ViewSwitcher';
import ErrorNavigate from '../Errors/ErrorNavigate';

export default function GetPlayer() {
    const { playerName } = useParams();
    const [render, setRender] = useState(<Loading />);

    async function getData() {
        try {
            const [getPlayer, getPlayerChampionRanks, getPlayerStatus, getPlayerMatchHistory] = await Promise.all([
                axios.get(`/api/getPlayer/${playerName}`),
                axios.get(`/api/getPlayerChampionRanks/${playerName}`),
                axios.get(`/api/getPlayerStatus/${playerName}`),
                axios.get(`/api/getPlayerMatchHistory/${playerName}`)
            ]);

            const lastSearched = Cookies().get('lastSearched') || [];
            const index = lastSearched.indexOf(getPlayer.data.hz_player_name);
            if (index !== -1) {
                arrayMove(lastSearched, index, 0);
            } else {
                lastSearched.unshift(getPlayer.data.hz_player_name);
            }
            const lastSearchedLimit = lastSearched.splice(0, 5);
            Cookies().set('lastSearched', lastSearchedLimit, { path: '/', expires: new Date(Date.now() + 3600 * 1000 * 24) });

            setRender(<ViewSwitcher playerData={getPlayer.data} statusData={getPlayerStatus.data} matchData={getPlayerMatchHistory.data} championData={getPlayerChampionRanks.data} />);
        } catch (error) {
            setRender(<ErrorNavigate error={error} />)
        }
    }

    useEffect(() => {
        setRender(<Loading />);
        getData();
    }, [playerName]);

    return render;
}

function arrayMove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}