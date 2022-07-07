import React from 'react';
import HandleErrorImg from '../HandleErrorImg';
import champions from '../resources/champions.json';

export default function ChampionIcon({ championId, className }) {
  const id = parseInt(championId);
  if (id === 0 || !id) {
    return <div>-</div>;
  }
  const champion = champions.find(champion => champion.id === id);
  return <img onError={HandleErrorImg} className={className} src={champion?.ChampionIcon_URL || "err"} alt={champion?.Name || "Not found"} title={champion?.Name || "Not found"} />;
}

export function ImageSrc(id){
  const champion = champions.find(champion => champion.id === id);
  return champion?.ChampionIcon_URL;
}