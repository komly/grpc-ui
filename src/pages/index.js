/* @flow */
import React, {Component} from 'react';



export default class IndexPage extends Component<{}, { addr: string }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            addr: '',
            name: '',
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push('/invoke/' + this.state.addr);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value, 
        });

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input onChange={this.handleChange.bind(this)} type="text" name="addr" id="addr"/>
                <button type="submit">Connect</button>
            </form>
        );
    }
}
