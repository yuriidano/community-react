import React, { useState } from 'react';
import styles from './MyPosts.module.scss';
import Post from './Post/Post';
import MyPostFeduxForm from './MyPostsForm';
import Preloader from '../../common/Preloader/Preloader';



const MyPosts = (props) => {


  let postElement = [...props.posts].reverse().map(p => {
    return (
      <Post profileMy={props.profileMy} message={p.message} likeCounter={p.likeCounter} key={p.id} />
    )
  });


  const addPostForm = (formData) => {
    props.addPostCriator(formData.myPosBody);
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

