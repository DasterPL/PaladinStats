import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import FindParty from '../../FindParty';
import ChampionIcon from '../ChampionIcon';
import Loading from '../Loading/Loading';
import PlayerDetails from './PlayerDetails';
import ErrorNavigate from '../Errors/ErrorNavigate';
import MatchCharts from './MatchCharts';

import { CalculateLocalTime } from '../../Calculators';

import './GetMatchDetails.scss';

export default function GetMatchDetails() {
  const { matchId } = useParams();
  const [render, setRender] = useState(<Loading />);

  async function getData() {
    try {
      const getMatchDetails = await axios.get(`/api/getMatchDetails/${matchId}`);
      const data = getMatchDetails.data[0];

      const bans = data.name === "Ranked" ? <div className='bans'>
        <ChampionIcon championId={data.BanId1} />
        <ChampionIcon championId={data.BanId2} />
        <ChampionIcon championId={data.BanId3} />
        <span className='bansTitle'>Bany</span>
        <ChampionIcon championId={data.BanId4} />
        <ChampionIcon championId={data.BanId5} />
        <ChampionIcon championId={data.BanId6} />
      </div> : null;

      const dateTime = CalculateLocalTime(data.Entry_Datetime);
      const dateTimeString = `${dateTime.toLocaleDateString('pl-PL')} ${dateTime.toLocaleTimeString('pl-PL')}`;

      const party = FindParty(getMatchDetails.data);

      setRender(<div className={`matchDetails ${data.name !== 'Ranked' ? 'normal' : ''}`}>
        <div className='infoBans'>
          <div className='basicInfo'>
            <span>{data.name}</span>
            <span>{dateTimeString}</span>
            <span>{data.Minutes}min</span>
            <span>{data.Team1Score} - {data.Team2Score}</span>
          </div>
          {bans}
        </div>
        <ul className='playersList'>
          {getMatchDetails.data.map((player, index) => <PlayerDetails key={index} data={player} party={party[index]} />)}
        </ul>
        <MatchCharts matchData={getMatchDetails.data} />
      </div>);
    } catch (error) {
      setRender(<ErrorNavigate error={error} />)
    }
  }

  useEffect(() => {
    setRender(<Loading />);
    getData();
  }, [matchId]);

  return render;
}