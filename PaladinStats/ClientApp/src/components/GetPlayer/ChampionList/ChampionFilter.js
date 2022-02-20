import React, { useRef, useState } from 'react'

import Damage from './roles/Damage.svg';
import Flank from './roles/Flank.svg';
import Frontline from './roles/Frontlines.svg';
import Support from './roles/Support.svg';

export default function ChampionFilter({ onRoleClick, onTextChange }) {
    const ref = useRef(null);
    const [championFilterByName, setChampionFilterByName] = useState();

    function handleChange() {
        setChampionFilterByName('');
        const selected = {
            damage: ref.current.damage.checked,
            flank: ref.current.flank.checked,
            frontline: ref.current.frontline.checked,
            support: ref.current.support.checked
        }
        onRoleClick(selected);
    }
    function handleTextChange(event){
        ref.current.damage.checked = false;
        ref.current.flank.checked = false;
        ref.current.frontline.checked = false;
        ref.current.support.checked = false;
        setChampionFilterByName(event.target.value);
        onTextChange(event.target.value);
    }
    return <nav className='championFilter'>
        <input className='championName' type="search" placeholder='Nazwa postaci' value={championFilterByName} onChange={handleTextChange}/>
        <form className='roleFilter' ref={ref}>
            <span>
                <input type="checkbox" id="damage" name="damage" onChange={handleChange} />
                <label htmlFor="damage"><img src={Damage} alt="Damage" /></label>
            </span>
            <span>
                <input type="checkbox" id="flank" name="flank" onChange={handleChange} />
                <label htmlFor="flank"><img src={Flank} alt="Flank" /></label>
            </span>
            <span>
                <input type="checkbox" id="frontline" name="frontline" onChange={handleChange} />
                <label htmlFor="frontline"><img src={Frontline} alt="Frontline" /></label>
            </span>
            <span>
                <input type="checkbox" id="support" name="support" onChange={handleChange} />
                <label htmlFor="support"><img src={Support} alt="Support" /></label>
            </span>
        </form>
    </nav>
}
