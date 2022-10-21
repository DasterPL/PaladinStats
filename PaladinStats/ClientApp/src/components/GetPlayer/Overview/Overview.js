import React from 'react'
import BasicBoxWinrate from './BasicBox/BasicBoxWinrate';
import BasicBoxKda from './BasicBox/BasicBoxKda';
import BasicBoxRank from './BasicBox/BasicBoxRank';
import BasicBoxStatus from './BasicBox/BasicBoxStatus';
import BasicBoxAvatar from './BasicBox/BasicBoxAvatar';
import ClassChart from './ClassChart';
import BasicBoxPlayTime from './BasicBox/BasicBoxPlayTime';

export default function Overview({ playerData, championData, statusData }) {
    return <>
        <div className='getPlayer'>
            <BasicBoxAvatar avatar={playerData.AvatarURL} playerName={playerData.hz_player_name} level={playerData.Level} title={playerData.Title} id={playerData.Id} />
            <BasicBoxWinrate normal wins={playerData.Wins} losses={playerData.Losses} />
            <BasicBoxWinrate ranked wins={playerData.RankedKBM.Wins} losses={playerData.RankedKBM.Losses} />
            <BasicBoxKda playerChampionRanks={championData} />
            <BasicBoxRank tier={playerData.RankedKBM.Tier} tp={playerData.RankedKBM.Points} />
            <BasicBoxStatus status={statusData} lastLogin={playerData.Last_Login_Datetime} />
            <BasicBoxPlayTime playTime={playerData.HoursPlayed}/>
        </div>
        <ClassChart championData={championData} />
    </>
}