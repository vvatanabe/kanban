import * as React from "react";
import Reader from "./Reader";
import Writer from "./Writer";

interface Props extends React.Props<{}> {
    value: string;
    editing: boolean;
    onEdit(value: string);
    onValueClick();
}

const Editer: React.StatelessComponent<Props> = props => (
    props.editing ?
        <Writer
            value={props.value}
            onEdit={props.onEdit} />
        :
        <Reader
            value={props.value}
            onValueClick={props.onValueClick} />
);

export default Editer;
