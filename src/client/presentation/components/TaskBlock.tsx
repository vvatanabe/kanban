import * as React from "react";
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget,
    DragSource, DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec,
    DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec,
} from "react-dnd";
import DnDItemType from "../../shared/constants/DnDItemType";
import StatusLaneDispatcher from "../../shared/dispatchers/StatusLaneDispatcher";
import * as models from "../../shared/models";
import Card from "../containers/Card";
import Editer from "./Editer";

export interface StateProps {
    lane?: models.StatusLane;
    name?: string;
}

export interface DispatchProps {
    statusLaneDispatcher: StatusLaneDispatcher;
}

export interface OwnProps {
    id: models.StatusLaneId;
    openCardModal(cardId: models.CardId);
}

interface DnDProps {
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
}

type Props = OwnProps
    & StateProps
    & DispatchProps
    & DnDProps
    & React.Props<{}>;

const StatusLane: React.StatelessComponent<Props> = props => {
    return props.connectDragPreview(
        props.connectDropTarget(
            props.connectDragSource(<div className="list" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
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
        ),
    );
};

// --------------------------------
// react-dnd: Drag
// --------------------------------

interface DnDItem extends models.Entity<models.StatusLaneId> {

}

const listSource: DragSourceSpec<Props> = {
    beginDrag: (props: Props): DnDItem => {
        return {
            id: props.lane.id
        };
    },
    isDragging: (props: Props, monitor: DragSourceMonitor): boolean => (
        models.equals(props.lane.id, (monitor.getItem() as DnDItem).id)
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

export default dragSource(dropTarget(StatusLane));
