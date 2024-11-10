import styles from './info.module.scss';
import fon from '../../assets/images/fon.jpeg'
import Preloader from '../common/Preloader/Preloader';


const Info = ({profile}) => {

    if(!profile) return <Preloader />

    return (
        <div className={styles.info}>
        <div className={styles.images}>
            <div className={styles.fon}>
                <img src={fon} alt="fon" />
            </div>
            <div className={styles.avatar}>
                <img src={profile.photos.small} alt="fon" />
            </div>
        </div>
        <div className={styles.body}>
        <div className={styles.foolName}>{profile.fullName}</div>
        <div className={styles.skils} ><span>My profesional skils:</span> {profile.lookingForAJobDescription}</div>
        <div className={styles.contacts}>Contacts:</div>
        <ul className={styles.list}>
                <li className={styles.item}>
                    <a className={styles.link} href="https://github.com/yuriidano">{profile.contacts.github}</a>
                </li>
                <li className={styles.item}>
                    <a className={styles.link} href="https://www.facebook.com/profile.php?id=100026732318022">{profile.contacts.facebook}</a>
                </li>
        </ul>
        </div>
    </div>
    )
};

export default Info;