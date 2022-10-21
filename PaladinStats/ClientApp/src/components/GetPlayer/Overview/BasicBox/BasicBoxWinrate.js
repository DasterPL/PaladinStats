import React from 'react';
import { WinRateCalculator } from '../../../../Utils/Calculators';
import BasicBox from './BasicBox';

export default function BasicBoxWinrate({ normal, ranked, wins, losses }) {
  const winRate = WinRateCalculator(wins, losses);
  return <BasicBox className={'winRate' + (normal ? ' normal' : ranked ? ' ranked' : '')}>
    <div className='twoRow wins'>
      <span>Wygrane</span>
      <span>{wins}</span>
    </div>
    <div className='twoRow losses'>
      <span>Przegrane</span>
      <span>{losses}</span>
    </div>
    <div className='twoRow sum'>
      <span>Suma</span>
      <span>{wins + losses}</span>
    </div>
    <div className='twoRow'>
      <span>Winrate</span>
      <span>{winRate !== null ? winRate : '-'}</span>
    </div>
  </BasicBox>;
}