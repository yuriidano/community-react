import { reduxForm } from "redux-form"
import { required } from "../../../utils/validators/validators"
import { createField, Input } from "../../common/FormsControls/formsControls"
import ProfileStatus from "./ProfileStatus"
import { useState } from "react"
import s from './ProfileInfo.module.scss'

const ProfileDataForm = ({profile, contacts, status, updateUserStatus, handleSubmit, error}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <button>Save</button>
                    <div style={{ marginBottom: '5px' }}>
                        <b>full name: </b> 
                        {createField(null, Input, 'fullName', 'fullName...', [], null)}
                    </div>
                    <div style={{ display: 'flex', columnGap: '5px' }}>
                        <b>status:</b > <ProfileStatus status={status} updateUserStatus={updateUserStatus} />
                    </div>
                    <div>
                        <b>lookingForAJob:</b>  {profile.lookingForAJob ? 'yes' : 'no'}
                        {createField(null, Input, 'lookingForAJob', null, [], 'checkbox')}
                    </div>
                    <div>
                        {profile.lookingForAJob &&
                            <div>
                                <b>my profesional skils:</b>  
                                {createField(null, Input, 'lookingForAJobDescription', 'my profesional skils...', [], null)}
                            </div>
                        }
                    </div>
                    <div>
                        <b>contacts: </b>
                        <div style={{ paddingLeft: '10px' }}>
                            {Object.keys(profile.contacts).map(key => {
                                return (
                                    <ContactsForm  contactsKey={key}/>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        { error &&
                            <div className={s.errorSome}>{error}</div>
                        }
                    </div>
                </div>
            </form>
        </>
    )
}

const ContactsForm = ({contactsKey}) => {
    return (
        <div style={{marginBottom: '5px'}}>
            <b>{contactsKey}:</b>
            <div>
                {createField(null, Input, 'contacts.' + contactsKey, `${contactsKey}...`, [], null)}
            </div>
        </div>
    )
};


const ProfileDataFormRedux = reduxForm({form: 'profile'})(ProfileDataForm);


export default ProfileDataFormRedux;