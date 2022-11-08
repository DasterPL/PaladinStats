import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { KdaCalculator, WinRateCalculator } from '../../../Utils/Calculators';
import ChampionIcon from '../../ChampionIcon'
import PlayerLoadouts from './PlayerLoadouts/PlayerLoadouts';

export default function Champion({ champion }) {
    const [championLoadouts, setChampionLoadouts] = useState(null);
    const hours = Math.floor(champion.Minutes / 60);
    const minutes = champion.Minutes % 60;

    const handleClick = (e) => {
        setChampionLoadouts(<PlayerLoadouts champion={parseInt(champion.champion_id)} target={e.type === 'keydown' ? e.target : null} />);
    }
    return <>
        <motion.li
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.code === "Space") {
                    e.preventDefault();
                    handleClick(e);
                }
            }}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className='avatar'>
                <ChampionIcon championId={champion.champion_id} />
                <span>{champion.champion}</span>
            </div>
            <span>{champion.Rank}</span>
            <span>{hours}h {minutes}m</span>
            <span>{champion.Kills}</span>
            <span>{champion.Deaths}</span>
            <span>{champion.Assists}</span>
            <span>{KdaCalculator(champion.Kills, champion.Deaths, champion.Assists)}</span>
            <span>{champion.Wins + champion.Losses}</span>
            <span>{champion.Wins}</span>
            <span>{champion.Losses}</span>
            <span>{WinRateCalculator(champion.Wins, champion.Losses)}</span>
        </motion.li>
        {championLoadouts}
    </>
}