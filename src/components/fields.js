import React from 'react';
import { TYPE_BOOL, TYPE_ENUM, TYPE_INT32, TYPE_MESSAGE, getTypeName, getDefaultValue } from './types';
import PropTypes from 'prop-types';

export const Field = (props, { types, enums }) => {
  let input = null;

  switch (props.type_id) {
    case TYPE_BOOL:
      input = (
        <input
          className="field__input"
          name={props.name}
          id={props.name}
          type="checkbox"
          checked={props.val === 'true'}
          onChange={e => props.onChange(e.target.checked ? 'true' : 'false')}
        />
      );
      break;
    case TYPE_INT32:
      input = (
        <input
          className="field__input"
          name={props.name}
          id={props.name}
          type="number"
          value={props.val}
          onChange={e => props.onChange(e.target.value)}
        />
      );
      break;
    case TYPE_MESSAGE:
      const type = types[props.type_name];
      if (!type) {
        return <div>?????</div>;
      }
      input = <Message type_name={props.type_name} val={props.val} onChange={props.onChange} />;
      break;
    case TYPE_ENUM:
      const enum_ = enums[props.type_name];
      if (!enum_) {
        return <div>?????</div>;
      }
      input = (
        <select className="field__input" value={props.val} onChange={e => props.onChange(e.target.value)}>
          {Object.keys(enum_.values).map(k => <option value={k}>{enum_.values[k]}</option>)}
        </select>
      );
      break;
    default:
      input = (
        <input
          className="field__input field__input--text"
          name={props.name}
          id={props.name}
          type="text"
          value={props.val}
          onChange={e => props.onChange(e.target.value)}
        />
      );
      break;
  }

  return <div className="field__group">{input}</div>;
};
Field.contextTypes = {
  types: PropTypes.shape({}).isRequired,
  enums: PropTypes.shape({}).isRequired,
};

export const RepeatedField = (props, { enums, types }) => (
  <div className="field__group">
    {props.val.map((v, i) => (
      <Field
        name={props.name}
        number={props.number}
        type_id={props.type_id}
        type_name={props.type_name}
        val={v}
        onChange={val => {
          const newVal = props.val.slice();
          newVal[i] = val;
          props.onChange(newVal);
        }}
      />
    ))}
    <div className="field__controls">
      {props.val.length ? (
        <button
          type="button"
          className="button button--small"
          onClick={() => {
            props.onChange(props.val.slice(0, props.val.length - 1));
          }}
        >
          -
        </button>
      ) : null}
      <button
        type="button"
        className="button button--small"
        onClick={() => {
          props.onChange(props.val.concat([getDefaultValue(props.type_id, false, props.type_name, enums, types)]));
        }}
      >
        +
      </button>
    </div>
  </div>
);
RepeatedField.contextTypes = {
  types: PropTypes.shape({}).isRequired,
  enums: PropTypes.shape({}).isRequired,
};

const getLabel = (type_id, type_name) => {
  if (type_id === TYPE_MESSAGE) {
    const parts = type_name.split('.');
    return parts[parts.length - 1];
  }
  return getTypeName(type_id);
};

export const Message = ({ type_name, name, number, val, onChange }, { types }) => {
  const type = types[type_name];

  return (
    <table className="message">
      {type.fields.map((f, i) => (
        <tr className="field" key={f.number}>
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
                val={val[i]}
                type_id={f.type_id}
                type_name={f.type_name}
                onChange={val => {
                  const newArr = val.slice();
                  newArr[i] = val;
                  onChange(newArr);
                }}
              />
            ) : (
              <Field
                name={f.name}
                number={f.number}
                val={val[i]}
                type_id={f.type_id}
                type_name={f.type_name}
                onChange={val => {
                  const newArr = val.slice();
                  newArr[i] = val;
                  onChange(newArr);
                }}
              />
            )}
          </td>
          <td className="message__cell message__cell--last">
            {getLabel(f.type_id, f.type_name)} {f.is_repeated ? '(+)' : ''}
          </td>
        </tr>
      ))}
    </table>
  );
};

Message.propTypes = {
  type_name: PropTypes.string.isRequired,
};

Message.contextTypes = {
  types: PropTypes.shape({}).isRequired,
};
