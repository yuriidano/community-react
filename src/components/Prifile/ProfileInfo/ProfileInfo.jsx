import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.scss';
import ProfileStatus from './ProfileStatus';
import profilePhoto from '../../../assets/images/user.jpg';
import ProfileDataFormRedux from './ProfileDadaForm';
import { useState } from 'react';

const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }

  let onPhotoChange = (e) => {
    if (e.target.files.length) {
      props.requestPhoto(e.target.files[0])
    }
  }

  let activateEditMode = () => {
    setEditMode(true);
  }

  let onSubmit = (formData) => {
   props.updateProfile(formData);
   props.isUpdateProgress && setEditMode(false)
  }

  return (
    <div className={s.body}>
      <div>
        <a href="#" className={s.avatar}>
          <img src={props.profile.photos.small != null ? props.profile.photos.small : profilePhoto} alt="avatar" />
        </a>
        {props.isOwner && <input type='file' onChange={onPhotoChange} />}
        <div >
          <div className={s.statusBody}>
            {editMode ? 
                        <ProfileFormData onSubmit={onSubmit} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />  
                      : <ProfileData isOwner={props.isOwner} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} 
                        activateEditMode={activateEditMode}/>}
          </div>
        </div>
      </div>
    </div>
  );
};


const ProfileData = ({ profile, status, updateUserStatus, isOwner, activateEditMode }) => {
  return (
    <div>
      {
        isOwner && <button onClick={activateEditMode} >Edit mode</button>
      }
      <div style={{marginBottom: '5px'}}>
        <b>full name: </b> {profile.fullName}
      </div>
      <div style={{ display: 'flex', columnGap: '5px' }}>
        <b>status:</b > <ProfileStatus status={status} updateUserStatus={updateUserStatus} />
      </div>
      <div>
        <b>lookingForAJob:</b>  {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      <div>
        { profile.lookingForAJob &&
          <div>
            <b>my profesional skils:</b>  {profile.lookingForAJobDescription}
          </div>
        }
      </div>
      <div>
        <b>contacts: </b>
        <div style={{paddingLeft: '10px'}}>
          {Object.keys(profile.contacts).map(key => {
            return (
              contacts(key, profile.contacts[key])
            )
          })}
        </div>
      </div>
    </div>
  )
}



const ProfileFormData = ({ profile, status, updateUserStatus, onSubmit }) => {
  return (
    <>
      <ProfileDataFormRedux initialValues={profile} onSubmit={onSubmit} profile={profile} status={status} updateUserStatus={updateUserStatus} contacts={contacts} />
    </>
  )
}

const contacts = (contactTitle, contactValue) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  )
}


export default ProfileInfo;