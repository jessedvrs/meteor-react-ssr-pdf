import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Page from './Page';

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Page />
            </MuiThemeProvider>
        );
    }
};
