import { useState } from 'react';
import styles from '../../Users/Users.module.scss';
import classNames from 'classnames';

const Paginator = ({totalUsersCount, pageSize, currentPage, onPagesChanged, portionSize = 10}) => {
    let pagesCount =totalUsersCount / pageSize;
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionPage, setPortionPage] = useState(1);

    let leftBorderPortion = (portionPage - 1) * portionSize + 1;
    let rigthBorderPortion = portionPage * portionSize;

    let pages = [];

    for(let i = 1; i <= pagesCount; i++) {
       pages.push(i);
    };


    return (
        <>
            { portionPage > 1 &&
                <span onClick={() => {setPortionPage(portionPage - 1)}} >prev</span>
            }
            {
                pages
                .filter(p => p >= leftBorderPortion && p <= rigthBorderPortion)
                .map(p => {
                    return <span key={p} className={classNames({[styles.selected]: p === currentPage})}
                        onClick={(e) => { onPagesChanged(p) }} >{p}</span>
                })
            }
            { portionPage < portionCount &&
                 <span onClick={() => {setPortionPage(portionPage + 1)}} >next</span>
                 
            }
            
          
        </>
    )
};





export default Paginator;