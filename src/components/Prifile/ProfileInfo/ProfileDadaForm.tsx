import { InjectedFormProps, reduxForm } from "redux-form"
import { createField, ExtractKeysType, Input } from "../../common/FormsControls/formsControls"
import ProfileStatus from "./ProfileStatus"
import styles from './ProfileDataForm.module.scss'
import { ProfileType } from "../../../types/types"
import { FC } from "react"
import { FormDataProfileInfoType } from "./ProfileInfo"



type PropsProfileDataFormType = {
    profile: ProfileType,
    status: string,
    updateUserStatus: (status: string) => void,
}

type KeysType = ExtractKeysType<FormDataProfileInfoType>

const ProfileDataForm:FC<InjectedFormProps<FormDataProfileInfoType, PropsProfileDataFormType> & PropsProfileDataFormType> = ({ profile, status, updateUserStatus, handleSubmit, error }) => {
    return (
        <div className={styles.profileDataForm}>
            <form onSubmit={handleSubmit}>
                <div className={styles.top}>
                    <div className={styles.info}>
                        <div className={styles.name}>
                            <span>full name: </span>
                            <div className={styles.editName}>
                                {createField<KeysType>(undefined, Input, 'fullName', 'fullName...', [], undefined, undefined)}
                            </div>
                        </div>
                        <div className={styles.status}>
                            <ProfileStatus status={status} updateUserStatus={updateUserStatus} />
                        </div>
                    </div>
                    <button className={styles.button}>Save</button>
                </div>
                <div className={styles.lookingForAJob}>
                    <span>LookingForAJob:</span>  {profile.lookingForAJob ? 'yes' : 'no'}
                    {createField<KeysType>(undefined, Input, 'lookingForAJob', undefined, [], 'checkbox', undefined)}
                </div>

                {profile.lookingForAJob &&
                    <div className={styles.skils}>
                        <span>My profesional skils:</span>
                        <div className={styles.editSkils}>
                            {createField<KeysType>(undefined, Input, 'lookingForAJobDescription', 'my profesional skils...', [], undefined, undefined)}
                        </div>
                    </div>
                }
                <div className={styles.contacts}> 
                    <span className={styles.title}>Contacts: </span>
                    <div className={styles.elements}>
                        {Object.keys(profile.contacts).map(key => {
                            return (
                                <ContactsForm contactsKey={key} />
                            )
                        })}
                    </div>
                </div>
                <div>
                    {error &&
                        <div className={styles.errorSome}>{error}</div>
                    }
                </div>
            </form>
        </div>
    )
}

type ContactsFormType = {
    contactsKey: string
}

const ContactsForm:FC<ContactsFormType> = ({contactsKey}) => {
    return (
        <div className={styles.contactBody}>
            <div className={styles.editContact}>
                {createField(undefined, Input, 'contacts.' + contactsKey, `${contactsKey}...`, [], undefined, undefined)}
            </div>
        </div>
    )
};


const ProfileDataFormRedux = reduxForm<FormDataProfileInfoType, PropsProfileDataFormType>({form: 'profile'})(ProfileDataForm);


export default ProfileDataFormRedux;