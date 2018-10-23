import React, { Component } from 'react';
import { Message } from './fields';
import { getDefaultValue } from './types';

function fieldsToVal(fields, val, types) {
  return fields.map((f, i) => {
    let exportedVal = val[i];
    switch (f.type_id) {
      case 11:
        const type = types[f.type_name];
        exportedVal = fieldsToVal(type.fields, val[i], types);
    }
    return {
      number: f.number,
      val: exportedVal,
    };
  });
}

export default class Request extends Component {
  constructor(props) {
    super(props);
  }

  handleInvokeMethod = e => {
    e.preventDefault();
    const type = this.getType();

    this.props.onInvokeMethod(fieldsToVal(type.fields, this.state.val, this.props.types));
  };

  h;
}
