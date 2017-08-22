import * as React from "react";
import { Link } from "react-router-dom";

interface Props extends React.Props<{}> {
    title: string;
}

const Header: React.StatelessComponent<Props> = props => (
    <div className="header">
        <h1 className="board-title"><Link to="/" >{props.title}</Link></h1>
    </div>
);

export default Header;
