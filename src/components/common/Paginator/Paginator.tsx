import { FC } from 'react';
import styles from './Paginator.module.scss';
import { Pagination } from '@mui/material';

type PropsPaginatorType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPagesChanged: (pageNumber: number) => void,
    portionSize?: number
}

const Paginator = ({totalUsersCount, pageSize, currentPage, onPagesChanged}: PropsPaginatorType) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize); 
    let pages = [];

    for(let i = 1; i <= pagesCount; i++) {
       pages.push(i);
    };

    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        onPagesChanged(value)
    }

    return (
        <div className={styles.paginator}>
            <Pagination count={pagesCount}  page={currentPage} onChange={handleChange} sx={{
        "& .MuiPaginationItem-root": {
          color: "#6C757D", 
        },
        "& .Mui-selected": {
          color: "#6C757D", 
        },
      }} />
        </div>
    )
};


export default Paginator;