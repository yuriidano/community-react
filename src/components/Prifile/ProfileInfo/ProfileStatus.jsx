import React, { useEffect, useState } from "react";
import { reduxForm } from "redux-form";
import s from './ProfileInfo.module.scss'






let ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false); 
    let [status, setStatus] = useState(props.status);


    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let activateEditMode = () => {
        setEditMode(true);
    }

    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className={s.status}>
            {!editMode &&
                <div>
                    <span onClick={activateEditMode} style={{ backgroundColor: 'gray' }} >{props.status || '------'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} type="text" value={status} />
                </div >
            }
        </div>
    )
}


export default ProfileStatus;