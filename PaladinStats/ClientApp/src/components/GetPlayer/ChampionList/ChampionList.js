import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { KdaCalculator, WinRateCalculator } from '../../../Utils/Calculators';
import Champion from './Champion';
import ChampionFilter from './ChampionFilter';
import championsList from '../../../Resources/champions.json';
import './ChampionList.scss';

export default function ChampionList({ championData }) {
  console.log(championData);
  const [champions, setChampions] = useState(championData);
  const [orderBy, setOrderBy] = useState(['time', true]);

  function handleHeaderClick(event) {
    console.log(event.target);
    const type = event.target.dataset.type;
    let sorted = [];
    switch (type) {
      case 'name':
        sorted = champions.sort((a, b) => (orderBy[1] ? (a.champion > b.champion ? 1 : -1) : (a.champion > b.champion ? -1 : 1)));
        break;
      case 'lvl':
        sorted = champions.sort((a, b) => (orderBy[1] ? a.Rank - b.Rank : b.Rank - a.Rank));
        break;
      case 'time':
        sorted = champions.sort((a, b) => (orderBy[1] ? a.Minutes - b.Minutes : b.Minutes - a.Minutes));
        break;
      case 'kills':
        sorted = champions.sort((a, b) => (orderBy[1] ? a.Kills - b.Kills : b.Kills - a.Kills));
        break;
      case 'deaths':
        sorted = champions.sort((a, b) => (orderBy[1] ? a.Deaths - b.Deaths : b.Deaths - a.Deaths));
        break;
      case 'assists':
        sorted = champions.sort((a, b) => (orderBy[1] ? a.Assists - b.Assists : b.Assists - a.Assists));
        break;
      case 'kda':
        sorted = champions.sort((a, b) => {
          const aKda = KdaCalculator(a.Kills, a.Deaths, a.Assists);
          const bKda = KdaCalculator(b.Kills, b.Deaths, b.Assists);
          return orderBy[1] ? aKda - bKda : bKda - aKda;
        });
        break;
      case 'matches':
        sorted = champions.sort((a, b) => (orderBy[1] ? a.Wins + a.Losses - b.Wins + b.Losses : b.Wins + b.Losses - a.Wins + a.Losses));
        break;
      case 'wins':
        sorted = champions.sort((a, b) => (orderBy[1] ? a.Wins - b.Wins : b.Wins - a.Wins));
        break;
      case 'losses':
        sorted = champions.sort((a, b) => (orderBy[1] ? a.Losses - b.Losses : b.Losses - a.Losses));
        break;
      case 'winrate':
        sorted = champions.sort((a, b) => {
          const aWinrate = WinRateCalculator(a.Wins, a.Losses);
          const bWinrate = WinRateCalculator(b.Wins, b.Losses);
          return orderBy[1] ? aWinrate - bWinrate : bWinrate - aWinrate;
        });
        break;
      default:
        return;
    }
    if (orderBy[0] === type) {
      setOrderBy([type, !orderBy[1]]);
    } else {
      setOrderBy([type, false]);
    }
    setChampions(sorted);
  }

  function handleRoleClick({ damage, flank, frontline, support }) {
    const filtered = championData.filter(champion => {
      const roles = [
        damage ? "Paladins Napastnik" : null,
        flank ? "Paladins Skrzydłowy" : null,
        frontline ? "Paladins Obrońca" : null,
        support ? "Paladins Wsparcie" : null
      ];
      const championParams = championsList.find(c => c.id.toString() === champion.champion_id);
      return roles.includes(championParams?.Roles);
    });
    setChampions(filtered.length === 0 ? championData : filtered);
    setOrderBy(['time', false]);
  }

  function handleTextChange(text) {
    const filtered = championData.filter(row => row.champion.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    setChampions(filtered);
  }

  return <>
    {/*TODO <QueueType /> */}
    <ChampionFilter onRoleClick={handleRoleClick} onTextChange={handleTextChange} />
    <div className='championList-container'>
      <div className='championList-title' onClick={handleHeaderClick}>
        <span data-type='name' className='avatarTitle'>Postać</span>
        <span data-type='lvl'>Poziom</span>
        <span data-type='time'>Czas gry</span>
        <span data-type='kills'>Zabójstwa</span>
        <span data-type='deaths'>Śmierci</span>
        <span data-type='assists'>Asysty</span>
        <span data-type='kda'>KDA</span>
        <span data-type='matches'>Mecze</span>
        <span data-type='wins'>Wygrane</span>
        <span data-type='losses'>Przegrane</span>
        <span data-type='winrate'>Winrate</span>
      </div>
      <motion.ul className='championList'>
        <AnimatePresence>
          {champions.map((champion) => <Champion key={champion.champion_id} champion={champion} />)}
        </AnimatePresence>
      </motion.ul>
    </div>
  </>
}