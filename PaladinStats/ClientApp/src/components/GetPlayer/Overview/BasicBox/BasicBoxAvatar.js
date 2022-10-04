import React from 'react';

import BasicBox from './BasicBox';
import HandleErrorImg from '../../../../Utils/HandleErrorImg';
import FavoriteIcon from '../../../Favorite/FavoriteIcon';
import altImage from '../../../../Resources/altImage.png';

export default function BasicBoxAvatar({ avatar, playerName, level, title, id }) {
  return <BasicBox className="avatar">
    <img onError={HandleErrorImg} src={avatar || altImage} alt="Avatar" />
    <div className='playerInfo'>
      <span className='playerNameLevel'>
        <FavoriteIcon playerName={playerName} avatar={avatar} id={id}/> {playerName} ({level}lvl)
      </span>
      <span className='playerTitle'>{title}</span>
    </div>
  </BasicBox>;
}
