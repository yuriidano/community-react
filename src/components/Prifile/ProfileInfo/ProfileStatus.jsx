 import React from "react";
import styles from './ProfileInfo.module.scss'




class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }


    componentDidUpdate(prevProps, prevState) {
        if(this.props.status != prevProps.status) {
            this.setState({
                status: this.props.status
            })
        }
    }



    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange =(e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }


    render() {
        return (
            <div className={styles.status}>
                {!this.state.editMode &&
                    <div>
                        <span className={styles.statusSpan} onClick={this.activateEditMode} >{this.props.status || '------'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input className={styles.statusInput} onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} type="text" value={this.state.status} />
                    </div >
                }
            </div>
        )
    }
}


export default ProfileStatus;