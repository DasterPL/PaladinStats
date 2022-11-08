import React, { useEffect } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Dialog.scss';

export default function Dialog({ title, icon, children, onClose }) {
    useEffect(() => {
        const closeByKeyboard = () => {
            onClose();
        }
        document.addEventListener('keydown', closeByKeyboard);
        return () => {
            document.removeEventListener('keydown', closeByKeyboard);
        }
    }, []);
    return <div className='dialog__background'>
        <div className='dialog__main'>
            <div className='dialog__topBar'>
                {icon}
                <span className='dialog__title'>{title}</span>
                <button tabIndex={0} onClick={onClose} className='dialog__closeButton'><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <hr />
            {children}
        </div>
    </div>
}
