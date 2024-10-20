import styles from '../../Users/Users.module.scss';

const Paginator = ({totalUsersCount, pageSize, currentPage, onPagesChanged}) => {
    let pagesCount =totalUsersCount / pageSize;

    let pages = [];

    for(let i = 1; i <= pagesCount; i++) {
        i <= 9 && pages.push(i);
    };


    return pages.map(p => {
        return <span className={p === currentPage && styles.selected}
                onClick={(e) => {onPagesChanged(p)}} >{p}</span>
    })
};





export default Paginator;