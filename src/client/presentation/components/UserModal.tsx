import * as React from 'react';
import { List, Card } from '../../shared/models';
import Editer from './Editer';
import Writer from './Writer';
import * as ReactModal from 'react-modal';
import * as Select from 'react-select';
import Selector from './Selector';
import Calendar from './Calendar';
import { User } from '../../shared/models';
import * as moment from 'moment';

export interface UserModalRequireProps extends React.Props<{}> {
    isOpen: boolean;
    close();
}

export interface UserModalStateProps {

}

export interface UserModalDispatchProps {
    submit?(name: string, icon: string);
}

export type UserModalProps = UserModalRequireProps & UserModalStateProps & UserModalDispatchProps;

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, .8)',
        zIndex: 99
    },
    content: {
        position: 'absolute',
        width: '60%',
        height: '60%',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        backgroundColor: '#F8F8F8',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
    }
};

const UserModal: React.StatelessComponent<UserModalProps> = (props) => {

    return (
        props.isOpen ?
            <ReactModal
                isOpen={props.isOpen}
                contentLabel="dialog"
                onRequestClose={props.close}
                style={customStyles}
                >
            </ReactModal>
            :
            null
    )
};

export default UserModal;
