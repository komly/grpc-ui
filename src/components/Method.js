import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Method.sass';


const UnknownField = (props) => <div className="field">
    <label className="field__label" htmlFor={props.name}>{props.name} = {props.number} (string)</label>
    <input className="field__input" name={props.name} id={props.name} type="text" value={props.val} onChange={props.onChange}/>
</div>;


class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: props.fields.map(f => {
                return {val: ''}
            }),
        };
    }
    handleInvokeMethod(e) {
        e.preventDefault();
        const args = this.props.fields.map((f, i) => {
            return {
                number: f.number,
                val: this.state.fields[i].val,
            };
        });
        this.props.onInvokeMethod(args);
    }

    handleChange(i, val) {
        let fields = this.state.fields.slice();
        fields[i] = {val:val};

        this.setState({
            fields: fields,
        });
        console.log(this.state.fields);
    }
    render() {
        return (
            <div className={`message ${this.props.in ? 'message--in' : ''}`}>
                <form onSubmit={this.handleInvokeMethod.bind(this)}>
                    {this.props.fields.map((f, i) =>
                        <UnknownField  {...f} val={this.state.fields[i].val}
                                       onChange={(e) => this.handleChange(i, e.target.value)}/>
                    )}

                    {this.props.in ? <div className="message__controls">
                        <button type="submit" className="button">Invoke</button>
                    </div> : null }
                </form>
            </div>
        );
    }
}


class Method extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };

    }
    onHeadingClick() {
        this.setState({
            expanded: !this.state.expanded,
        })
    }
    render() {
        return <div className="method">
            <div className="method__heading" onClick={this.onHeadingClick.bind(this)}>
                <h4 className="method__name"> {this.props.name} <i className={this.state.expanded ? '' : 'fa fa-angle-down'}/></h4>
            </div>

            <div className="method__body" style={{display: this.state.expanded ? 'block' : 'none'}}>
                <Message {...this.props.types[this.props.in]} types={this.props.types} in={true} onInvokeMethod={(args) => this.props.onInvokeMethod(args)}/>
                {this.props.result ? <pre>{JSON.stringify(this.props.result)}</pre> : null}
                {this.props.error ? <pre>{JSON.stringify(this.props.error)}</pre> : null}
                <Message {...this.props.types[this.props.out]} types={this.props.types}/>
            </div>
        </div>
    }
}

export default Method;