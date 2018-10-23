import React from 'react';
import { getTypeName, TYPE_MESSAGE } from './types';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledResponse = styled.div`
  padding: '20px';
`;

//TODO: body?
const StyledTitle = styled.h4`
  font-weight: 'body';
  font-size: 20px;
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
`;

const Response = ({ type_name, classes }, { types, enums }) => {
  const type = types[type_name];

  return type ? (
    <StyledResponse>
      <StyledTitle>{type_name}</StyledTitle>

      <table className="message">
        <tbody>
          {type.fields.map(f => (
            <tr className="field" key={f.number}>
              <td className="message__cell message__cell--first">
                <label className="field__label" htmlFor={f.name}>
                  <b>{f.name}</b>
                </label>
              </td>
              <td className="message__cell message__cell--last">
                {f.type_id === TYPE_MESSAGE ? f.type_name : getTypeName(f.type_id)} {f.is_repeated ? '(+)' : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledResponse>
  ) : (
    <div>Unknown type: {type_name}</div>
  );
};

Response.contextTypes = {
  types: PropTypes.shape({}).isRequired,
};

export default Response;
