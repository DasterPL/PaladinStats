import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { KdaCalculator, WinRateCalculator } from '../../../Calculators';
import Champion from './Champion';
import ChampionFilter from './ChampionFilter';
import championsList from '../../../resources/champions.json';
import './ChampionList.scss';

export default function ChampionList({ championData }) {
  const [champions, setChampions] = useState(championData.map((champion, index) => <Champion key={index} champion={champion} />));//

  const [sort, setSort] = useState(championData);
  const [orderBy, setOrderBy] = useState(['time', true]);

  function handleClick(event) {
    console.log(event.target);
    const type = event.target.dataset.type;
    let sorted = [];
    switch (type) {
      case 'name':
        sorted = sort.sort((a, b) => (orderBy[1] ? (a.champion > b.champion ? 1 : -1) : (a.champion > b.champion ? -1 : 1)));
        break;
      case 'lvl':
        sorted = sort.sort((a, b) => (orderBy[1] ? a.Rank - b.Rank : b.Rank - a.Rank));
        break;
      case 'time':
        sorted = sort.sort((a, b) => (orderBy[1] ? a.Minutes - b.Minutes : b.Minutes - a.Minutes));
        break;
      case 'kills':
        sorted = sort.sort((a, b) => (orderBy[1] ? a.Kills - b.Kills : b.Kills - a.Kills));
        break;
      case 'deaths':
        sorted = sort.sort((a, b) => (orderBy[1] ? a.Deaths - b.Deaths : b.Deaths - a.Deaths));
        break;
      case 'assists':
        sorted = sort.sort((a, b) => (orderBy[1] ? a.Assists - b.Assists : b.Assists - a.Assists));
        break;
      case 'kda':
        sorted = sort.sort((a, b) => {
          const aKda = KdaCalculator(a.Kills, a.Deaths, a.Assists);
          const bKda = KdaCalculator(b.Kills, b.Deaths, b.Assists);
          return orderBy[1] ? aKda - bKda : bKda - aKda;
        });
        break;
      case 'matches':
        sorted = sort.sort((a, b) => (orderBy[1] ? a.Wins + a.Losses - b.Wins + b.Losses : b.Wins + b.Losses - a.Wins + a.Losses));
        break;
      case 'wins':
        sorted = sort.sort((a, b) => (orderBy[1] ? a.Wins - b.Wins : b.Wins - a.Wins));
        break;
      case 'losses':
        sorted = sort.sort((a, b) => (orderBy[1] ? a.Losses - b.Losses : b.Losses - a.Losses));
        break;
      case 'winrate':
        sorted = sort.sort((a, b) => {
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
    setSort(sorted);
  }

  function handleRoleClick({ damage, flank, frontline, support }) {
    const filtered = championData.filter(champion => {
      const roles = []
      if (damage) {
        roles.push("Paladins Napastnik");
      }
      if (flank) {
        roles.push("Paladins Skrzydłowy");
      }
      if (frontline) {
        roles.push("Paladins Obrońca");
      }
      if (support) {
        roles.push("Paladins Wsparcie");
      }
      if (!damage && !flank && !frontline && !support) {
        roles.push("Paladins Napastnik");
        roles.push("Paladins Skrzydłowy");
        roles.push("Paladins Obrońca");
        roles.push("Paladins Wsparcie");
      }
      const championParams = championsList.find(c => c.id == champion.champion_id);
      return roles.includes(championParams?.Roles);
    });
    setSort(filtered);
    setOrderBy(['time', false]);
  }

  function handleTextChange(text) {
    const filtered = championData.filter(row => row.champion.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    setSort(filtered);
  }

  useEffect(() => {
    setChampions(sort.map((champion, index) => <Champion key={index} champion={champion} />));
  }, [sort, orderBy]);

  return <>
    {/* <QueueType /> */}
    <ChampionFilter onRoleClick={handleRoleClick} onTextChange={handleTextChange} />
    <div className='championList-container'>
      <div className='championList-title' onClick={handleClick}>
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
      <motion.ul layout className='championList'>
        <AnimatePresence>
          {champions}
        </AnimatePresence>
      </motion.ul>
    </div>
  </>
}
