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

export default function PlayerLoadouts({ champion }) {
    const { playerName } = useParams();
    const [render, setRender] = useState(<Loading dark={!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)} />);

    useEffect(() => {
        const abortController = new AbortController()
        axios.get(`api/GetPlayerLoadouts/${playerName}`, { signal: abortController.signal }).then(({ data }) => {
            const loadouts = data.filter((element) => element.ChampionId === champion);
            if (loadouts.length === 0) {
                setRender(<span>Brak talii</span>)
            } else {
                setRender(<ul className='loadoutsList'>
                    {loadouts.map((deck, i) => <Deck key={i} data={deck} />)}
                </ul>);
            }
        });
        return () => {
            abortController.abort();
        }

    }, []);

    const handleClose = () => {
        GetElement('playerloadouts').remove();
    }
    const championParams = championsList.find(c => c.id === champion);
    return createPortal(<Dialog icon={<ChampionIcon championId={champion} />} title={championParams.Name} onClose={handleClose}>
        {render}
    </Dialog>, GetElement('playerloadouts'));
}