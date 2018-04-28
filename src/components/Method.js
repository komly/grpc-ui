import React from 'react';
import JSONTree from 'react-json-tree';
import Request from './Request';
import Response from './Response';
import './Method.scss';

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
  base0F: '#be643c'
};

const Method = ({
  result,
  loading,
  expanded,
  name,
  input_type_name,
  output_type_name,
  types,
  enums,
  error,
  toggleMethod,
  invokeMethod
}) => (
  <div className={`method ${loading ? 'method--loading' : ''}`}>
    <div className="method__heading" onClick={toggleMethod}>
      <h4 className="method__name">
        {' '}
        {name} <i className={expanded ? '' : 'fa fa-angle-down'} />
      </h4>
    </div>

    <div
      className="method__body"
      style={{ display: expanded ? 'block' : 'none' }}
    >
      <Request
        type_name={input_type_name}
        types={types}
        enums={enums}
        onInvokeMethod={invokeMethod}
      />
      {error && <div className="method__error">{error}</div>}
      {result && (
        <div className="method__result">
          <JSONTree data={result} theme={theme} />
        </div>
      )}

      <Response type_name={output_type_name} types={types} enums={enums} />
    </div>
  </div>
);

export default Method;
