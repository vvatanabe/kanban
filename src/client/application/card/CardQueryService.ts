import { Card, CardId } from "../../../shared/domain/model";
import { getState } from "../../../shared/infractructure/persistence/redux/ReduxStore";

class CardQueryService {

    public viewCard(cardId: CardId): Card {
        return getState().cards.find(card => card.id.equals(cardId));
    }

}

export const cardQueryService = new CardQueryService();
