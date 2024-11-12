import { useState } from 'react';
import styles from './Paginator.module.scss';
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
        <div className={styles.paginator}>
            <div className={classNames(styles.buttonPrev, {[styles.buttonPrevActive]: portionPage > 1})}>
                {
                    <span className={styles.buttonPrevSpan} onClick={() => { setPortionPage(portionPage - 1) }} ></span>
                }
            </div>
            <div className={styles.body}>
                {
                    pages
                        .filter(p => p >= leftBorderPortion && p <= rigthBorderPortion)
                        .map(p => {
                            return <span key={p} className={classNames(styles.item, {[styles.selected]: p === currentPage })}
                                onClick={(e) => { onPagesChanged(p) }} >{p}</span>
                        })
                }
            </div>
            <div className={styles.buttonNext}>
                {portionPage < portionCount &&
                    <span className={styles.buttonNextSpan} onClick={() => { setPortionPage(portionPage + 1) }} ></span>

                }
            </div>
        </div>
    )
};





export default Paginator;