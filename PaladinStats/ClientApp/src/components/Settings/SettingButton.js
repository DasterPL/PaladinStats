import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import SettingWindow from './SettingWindow';

export default function SettingButton() {
    const [dialog, setDialog] = useState(null);
    const handleClick = () => {
        setDialog(<SettingWindow onClose={() => { setDialog(null) }} />);
    }
    return <>
        <button onClick={handleClick} className='settingbutton'><FontAwesomeIcon icon={faGear} /></button>
        {dialog}
    </>
}
