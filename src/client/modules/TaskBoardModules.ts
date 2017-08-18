import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
import { BoardRepository, CardRepository } from "../../shared/domain/model";
import BoardRepositoryOnReduxStore from "../../shared/infractructure/persistence/BoardRepositoryOnReduxStore";
import CardRepositoryOnReduxStore from "../../shared/infractructure/persistence/CardRepositoryOnReduxStore";

const container = new Container();
container.bind(BoardRepository).to(BoardRepositoryOnReduxStore).inSingletonScope();
container.bind(CardRepository).to(CardRepositoryOnReduxStore).inSingletonScope();

export const { lazyInject } = getDecorators(container);
