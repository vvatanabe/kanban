import * as React from 'react';

//import * as ReactDatePicker from 'react-datepicker';
const ReactDatePicker = require('react-datepicker').default
import * as moment from 'moment';
import Reader from './Reader';

export interface CalendarProps extends React.Props<{}> {
    id: string;
    isEdit: boolean;
    selected?: moment.Moment;
    locale?: string;
    dateFormat?: string;
    onChangeValue(id: string, startDate: string);
    onValueClick(id: string);
}

const Calendar: React.StatelessComponent<CalendarProps> = props => {

    const locale = props.locale ? props.locale : 'en_US';
    const dateFormat = props.dateFormat ? props.dateFormat : 'YYYY-MM-DD';
    const handleChange = (date?: moment.Moment) => {
        if (date) {
            props.onChangeValue(props.id, date.format(dateFormat));
        }
    }
    const handleOnBlur = (date?: any) => {
        props.onChangeValue(
            props.id,
            props.selected ? props.selected.format(dateFormat) : null
        );
    }

    return props.isEdit ?
        <ReactDatePicker
            autoFocus
            className="input-text editer"
            isClearable={true}
            placeholderText="Click to select a date"
            todayButton={'Today'}
            locale={locale}
            dateFormat={dateFormat}
            selected={props.selected}
            onChange={handleChange}
            onBlur={handleOnBlur} />
        :
        <Reader
            id={props.id}
            value={props.selected ? props.selected.format(dateFormat) : null}
            onValueClick={props.onValueClick} />
}

export default Calendar;