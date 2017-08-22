import * as React from "react";

interface Props extends React.Props<{}> {
    value: string;
    onEdit(value: string);
}

const Writer: React.StatelessComponent<Props> = props => {

    const handleBeginEdit = (e: React.FocusEvent<any>) => {
        const input = e.target as HTMLInputElement;
        // TODO Below is also possible.
        // input.selectionEnd = input.value.length;
        const temp = input.value;
        input.value = "";
        input.value = temp;
    };

    const handleKeyPress = (e: React.KeyboardEvent<any>) => {
        const input = e.target as HTMLInputElement;
        if (e.key === "Enter" && props.onEdit && input.value.trim().length) {
            props.onEdit(input.value);
        }
    };

    const handleEndEdit = (e: React.FocusEvent<any>) => {
        const input = e.target as HTMLInputElement;
        if (props.onEdit && input.value.trim().length) {
            props.onEdit(input.value);
        }
    };

    return (
        <input
            type="text"
            className="input-text editer"
            defaultValue={props.value}
            onBlur={handleEndEdit}
            onFocus={handleBeginEdit}
            onKeyPress={handleKeyPress}
            autoFocus
        />
    );

};

export default Writer;
