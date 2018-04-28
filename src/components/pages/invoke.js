/* @flow */
import React, {Component} from 'react';
import Sidebar from '../Sidebar';
import Method from '../Method';
import Loader from '../Loader';
import Error from '../Error';
import Navbar from '../Navbar';

// $FlowFixMe
import './invoke.scss';
import axios from 'axios';
import qs from 'qs';


interface InvokePageProps {

}

interface InvokePageState {
    types: any;
    addr: string;
    packages: any;
    enums: any;
    loading: bool;
    error: ?string;
}



export default class InvokePage extends Component<InvokePageProps, InvokePageState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            loading: false,
            error: undefined,
            packages: [],
            types: {},
            enums: {},
        }
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
        axios.get('/api/info?' + qs.stringify({addr: this.props.match.params.addr}))
            .then(({data: {data: {packages, types, enums}}}) => {
                this.setState({
                    packages, types, enums,
                    error: null,
                    loading: false,
                })
            })
            .catch(({response: {data: {error}}}) => {
                this.setState({
                    loading: false,
                    error: error,
                });
            });
    }
    handleNavbarSubmit(host) {
        this.props.history.push('/' + host);
    }
    render() {
        return (
            <div>
                <Navbar addr={this.props.match.params.addr} onSubmit={this.handleNavbarSubmit.bind(this)}/>
                <div className="app">
                    <div className="app__container">
                        {this.state.loading ?
                            <Loader />:
                                this.state.error ? <Error error={this.state.error} /> :
                                <div>
                                    <div className="app__sidebar">
                                        <Sidebar packages={this.state.packages}/>
                                    </div>
                                    <div className="app__packages-list">
                                        <div className="packages-list">
                                            {Object.keys(this.state.packages).map(package_name => {
                                                return this.state.packages[package_name].map((service) => {
                                                    return <div className="package">
                                                        <h3 className="package__title">{package_name + ' / ' + service.name}</h3>
                                                        {service.methods.map((method) =>
                                                            <Method key={method.name}
                                                                    {...method}
                                                                    addr={this.state.addr}
                                                                    service_name={service.name}
                                                                    package_name={package_name}
                                                                    types={this.state.types}
                                                                    enums={this.state.enums}
                                                            />
                                                        )}
                                                    </div>

                                                });
                                            })}
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>

            </div>
        );
    }
}
