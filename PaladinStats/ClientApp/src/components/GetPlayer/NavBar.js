import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, useParams } from 'react-router';

export default function NawBar({ handleReloadClick }) {
    const navigate = useNavigate();
    const { playerName } = useParams();
    const { pathname: location } = useLocation();

    const pathname = `/player/${playerName}`;

    function isActive(linkPath) {
        return linkPath === location ? 'active' : '';
    }
    return <nav className='nawBar buttonGroup'>
        <button onClick={handleReloadClick} title="Odśwież"><FontAwesomeIcon icon={faArrowRotateRight} /></button>
        <button onClick={() => navigate(pathname)} className={isActive(pathname)}>Przegląd</button>
        <button onClick={() => navigate(`${pathname}/matches`)} className={isActive(`${pathname}/matches`)}>Mecze</button>
        <button onClick={() => navigate(`${pathname}/champions`)} className={isActive(`${pathname}/champions`)}>Postacie</button>
    </nav>;
}