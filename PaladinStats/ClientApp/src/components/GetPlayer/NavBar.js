import React, { useState } from 'react';

export default function NawBar({ changeView }) {
    const [overview_classes, setOverview_classes] = useState('active');
    const [matches_classes, setMatches_classes] = useState();
    const [champion_classes, setChampion_classes] = useState();

    function setClasses(state) {
        setOverview_classes(null);
        setMatches_classes(null);
        setChampion_classes(null);

        state('active');
    }
    function handleOverviewClick(){
        changeView("overview");
        setClasses(setOverview_classes);
    }

    function handleMatchClick() {
        changeView("matches");
        setClasses(setMatches_classes);
    }
    function handleChampionClick() {
        changeView("champions");
        setClasses(setChampion_classes);
    }

    return <nav className='nawBar buttonGroup'>
        <button onClick={handleOverviewClick}   className={overview_classes}>Przegląd</button>
        <button onClick={handleMatchClick}      className={matches_classes}>Mecze</button>
        <button onClick={handleChampionClick}   className={champion_classes}>Postacie</button>
    </nav>;
}