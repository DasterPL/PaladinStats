import React from 'react';
import './BasicBox.scss';

export default function BasicBox({ className, children }) {
  const classes = `basicBox${className ? ' ' + className : ''}`;
  return <div className={classes}>
    {children}
  </div>;
}