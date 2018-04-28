import React, {Component} from 'react';


export default class Navbar extends Component<{ onSubmit(string): void }, { addr: string }> {
    constructor(props) {
        super(props);
        this.state = {
            addr: props.addr || '',
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.addr);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render() {
        return (
            <div className="navbar">
                <div className="navbar__container">
                    <a href="/" className="logo navbar__logo"/>
                    <form className="host-form navbar__host-form" action="" method="POST" onSubmit={this.handleSubmit.bind(this)}>
                        <input onChange={this.handleChange.bind(this)} value={this.state.addr} className="host-form__input" type="text" name="addr" placeholder="Target grpc host address" />
                        <button className="button" type="submit">Connect</button>
                    </form>
                </div>
            </div>
        );
    }
}
