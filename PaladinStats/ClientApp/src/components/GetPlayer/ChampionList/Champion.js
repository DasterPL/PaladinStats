import React from 'react'
import { motion } from 'framer-motion';
import { KdaCalculator, WinRateCalculator } from '../../../Calculators';
import ChampionIcon from '../../ChampionIcon'

export default function Champion({ champion }) {
    const hours = Math.floor(champion.Minutes / 60);
    const minutes = champion.Minutes % 60;
    return <motion.li
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
}