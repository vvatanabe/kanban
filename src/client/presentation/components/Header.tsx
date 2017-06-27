import * as React from 'react';
import { Link } from 'react-router-dom';

export interface HeaderProps extends React.Props<{}> {
    title: string;
}

const Header: React.StatelessComponent<HeaderProps> = (props) => (
    <div className="header">
        <h1 className="bord-title"><Link to='/' >{props.title}</Link></h1>
    </div>
);

export default Header;
