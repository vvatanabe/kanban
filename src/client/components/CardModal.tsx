import * as React from 'react';
import Editer from './Editer';
import * as ReactModal from 'react-modal';
import * as Select from 'react-select';
import Selector from './Selector';
import Calendar from './Calendar';
import { User, EditableForm, Form, List, Card } from '../../shared/models';
import * as moment from 'moment';

export interface CardModalRequireProps extends React.Props<{}> {
    bordId: string;
    userIds: string[];
    editable: EditableForm;
    cardId?: string;
}

export interface CardModalStateProps {
    summaryForm: Form<string>;
    descriptionForm: Form<string>;
    assigneeForm: Form<string>;
    startDateForm: Form<string>;
    endDateForm: Form<string>;
    estimatedHoursForm: Form<number>;
    actualHoursForm: Form<number>;
    pointForm: Form<number>;
    users: User[];
}

export interface CardModalDispatchProps {
    close?();
    onEditSummary?();
    onUpdateSummary?(id: string, summary: string);
    onEditDescription?();
    onUpdateDescription?(id: string, description: string);
    onEditAssignee?();
    onUpdateAssignee?(id: string, option: Select.Option);
    onEditStartDate?();
    onUpdateStartDate?(id: string, startDate: string);
    onEditEndDate?();
    onUpdateEndDate?(id: string, endDate: string);
    onEditEstimatedHours?();
    onUpdateEstimatedHours?(id: string, estimatedHours: string);
    onEditActualHours?();
    onUpdateActualHours?(id: string, point: string);
    onEditPoint?();
    onUpdatePoint?(id: string, point: string);
}

export type CardModalProps = CardModalRequireProps & CardModalStateProps & CardModalDispatchProps;

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

const CardModal: React.StatelessComponent<CardModalProps> = (props) => {

    const options: Select.Option[] = props.users.map(user => ({
        label: user.name,
        value: `${user.id}`
    }));

    // const defaultOption = props.card.assignee ? {
    //     label: props.card.assignee.name,
    //     value: `${props.card.assignee.id}`
    // } : null;

    return (<ReactModal
                isOpen={true}
                contentLabel="edit-card-dialog"
                onRequestClose={props.close}
                style={customStyles}
                >
                <div className="card-modal__header">
                    <div className="properties-value summary">
                        <Editer
                            id={props.cardId}
                            value={props.summaryForm.value}
                            onValueClick={props.onEditSummary}
                            onEdit={props.onUpdateSummary}
                            editing={props.summaryForm.isOpen}
                            />
                    </div>
                </div>
                <div className="properties-item">
                    <div className="properties-label">Description</div>
                    <div className="properties-value description">
                        <Editer
                            id={props.cardId}
                            value={props.descriptionForm.value}
                            onValueClick={props.onEditDescription}
                            onEdit={props.onUpdateDescription}
                            editing={props.descriptionForm.isOpen}
                            />
                    </div>
                </div>
                <div className="flexwrap">
                    <div className="properties-item flexwrap-item">
                        <div className="properties-label">Start Date</div>
                        <div className="properties-value">
                            <Calendar
                                id={props.cardId}
                                isEdit={props.editable.isStartDate}
                                selected={props.startDateForm.value ? moment(props.startDateForm.value) : null}
                                onChangeValue={props.onUpdateStartDate}
                                onValueClick={props.onEditStartDate}
                                />
                        </div>
                    </div>
                    <div className="properties-item flexwrap-item">
                        <div className="properties-label">Due Date</div>
                        <div className="properties-value">
                            <Calendar
                                id={props.cardId}
                                isEdit={props.endDateForm.isOpen}
                                selected={props.endDateForm.value ? moment(props.endDateForm.value) : null}
                                onChangeValue={props.onUpdateEndDate}
                                onValueClick={props.onEditEndDate}
                                />
                        </div>
                    </div>
                    <div className="properties-item flexwrap-item">
                        <div className="properties-label">Estimated Hours</div>
                        <div className="properties-value">
                            <Editer
                                id={props.cardId}
                                value={`${props.estimatedHoursForm.value}`}
                                onValueClick={props.onEditEstimatedHours}
                                onEdit={props.onUpdateEstimatedHours}
                                editing={props.estimatedHoursForm.isOpen}
                                />
                        </div>
                    </div>
                    <div className="properties-item flexwrap-item">
                        <div className="properties-label">Actual Hours</div>
                        <div className="properties-value">
                            <Editer
                                id={props.cardId}
                                value={`${props.actualHoursForm.value}`}
                                onValueClick={props.onEditActualHours}
                                onEdit={props.onUpdateActualHours}
                                editing={props.actualHoursForm.isOpen}
                                />
                        </div>
                    </div>
                    <div className="properties-item flexwrap-item">
                        <div className="properties-label">Point</div>
                        <div className="properties-value">
                            <Editer
                                id={props.cardId}
                                value={`${props.actualHoursForm.value}`}
                                onValueClick={props.onEditActualHours}
                                onEdit={props.onUpdateActualHours}
                                editing={props.actualHoursForm.isOpen}
                                />
                        </div>
                    </div>
                    {/*<div className="properties-item flexwrap-item">
                        <div className="properties-label">Assignee</div>
                        <div className="properties-value">
                            <Selector
                                id={props.card.id}
                                placeholder={'Select User'}
                                isEdit={props.editable.isAssignee}
                                defaultOption={defaultOption}
                                options={options}
                                onChange={props.onUpdateAssignee}
                                onValueClick={props.onEditAssignee}
                                />
                        </div>
                    </div>*/}
                </div>
            </ReactModal>
    )
};

export default CardModal;
