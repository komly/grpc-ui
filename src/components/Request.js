/* @flow */
import React, { Component } from 'react';
import Message from './Message';
import { getDefaultValue, Field, Type } from './types';

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

interface RequestProps {
  types: any;
  enums: any;
  type_name: string;
  onInvokeMethod(any): void;
}

interface RequestState {
  val: any;
}

export default class Request extends Component<RequestProps, RequestState> {
  constructor(props: RequestProps) {
    super(props);

    const type: Type = props.types[props.type_name];
    const initialState: RequestState = {
      val: {},
    };

    this.state = !type
      ? initialState
      : {
          val: type.fields.map(f =>
            getDefaultValue(
              f.type_id,
              f.is_repeated,
              f.type_name,
              props.enums,
              props.types,
            ),
          ),
        };
  }

  handleInvokeMethod(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const type = this.props.types[this.props.type_name];

    this.props.onInvokeMethod(
      fieldsToVal(type.fields, this.state.val, this.props.types),
    );
  }

  handleChange(val: any) {
    console.log(val);
    this.setState({
      val,
    });
  }

  render() {
    const type = this.props.types[this.props.type_name];
    return type ? (
      <div className="form">
        <h4 className="form__title">{this.props.type_name}</h4>
        <form onSubmit={this.handleInvokeMethod.bind(this)}>
          <Message
            type={type}
            val={this.state.val}
            onChange={this.handleChange.bind(this)}
            types={this.props.types}
            enums={this.props.enums}
          />
          <div className="form__controls">
            <button type="submit" className="button">
              Invoke
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div>Unknown type: {this.props.type_name}</div>
    );
  }
}
