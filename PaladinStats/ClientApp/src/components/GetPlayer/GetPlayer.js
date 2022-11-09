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

    useEffect(() => {
        setRender(<Loading />);
        const controllers = [new AbortController(), new AbortController(), new AbortController(), new AbortController()];
        const getData = async () => {
            try {
                const [
                    getPlayer,
                    getPlayerChampionRanks,
                    getPlayerStatus,
                    getPlayerMatchHistory
                ] = await Promise.all([
                    axios.get(`/api/getPlayer/${playerName}`, { signal: controllers[0].signal }),
                    axios.get(`/api/getPlayerChampionRanks/${playerName}`, { signal: controllers[1].signal }),
                    axios.get(`/api/getPlayerStatus/${playerName}`, { signal: controllers[2].signal }),
                    axios.get(`/api/getPlayerMatchHistory/${playerName}`, { signal: controllers[3].signal })
                ]);
                setRender(<ViewSwitcher handleReloadClick={() => setReload(!reload)} playerData={getPlayer.data} statusData={getPlayerStatus.data} matchData={getPlayerMatchHistory.data} championData={getPlayerChampionRanks.data} />);
            } catch (error) {
                controllers.forEach(controller => controller.abort());
                setRender(<ErrorNavigate error={error} />);
            }
        }
        getData();
        return () => {
            controllers.forEach(controller => controller.abort());
        }
    }, [playerName, reload]);

    return render;
}