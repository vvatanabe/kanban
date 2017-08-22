import * as moment from "moment";
import * as React from "react";
import { default as ReactDatePicker } from "react-datepicker";
import Reader from "./Reader";

interface Props extends React.Props<{}> {
    isOpen: boolean;
    selected?: moment.Moment;
    locale?: string;
    dateFormat?: string;
    onChangeValue(startDate: string);
    onValueClick();
}

const Calendar: React.StatelessComponent<Props> = props => {

    const locale = props.locale ? props.locale : "en_US";
    const dateFormat = props.dateFormat ? props.dateFormat : "YYYY-MM-DD";

    const handleChange = (date?: moment.Moment) => {
        if (date) {
            props.onChangeValue(date.format(dateFormat));
        }
    };

    const handleOnBlur = (date?: any) => {
        props.onChangeValue(props.selected ? props.selected.format(dateFormat) : null);
    };

    return props.isOpen ?
        <ReactDatePicker
            autoFocus
            className="input-text editer"
            isClearable={true}
            placeholderText="Click to select a date"
            todayButton={"Today"}
            locale={locale}
            dateFormat={dateFormat}
            selected={props.selected}
            onChange={handleChange}
            onBlur={handleOnBlur} />
        :
        <Reader
            value={props.selected ? props.selected.format(dateFormat) : null}
            onValueClick={props.onValueClick} />;
};

export default Calendar;
