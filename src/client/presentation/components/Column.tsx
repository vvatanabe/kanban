import * as React from "react";
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget,
    DragSource, DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec,
    DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec,
} from "react-dnd";
import DnDItemType from "../../shared/constants/DnDItemType";
import StatusLaneDispatcher from "../dispatchers/CoulmnDispatcher";
import * as models from "../../shared/models";
import Card from "../containers/Card";
import Editer from "./Editer";

export interface StateProps {
    lane?: models.StatusLane;
}

export interface DispatchProps {
    statusLaneDispatcher: StatusLaneDispatcher;
}

export interface OwnProps {
    id: models.StatusLaneId;
    openCardModal(cardId: models.CardId);
    deleteStatusLane?(laneId: models.StatusLaneId);
    moveStatusLane?(src: models.StatusLaneId, dist: models.StatusLaneId);
}

interface DnDProps {
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
}

type Props = OwnProps & StateProps & DispatchProps & DnDProps & React.Props<{}>;

const Coulmn: React.StatelessComponent<Props> = props => {
    const handleDeleteStatusLane = () => props.deleteStatusLane(props.id);
    return props.connectDragPreview(
        props.connectDropTarget(
            props.connectDragSource(<div className="list" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
                <div className="list__header">
                    <div className="list__header-title">
                        <Editer
                            value={props.lane.name}
                            onValueClick={props.statusLaneDispatcher.showNameForm}
                            onEdit={props.statusLaneDispatcher.updateName}
                            editing={props.lane.editing}
                        />
                    </div>
                    {!props.lane.editing ?
                        <div className="list__header-button">
                            <button
                                className="delete-list-button"
                                onClick={handleDeleteStatusLane}
                            >Delete</button>
                        </div>
                        : null}
                </div>
                <ul className="cards">
                    {props.lane.cardIds.map(cardId => (
                        <Card
                            id={cardId}
                            key={cardId.value}
                            onClickCard={props.openCardModal}
                            onMoveCard={props.statusLaneDispatcher.moveCard}
                            onDeleteCard={props.statusLaneDispatcher.deleteCard} />
                    ))}
                </ul>
                <button className="add-card-button" onClick={props.statusLaneDispatcher.addNewCard} >
                    Add Card
                </button>
            </div>,
            ),
        )
    )
};

// --------------------------------
// react-dnd: Drag
// --------------------------------

interface DnDItem { readonly id: models.StatusLaneId; }

const listSource: DragSourceSpec<Props> = {
    beginDrag: (props: Props): DnDItem => ({ id: props.lane.id }),
    isDragging: (props: Props, monitor: DragSourceMonitor): boolean => (
        props.lane.id.equals((monitor.getItem() as DnDItem).id)
    ),
};

const collectDragSource: DragSourceCollector = (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor,
): Object => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

const dragSource = DragSource<Props>(DnDItemType.StatusLane, listSource, collectDragSource);

// --------------------------------
// react-dnd: Drop
// --------------------------------

const listTarget: DropTargetSpec<Props> = {
    hover: (targetProps: Props, monitor: DropTargetMonitor) => {
        const sourceType = monitor.getItemType();
        const sourceId = (monitor.getItem() as any).id;
        const targetStatusLaneId = targetProps.lane.id;
        if (sourceType === DnDItemType.Card && targetProps.lane.cardIds.length === 0) {
            targetProps.statusLaneDispatcher.attachCard(sourceId as models.CardId);
        } else if (sourceType === DnDItemType.StatusLane && !models.equals(targetStatusLaneId, sourceId)) {
            targetProps.moveStatusLane(sourceId as models.StatusLaneId, targetStatusLaneId);
        }
    },
};

const collectDropTarget: DropTargetCollector = (
    connect: DropTargetConnector,
): Object => ({
    connectDropTarget: connect.dropTarget(),
});

const dropTarget = DropTarget<Props>([DnDItemType.Card, DnDItemType.StatusLane], listTarget, collectDropTarget);

export default dragSource(dropTarget(Coulmn));
