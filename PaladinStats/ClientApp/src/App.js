import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Logo from './components/Logo/Logo';
import SearchPlayer from './components/SearchPlayer/SearchPlayer';
import CookieConsent from "react-cookie-consent";
import Version from './components/Version';

import GetPlayer from './components/GetPlayer/GetPlayer';
import GetMatchDetails from './components/GetMatchDetails/GetMatchDetails';
import ErrorPage from './components/Errors/ErrorPage';
import GetActiveMatchDetails from './components/GetActiveMatchDetails/GetActiveMatchDetails';

import './App.scss';

export default function App() {
    return <>
        <div className='background'></div>
        <Router>
            <header>
                <Logo />
            </header>
            <section className='container'>
                <SearchPlayer />
                <Routes>
                    <Route exact path='/' element={null} />
                    <Route path='/player/:playerName/*' element={<GetPlayer />} />
                    <Route path='/match/:matchId' element={<GetMatchDetails />} />
                    <Route path='/activematch/:matchId' element={<GetActiveMatchDetails />} />
                    <Route path='/error/:code' element={<ErrorPage />} />
                    <Route path='*' element={<ErrorPage error="404" />} />
                </Routes>
            </section>
        </Router>
        <CookieConsent buttonText='OK' buttonStyle={{ margin: '0.3em' }} >Ta strona wykorzystuje pliki cookies</CookieConsent>
        <footer>
            <Version />
        </footer>
    </>
}