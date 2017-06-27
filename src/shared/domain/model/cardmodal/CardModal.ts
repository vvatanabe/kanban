import { CardId } from "./CardId";
import { Form } from "./Form";

// {
//     readonly cardId: CardId,
//         editable: { 
//         readonly summary: Form < string >,
//             readonly description: Form < string >,
//                 readonly assignee: Form < string >,
//                     readonly startDate: Form < string >,
//                         readonly dueDate: Form < string >,
//                             readonly estimatedHours: Form < number >,
//                                 readonly actualHours: Form < number >,
//                                     readonly point: Form < number >,
//     }
// }


export default class CardModal {

    constructor(
        readonly cardId: CardId,
        readonly summary: Form<string>,
        readonly description: Form<string>,
        readonly assignee: Form<string>,
        readonly startDate: Form<string>,
        readonly dueDate: Form<string>,
        readonly estimatedHours: Form<number>,
        readonly actualHours: Form<number>,
        readonly point: Form<number>,
    ) { }

    public copy(params: {
        cardId?: CardId;
        summary?: Form<string>;
        description?: Form<string>;
        assignee?: Form<string>;
        startDate?: Form<string>;
        dueDate?: Form<string>;
        estimatedHours?: Form<number>;
        actualHours?: Form<number>;
        point?: Form<number>;
    }): CardModal {
        return Object.assign({}, this, params);
    }
}
