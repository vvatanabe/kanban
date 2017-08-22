import * as React from "react";
import * as Select from "react-select";

interface Props extends React.Props<{}> {
    id: string;
    isEdit: boolean;
    placeholder: string;
    defaultOption?: Select.Option;
    options: Select.Option[];
    onChange(id: string, option: Select.Option);
    onValueClick(id: string);
}

const Selector: React.StatelessComponent<Props> = props => {

    const handleOnChange = (option: Select.Option) => {
        if (!props.defaultOption || option.value !== props.defaultOption.value) {
            props.onChange(props.id, option);
        }
    };

    const handleOnBlur = (e: React.FocusEvent<any>) => {
        const select = e.target as HTMLOptionElement;
        if (select.selected && !props.defaultOption || select.value !== props.defaultOption.value) {
            props.onChange(props.id, {
                label: select.label,
                value: select.value,
            });
        } else {
            props.onChange(props.id, {
                label: props.defaultOption.label,
                value: props.defaultOption.value,
            });
        }
    }

    const placeholder = <span>{props.placeholder}</span>;

    return (props.isEdit ?
        <Select
            name="form-field-name"
            placeholder={placeholder}
            value={props.defaultOption ? props.defaultOption.value : null}
            options={props.options}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
        />
        :
        <span onClick={() => props.onValueClick(props.id)}>
            {props.defaultOption ? props.defaultOption.label : "none"}
        </span>
    );
};

export default Selector;
