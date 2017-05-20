import * as React from 'react';

interface WriterProps extends React.Props<{}> {
    id: string;
    value: string;
    onEdit(id: string, value: string);
}

const Writer: React.StatelessComponent<WriterProps> = props => {

    const handleBeginEdit = (e: React.FocusEvent<any>) => {
        const input = e.target as HTMLInputElement;
        // TODO Below is also possible.
        // input.selectionEnd = input.value.length;
        const temp_value = input.value
        input.value = ''
        input.value = temp_value
    }

    const handleKeyPress = (e: React.KeyboardEvent<any>) => {
        const input = e.target as HTMLInputElement;
        if (e.key === 'Enter' && props.onEdit && input.value.trim().length) {
            props.onEdit(props.id, input.value);
        }
    }

    const handleEndEdit = (e: React.FocusEvent<any>) => {
        const input = e.target as HTMLInputElement;
        if (props.onEdit && input.value.trim().length) {
            props.onEdit(props.id, input.value);
        }
    }

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
    )

}

export default Writer;
