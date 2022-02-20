import React from 'react';
import { useNavigate } from 'react-router';
import BasicBox from './BasicBox';

export default function BasicBoxStatus({ status }) {
    const navigate = useNavigate();
    function handleClick(event) {
        const link = `/activematch/${status.Match}`;
        if (event.button === 0) {
            navigate(link);
        } else if (event.button === 1) {
            window.open(link, '_blank');
        }
    }
    switch (status?.status) {
        case 0:
            return <BasicBox className='status'>Offline</BasicBox>;
        case 1:
            return <BasicBox className='status'>W poczekalni</BasicBox>;
        case 2:
            return <BasicBox className='status'>Wybiera postać</BasicBox>;
        case 3:
            return <BasicBox className='status'>W meczu<button onMouseDown={handleClick}>Pokaż dane</button></BasicBox>;
        case 4:
            return <BasicBox className='status'>Online</BasicBox>;
        default:
            return <BasicBox className='status'>-</BasicBox>;
    }
}