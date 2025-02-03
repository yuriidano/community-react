import { FC } from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsProfileType = {
  isOwner: boolean
}


 const Profile: FC<PropsProfileType> = (props) => {


  return (
    <div className={s.profile}>
      <ProfileInfo isOwner={props.isOwner} />
      <MyPosts />
    </div>
  );
};




export default Profile;
