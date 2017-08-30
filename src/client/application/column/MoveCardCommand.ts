import { CardId } from "../../../shared/domain/model";

export interface MoveCardCommand {
    src: CardId;
    dist: CardId;
}
