import { useParams } from 'react-router-dom';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useEffect } from 'react';
import { profileMount, requestProfile, requestUserStatus } from '../../redux/profile-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import { getAutoRizedUserId } from '../../redux/profile-selectors';


type ParamsType = {
  userId?: string 
}

 const Profile = () => {
    const disatch = useAppDispatch();
    const autoRizedUserId = useAppSelector(getAutoRizedUserId)

        let {userId} = useParams<ParamsType>();
        let owner = userId;
        if(!userId && autoRizedUserId !== null) {
            userId = String(autoRizedUserId); 
        };
    
    
        useEffect(() => {
         if(userId) {
          disatch(requestProfile(Number(userId)));
          disatch(requestUserStatus(Number(userId)));
         }
          disatch(profileMount(true));
            return () => {
              disatch(profileMount(false));
            }
        }, [userId])



  return (
    <div className={s.profile}>
      <ProfileInfo isOwner={!owner} />
      <MyPosts />
    </div>
  );
};




export default Profile;
