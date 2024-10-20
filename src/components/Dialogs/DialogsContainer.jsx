import { sendMessage } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
    };
};



export default compose(
    connect(mapStateToProps, {sendMessage}),
    withAuthNavigate
) (Dialogs);









