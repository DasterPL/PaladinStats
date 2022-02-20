import React from 'react';
import { WinRateCalculator } from '../../../../Calculators';
import BasicBox from './BasicBox';

export default function BasicBoxWinrate({ normal, ranked, wins, losses }) {
  return <BasicBox className={'basicBox winRate' + (normal ? ' normal' : ranked ? ' ranked' : '')}>
    <span className='wins'>Wygrane<br />{wins}</span>
    <span className='losses'>Przegrane<br />{losses}</span>
    <span className='sum'>Suma<br />{wins + losses}</span>
    <span>Winrate<br />{WinRateCalculator(wins, losses)}</span>
  </BasicBox>;
}