import * as Redux from 'redux';
import { connect } from 'react-redux';
import { default as Card, CardProps, CardStateProps, CardDispatchProps } from '../components/Card';
import Action from '../../shared/actions/action';
import * as listsActions from '../../shared/actions/lists';
import * as cardsActions from '../../shared/actions/cards';
import * as models from '../../shared/models';
import { Item } from '../../shared/constants/itemType';

const mapStateToProps = (state: models.AppState, ownProps: CardProps): CardStateProps => {
    const ownCard = state.cards.filter(card => card.id == ownProps.id)[0];
    return {
        card: ownCard
    } as CardStateProps;
};

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<Action<T>>): CardDispatchProps => ({

});

export default connect<CardStateProps, CardDispatchProps, CardProps>(
    mapStateToProps,
    mapDispatchToProps
)(Card);
