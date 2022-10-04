import React from 'react';
import { KdaCalculator } from '../../../../Utils/Calculators';
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
    <div className='twoRow kills'>
      <span>Zabójstwa</span>
      <span>{kda.kills}</span>
    </div>
    <div className='twoRow deaths'>
      <span>Śmierci</span>
      <span>{kda.deaths}</span>
    </div>
    <div className='twoRow assists'>
      <span>Asysty</span>
      <span>{kda.assists}</span>
    </div>
    <div>
      <span>{KdaCalculator(kda.kills, kda.deaths, kda.assists)}</span>
    </div>
  </BasicBox>;
}
