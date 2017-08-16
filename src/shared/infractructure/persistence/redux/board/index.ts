import { List } from "immutable";
import Board from "../../../../domain/model/board/Board";
import BoardId from "../../../../domain/model/board/BoardId";
import BoardType from "../../../../domain/model/board/BoardType";
import Action from "../Action";
import { createReducer } from "../createReducer";

export enum BoardActionType {
    AddBoard = "ADD_BOARD",
    UpdateBoard = "UPDATE_BOARD",
    DeleteBoard = "DELETE_BOARD",
}

interface AddBoardAction extends Action<Board> { }

interface UpdateBoardAction extends Action<Board> { }

interface DeleteBoardAction extends Action<BoardId> { }

export class BoardActionCreator {
    public static add = (board: Board): AddBoardAction => ({
        type: BoardActionType.AddBoard,
        payload: board,
    })

    public static update = (board: Board): UpdateBoardAction => ({
        type: BoardActionType.UpdateBoard,
        payload: board,
    })

    public static delete = (id: BoardId): DeleteBoardAction => ({
        type: BoardActionType.DeleteBoard,
        payload: id,
    })
}

class BoardReducer {
    public static add(boards: List<Board>, action: AddBoardAction): List<Board> {
        return boards.push(action.payload);
    }

    public static update(boards: List<Board>, action: UpdateBoardAction): List<Board> {
        const index = boards.findIndex(board => board.equals(action.payload));
        return boards.set(index, action.payload);
    }

    public static delete(boards: List<Board>, action: DeleteBoardAction): List<Board> {
        const index = boards.findIndex(board => board.id.equals(action.payload.id));
        return boards.delete(index);
    }
}

const boardReducer = createReducer<List<Board>>(List.of(), {
    [BoardActionType.AddBoard]: BoardReducer.add,
    [BoardActionType.UpdateBoard]: BoardReducer.update,
    [BoardActionType.DeleteBoard]: BoardReducer.delete,

    // [ActionType.AttachToBord]: BoardReducer.attachCoulmn,
    // [ActionType.DetachFromBord]: BoardReducer.detachCoulmn,
    // [ActionType.ShowBordNameEditer]: updateBord,
    // [ActionType.UpdateBordName]: updateBord,
    // [ActionType.MoveList]: moveList,
    // [ActionType.ShowModal]: updateModal,
    // [ActionType.HideModal]: updateModal,
    // [ActionType.ShowModalForm]: updateModalForm,
    // [ActionType.HideAllFormsInCardModal]: hideAllForms
});

export default boardReducer;

const deleteStatusLane = (boards: List<Board>, action: Action<[StatusLaneId]>): List<Board> => {
    boards.filter(board => !statusLane.id.equals(action.payload)).toList()
};

const createBoard = (boards: List<Board>, action: Action<Board>): List<Board> => (
    boards.push(action.payload).toList()
)

const deleteBoard = (boards: List<Board>, action: Action<BoardId>): List<Board> => (
    boards.filter(board => !board.id.equals(action.payload)).toList()
);

const updateBoard = (boards: List<Board>, action: Action<Board>): List<Board> => (
    boards.map(board => (
        board.equals(action.payload) ? board.copy(action.payload) : board)
    ).toList()
)

const attachStoryLaneToBoard = (boards: List<Board>, action: Action<[BoardId, StoryLaneId]>): List<Board> => {
    const boardId = action.payload[0];
    const laneId = action.payload[1];

    return boards.map(board => {
        if (board.storyLaneIds.find(id => id.equals(laneId))) {
            // アタッチするレーンを元のボードから排除する
            const storyLaneIds = board.storyLaneIds.filter(id => !id.equals(laneId)).toList();
            return board.copy({ storyLaneIds });
        }
        if (board.id.equals(boardId)) {
            // アタッチするレーンを指定のボードへ移動する
            const storyLaneIds = board.storyLaneIds.push(laneId);
            return board.copy({ storyLaneIds });
        }
        return board;
    }).toList();
}

// export function detachCoulmn(boards: List<Board>, action: Action<[BoardId, CoulmnId]>): List<Board> {
//     const boardId = action.payload[0];
//     const laneId = action.payload[1];
//     const entry = boards.findEntry(board => board.id.equals(boardId));
//     const boardIndex = entry[0];
//     const board = entry[1];
//     const storyLaneIds = board.storyLaneIds.filter(id => !id.equals(laneId)).toList();
//     return boards.set(boardIndex, board.copy({ storyLaneIds }));
// }

// TODO リファクタ
const moveStoryLane = (state: Bord[], action: Action<ListMovePosition>): Bord[] => {
    var { bordId, sourceListId, targetListId } = action.payload;

    const bord = state.filter(bord => bord.id === bordId)[0];

    sourceListId = bord.listIds.filter(listId => listId === sourceListId)[0];

    const sourceListIdIndex = bord.listIds.reduce((result, listId, index) => {
        if (listId === sourceListId) {
            result = index;
        }
        return result;
    }, -1);
    const targetListIdIndex = bord.listIds.reduce((result, listId, index) => {
        if (listId === targetListId) {
            result = index;
        }
        return result;
    }, -1);
    const updatedBord = update(bord, {
        listIds: {
            $splice: [
                [sourceListIdIndex, 1], // 対象を <元の位置> から <削除>
                [targetListIdIndex, 0, sourceListId] // 対象を <移動先の位置> へ <追加>
            ],
        }
    });
    return state.map(bord => {
        if (bord.id === bordId) {
            return updatedBord;
        }
        return bord;
    });
}

function updateModal(state: Bord[], action: Action<EditCardModalOnBord>): Bord[] {
    return state.map(bord => {
        if (bord.id === action.payload.bordId) {
            return Object.assign({}, bord, {
                cardModal: action.payload
            });
        }
        return bord;
    });
}

function updateModalForm(state: Bord[], action: Action<EditCardModalOnBord>): Bord[] {
    return state.map(bord => {
        if (bord.id === action.payload.bordId) {
            return Object.assign({}, bord, {
                cardModal: {
                    cardId: action.payload.cardId,
                    isOpen: action.payload.isOpen,
                    editableForm: action.payload.editableForm
                }
            });
        }
        return bord;
    });
}
