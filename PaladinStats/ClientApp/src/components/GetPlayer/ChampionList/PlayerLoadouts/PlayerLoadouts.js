import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router';
import axios from 'axios';
import Loading from '../../../Loading/Loading';
import ChampionIcon from '../../../ChampionIcon';
import championsList from '../../../../Resources/champions.json';
import './PlayerLoadouts.scss';
import Deck from './Deck';
import GetElement from '../../../../Utils/GetElement';
import Dialog from '../../../Dialog/Dialog';

let storedData;
let storedPlayerName;

export default function PlayerLoadouts({ champion, onClose }) {
    const [closed, setClosed] = useState(false);
    const { playerName } = useParams();
    const theme = document.body.classList.contains('light-theme') ? true : document.body.classList.contains('dark-theme') ? false : !(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [render, setRender] = useState(<Loading dark={theme} />);

    console.log(storedData);
    if (storedPlayerName !== playerName) {
        storedData = null;
    }

    useEffect(() => {
        const abortController = new AbortController()
        const fetchData = async () => {
            if (!storedData) {
                storedData = (await axios.get(`api/GetPlayerLoadouts/${playerName}`, { signal: abortController.signal })).data;
                storedPlayerName = playerName;
            }
            const loadouts = storedData.filter((element) => element.ChampionId === champion);
            if (loadouts.length === 0) {
                setRender(<span>Brak talii</span>)
            } else {
                setRender(<ul className='loadoutsList'>
                    {loadouts.map((deck, i) => <Deck key={i} data={deck} />)}
                </ul>);
            }
        }
        fetchData();
        return () => {
            abortController.abort();
        }

    }, []);

    const handleClose = () => {
        setClosed(true);
        onClose();
        // GetElement('playerloadouts').remove();
    }
    const championParams = championsList.find(c => c.id === champion);
    return createPortal(!closed ? <Dialog icon={<ChampionIcon championId={champion} />} title={championParams.Name} onClose={handleClose}>
        {render}
    </Dialog> : null, GetElement('playerloadouts'));
}