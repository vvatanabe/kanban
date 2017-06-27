import * as moment from "moment";
import * as React from "react";
import * as ReactModal from "react-modal";
import * as ReactSelect from "react-select";
import * as models from "../../shared/models";
import Calendar from "./Calendar";
import Editer from "./Editer";
import Selector from "./Selector";

export interface OwnProps {
    boardId: models.BoardId;
    data: models.CardModal;
}

export interface StateProps {
    summary: models.Form<string>;
    description: models.Form<string>;
    startDate: models.Form<string>;
    dueDate: models.Form<string>;
    estimatedHours: models.Form<number>;
    actualHours: models.Form<number>;
    point: models.Form<number>;
}

export interface DispatchProps {
    close?();
    update?(card: models.Card);
    showSummaryForm?();
    showDescriptionForm?();
    showStartDateForm?();
    showDueDateForm?();
    showEstimatedHoursForm?();
    showActualHoursForm?();
    showPointForm?();
}

export type MergeProps = {
    updateCard?({
        summary,
        description,
        startDate,
        dueDate,
        estimatedHours,
        actualHours,
        point,
    }: {
            summary?: string;
            description?: string;
            startDate?: string;
            dueDate?: string;
            estimatedHours?: string;
            actualHours?: string;
            point?: string;
        });
} & OwnProps;

export type Props = StateProps & DispatchProps & MergeProps;

const customStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0, .8)",
        zIndex: 99
    },
    content: {
        position: "absolute",
        width: "60%",
        height: "60%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        border: "1px solid #ccc",
        backgroundColor: "#F8F8F8",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        borderRadius: "4px",
        outline: "none",
        padding: "20px",
    }
};

const CardModal: React.StatelessComponent<Props> = props => {

    const options: ReactSelect.Option[] = [];

    // const options: Select.Option[] = props.users.map(user => ({
    //     label: user.name,
    //     value: `${user.id}`
    // }));

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
                    value={props.summary.value}
                    editing={props.summary.isOpen}
                    onValueClick={props.showSummaryForm}
                    onEdit={summary => props.updateCard({ summary })}
                />
            </div>
        </div>
        <div className="properties-item">
            <div className="properties-label">Description</div>
            <div className="properties-value description">
                <Editer
                    value={props.description.value}
                    editing={props.description.isOpen}
                    onValueClick={props.showDescriptionForm}
                    onEdit={description => props.updateCard({ description })}
                />
            </div>
        </div>
        <div className="flexwrap">
            <div className="properties-item flexwrap-item">
                <div className="properties-label">Start Date</div>
                <div className="properties-value">
                    <Calendar
                        isOpen={props.startDate.isOpen}
                        selected={props.startDate.value ? moment(props.startDate.value) : null}
                        onChangeValue={startDate => props.updateCard({ startDate })}
                        onValueClick={props.showStartDateForm}
                    />
                </div>
            </div>
            <div className="properties-item flexwrap-item">
                <div className="properties-label">Due Date</div>
                <div className="properties-value">
                    <Calendar
                        isOpen={props.dueDate.isOpen}
                        selected={props.dueDate.value ? moment(props.dueDate.value) : null}
                        onChangeValue={dueDate => props.updateCard({ dueDate })}
                        onValueClick={props.showDueDateForm}
                    />
                </div>
            </div>
            <div className="properties-item flexwrap-item">
                <div className="properties-label">Estimated Hours</div>
                <div className="properties-value">
                    <Editer
                        value={`${props.estimatedHours.value}`}
                        onValueClick={props.showEstimatedHoursForm}
                        onEdit={estimatedHours => props.updateCard({ estimatedHours })}
                        editing={props.estimatedHours.isOpen}
                    />
                </div>
            </div>
            <div className="properties-item flexwrap-item">
                <div className="properties-label">Actual Hours</div>
                <div className="properties-value">
                    <Editer
                        value={`${props.actualHours.value}`}
                        onValueClick={props.showActualHoursForm}
                        onEdit={actualHours => props.updateCard({ actualHours })}
                        editing={props.actualHours.isOpen}
                    />
                </div>
            </div>
            <div className="properties-item flexwrap-item">
                <div className="properties-label">Point</div>
                <div className="properties-value">
                    <Editer
                        value={`${props.point.value}`}
                        onValueClick={props.showPointForm}
                        onEdit={point => props.updateCard({ point })}
                        editing={props.point.isOpen}
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
