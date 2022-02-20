import React from 'react'
import { useNavigate } from 'react-router'
import { WinRateCalculator } from '../../Calculators';
import ChampionIcon from '../ChampionIcon';
import RankIcon from '../RankIcon/RankIcon';

export default function PlayerDetails({ player }) {
    const navigate = useNavigate();

    function handleClick(event) {
        const link = `/player/${player.playerId}`;
        if (event.button === 0) {
            navigate(link);
        } else if (event.button === 1) {
            window.open(link, '_blank');
        }
    }
    const className = player.taskForce === 1 ? 'team1' : 'team2';
    const winRate = WinRateCalculator(player.tierWins, player.tierLosses);
    return <li onMouseDown={handleClick} className={className}>
        <ChampionIcon championId={player.ChampionId} className='avatar' />
        <RankIcon tier={player.Tier} className='rank' />
        <div className='playerName'>{player.playerName || <span className='hidden'>Ukryty profil</span>}</div>
        <span className='level'>{player.Account_Level} lvl</span>
        <div className='winRate'>
            <span className='wins'>{player.tierWins}</span>
            /
            <span className='losses'>{player.tierLosses}</span>
            {!isNaN(winRate) ? <span className='precentage'>{winRate}%</span> : null}
        </div>
    </li >
}