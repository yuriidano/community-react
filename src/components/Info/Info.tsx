import styles from './info.module.scss';
import fon from '../../assets/images/fon.jpeg'
import UserPhoto from '../../assets/images/user.jpg';
import classNames from 'classnames';
import { ProfileType } from '../../types/types';
import { FC } from 'react';
import Preloader from '../common/Preloader/Preloader';


type PropsInfoType = {
    profile: ProfileType
}

const Info: FC<PropsInfoType> = ({profile}) => {
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
                    <li className={styles.newsItem}>From hype to practice: the realities of artificial intelligence regulation</li>
                    <li className={styles.newsItem}>It is necessary to draw attention to intangible cultural heritage through digital technologies</li>
                    <li className={styles.newsItem}>Most IT companies in Ukraine are ready to hire workers without experience</li>
                    <li className={styles.newsItem}>How to organize accounting in the IT sector</li>
                    <li className={styles.newsItem}>Everything will be IT. The most demanded professions.</li>
                </ul>
            </div>
        </div>
    )
};

export default Info;