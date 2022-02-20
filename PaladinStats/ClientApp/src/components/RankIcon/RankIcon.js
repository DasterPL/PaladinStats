import React from 'react';
import tiers from '../RankIcon/tiers/tiers';
import HandleErrorImg from '../../HandleErrorImg';

const ranks = [
  'Qualifying',
  'Brąz V',
  'Brąz IV',
  'Brąz III',
  'Brąz II',
  'Brąz I',
  'Srebro V',
  'Srebro IV',
  'Srebro III',
  'Srebro II',
  'Srebro I',
  'Złoto V',
  'Złoto IV',
  'Złoto III',
  'Złoto II',
  'Złoto I',
  'Platyna V',
  'Platyna IV',
  'Platyna III',
  'Platyna II',
  'Platyna I',
  'Diament V',
  'Diament IV',
  'Diament III',
  'Diament II',
  'Diament I',
  'Master',
  'Grandmaster'
];

export default function RankIcon({ tier, className }) {
  return <img onError={HandleErrorImg} className={className} src={tiers[tier]} alt={ranks[tier]} title={ranks[tier]} />;
}