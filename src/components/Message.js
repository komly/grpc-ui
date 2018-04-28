import React from 'react';
import { Field, RepeatedField } from './fields';
import { getLabel } from './types';

const Message = props => (
  <table className="message">
    <tbody>
      {props.type.fields.map((f, i) => (
        <tr className="field" key={i}>
          <td className="message__cell message__cell--first">
            <label className="field__label" htmlFor={f.name}>
              <b>{f.name}</b>
            </label>
          </td>
          <td className="message__cell">
            {f.is_repeated ? (
              <RepeatedField
                name={f.name}
                number={f.number}
                val={props.val[i]}
                type_id={f.type_id}
                type_name={f.type_name}
                types={props.types}
                enums={props.enums}
                onChange={val => {
                  const newArr = props.val.slice();
                  newArr[i] = val;
                  props.onChange(newArr);
                }}
              />
            ) : (
              <Field
                name={f.name}
                number={f.number}
                val={props.val[i]}
                type_id={f.type_id}
                type_name={f.type_name}
                types={props.types}
                enums={props.enums}
                onChange={val => {
                  const newArr = props.val.slice();
                  newArr[i] = val;
                  props.onChange(newArr);
                }}
              />
            )}
          </td>
          <td className="message__cell message__cell--last">
            {getLabel(f.type_id, f.type_name)} {f.is_repeated ? '(+)' : ''}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default Message;
