import React, { Component } from 'react';
import IndexPage from './IndexPage';
import axios from 'axios';
import api from '../../api';
import PropTypes from 'prop-types';

class AppWrapper extends Component {
  state = {
    loading: false,
    error: null,
    addr: '',
    packages: [],
    types: {},
    enums: {},
  };

  getChildContext() {
    return {
      types: this.state.types,
      enums: this.state.enums,
    };
  }
  static childContextTypes = {
    types: PropTypes.shape({}).isRequired,
    enums: PropTypes.shape({}).isRequired,
  };

  setAddr = addr => {
    this.setState({ addr });
  };

  invoke = (package_name, service_name, method_name) => async args => {
    this.setState({
      error: null,
      result: null,
      loading: true,
    });
    try {
      const result = await api.invokeMethod({
        package_name,
        service_name,
        method_name,
        addr: this.state.addr,
        grpc_args: args,
      });
      this.setState({ result });
    } catch (e) {
      this.setState({ error: e.message });
    } finally {
      this.setState({ lodading: false });
    }
  };

  onConnect = async () => {
    this.setState({
      loading: true,
    });
    try {
      const { packages, types, enums } = await api.getInfo(this.state.addr);
      this.setState({ packages, types, enums, error: null, loading: false });
    } catch (e) {
      this.setState({
        loading: false,
        error: e.message,
      });
    }
  };
  render() {
    const { packages, error, loading, addr } = this.state;
    const { onConnect, setAddr, invoke } = this;
    return <IndexPage {...{ packages, error, loading, onConnect, addr, setAddr, invoke }} />;
  }
}

export default AppWrapper;
