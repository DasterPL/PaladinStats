import React, { useState } from 'react'

export default function QueueType({ onQueueChange }) {

    const [all_classes, setAll_classes] = useState('active');
    const [normal_classes, setNormal_classes] = useState();
    const [onslaught_classes, setOnslaught_classes] = useState();
    const [deathmatch_classes, setDeathmatch_classes] = useState();
    const [ranked_classes, setRanked_classes] = useState();

    function handleQueueClick(queue, state) {
        setAll_classes(null);
        setNormal_classes(null);
        setOnslaught_classes(null);
        setDeathmatch_classes(null);
        setRanked_classes(null);
        state('active');

        onQueueChange(queue);
    }

    return <nav className='queueType buttonGroup'>
        <button onClick={() => handleQueueClick(null, setAll_classes)} className={all_classes}>Wszystkie</button>
        <button onClick={() => handleQueueClick(424, setNormal_classes)} className={normal_classes}>Normalne</button>
        <button onClick={() => handleQueueClick(452, setOnslaught_classes)} className={onslaught_classes}>Szturm</button>
        <button onClick={() => handleQueueClick(469, setDeathmatch_classes)} className={deathmatch_classes}>Deathmatch</button>
        <button onClick={() => handleQueueClick(486, setRanked_classes)} className={ranked_classes}>Rankingowe</button>
    </nav>
}