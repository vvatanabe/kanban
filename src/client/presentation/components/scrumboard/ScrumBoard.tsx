import * as React from "react";
import { CardId, UserStoryId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import CardModal from "../cardmodal";
import UserStory from "../userstory";

export interface OwnProps extends React.Props<{}> {
    board?: model.ScrumBoard;
}

export interface ActionProps {
    addUserStory?();
    deleteUserStory?(id: UserStoryId);
    moveUserStory?(src: UserStoryId, dist: UserStoryId);
    openCardModal?(cardId: CardId);
    closeCardModal?();
}

export type Props = OwnProps & ActionProps;

const ScrumBoard: React.StatelessComponent<Props> = props => (
    <div className="scrum-board">
        <h3>
            <span className="scrum-board-title">{props.board.name}</span>
            <button
                className="add-user-story-button"
                onClick={props.addUserStory} >
                Add User Story
            </button>
        </h3>
        <div className="user-stories">
            {props.board.userStoryIds.map(userStoryId => (
                <UserStory
                    id={userStoryId}
                    key={userStoryId.value}
                    onClickDeleteUserStoryButton={props.deleteUserStory}
                    onHoverUserStory={props.moveUserStory}
                />
            ))}
        </div>
        {props.board.shouldBeOpenCardModal
            ? <CardModal data={props.board.cardModal} close={props.closeCardModal} />
            : null
        }
    </div>
)

export default ScrumBoard;
