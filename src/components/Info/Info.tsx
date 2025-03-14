import styles from './info.module.scss';
import fon from '../../assets/images/fon.jpeg'
import UserPhoto from '../../assets/images/user.jpg';
import classNames from 'classnames';
import { useEffect } from 'react';
import Preloader from '../common/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import { getProfile, getUserId } from '../../redux/info-selectors';
import { requestProfileInfo } from '../../redux/info-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';



const Info = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(getProfile);
    const userId = useAppSelector(getUserId) 


    useEffect(() => {
        dispatch(requestProfileInfo(userId ?? 0));
    },[]);

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
                <ul className={styles.newsList}>
                    <li className={styles.newsItem}>Launch of a new service: A well-known online store launches a new service with goods at affordable prices.</li>
                    <li className={styles.newsItem}>Browser update: An update to the popular iOS browser lets you search by image and text.</li>
                    <li className={styles.newsItem}>New species of marine mollusk: Scientists have discovered a new transparent species of marine mollusk in deep-sea areas.</li>
                    <li className={styles.newsItem}>The focus of business is people, efficiency and easy fixing of agreements</li>
                    <li className={styles.newsItem}>How to organize accounting in the IT sector</li>
                    <li className={styles.newsItem}>Everything will be IT. The most demanded professions.</li>
                </ul>
            </div>
        </div>
    )
};

export const InfoWithRedirect = withAuthRedirect(Info);