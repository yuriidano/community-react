import React, { FC, useState } from 'react';
import styles from './MyPosts.module.scss';
import Post from './Post/Post';
import MyPostFeduxForm from './MyPostsForm';
import { PostType, ProfileType } from '../../../types/types';


type PropsMyPostsType = {
    posts: Array<PostType>,
    profileMy: ProfileType,
    addPost: (data: string) => void,
}


export type FormDataType = {
  myPosBody: string
}

const MyPosts: FC<PropsMyPostsType> = (props) => {


  let postElement = [...props.posts].reverse().map(p => {
    return (
      <Post profileMy={props.profileMy} message={p.message} likeCounter={p.likeCounter} key={p.id} />
    )
  });


  const addPostForm = (formData: FormDataType) => {
    props.addPost(formData.myPosBody);
  }

 
  return (
    <div className={styles.myPosts}>
      <div className={styles.newPost}>
          <MyPostFeduxForm onSubmit={addPostForm} />
      </div>
      <div className={styles.posts}>
        {postElement}
      </div>
    </div>
  );
}

export default MyPosts;

