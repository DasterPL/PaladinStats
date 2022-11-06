import React, { useRef, useState } from 'react';
import Pagination from '../../Pagination/Pagination';
import QueueType from '../QueueType';
import Match from './Match';
import './MatchList.scss';

const itemsPerPage = 15;

export default function MatchList({ matchData }) {
    const ref = useRef(null);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(Math.ceil(matchData.length / itemsPerPage));
    const [matchList, setMatchList] = useState(matchData.map((match, index) => <Match key={index} data={match} id={(index + 1)} />));

    function handlePageChange(page) {
        setPage(page);
        ref.current.scrollIntoView();
    }
    function handleQueueChange(queue) {
        const filteredData = queue ? matchData.filter(match => match.Match_Queue_Id === queue) : matchData;
        setMatchList(filteredData.map((match, index) => <Match key={index} data={match} id={(index + 1)} />));
        setPage(0);
        setPageCount(Math.ceil(filteredData.length / itemsPerPage));
    }
    return <>
        <QueueType onQueueChange={handleQueueChange}/>
        <ul className='matchList' ref={ref}>
            {matchList.length > 0 ? matchList.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage) : <li className='noMatches'>Brak meczy</li>}
        </ul>
        <Pagination count={pageCount} changePage={handlePageChange} page={page}/>
    </>
}