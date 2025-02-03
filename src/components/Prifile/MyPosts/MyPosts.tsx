import { FC } from 'react';
import styles from './MyPosts.module.scss';
import Post from './Post/Post';
import MyPostForm from './MyPostsForm';
import { useAppSelector } from '../../../redux/redux-store';
import { getPosts, getProfileMy } from '../../../redux/profile-selectors';


type PropsMyPostsType = {};


const MyPosts: FC<PropsMyPostsType> = (props) => {
  const posts = useAppSelector(getPosts);
  const profileMy = useAppSelector(getProfileMy)

  let postElement = [...posts].reverse().map(p => {
    return (
      <Post profileMy={profileMy} message={p.message} likeCounter={p.likeCounter} key={p.id} />
    )
  });

 
  return (
    <div className={styles.myPosts}>
      <div className={styles.newPost}>
          <MyPostForm />
      </div>
      <div className={styles.posts}>
        {postElement}
      </div>
    </div>
  );
}

export default MyPosts;

