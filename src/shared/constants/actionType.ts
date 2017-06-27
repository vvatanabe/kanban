enum ActionType {
		CreateList,
		UpdateList,
		DeleteList,
		AttachToList,
		DetachFromList,
		MoveList,

		CreateStoryLane,
		UpdateStoryLane,
		DeleteStoryLane,
		AttachCardToStoryLane,
		DetachCardFromStoryLane,
		MoveStoryLane,

		CreateCard,
		EditCard,
		UpdateCard,
		DeleteCard,
		MoveCard,

		ShowModal,
		HideModal,
		ShowModalForm,
		HideModalForm,
		
		AddUser,
		DeleteUser,
		
		AddBord,
		DeleteBord,
		
		AttachToBord,
		DetachFromBord,
		
		OpenBordNameEditer,
		UpdateBordName,
}
export default ActionType;
