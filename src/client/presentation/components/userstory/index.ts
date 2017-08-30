import { BindComponentProps } from "../../support";
import { ActionProps, default as UserStory, OwnProps, StateProps } from "./UserStory";

const bindStateToProps = (ownProps: OwnProps): StateProps => ({
    userStory: userStoryQueryService.find(ownProps.id),
});

const bindActionToProps = (ownProps: OwnProps): ActionProps => ({
    showFormOfUserStoryName() {
        userStoryCommandService.showFormOfUserStoryName(ownProps.id);
    },
    updateUserStoryName?(name: string) {
        const command: UpdateUserStoryCommand = { name };
        userStoryCommandService.updateUserStory(ownProps.id, command);
    },
});

export default BindComponentProps(
    bindStateToProps,
    bindActionToProps,
)(UserStory);
