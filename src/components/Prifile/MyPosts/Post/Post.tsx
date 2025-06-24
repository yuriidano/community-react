import { useState } from 'react';
import { deletePost, updatePost } from '../../../../redux/profile-reducer';
import { useAppDispatch } from '../../../../redux/redux-store';
import { PostType, ProfileType } from '../../../../types/types';
import { LongMenuPost } from './LongMenuPost/LongMenuPost';
import styles from './Post.module.scss';
import { PostForm } from './PostForm/PostForm';


type PropsPostType = {
  profileMy: ProfileType,
  message: string,
  id: number
}

const Post = ({message, profileMy, id}: PropsPostType) => {
  const dispatch = useAppDispatch()
  const [editMode, setEditMode] = useState(false);

  const onUpdatePost = (formData: string) => {
    const post:PostType = {id, message: formData}
    dispatch(updatePost(post))
  };

  if(!profileMy.photos) return null;

  return (
    <div className={styles.post}>
      <div className={styles.avatar}>
        <img src={profileMy.photos.large || ''} alt="" />
      </div>
      <div className={styles.body}>
        {editMode ?
            <div>
              <PostForm setEditMode={setEditMode} message={message} onUpdatePost={onUpdatePost} />
            </div>
          : <div className={styles.text}>{message}</div>
        }
        {editMode || <div className={styles.menu}><LongMenuPost setEditMode={setEditMode} id={String(id)} /></div>}
      </div>
    </div>
  );
};

export default Post;












