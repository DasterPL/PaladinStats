import React, { useEffect } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Dialog.scss';

export default function Dialog({ title, icon, children, onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const closeByKeyboard = (e) => {
            if (e.code === "Escape") {
                onClose();
            }
        }
        document.addEventListener('keydown', closeByKeyboard);
        return () => {
            document.removeEventListener('keydown', closeByKeyboard);
            document.body.style.overflow = "";
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
