import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

import Logo from './Components/Logo/Logo';
import SearchPlayer from './Components/SearchPlayer/SearchPlayer';
import Version from './Components/Version';

import GetPlayer from './Components/GetPlayer/GetPlayer';
import GetMatchDetails from './Components/GetMatchDetails/GetMatchDetails';
import ErrorPage from './Components/Errors/ErrorPage';
import GetActiveMatchDetails from './Components/GetActiveMatchDetails/GetActiveMatchDetails';

import './App.scss';
import SettingButton from './Components/Settings/SettingButton';
import useLocalStorage from './Utils/useLocalStorage';

export default function App() {
    const [autoTheme, setAutoTheme] = useLocalStorage('autoTheme', true);
    const [theme, setTheme] = useLocalStorage('theme', false);

    if (!autoTheme) {
        document.body.classList.add(theme ? 'theme-dark' : 'light-theme');
    }

    return <>
        <div className='background'></div>
        <Router>
            <header>
                <Logo />
            </header>
            <main className='container'>
                <SearchPlayer />
                <Routes>
                    <Route exact path='/' element={null} />
                    <Route path='/player/:playerName/*' element={<GetPlayer />} />
                    <Route path='/match/:matchId' element={<GetMatchDetails />} />
                    <Route path='/activematch/:matchId' element={<GetActiveMatchDetails />} />
                    <Route path='/error/:code' element={<ErrorPage />} />
                    <Route path='*' element={<ErrorPage error="404" />} />
                </Routes>
            </main>
        </Router>
        <CookieConsent buttonText='OK' buttonClasses='button' disableButtonStyles={true} buttonStyle={{ margin: '0.3em' }} >Ta strona wykorzystuje pliki cookies</CookieConsent>
        <footer>
            <Version />
        </footer>
        <SettingButton />
    </>
}