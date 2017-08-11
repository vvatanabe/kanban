enum ActionType {
	FetchAppState = "FETCH_APP_STATE",
	AddNewKanbanBoard = "ADD_NEW_KANBAN_BOARD",
	CreateBoard = "CREATE_SCRUM_BOARD",
	DeleteBoard = "DELETE_BOARD",
	UpdateBoardName = "UPDATE_BOARD_NAME",
	ShowBoardNameForm = "SHOW_BOARD_NAME_FORM",
	CloseCardModal = "CLOSE_CARD_MODAL",
	OpenCardModal = "OPEN_CARD_MODAL",
	HideAllFormsInCardModal = "HIDE_ALL_FORMS_IN_CARD_MODAL",
	ShowFormInCardModal = "SHOW_FORM_IN_CARD_MODAL",
	CreateCard = "CREATE_CARD",
	UpdateCard = "UPDATE_CARD",
	DeleteCard = "DELETE_CARD",
	CreateStoryLane = "CREATE_STORY_LANE",
	DeleteStoryLane = "DELETE_STORY_LANES",
	MoveStoryLane = "MOVE_STORY_LANE",
	AttachStoryLaneToBoard = "ATTACH_STORY_LANE_TO_BOARD",
	DetachStoryLaneFromScrumBoard = "DETACH_STORY_LANE_FROM_SCRUM_BORD",

	AddNewStatusLaneToBoard = "ADD_NEW_STATUSLANE_TO_BOARD",
	DeleteStatusLanes = "DELETE_STATUS_LANES",
	MoveStatusLane = "MOVE_STATUS_LANE",
	DetachStatusLaneFromBoard = "DETACH_STATUS_LANE_FROM_BOARD",

	DeleteCards = "DELETE_CARDS",
}
export default ActionType;
