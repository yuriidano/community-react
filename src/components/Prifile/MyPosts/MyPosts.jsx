import React, { useState } from 'react';
import s from './MyPosts.module.scss';
import Post from './Post/Post';
import MyPostFeduxForm from './MyPostsForm';



const MyPosts = React.memo((props) => {
  let [age, setAge] = useState(33);


  let postElement = [...props.posts].reverse().map(p => {
    return (
      <Post message={p.message} likeCounter={p.likeCounter} key={p.id} />
    )
  });


  const addPostForm = (formData) => {
    props.addPost(formData.myPosBody);
  }

 
  return (
    <div className={s.body}>
      <div className={s.postsTitle} >My posts</div>
      <div className={s.newPost}>
          <MyPostFeduxForm onSubmit={addPostForm} />
      </div>
      <div className={s.posts}>
        {postElement}
      </div>
    </div>
  );
})

export default MyPosts;

