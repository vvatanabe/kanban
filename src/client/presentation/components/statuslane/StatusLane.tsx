import * as React from "react";
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget,
    DragSource, DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec,
    DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec,
} from "react-dnd";
import { CardId, StatusLaneId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { DnDItemType } from "../../constants";
import Card from "../card";

export interface OwnProps extends React.Props<{}> {
    id: StatusLaneId;
    onClickCard(cardId: CardId);
}

export interface StateProps {
    statusLane?: model.StatusLane;
}

export interface ActionProps {
    addCard?();
    deleteCard?(cardId: CardId);
    attachCard?(cardId: CardId);
    moveCard?(src: CardId, dist: CardId);
}

interface DnDProps {
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
}

type Props = OwnProps & StateProps & ActionProps & DnDProps;

const StatusLane: React.StatelessComponent<Props> = props => props.connectDropTarget(
    <div className="status-lane" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
        <ul className="cards">
            {props.statusLane.cardIds.map(id => (
                <Card
                    id={id}
                    key={id.value}
                    onClickCard={props.onClickCard}
                    onHoverCard={props.moveCard}
                    onClickDeleteCardButton={props.deleteCard} />
            ))}
        </ul>
        <button className="add-card-button" onClick={props.addCard} >
            Add Card
            </button>
    </div>,
);

// --------------------------------
// react-dnd: Drag
// --------------------------------

interface DnDItem { readonly id: StatusLaneId; }

// --------------------------------
// react-dnd: Drop only
// --------------------------------

const dropTargetSpec: DropTargetSpec<Props> = {
    hover: (targetProps: Props, monitor: DropTargetMonitor) => {
        const hover = (monitor.getItem() as DnDItem).id;
        const beHovered = targetProps.id;
        if (!targetProps.statusLane.hasCard) {
            targetProps.attachCard(hover as CardId);
        }
    },
};


const dropTargetCollector: DropTargetCollector = (
    connect: DropTargetConnector,
): Object => ({
    connectDropTarget: connect.dropTarget(),
});

const dropTarget = DropTarget<Props>(
    [DnDItemType.Card],
    dropTargetSpec,
    dropTargetCollector,
);

export default dropTarget(StatusLane);
