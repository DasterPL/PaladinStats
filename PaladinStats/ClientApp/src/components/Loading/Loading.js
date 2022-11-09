import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Loading.scss';

export default function Loading({ dark, progress }) {
  return <div className={`loadingBox${dark ? ' dark' : ''}`}>
    {progress == null ? <FontAwesomeIcon icon={faSpinner} size="7x" pulse /> : <progress value={progress} max={100}></progress>}
    <span>Ładowanie danych</span>
  </div>;
}