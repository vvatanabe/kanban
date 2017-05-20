import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import Bord from '../containers/Bord';
import Editer from './Editer';
import * as models from '../../shared/models';

export interface HomeStateProps {
    bords?: models.Bord[];
}

export interface HomeDispatchProps {
    addBord?();
    deleteBord?(bordId: string);
    openBordNameEditer?(bordId: string);
    updateBordName?(bordId: string, bordName: string);
}

export interface HomeProps extends RouteComponentProps<{}> {
    onReset();
}

const Home: React.StatelessComponent<HomeProps & HomeStateProps & HomeDispatchProps> = props => (
    <div>
        <h3>
            <span className="bord-title">Bords</span>
            <button
                className="add-list-button"
                onClick={props.addBord}
                >
                Add Bord
            </button>
            <button
                className="reset-list-button"
                onClick={props.onReset}
                >
                Reset
            </button>
        </h3>
        <div className="bord-tile-list">
        {props.bords.map(bord => (
            <div key={bord.id} className="bord-tile" onClick={() => props.history.push(`/bord/${bord.id}`)}>
                <div className="bord-tile__header" onClick={e => e.stopPropagation()}>
                    <div className="bord-tile__header__title">
                        <Editer
                            id={bord.id}
                            value={bord.name}
                            onValueClick={props.openBordNameEditer}
                            onEdit={props.updateBordName}
                            editing={bord.editing}
                            />
                    </div>
                    <div className="bord-tile__header__button">
                        <button
                            className="delete-bord-button"
                            onClick={() => props.deleteBord(bord.id)}
                            >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        ))}
        </div>
    </div>
);

export default Home;