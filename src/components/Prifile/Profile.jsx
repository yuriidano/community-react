import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {

  return (
    <div className={s.profile}>
      <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />

      <MyPostsContainer posts={props.posts} addPostCriator={props.addPostCriator} />
    </div>
  );
};

export default Profile;



