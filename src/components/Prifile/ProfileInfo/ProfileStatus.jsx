import React, { useEffect, useState } from "react";
import { reduxForm } from "redux-form";
import styles from './ProfileInfo.module.scss'






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
        <div className={styles.status}>
            {!editMode &&
                <div>
                    <span className={styles.statusSpan} onClick={activateEditMode} >{props.status || '------'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input className={styles.statusInput} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} type="text" value={status} />
                </div >
            }
        </div>
    )
}


export default ProfileStatus;