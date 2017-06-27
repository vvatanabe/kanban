import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, ConnectDropTarget } from 'react-dnd';
import { DragSource, DragSourceSpec, DragSourceMonitor, DragSourceConnector, DragSourceCollector } from 'react-dnd';
import { DropTarget, DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTargetCollector } from 'react-dnd';
import { Item } from '../../shared/constants/itemType';
import Card from '../containers/Card';
import Editer from './Editer';
import * as models from '../../shared/models';

export interface StatusLaneStateProps {
    statusLane?: models.StatusLane;
}

export interface StatusLaneDispatchProps {

}

export type StatusLaneProps = {
    id: string;
}
& StatusLaneStateProps
& StatusLaneDispatchProps
& React.Props<{}>;

const StatusLane: React.StatelessComponent<StatusLaneProps> = (props) => {

    return (
        <ul className="statusLane">{props.statusLane.cardIds.map(cardId => {
            <li>
                <Card
                    id={cardId}
                    key={cardId}
                    onClickCard={() => {}}
                    onMoveCard={() => {}}
                    onDeleteCard={() => {}} />
            </li>
        })}</ul>
    )
}

export default StatusLane;
