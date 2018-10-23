import React, { Component } from 'react';
import './Method.scss';
import api from '../../api';
import JSONTree from 'react-json-tree';
import Response from '../Response';
import { Message } from '../fields';
import PropTypes from 'prop-types';

const theme = {
  scheme: 'bright',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#04acb4',
  base0E: '#d381c3',
  base0F: '#be643c',
};

const Request = ({ type_name, val, onChange, invokeMethod }, { types }) => {
  const type = types[type_name];
  return type ? (
    <div className="form">
      <h4 className="form__title">{type_name}</h4>
      <form
        onSubmit={() => {
          e.preventDefault();
          invokeMethod();
        }}
      >
        <Message type_name={type_name} val={val} onChange={onChange} />
        <div className="form__controls">
          <button type="submit" className="button">
            Invoke
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div>Unknown type: {type_name}</div>
  );
};

Request.contextTypes = {
  types: PropTypes.shape({}).isRequired,
};

const Method = ({ loading, name, in_, out, invokeMethod, expanded, toggleExpanded, val, onChange, result, error }) => (
  <div className={`method ${loading ? 'method--loading' : ''}`}>
    <div className="method__heading" onClick={() => toggleExpanded()}>
      <h4 className="method__name">
        {' ' + name} <i className={expanded ? '' : 'fa fa-angle-down'} />
      </h4>
    </div>

    <div className="method__body" style={{ display: expanded ? 'block' : 'none' }}>
      <Request type_name={in_} {...{ val, onChange, invokeMethod }} />
      {error && <div className="method__error">{error}</div>}
      {result && (
        <div className="method__result">
          <JSONTree data={result} theme={theme} />
        </div>
      )}
      <Response type_name={out} />
    </div>
  </div>
);

export default Method;
