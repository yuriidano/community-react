import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {

  return (
    <div className={s.profile}>
      <ProfileInfo  status={props.status} updateUserStatus={props.updateUserStatus} profile={props.profile} isOwner={props.isOwner}
       requestPhoto={props.requestPhoto} updateProfile={props.updateProfile} isUpdateProgress={props.isUpdateProgress}/>

      <MyPosts posts={props.posts} addPostCriator={props.addPostCriator} profileMy={props.profileMy}/>
    </div>
  );
};

export default Profile;



