import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import GetElement from '../../Utils/GetElement'
import useLocalStorage from '../../Utils/useLocalStorage'
import Dialog from '../Dialog/Dialog'
import Switch from '../Switch/Switch'

import './Settings.scss';

export default function SettingWindow({ onClose }) {
    const [autoTheme, setAutoTheme] = useLocalStorage('autoTheme', true);
    const [theme, setTheme] = useLocalStorage('theme', false);

    const handleAutoThemeChange = (e) => {
        const value = e.target.checked;
        setAutoTheme(value);
        document.body.classList.remove('dark-theme');
        document.body.classList.remove('light-theme');
        if (!value) {
            document.body.classList.add(theme ? 'theme-dark' : 'light-theme');
        }
    }
    const hanldeThemeChange = (e) => {
        const value = e.target.checked;
        setTheme(value);
        document.body.classList.remove('dark-theme');
        document.body.classList.remove('light-theme');
        document.body.classList.add(value ? 'theme-dark' : 'light-theme');
    }

    const [closed, setClosed] = useState(false);
    const handleClose = () => {
        setClosed(true);
        onClose();
    }
    return createPortal(!closed ? <Dialog title={<><FontAwesomeIcon icon={faGear} /> Ustawienia</>} onClose={handleClose}>
        <div className='setting__main'>
            <div className='setting__option'>
                <span>Automatycznie ustaw motyw:</span>
                <Switch defaultChecked={autoTheme} onChange={handleAutoThemeChange} />
            </div>
            <div className='setting__option'>
                <span>Ustaw motyw ciemny</span>
                <Switch defaultChecked={theme} onChange={hanldeThemeChange} disabled={autoTheme} />
            </div>
        </div>

    </Dialog> : null, GetElement('settings'))
}
// useEffect(() => {
//     setAutoTheme.addChangeListener(() => {
//         console.log('changed');
//         document.body.classList.remove('dark-theme');
//         document.body.classList.remove('light-theme');

//     });
// }, [])

// setTheme.addChangeListener(() => {
//     document.body.classList.remove('dark-theme');
//     document.body.classList.remove('light-theme');
//     if (!autoTheme) {
//         document.body.classList.add(theme ? 'theme-dark' : 'light-theme');
//     }
// });