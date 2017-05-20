import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, ConnectDropTarget } from 'react-dnd';
import { DragSource, DragSourceSpec, DragSourceMonitor, DragSourceConnector, DragSourceCollector } from 'react-dnd';
import { DropTarget, DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTargetCollector } from 'react-dnd';
import { Item } from '../../shared/constants/itemType';
import Card from '../containers/Card';
import Editer from './Editer';
import * as models from '../../shared/models';

export interface ListStateProps extends React.Props<{}> {
    list: models.List;
}

export interface ListDispatchProps extends React.Props<{}> {
    onCreateCard?(listId: string);
    onEditCard?(cardId: string);
    onUpdateCard?(cardId: string, value: string);
    onDeleteCard?(listId: string, cardId: string);
    onMoveCard?(sourceId: string, targetId: string);
    attachToList?(targetId: string, sourceId: string);
}

export type ListProps = {
    id: string;
    onDeleteList(listId: string);
    onEditList(listId: string, name?: string);
    onMoveList(sourceId: string, targetId: string);
    onShowModal(cardId: string);
    connectDragPreview?: ConnectDragPreview; // private scope (using react-dnd)
    connectDragSource?: ConnectDragSource;   // private scope (using react-dnd)
    connectDropTarget?: ConnectDropTarget;   // private scope (using react-dnd)
    isDragging?: boolean; // private scope (using react-dnd)
} & ListStateProps & ListDispatchProps;

const List: React.StatelessComponent<ListProps> = (props) => {

    const handleCreateCard = () => {
        props.onCreateCard(props.list.id);
    }

    // TODO onDeleteCardの第一引数のnull　があやしい
    const handleDeleteList = () => {
        props.onDeleteList(props.list.id);
        props.list.cardIds.forEach(cardId => props.onDeleteCard(null, cardId));
    }

    const handleDeleteCard = (cardId: string) => {
        props.onDeleteCard(props.list.id, cardId);
    }

    return props.connectDragPreview(
        props.connectDropTarget(
            props.connectDragSource(<div className="list" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
                {
                    <div className="list__header">
                        <div className="list__header-title">
                            <Editer
                                id={props.list.id}
                                value={props.list.name}
                                onValueClick={props.onEditList}
                                onEdit={props.onEditList}
                                editing={props.list.editing}
                                />
                        </div> {!props.list.editing ?
                        <div className="list__header-button">
                            <button
                                className="delete-list-button"
                                onClick={handleDeleteList}
                                >Delete</button>
                        </div>
                        : null}
                    </div>}
                <ul className="cards">
                    {props.list.cardIds.map(cardId => (
                        <Card
                            id={cardId}
                            key={cardId}
                            onClickCard={props.onShowModal}
                            onMoveCard={props.onMoveCard}
                            onDeleteCard={handleDeleteCard} />
                    ))}
                </ul>
                <button className="add-card-button" onClick={handleCreateCard} >
                    Add Card
                </button>
            </div>)
        )
    )
}

// --------------------------------
// react-dnd: Drag
// --------------------------------

interface Item {
    id: string;
}

const listSource: DragSourceSpec<ListProps> = {
    beginDrag: (props: ListProps): Item => {
        return {
            id: props.list.id
        }
    },
    isDragging: (props: ListProps, monitor: DragSourceMonitor): boolean => (
        props.list.id === (monitor.getItem() as Item).id
    )
};

const collectDragSource: DragSourceCollector = (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor
): Object => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});

const dragSource = DragSource<ListProps>(Item.List, listSource, collectDragSource)

// --------------------------------
// react-dnd: Drop
// --------------------------------

const listTarget: DropTargetSpec<ListProps> = {
    hover: (targetProps: ListProps, monitor: DropTargetMonitor) => {
        const sourceType = monitor.getItemType();
        const sourceId = (monitor.getItem() as Item).id;
        const targetId = targetProps.list.id;
        if (!targetProps.list.cardIds.length && sourceType === Item.Card) {
            targetProps.attachToList(targetId, sourceId);
        } else if (targetId !== sourceId && sourceType === Item.List) {
            targetProps.onMoveList(sourceId, targetId);
        }
    }
};

const collectDropTarget: DropTargetCollector = (
    connect: DropTargetConnector
): Object => ({
    connectDropTarget: connect.dropTarget(),
});

const dropTarget = DropTarget<ListProps>([Item.Card, Item.List], listTarget, collectDropTarget);


export default dragSource(dropTarget(List));
