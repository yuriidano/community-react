import styles from './info.module.scss';
import fon from '../../assets/images/fon.jpeg'
import UserPhoto from '../../assets/images/user.jpg';
import classNames from 'classnames';
import { useEffect } from 'react';
import Preloader from '../common/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import { getProfile, getUserId } from '../../redux/info-selectors';
import { requestNews, requestProfileInfo } from '../../redux/info-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import News from '../News/News';
import { NewsItem } from './News/News';



const Info = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(getProfile);
    const userId = useAppSelector(getUserId) 
    const news = useAppSelector(state => state.infoPage.news)
 

    useEffect(() => {
        dispatch(requestProfileInfo(userId ?? 0));
    },[]);

    useEffect(() => {
        let isMonted = true;

        const fech = () => {
            if(isMonted === true) {
                dispatch(requestNews());
                setTimeout(() => {
                    fech();
                }, 1800000)
            }
        }

        fech();
        return () => {
            isMonted = false;
        }
    }, []);

    if(!profile.photos) return <Preloader />;

    return (
        <div className={styles.info}>
            <div className={styles.images}>
                <div className={styles.fon}>
                    <img src={fon} alt="fon" />
                </div>
                <div className={classNames(styles.avatar, { [styles.avatarTest]: profile.photos.small == null })}>
                    <img src={profile.photos.small != null ? profile.photos.small : UserPhoto} alt="fon" />
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
            <div className={styles.newsBody}>
                <div className={styles.newstitle}>The most popular news</div>
                <div className={styles.newsItems}>
                    {
                        news.map(n => <NewsItem key={n.id} {...n} />)
                    }
                </div>
            </div>
        </div>
    )
};

export const InfoWithRedirect = withAuthRedirect(Info);