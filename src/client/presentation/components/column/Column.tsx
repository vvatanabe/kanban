import * as React from "react";
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget,
    DragSource, DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec,
    DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec,
} from "react-dnd";
import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { DnDItemType } from "../../constants";
import { ConnectDnDComponent } from "../../support/ConnectDnDComponent";
import Card from "../card";
import Editer from "../Editer";

export interface OwnProps extends React.Props<{}> {
    id: ColumnId;
    onClickCard(cardId: CardId);
    onClickDeleteColumnButton(columnId: ColumnId);
    onHoverColumn(hover: ColumnId, beHovered: ColumnId);
}

export interface StateProps {
    column?: model.Column;
}

export interface ActionProps {
    showFormOfColumnName?();
    updateColumnName?(name: string);
    addCard?();
    deleteCard?(id: CardId);
    attachCard?(id: CardId);
    moveCard?(src: CardId, dist: CardId);
}

interface DnDProps {
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
}

type Props = OwnProps & StateProps & ActionProps & DnDProps;

const Coulmn: React.StatelessComponent<Props> = props => ConnectDnDComponent(
    props.connectDragPreview,
    props.connectDragSource,
    props.connectDropTarget,
)(
    <div className="column" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
        <div className="column__header">
            <div className="column__header-name">
                <Editer
                    value={props.column.name}
                    onValueClick={props.showFormOfColumnName}
                    onEdit={props.updateColumnName}
                    editing={props.column.editing}
                />
            </div>
            {!props.column.editing
                ?
                <div className="column__header-button">
                    <button
                        className="delete-column-button"
                        onClick={() => props.onClickDeleteColumnButton(props.id)}
                    >Delete</button>
                </div>
                :
                null
            }
        </div>
        <ul className="cards">
            {props.column.cardIds.map(cardId => (
                <Card
                    id={cardId}
                    key={cardId.value}
                    onClickCard={props.onClickCard}
                    onHoverCard={props.moveCard}
                    onClickDeleteCardButton={props.deleteCard} />
            ))}
        </ul>
        <button
            className="add-card-button"
            onClick={props.addCard} >
            Add Card
                </button>
    </div >,
);

// --------------------------------
// react-dnd
// --------------------------------

interface DnDItem { readonly id: ColumnId; }

// --------------------------------
// react-dnd: Drag
// --------------------------------

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

const dragSource = DragSource(
    DnDItemType.Column,
    dragSourceSpec,
    dragSourceCollector,
);

// --------------------------------
// react-dnd: Drop
// --------------------------------

const dropTargetSpec: DropTargetSpec<Props> = {
    hover: (targetProps: Props, monitor: DropTargetMonitor) => {
        const hover = (monitor.getItem() as DnDItem).id;
        const beHovered = targetProps.id;
        switch (monitor.getItemType()) {
            case DnDItemType.Card: if (!targetProps.column.hasCard) {
                targetProps.attachCard(hover as CardId);
            }
            case DnDItemType.Column: if (!beHovered.equals(hover)) {
                targetProps.onHoverColumn(hover, beHovered);
            }
        }
    },
};

const dropTargetCollector: DropTargetCollector = (
    connect: DropTargetConnector,
): Object => ({
    connectDropTarget: connect.dropTarget(),
});

const dropTarget = DropTarget<Props>(
    [DnDItemType.Card, DnDItemType.Column],
    dropTargetSpec,
    dropTargetCollector,
);

export default dragSource(dropTarget(Coulmn));
