import { reduxForm } from "redux-form"
import { createField, Input } from "../../common/FormsControls/formsControls"
import ProfileStatus from "./ProfileStatus"
import styles from './ProfileDataForm.module.scss'

const ProfileDataForm = ({ profile, status, updateUserStatus, handleSubmit, error }) => {
    return (
        <div className={styles.profileDataForm}>
            <form onSubmit={handleSubmit}>
                <div className={styles.top}>
                    <div className={styles.info}>
                        <div className={styles.name}>
                            <span>full name: </span>
                            <div className={styles.editName}>
                                {createField(null, Input, 'fullName', 'fullName...', [], null)}
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
                    {createField(null, Input, 'lookingForAJob', null, [], 'checkbox')}
                </div>

                {profile.lookingForAJob &&
                    <div className={styles.skils}>
                        <span>My profesional skils:</span>
                        <div className={styles.editSkils}>
                            {createField(null, Input, 'lookingForAJobDescription', 'my profesional skils...', [], null)}
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

const ContactsForm = ({contactsKey}) => {
    return (
        <div className={styles.contactBody}>
            <div className={styles.editContact}>
                {createField(null, Input, 'contacts.' + contactsKey, `${contactsKey}...`, [], null)}
            </div>
        </div>
    )
};


const ProfileDataFormRedux = reduxForm({form: 'profile'})(ProfileDataForm);


export default ProfileDataFormRedux;