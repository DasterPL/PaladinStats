import React from 'react';
import moment from 'moment';
import 'moment/locale/pl';
import { useNavigate } from 'react-router-dom';
import { CalculateLocalTime, KdaCalculator } from '../../../Utils/Calculators';
import ChampionIcon from '../../ChampionIcon';
import TalentCard from '../../ItemsDeck/TalentCard';

export default function Match({ data, id }) {
    const navigate = useNavigate();

    function handleClick(event) {
        const link = `/match/${data.Match}`;
        if (event.button === 0) {
            navigate(link);
        } else if (event.button === 1) {
            window.open(link, '_blank');
        }
    }

    const winStatus = data.Win_Status === "Win" ? 'win' : 'losse';
    const map = data.Map_Game.substr(data.Map_Game.indexOf(" ") + 1).replace(/ *\([^)]*\) */g, "");
    const score = data.TaskForce === 1 ? `${data.Team1Score} - ${data.Team2Score}` : `${data.Team2Score} - ${data.Team1Score}`;
    const datetime = CalculateLocalTime(data.Match_Time);
    const timeAgo = moment(datetime).locale('pl').fromNow();

    return <li className={`li_match ${winStatus}`} onMouseDown={handleClick}>
        <span className='id'>{id}</span>
        <ChampionIcon className='avatar' championId={data.ChampionId} />
        <div className='mapName'>
            <span>{data.Queue}</span>
            <span>{map}</span>
        </div>
        <TalentCard talent={data.ItemId6} />
        <div className='kda'>
            <span className='kills'>{data.Kills} </span>/
            <span className='deaths'> {data.Deaths} </span>/
            <span className='assists'> {data.Assists}</span>
            <span className='kda_calc'>{KdaCalculator(data.Kills, data.Deaths, data.Assists)}</span>
        </div>
        <div className='timeScore'>
            <span>{data.Minutes}min</span>
            <span>{score}</span>
        </div>
        <span title={datetime.toLocaleString("pl-PL")}>{timeAgo}</span>
    </li>;
}