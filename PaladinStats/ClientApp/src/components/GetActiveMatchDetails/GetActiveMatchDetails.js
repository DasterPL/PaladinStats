import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import Loading from '../Loading/Loading';
import ErrorNavigate from '../Errors/ErrorNavigate';
import PlayerDetails from './PlayerDetails';

import './GetActiveMatchDetails.scss';

export default function GetActiveMatchDetails() {
  const { matchId } = useParams();

  const [render, setRender] = useState(<Loading />);
  useEffect(() => {
    axios.get(`/api/getActiveMatchDetails/${matchId}`)
      .then(({data}) => {
        if(data.length === 0 || data[0]?.Match === 0){
          throw new Error(404);
        }
        const matchData = data.sort((a, b) => (a.taskForce - b.taskForce));
        setRender(<div className='activeMatchDetails'>
          <div className='info'>
            <span>{data[0].mapGame}</span>
          </div>
          <ul>
            {matchData.map((player, index) => <PlayerDetails key={index} player={player} />)}
          </ul>
        </div>);
      })
      .catch(error => {
        setRender(<ErrorNavigate error={error} />)
      })
  }, []);
  return render
}