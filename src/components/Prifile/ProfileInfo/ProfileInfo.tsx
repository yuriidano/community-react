import styles from './ProfileInfo.module.scss';
import ProfileStatus from './ProfileStatus';
import profilePhoto from '../../../assets/images/user.jpg';
import ProfileDataFormRedux from './ProfileDadaForm';
import React, { useState } from 'react';
import fon from '../../../assets/images/fon.jpeg'
import camera from '../../../assets/images/icons/camera.svg';
import { ProfileType } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../redux/redux-store';
import { getIsUpdateProgress, getProfile, getStatus } from '../../../redux/profile-selectors';
import { requestPhoto, updateProfile, updateUserStatus } from '../../../redux/profile-reducer';
import { PopapMessage } from '../../common/PopapMessage/PopapMessage';
import classNames from 'classnames';

type PropsProfileInfoType = {
  isOwner: boolean,
};

export type FormDataProfileInfoType = ProfileType;


const ProfileInfo = (props: PropsProfileInfoType) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getStatus);
  const profile = useAppSelector(getProfile);
  const isUpdateProgress = useAppSelector(getIsUpdateProgress);


  const updateStatus = (status: string) => {
    dispatch(updateUserStatus(status))
  }

  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return null
  }

  let onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(requestPhoto(e.target.files[0]))  
    }
  }
  
  let activateEditMode = () => {
    setEditMode(true);
  }

  let onSubmit = (formData: FormDataProfileInfoType) => {
    isUpdateProgress && setEditMode(false)
    dispatch(updateProfile(formData))
  }


  return (
    <div className={styles.profileInfo}>
      <div className={styles.images}>
        <div className={styles.fon}>
          <img src={fon} alt="fon" />
        </div>
          <div className={styles.avatar}>
            <img src={profile.photos.small != null ? profile.photos.small : profilePhoto} alt="avatar" />
          </div>
          <label className={styles.changeAvatar} htmlFor="changeAvatar">
            <img src={camera} alt="camera" />
          </label>
      </div>
      <div className={styles.body}>
        {props.isOwner && <input className={styles.input} id="changeAvatar" type='file' onChange={onPhotoChange} />}
        <div className={styles.statusBody}>
          {editMode ?
            <ProfileFormData onSubmit={onSubmit} profile={profile} status={status} updateStatus={updateStatus} />
            : <ProfileData isOwner={props.isOwner} profile={profile} status={status} updateStatus={updateStatus}
              activateEditMode={activateEditMode} />}
        </div>
      </div>
    </div>
  );
};



type PropsProfileDataType= {
  status: string,
  updateStatus: (status: string) => void,
  profile: ProfileType,
  isOwner: boolean,
  activateEditMode: () => void

}

const ProfileData = ({ profile, status, updateStatus, isOwner, activateEditMode }: PropsProfileDataType) => {
  const [isActivePopap, setIsActivePopap] = useState(false);
  const clickHandler = () => {
    setIsActivePopap(true)
  }
  return (
    <div>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.name}>
            {profile.fullName}
          </div>
          <div className={styles.status}>
            <ProfileStatus status={status} updateStatus={updateStatus} />
          </div>
        </div>
        {
          isOwner && <button className={styles.button} onClick={activateEditMode} >Edit mode</button>
        }
      </div>
      {!isOwner &&
        <>
          <button onClick={clickHandler} className={styles.buttonMessage}>Message</button>
          <div className={classNames(styles.PopapMessage, { [styles.PopapMessageActive]: isActivePopap })}>
            <PopapMessage topValue={'15.4%'} leftValue={'56.6%'} userProfile={profile} closePopap={(isActivePopap: boolean) => setIsActivePopap(isActivePopap)} />
          </div>
        </>
      }
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
  updateStatus: (status: string) => void,
  profile: ProfileType,
  onSubmit: (formData: FormDataProfileInfoType) => void
}

const ProfileFormData = ({ profile, status, updateStatus, onSubmit }: PropsProfileFormDataType) => {
  return (
    <>
      <ProfileDataFormRedux initialValues={profile} onSubmit={onSubmit} profile={profile} status={status} updateStatus={updateStatus} />
    </>
  )
}



type ContactsType = {
  contactTitle: string,
  contactValue: string | null
}

const Contacts = ({contactTitle, contactValue}: ContactsType) => {
  return (
    <div>
      <span>{contactTitle}</span>: {contactValue}
    </div>
  )
}


export default ProfileInfo;