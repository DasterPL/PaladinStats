import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Loading.scss';

export default function Loading() {
  return <div className='loadingBox'>
    <FontAwesomeIcon icon={faSpinner} size="7x" pulse />
    <span>Ładowanie danych</span>
  </div>;
}