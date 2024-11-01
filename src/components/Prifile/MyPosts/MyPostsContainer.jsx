import React from 'react';
import MyPosts from './MyPosts';
import { addPostCriator, updataNewPostCriator } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';



 let mapStateToProps = (state) => {
   return {
     posts: state.profilePage.posts,
   };
 };


 let mapDispatchToProps = (dispatch) => {
   return {
     addPost: (data) => {
       dispatch(addPostCriator(data));
     },
   };
 };

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;