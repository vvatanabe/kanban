import * as Redux from 'redux';
import { connect } from 'react-redux';
import { default as Home, HomeProps, HomeStateProps, HomeDispatchProps } from '../components/Home';
import Action from '../../shared/actions/action';
import * as bordsActions from '../../shared/actions/bords';
import { AppState } from '../../shared/models';

const mapStateToProps = (state: AppState, ownProps: HomeProps): HomeStateProps => {
  return {
    bords: state.bords
  } as HomeStateProps;
};

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<Action<T>>, ownProps: HomeProps): HomeDispatchProps => ({
    addBord: () => {
        dispatch(bordsActions.addBord());
    },
    deleteBord: (bordId: string) => {
      dispatch(bordsActions.deleteBord(bordId));
    },
    openBordNameEditer: (bordId: string) => {
      dispatch(bordsActions.openBordNameEditer(bordId));
    },
    updateBordName: (bordId: string, bordName: string) => {
      dispatch(bordsActions.updateBordName(bordId, bordName));
    }
});

export default connect<HomeStateProps, HomeDispatchProps, HomeProps>(
    mapStateToProps,
    mapDispatchToProps
)(Home);
