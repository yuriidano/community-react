import style from './NotFount.module.scss';

const NotFound = ({}) => {

    return (
        <div className={style.notFound}>
            <div className={style.notFoundText}>404 NOT FOUND</div>
        </div>
    )
};


export default NotFound;