import React from 'react'
import MatchList from './MatchList/MatchList';
import NavBar from './NavBar';
import ChampionList from './ChampionList/ChampionList';
import Overview from './Overview/Overview';
import { Route, Routes } from 'react-router';

export default function ViewSwitcher({ playerData, statusData, matchData, championData, handleReloadClick }) {
    return <>
        <NavBar handleReloadClick={handleReloadClick} />
        <Routes>
            <Route exact path='/' element={<Overview playerData={playerData} championData={championData} statusData={statusData} />} />
            <Route path='/matches' element={<MatchList matchData={matchData} />} />
            <Route path='/champions' element={<ChampionList championData={championData} />} />
        </Routes>
    </>
}