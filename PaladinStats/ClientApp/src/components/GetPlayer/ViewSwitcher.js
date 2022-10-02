import React, { useEffect } from 'react'
import MatchList from './MatchList/MatchList';
import NavBar from './NavBar';
import ChampionList from './ChampionList/ChampionList';
import Overview from './Overview/Overview';
import { Route, Routes } from 'react-router';
import useLocalStorage from '../../useLocalStorage';

export default function ViewSwitcher({ playerData, statusData, matchData, championData, handleReloadClick }) {
    const [lastSearched, setLastSearched] = useLocalStorage('lastSearched', []);
    useEffect(()=>{
        setLastSearched([...new Set([playerData.hz_player_name, ...lastSearched])].splice(0,5));
    },[])

    return <>
        <NavBar handleReloadClick={handleReloadClick} />
        <Routes>
            <Route exact path='/' element={<Overview playerData={playerData} championData={championData} statusData={statusData} />} />
            <Route path='/matches' element={<MatchList matchData={matchData} />} />
            <Route path='/champions' element={<ChampionList championData={championData} />} />
        </Routes>
    </>
}