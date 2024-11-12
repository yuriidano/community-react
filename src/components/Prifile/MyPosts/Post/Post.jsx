import Preloader from '../../../common/Preloader/Preloader';
import styles from './Post.module.scss';


const Post = (props) => {

  if(!props.profileMy) return null

  return (
    <div className={styles.post}>
      <div className={styles.avatar}>
        <img src={props.profileMy.photos.large} alt="" />
      </div>
      <div className={styles.body}>
        <div className={styles.text}>{props.message}</div>
        <div className={styles.likeBody}>
        <div className={styles.likeIcon}></div>
          <button className={styles.like}>{props.likeCounter}</button>

        </div>
      </div>
    </div>
  );
};

export default Post;












