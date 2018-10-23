import React, { Component } from 'react';
import { compose, withState, withHandlers } from 'recompose';
import Method from './Method';
import PropTypes from 'prop-types';

export default class EnhancedMethod extends Component {
  static contextTypes = {
    types: PropTypes.shape({}).isRequired,
    enums: PropTypes.shape({}).isRequired,
  };
  constructor(props, context) {
    super(props, context);

    const type = this.getType();
    const val = type ? type.fields.map(f => getDefaultValue(f.type_id, f.is_repeated, f.type_name, props.enums, props.types)) : {};
    this.state = {
      result: null,
      error: null,
      loading: false,
      expanded: false,
      val,
    };
  }
  toggleExpanded = () => {
    this.setState(state => ({
      expanded: !state.expanded,
    }));
  };

  async invokeMethod(args) {
    this.setState({
      error: null,
      result: null,
      loading: true,
    });
    try {
      const result = await this.props.invokeMethod(args);
      this.setState({ result });
    } catch (e) {
      this.setState({ error: e.message });
    } finally {
      this.setState({ lodading: false });
    }
  }

  getType() {
    const { types } = this.context;
    const { type_name } = this.props;
    return types[type_name];
  }
  render() {
    const { val, loading, result, error, expanded } = this.state;
    const { toggleExpanded, invokeMethod } = this;

    return <Method {...this.props} {...{ loading, result, error, expanded, toggleExpanded, invokeMethod, val }} />;
  }
}
