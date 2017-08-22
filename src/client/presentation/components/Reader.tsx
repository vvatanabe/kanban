import * as React from "react";

interface Props extends React.Props<{}> {
    value: string;
    onValueClick();
}

const Reader: React.StatelessComponent<Props> = props => (
    <span onClick={props.onValueClick}>
        <input
            disabled
            type="text"
            className="input-text reader"
            defaultValue={props.value} />
    </span>
)

export default Reader;
