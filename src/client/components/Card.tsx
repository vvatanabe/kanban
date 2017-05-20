import * as React from 'react';
import { ConnectDragSource, DragSource, DragSourceSpec, DragSourceMonitor, DragSourceConnector, DragSourceCollector } from 'react-dnd';
import { ConnectDropTarget, DropTarget, DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTargetCollector } from 'react-dnd';
import { Item } from '../../shared/constants/itemType';
import * as models from '../../shared/models';

export interface CardStateProps {
    card: models.Card;
}

export interface CardDispatchProps {
}

export interface CardComponentProps extends React.Props<{}> {
  id: string;
  onClickCard(cardId: string);
  onMoveCard(sourceId: string, targetId: string);
  onDeleteCard(cardId: string);
  connectDragSource?: ConnectDragSource; // private scope (using react-dnd)
  connectDropTarget?: ConnectDropTarget; // private scope (using react-dnd)
  isDragging?: boolean; // private scope (using react-dnd)
}

export type CardProps = CardComponentProps & CardStateProps & CardDispatchProps;

const Card: React.StatelessComponent<CardProps> = (props) => (
  props.connectDragSource(
    props.connectDropTarget(
      <li onClick={() => props.onClickCard(props.id)} style={{ opacity: props.isDragging ? 0.4 : 1 }} className="card" >
          <div className="card__title">{props.card.summary}</div>
          <button className="delete-card-button" onClick={e => {
                props.onDeleteCard(props.id);
                e.stopPropagation();
              }
          }>
              Delete
          </button>
      </li>
    )
  )
)

// --------------------------------
// react-dnd: Drag
// --------------------------------

interface Item {
  id: string;
}

const cardSource: DragSourceSpec<CardProps> = {
  beginDrag: (props: CardProps): Item => ({
    id: props.id
  }),
  isDragging: (props: CardProps, monitor: DragSourceMonitor): boolean => (
    props.id === (monitor.getItem() as Item).id
  )
};

const collectDragSource: DragSourceCollector = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
): Object => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const dragSource = DragSource<CardProps>(Item.Card, cardSource, collectDragSource);

// --------------------------------
// react-dnd: Drop
// --------------------------------

const cardTarget: DropTargetSpec<CardProps> = {
  hover(props: CardProps, monitor: DropTargetMonitor): void {
    const targetId = props.id;
    const item = monitor.getItem() as Item;
    const sourceId = item.id;
    if(sourceId !== targetId) {
      props.onMoveCard(sourceId, targetId);
    }
  }
};

const collectDropTarget: DropTargetCollector = (
  connect: DropTargetConnector
): Object => ({
  connectDropTarget: connect.dropTarget(),
});

const dropTarget = DropTarget<CardProps>(Item.Card, cardTarget, collectDropTarget);


export default dragSource(dropTarget(Card));
