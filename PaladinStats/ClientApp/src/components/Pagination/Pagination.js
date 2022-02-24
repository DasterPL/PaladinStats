import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Pagination.scss';

export default function Pagination({ changePage, count }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [leftDisabled, setLeftDisabled] = useState(true);
    const [rightDisabled, setRightDisabled] = useState(false);

    function pageDown() {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            handlePageChange(currentPage - 1);
        }
    }
    function pageUp() {
        if (currentPage < count - 1) {
            setCurrentPage(currentPage + 1);
            handlePageChange(currentPage + 1);
        }
    }
    function handlePageChange(page) {
        setCurrentPage(page);
        if (page === 0) {
            setLeftDisabled(true);
        }
        if (page === count - 1) {
            setRightDisabled(true);
        }
        if (page > 0) {
            setLeftDisabled(false);
        }
        if (page + 1 < count) {
            setRightDisabled(false);
        }
        changePage(page);
    }

    return count > 1 ? <div className='pagination buttonGroup'>
        <button onClick={pageDown} disabled={leftDisabled} ><FontAwesomeIcon icon={faArrowLeft} /></button>
        {Array.from({ length: count }).map((e, index) => <button className={index === currentPage ? 'active' : ''} key={index} onClick={() => handlePageChange(index)}>{index + 1}</button>)}
        <button onClick={pageUp} disabled={rightDisabled}><FontAwesomeIcon icon={faArrowRight} /></button>
    </div> : null;
}