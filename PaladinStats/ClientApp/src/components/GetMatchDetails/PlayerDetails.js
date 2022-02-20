import React from 'react';
import { useNavigate } from 'react-router';
import { KdaCalculator } from '../../Calculators';
import ChampionIcon from '../ChampionIcon';
import RankIcon from '../RankIcon/RankIcon';
import Deck from '../ItemsDeck/Deck';

import damage from './img/damage.png';
import taken from './img/taken.png';
import shield from './img/shield.png';
import heal from './img/heal.png';
import healSelf from './img/heal_self.png';
import gold from './img/gold.png';
import goldPerMinute from './img/gold_time.png';
import TalentCard from '../ItemsDeck/TalentCard';


export default function PlayerDetails({ data, party }) {
    const navigate = useNavigate();
    // console.log(data);

    function handleClick(event) {
        const link = `/player/${data.playerId}`;
        if (event.button === 0) {
            navigate(link);
        } else if (event.button === 1) {
            window.open(link, '_blank');
        }
    }

    const winStatus = data.Win_Status === "Winner" ? 'win' : 'losse';
    const winRate = parseFloat(data.League_Wins / (data.League_Wins + data.League_Losses) * 100).toFixed(2) + '%';
    const rankingMatches = (data.League_Wins + data.League_Losses) > 0 ? <>
        <RankIcon tier={data.League_Tier} />
        <div className='pointsWinLosess'>
            <span>{data.League_Points}</span>
            <div>
                <span className='win'>{data.League_Wins}</span>
                /
                <span className='losse'>{data.League_Losses}</span>
            </div>
            <span className=''>{winRate}</span>
        </div>
    </> : null;
    return <li className={`playerDetails ${winStatus}`} onMouseDown={handleClick}>
        <ChampionIcon championId={data.ChampionId} className='championAvatar' />
        <div className='playerName'>
            <span>{data.playerName === '' ? <span className='hidden'>Ukryty profil</span> : data.playerName}</span>
            <span>{data.Account_Level}lvl</span>
            <span className='party'>{party}</span>
        </div>
        <div className='talent'>
            <TalentCard talent={data.ItemId6} />
        </div>
        <div className='damage'>
            <img src={damage} alt="Obrażenia" title="Zadane obrażenia" /><span>{data.Damage_Player.toLocaleString('pl-PL')}</span>
            <img src={taken} alt="Przyjęte" title="Przyjęte obrażenia" /><span>{data.Damage_Taken.toLocaleString('pl-PL')}</span>
            <img src={shield} alt="Tarcza" title="Tarcza" /><span>{data.Damage_Mitigated.toLocaleString('pl-PL')}</span>
        </div>
        <div className='kda'>
            <span className='kills'>{data.Kills_Player} </span>/
            <span className='deaths'> {data.Deaths} </span>/
            <span className='assists'> {data.Assists}</span>
            <span className='kda_calc'>{KdaCalculator(data.Kills_Player, data.Deaths, data.Assists)}</span>
        </div>
        <div className='healing'>
            <img src={heal} alt="Leczenie" title="Leczenie" /><span>{data.Healing.toLocaleString('pl-PL')}</span>
            <img src={healSelf} alt="Leczenie własne" title="Leczenie własne" /><span>{data.Healing_Player_Self.toLocaleString('pl-PL')}</span>
        </div>
        <div className='gold'>
            <img src={gold} alt="Złoto" title="Złoto" /><span>{data.Gold_Earned.toLocaleString('pl-PL')}</span>
            <img src={goldPerMinute} alt="Złoto na minute" title="Złoto na minute" /><span>{data.Gold_Per_Minute.toLocaleString('pl-PL')}</span>
        </div>
        {rankingMatches ? <div className='rank'>
            {rankingMatches}
        </div> : ''}
        <div className='deckItems'>
            <Deck
                type="deck"
                list={[data.ItemId1, data.ItemId2, data.ItemId3, data.ItemId4, data.ItemId5]}
                levels={[data.ItemLevel1, data.ItemLevel2, data.ItemLevel3, data.ItemLevel4, data.ItemLevel5]}
            />
            <Deck
                type="items"
                list={[data.ActiveId1, data.ActiveId2, data.ActiveId3, data.ActiveId4]}
                levels={[data.ActiveLevel1, data.ActiveLevel2, data.ActiveLevel3, data.ActiveLevel4]}
            />
        </div>
    </li>;
}
