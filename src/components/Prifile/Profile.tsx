import { FC } from 'react';
import { PostType, ProfileType } from '../../types/types';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsProfileType = {
  status: string,
  profile: ProfileType,
  isOwner: boolean,
  isUpdateProgress: boolean
  posts: Array<PostType>,
  profileMy: ProfileType,
  addPost: (data: string) => void,
  requestPhoto: (filePhoto: any) => void,
  updateProfile: (profileData: ProfileType) => void,
  updateUserStatus: (status: string) => void
}

const Profile: FC<PropsProfileType> = (props) => {

  return (
    <div className={s.profile}>
      <ProfileInfo  status={props.status} updateUserStatus={props.updateUserStatus} profile={props.profile} isOwner={props.isOwner}
       requestPhoto={props.requestPhoto} updateProfile={props.updateProfile} isUpdateProgress={props.isUpdateProgress}/>

      <MyPosts posts={props.posts} addPost={props.addPost} profileMy={props.profileMy}/>
    </div>
  );
};

export default Profile;



