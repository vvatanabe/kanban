import * as React from 'react';
import Writer from './Writer';
import Reader from './Reader';

interface EditerProps extends React.Props<{}> {
    id: string;
    value: string;
    editing: boolean;
    onEdit(id: string, value: string);
    onValueClick(id: string);
}

const Editer: React.StatelessComponent<EditerProps> = props => (
    props.editing ?
          <Writer
              id={props.id}
              value={props.value}
              onEdit={props.onEdit} />
          :
          <Reader
              id={props.id}
              value={props.value}
              onValueClick={props.onValueClick} />
)

export default Editer;
