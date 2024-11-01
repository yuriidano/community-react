import musicPhoto from '../../assets/images/user.jpg';
import s from './music.module.scss';

const Music = ({name, photos: {small, large}, id}) => {

    return (
        <>
            <div className={s.avatar}>
                <img src={small != null ? small : musicPhoto} alt="avatar" />
            </div>
            <div>{name}</div>
        </>
    )
};




export default Music;