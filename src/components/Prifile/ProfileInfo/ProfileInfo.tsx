
import styles from './ProfileInfo.module.scss';
import ProfileStatus from './ProfileStatus';
import profilePhoto from '../../../assets/images/user.jpg';
import ProfileDataFormRedux from './ProfileDadaForm';
import React, { FC, useState } from 'react';
import fon from '../../../assets/images/fon.jpeg'
import camera from '../../../assets/images/icons/camera.svg';
import { ProfileType } from '../../../types/types';

type PropsProfileInfoType = {
  status: string,
  updateUserStatus: (status: string) => void,
  profile: ProfileType,
  isOwner: boolean,
  requestPhoto: (filePhoto: File) => void,
  updateProfile: (profileData: ProfileType) => void,
  isUpdateProgress: boolean
};


export type FormDataProfileInfoType = ProfileType;


const ProfileInfo:FC<PropsProfileInfoType> = (props) => {

  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return null
  }

  let onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      props.requestPhoto(e.target.files[0])
    }
  }

  let activateEditMode = () => {
    setEditMode(true);
  }

  let onSubmit = (formData: FormDataProfileInfoType) => {
    debugger
    props.updateProfile(formData);
    props.isUpdateProgress && setEditMode(false)
  }

  return (
    <div className={styles.profileInfo}>
      <div className={styles.images}>
        <div className={styles.fon}>
          <img src={fon} alt="fon" />
        </div>
          <div className={styles.avatar}>
            <img src={props.profile.photos.small != null ? props.profile.photos.small : profilePhoto} alt="avatar" />
          </div>
          <label className={styles.changeAvatar} htmlFor="changeAvatar">
            <img src={camera} alt="camera" />
          </label>
      </div>
      <div className={styles.body}>
        {props.isOwner && <input className={styles.input} id="changeAvatar" type='file' onChange={onPhotoChange} />}
        <div className={styles.statusBody}>
          {editMode ?
            <ProfileFormData onSubmit={onSubmit} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />
            : <ProfileData isOwner={props.isOwner} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}
              activateEditMode={activateEditMode} />}
        </div>
      </div>
    </div>
  );
};



type PropsProfileDataType= {
  status: string,
  updateUserStatus: (status: string) => void,
  profile: ProfileType,
  isOwner: boolean,
  activateEditMode: () => void

}

const ProfileData:FC<PropsProfileDataType> = ({ profile, status, updateUserStatus, isOwner, activateEditMode }) => {
  return (
    <div>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.name}>
            {profile.fullName}
          </div>
          <div className={styles.status}>
            <ProfileStatus status={status} updateUserStatus={updateUserStatus} />
          </div>
        </div>
        {
          isOwner && <button className={styles.button} onClick={activateEditMode} >Edit mode</button>
        }
      </div>
      <div className={styles.LookingForAJob}>
        <span >LookingForAJob:</span>  {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      <div className={styles.skils}>
        { profile.lookingForAJob &&
          <div className={styles.skilsBody}>
            <span>My profesional skils:</span><span>{profile.lookingForAJobDescription}</span>
          </div>
        }
      </div>

      
      <div className={styles.contacts}>
        <span>Contacts: </span>
        <div className={styles.contact}>
          {Object.keys(profile.contacts).map(key => {
            return (
              <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />  
            )
          })}
        </div>
      </div>
    </div>
  )
}




type PropsProfileFormDataType = {
  status: string,
  updateUserStatus: (status: string) => void,
  profile: ProfileType,
  onSubmit: (formData: FormDataProfileInfoType) => void
}

const ProfileFormData:FC<PropsProfileFormDataType> = ({ profile, status, updateUserStatus, onSubmit }) => {
  return (
    <>
      <ProfileDataFormRedux initialValues={profile} onSubmit={onSubmit} profile={profile} status={status} updateUserStatus={updateUserStatus} />
    </>
  )
}



type ContactsTupe = {
  contactTitle: string,
  contactValue: string | null
}

const Contacts:FC<ContactsTupe> = ({contactTitle, contactValue}) => {
  return (
    <div>
      <span>{contactTitle}</span>: {contactValue}
    </div>
  )
}


export default ProfileInfo;