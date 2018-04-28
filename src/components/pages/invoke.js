/* @flow */
import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Loader from '../Loader';
import Error from '../Error';
import Navbar from '../Navbar';
import Service from '../Service';

// $FlowFixMe
import './invoke.scss';
import axios from 'axios';
import qs from 'qs';

interface InvokePageState {
  types: any;
  addr: string;
  packages: any;
  enums: any;
  loading: boolean;
  error: ?string;
}

const InvokePageContent = ({
  addr,
  onSubmit,
  loading,
  error,
  packages,
  types,
  enums,
}) => (
  <div>
    <Navbar addr={addr} onSubmit={onSubmit} />
    <div className="app">
      <div className="app__container">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error>{error}</Error>
        ) : (
          <div>
            <div className="app__sidebar">
              <Sidebar packages={packages} />
            </div>
            <div className="app__packages-list">
              <div className="packages-list">
                {Object.keys(packages).map(package_name => {
                  return packages[package_name].map(service => {
                    return (
                      <Service
                        service={service}
                        package_name={package_name}
                        addr={addr}
                        types={types}
                        enums={enums}
                      />
                    );
                  });
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default class InvokePage extends Component<{}, InvokePageState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      loading: false,
      error: undefined,
      packages: [],
      types: {},
      enums: {},
    };
  }
  componentDidMount() {
    if (this.props.match.params.addr) {
      this.loadData();
    }
  }
  loadData() {
    this.setState({
      loading: true,
    });
    axios
      .get('/api/info?' + qs.stringify({ addr: this.props.match.params.addr }))
      .then(({ data: { data: { packages, types, enums } } }) => {
        this.setState({
          packages,
          types,
          enums,
          error: null,
          loading: false,
        });
      })
      .catch(({ response: { data: { error } } }) => {
        this.setState({
          loading: false,
          error: error,
        });
      });
  }
  handleNavbarSubmit = host => {
    this.props.history.push('/' + host);
  };
  render() {
    return (
      <InvokePageContent
        addr={this.props.match.params.addr}
        onSubmit={this.handleNavbarSubmit}
        loading={this.state.loading}
        error={this.state.error}
        packages={this.state.packages}
        types={this.state.types}
        enums={this.state.enums}
      />
    );
  }
}
