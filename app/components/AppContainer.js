import React, { Component } from 'react';
import Nav from "./Nav";

export default class App extends Component {

    render() {
        return (
            <div>
                <h1>AppContainer</h1>
                <Nav />
                {this.props.children}
            </div>
        );
    }
}