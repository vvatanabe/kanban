import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
import { BoardRepository } from "../../shared/domain/model";
import BoardRepositoryOnReduxStore from "../../shared/infractructure/persistence/BoardRepositoryOnReduxStore";

const container = new Container();
container.bind(BoardRepository).to(BoardRepositoryOnReduxStore).inSingletonScope();

export const { lazyInject } = getDecorators(container);
