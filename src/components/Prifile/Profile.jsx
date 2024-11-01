import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {

  return (
    <div className={s.profile}>
      <ProfileInfo  status={props.status} updateUserStatus={props.updateUserStatus} profile={props.profile} isOwner={props.isOwner}
       requestPhoto={props.requestPhoto} updateProfile={props.updateProfile} isUpdateProgress={props.isUpdateProgress}/>

      <MyPostsContainer posts={props.posts} addPostCriator={props.addPostCriator} />
    </div>
  );
};

export default Profile;



