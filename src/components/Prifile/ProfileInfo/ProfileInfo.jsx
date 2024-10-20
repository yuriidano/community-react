import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.scss';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileStatus from './ProfileStatus';


const ProfileInfo = (props) => {

  if(!props.profile) {
    return <Preloader />
  }

  return (
    <div className={s.body}>
      <div>
      <a href="#" className={s.avatar}>
        <img src={props.profile.photos.small == null ? userPhoto : props.profile.photos.small} alt="avatar" />
      </a>
      <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} />
      </div>
      <div className={s.info}>
        <a href="#" className={s.name}>{props.profile.fullName}</a>
      </div>
    </div>
  );
};

export default ProfileInfo;