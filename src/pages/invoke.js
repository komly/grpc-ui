/* @flow */
import React, {Component} from 'react';
import Sidebar from '../components/Sidebar';
import Method from '../components/Method';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Navbar from '../components/Navbar';

// $FlowFixMe
import './index.scss';
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
            addr: '',
            packages: [],
            types: {},
            enums: {},
        }
    }
    componentDidMount() {
        this.loadData();
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
        this.props.history.push('/invoke/' + host);
    }
    render() {
        return (
            <div>
                <Navbar onSubmit={this.handleNavbarSubmit.bind(this)}/>
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


