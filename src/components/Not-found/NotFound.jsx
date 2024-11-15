import style from './NotFount.module.scss';

const NotFound = (props) => {

    return (
        <div className={style.notFound}>
            <div className={style.notFoundText}>404 NOT FOUND</div>
        </div>
    )
};


export default NotFound;