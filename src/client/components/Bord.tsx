import * as React from 'react';
import Lane from '../containers/List';
import CardModal from '../containers/CardModal';
import * as models from '../../shared/models';
import { RouteComponentProps } from "react-router";
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

export interface BordStateProps {
    bord?: models.Bord;
    users?: models.User[];
    isOpenCardModal?: boolean;
}

export interface BordDispatchProps {
    onShowModal?(cardId: string);
    onCreateList?(bordId: string);
    onAddUser?(name: string, icon: string);
    onDeleteList?(bordId: string, listId: string);
    onEditList?(listId: string, name: string);
    onMoveList?(sourceId: string, targetId: string);
}

export interface BordComponentProps extends RouteComponentProps<{bordId: string}> {
 
}

export type BordProps = BordComponentProps & BordStateProps & BordDispatchProps;

const Bord: React.StatelessComponent<BordProps> = (props) => {
    return (
        <div className="bord">
            <h3>
                <span className="bord-title">{props.bord.name}</span>
                <button
                    className="add-list-button"
                    onClick={() => {props.onCreateList(props.bord.id)}}
                    >
                    Add List
                </button>
            </h3>
            <div className="lists">
                {props.bord.listIds.map(listId => (
                    <Lane
                        id={listId}
                        key={listId}
                        onShowModal={props.onShowModal}
                        onEditList={props.onEditList}
                        onDeleteList={listId => props.onDeleteList(props.bord.id, listId)}
                        onMoveList={props.onMoveList}
                        />
                ))}
            </div>
            {props.bord.cardModal.isOpen ?
            <CardModal
                bordId={props.bord.id}
                cardId={props.bord.cardModal.cardId}
                userIds={[]}
                editable={props.bord.cardModal.editableForm}
                />
                : null
            }
        </div>
    )
};

const isMobile= navigator.userAgent
    .match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i) !== null

export default DragDropContext(isMobile ? TouchBackend : HTML5Backend)(Bord);