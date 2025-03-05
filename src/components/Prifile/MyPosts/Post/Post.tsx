import { ProfileType } from '../../../../types/types';
import styles from './Post.module.scss';


type PropsPostType = {
  profileMy: ProfileType,
  message: string,
  likeCounter: number
}

const Post = (props: PropsPostType) => {
  if(!props.profileMy.photos) return null

  return (
    <div className={styles.post}>
      <div className={styles.avatar}>
        <img src={props.profileMy.photos.large || ''} alt="" />
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












