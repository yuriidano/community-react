import stylles from './Settinds.module.scss'
import { SettingsForm } from "./SettingsForm/SettingsForm";

const Settings = () => {
    return (
        <div className={stylles.settings}>
            <h3 className={stylles.lable}>Key</h3>
            <div className={stylles.key}><SettingsForm /></div>
            <div>
                <div className={stylles.title}>To access all the features of our social network, you need to take one more step:</div>
                <ul className={stylles.list}>
                    <li className={stylles.item}>
                        Go to your personal account → Account settings. Follow the link in the confirmation message we sent you by email
                        (<a target="_blank" href="https://social-network.samuraijs.com/Auth/
                        Account/ConfirmEmail/1f706eec-d43a-47fc-95db-3d9dc851dec5">
                            https://social-network.samuraijs.com/Auth/Account/
                            ConfirmEmail/1f706eec-d43a-47fc-95db-3d9dc851dec5</a>).
                    </li>
                    <li className={stylles.item}>
                        Generate a key.
                    </li>
                    <li className={stylles.item}>
                        Enter the received key in a special form and save it on the settings page of the social network.
                    </li>
                    <li className={stylles.item}>Reload the page.</li>
                </ul>
            </div>
        </div>
    )
};





export default Settings;


