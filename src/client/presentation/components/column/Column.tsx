import * as React from "react";
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget,
    DragSource, DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec,
    DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec,
} from "react-dnd";
import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { DnDItemType } from "../../constants";
import Card from "../card";
import Editer from "../Editer";

export interface StateProps {
    column?: model.Column;
}

export interface ActionProps {
    onClickColumnName?();
    onEditColumnName?(name: string);
    onClickAddCardButton?();
    onClickDeleteCardButton?(cardId: CardId);
    onHoverCard?(hoverCardId: CardId);
    onHoverCardOverCardInColumn?(hoverCardId: CardId, hoveredCardId: CardId);
}

export interface OwnProps {
    id: ColumnId;
    onClickCard(cardId: CardId);
    onClickDeleteColumnButton(columnId: ColumnId);
    onHoverColumn(src: ColumnId, dist: ColumnId);
}

interface DnDProps {
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource; 1;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
}

type Props = OwnProps & StateProps & ActionProps & DnDProps & React.Props<{}>;

const connectDnDComponent = (component: React.ReactElement<{}>) => (props: Props) => {
    return props.connectDragPreview(
        props.connectDropTarget(
            props.connectDragSource(component),
        ),
    );
};

const Coulmn: React.StatelessComponent<Props> = props => {
    return connectDnDComponent(
        <div className="column" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
            <div className="column__header">
                <div className="column__header-name">
                    <Editer
                        value={props.column.name}
                        onValueClick={props.onClickColumnName}
                        onEdit={props.onEditColumnName}
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
                        onHoverCard={props.onHoverCardOverCardInColumn}
                        onClickDeleteCardButton={props.onClickDeleteCardButton} />
                ))}
            </ul>
            <button
                className="add-card-button"
                onClick={props.onClickAddCardButton} >
                Add Card
                </button>
        </div >,
    )(props);
};

// --------------------------------
// react-dnd: Drag
// --------------------------------

interface DnDItem { readonly id: ColumnId; }

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

const dragSource = DragSource<Props>(
    DnDItemType.Column,
    dragSourceSpec,
    dragSourceCollector,
);

// --------------------------------
// react-dnd: Drop
// --------------------------------

const dropTargetSpec: DropTargetSpec<Props> = {
    hover: (targetProps: Props, monitor: DropTargetMonitor) => {
        const hoverItemType = monitor.getItemType();
        const hoverItemId = (monitor.getItem() as any).id;
        const hoveredColumnId = targetProps.id;
        if (hoverItemType === DnDItemType.Card && targetProps.column.cardIds.isEmpty) {
            targetProps.onHoverCard(hoverItemId as CardId);
        } else if (hoverItemType === DnDItemType.Column && !hoveredColumnId.equals(hoverItemId)) {
            targetProps.onHoverColumn(hoverItemId as ColumnId, hoveredColumnId);
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
