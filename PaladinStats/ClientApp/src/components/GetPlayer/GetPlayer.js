import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Loading from '../Loading/Loading';
import ViewSwitcher from './ViewSwitcher';
import ErrorNavigate from '../Errors/ErrorNavigate';

import './GetPlayer.scss';

export default function GetPlayer() {
    const { playerName } = useParams();
    const [render, setRender] = useState(null);
    const [reload, setReload] = useState(false);

    async function getData() {
        try {
            const getPlayer = await axios.get(`/api/getPlayer/${playerName}`);
            const [getPlayerChampionRanks, getPlayerStatus, getPlayerMatchHistory] = await Promise.all([
                axios.get(`/api/getPlayerChampionRanks/${playerName}`),
                axios.get(`/api/getPlayerStatus/${playerName}`),
                axios.get(`/api/getPlayerMatchHistory/${playerName}`)
            ]);

            setRender(<ViewSwitcher handleReloadClick={() => setReload(!reload)} playerData={getPlayer.data} statusData={getPlayerStatus.data} matchData={getPlayerMatchHistory.data} championData={getPlayerChampionRanks.data} />);
        } catch (error) {
            setRender(<ErrorNavigate error={error} />)
        }
    }

    useEffect(() => {
        setRender(<Loading />);
        getData();
    }, [playerName, reload]);

    return render;
}