import React from 'react';
import './Switch.scss';

export default function Switch({ defaultChecked, disabled, onChange }) {
    return <label className="switch">
        <input type="checkbox" defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} />
        <span></span>
    </label>
}
