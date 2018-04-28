/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar';
import Loader from '../Loader';
import Error from '../Error';
import Navbar from '../Navbar';
import Service from '../Service';
import * as actions from '../../actions/meta';
// $FlowFixMe
import './invoke.scss';

class InvokePage extends Component<any> {
  componentDidMount() {
    if (this.props.match.params.addr) {
      this.props.fetchMeta(this.props.match.params.addr);
    }
  }
  changeAddr = addr => {
    this.props.history.push(`/${addr}`);
  };
  render() {
    const {
      loading,
      error,
      toggleMethod,
      meta: { packages, types, enums },
      match: { params: { addr } }
    } = this.props;

    return (
      <div>
        <Navbar addr={addr} changeAddr={this.changeAddr} />
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
                    {Object.keys(packages).map(package_name =>
                      packages[package_name].map(service => (
                        <Service
                          service={service}
                          package_name={package_name}
                          types={types}
                          enums={enums}
                          toggleMethod={method_name =>
                            toggleMethod(
                              package_name,
                              service.name,
                              method_name
                            )
                          }
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.meta.loading,
  error: state.meta.error,
  meta: state.meta.meta,
  methods: state.methods
});

export default connect(mapStateToProps, {
  fetchMeta: actions.fetchMeta,
  toggleMethod: actions.toggleMethod
})(InvokePage);
