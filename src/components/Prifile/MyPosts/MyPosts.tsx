import styles from './MyPosts.module.scss';
import Post from './Post/Post';
import MyPostForm from './MyPostsForm';
import { useAppDispatch, useAppSelector } from '../../../redux/redux-store';
import { getPosts, getProfileMy } from '../../../redux/profile-selectors';
import { useEffect } from 'react';
import { fetchPosts } from '../../../redux/profile-reducer';



const MyPosts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(getPosts);
  const profileMy = useAppSelector(getProfileMy)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])


  let postElement = [...posts].reverse().map(p => {
    return (
      <Post profileMy={profileMy} message={p.message} id={p.id} key={p.id} />
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

