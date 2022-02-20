import React from 'react';
import { KdaCalculator } from '../../../../Calculators';
import BasicBox from './BasicBox';

export default function BasicBoxKda({ playerChampionRanks }) {
  const kda = {
    kills: 0,
    deaths: 0,
    assists: 0
  };
  playerChampionRanks.forEach(champion => {
    kda.kills += champion.Kills;
    kda.deaths += champion.Deaths;
    kda.assists += champion.Assists;
  });
  return <BasicBox className='kda'>
    <span className='kills'>Zabójstwa<br />{kda.kills}</span>
    <span className='deaths'>Śmierci<br />{kda.deaths}</span>
    <span className='assists'>Asysty<br />{kda.assists}</span>
    <span>{KdaCalculator(kda.kills, kda.deaths, kda.assists)}</span>
  </BasicBox>;
}
