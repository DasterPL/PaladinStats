import React from 'react'
export default function Version() {
  return <div className='version'>
    <span>Wersja {process.env.REACT_APP_VERSION}</span>
    <span>2022 © DasterPL</span>
    <span>API provided by Hi-Rez Studios</span>
  </div>
}