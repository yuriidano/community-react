import { sendMessage } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { FC } from 'react';


type DialogType = {
    id: number,
    name: string,
    url: string
}
type MessageType = {
    id: number,
    message: string
}
export type StateType = {
    dialods: Array<DialogType>,
    messages: MessageType[]
}

type mapStateType = {
    state: StateType
}

type mapDispatchType = {
    sendMessage: (data: string) => void
}

type OmnType = {}

type PropsType = mapStateType & mapDispatchType & OmnType;



const DialogsContainer: FC<PropsType> = (props) => {


    return (
        <>
            <Dialogs {...props} />
        </>
    )
}



let mapStateToProps = (state: AppStateType): mapStateType => {
    return {
        state: state.dialogsPage,
    };
};



export default compose(
    connect<mapStateType, mapDispatchType, OmnType, AppStateType>(mapStateToProps, {sendMessage}),
    withAuthNavigate
) (DialogsContainer);









