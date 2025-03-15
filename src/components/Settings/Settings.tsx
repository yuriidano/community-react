import { SubmitHandler, useForm } from "react-hook-form";
import stylles from './Settinds.module.scss'
import { SettingsForm } from "./SettingsForm/SettingsForm";

const Settings = () => {
    return (
        <div className={stylles.settings}>
            <h3 className={stylles.lable}>Key</h3>
            <div className={stylles.key}><SettingsForm /></div>
        </div>
    )
};





export default Settings;