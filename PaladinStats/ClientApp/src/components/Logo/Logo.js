import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './Logo.scss';

export default function Logo() {
  return <Link to='/' className='logo'>
    <img src={logo} alt='logo' />
    <span>Stats</span>
  </Link>
}