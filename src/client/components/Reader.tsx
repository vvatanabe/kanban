import * as React from 'react';

interface ReaderProps extends React.Props<{}> {
    id: string;
    value: string;
    onValueClick(id: string);
}

const Reader: React.StatelessComponent<ReaderProps> = (props) => (
    <span onClick={() => props.onValueClick(props.id)}>
        <input
            disabled
            type="text"
            className="input-text reader"
            defaultValue={props.value} />
    </span>
)

export default Reader;
