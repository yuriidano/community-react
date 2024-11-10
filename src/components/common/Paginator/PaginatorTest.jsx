import { useState } from "react";
import s from '../../Music//Music.module.scss';
import classNames from "classnames";


const PaginatorTest = ({totalMusicPagesCount, pageSize, currentPage, portionSize = 10, onPageChanch}) => {
    const pagesCount = Math.ceil(totalMusicPagesCount / pageSize);
    const portionCount = Math.ceil(pagesCount / portionSize);

    const [portionPage, setPortionPage] = useState(1);

     const leftBorderPortion = (portionPage - 1) * portionSize + 1;
     const rightBorderPortion = portionPage * portionSize;

     const pages = [];

     for(let i = 1; i <= pagesCount; i++) {
         pages.push(i);
     }


  
    return (
        <>
            { portionPage > 1 &&
                <span onClick={() => {setPortionPage(portionPage - 1)}} >prev</span>
            }
            {
                pages
                .filter(page => page >= leftBorderPortion && page <= rightBorderPortion) 
                .map(page => {
                    return (
                        <span className={classNames({[s.selected]: page === currentPage})} 
                        onClick={() => {onPageChanch(page)}} >{page}</span>
                    )
                })
            }
            { portionPage < portionCount &&
                <span onClick={() => {setPortionPage(portionPage + 1)}} >next</span>
            }
        </>
    )
};






export default PaginatorTest;