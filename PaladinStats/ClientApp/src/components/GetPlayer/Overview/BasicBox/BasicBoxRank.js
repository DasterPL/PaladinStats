import React from 'react';
import RankIcon from '../../../RankIcon/RankIcon';
import BasicBox from './BasicBox';

export default function BasicBoxRank({ tier, tp }) {
  return <BasicBox className='rank'>
    <RankIcon tier={tier} />
    <span>{tp} tp</span>
  </BasicBox>;
}
