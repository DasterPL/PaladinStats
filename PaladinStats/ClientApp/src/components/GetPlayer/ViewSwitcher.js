import React, { useState } from 'react'
import MatchList from './MatchList/MatchList';
import NavBar from './NavBar';
import ChampionList from './ChampionList/ChampionList';
import Overview from './Overview/Overview';

export default function ViewSwitcher({ playerData, statusData, matchData, championData }) {
    const [compontent, setComponent] = useState(<Overview playerData={playerData} championData={championData} statusData={statusData} />)

    function handleChangeView(view) {
        switch (view) {
            case 'overview':
                setComponent(<Overview playerData={playerData} championData={championData} statusData={statusData} />);
                break;
            case 'matches':
                setComponent(<MatchList matchData={matchData} />);
                break;
            case 'champions':
                setComponent(<ChampionList championData={championData} />);
                break;
        }
    }
    return <>
        <NavBar changeView={handleChangeView} />
        {compontent}
    </>
}