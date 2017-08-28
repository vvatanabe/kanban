import * as React from "react";
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget,
    DragSource, DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec,
    DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec,
} from "react-dnd";
import { CardId, StatusLaneId } from "../../../../shared/domain/model";
import { StatusLane } from "../../../../shared/domain/model/statuslane/StatusLane";
import { DnDItemType } from "../../constants";

export interface StateProps {
    statusLane?: StatusLane;
}

export interface ActionProps {
}

export interface OwnProps extends React.Props<{}> {
    id: StatusLaneId;
    openCardModal(cardId: CardId);
}

interface DnDProps {
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
}

type Props = OwnProps & StateProps & ActionProps & DnDProps;

const connectDnDComponent = (component: React.ReactElement<{}>) => (props: Props) => {
    return props.connectDragPreview(
        props.connectDropTarget(
            props.connectDragSource(component),
        ),
    );
};

const StatusLane: React.StatelessComponent<Props> = props => connectDnDComponent(
    <div className="status-lane" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
        <ul className="cards">
            {props.statusLane.cardIds.map(cardId => (
                <Card
                    id={cardId}
                    key={cardId.value}
                    onClickCard={props.onClickCard}
                    onHoverCard={props.onHoverCardOverCardInStatusLane}
                    onClickDeleteCardButton={props.onClickDeleteCardButton} />
            ))}
        </ul>
        <button className="add-card-button" onClick={props.addCard} >
            Add Card
                </button>
    </div>,
)(props);

// --------------------------------
// react-dnd: Drag
// --------------------------------

interface DnDItem { readonly id: StatusLaneId; }

const dragSourceSpec: DragSourceSpec<Props> = {
    beginDrag: (props: Props): DnDItem => ({ id: props.id }),
    isDragging: (props: Props, monitor: DragSourceMonitor): boolean => (
        props.id.equals((monitor.getItem() as DnDItem).id)
    ),
};

const dragSourceCollector: DragSourceCollector = (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor,
): Object => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

const dragSource = DragSource<Props>(DnDItemType.StatusLane, dragSourceSpec, dragSourceCollector);

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
