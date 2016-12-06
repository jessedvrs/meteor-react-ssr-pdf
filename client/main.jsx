import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Page />
            </MuiThemeProvider>
        );
    }
};

class Page extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        Meteor.call('create-pdf', event.target.elements.text.value, (err, filename) => {
            location.href = Meteor.absoluteUrl(`pdf/${filename}`);
        });

        event.target.reset();
    }

    render() {
        return (
            <div className='demo--page'>
                <h1>React PDF machine</h1>
                <div className='demo--single-input-form'>
                    <form onSubmit={this.onSubmit}>
                        <TextField name='text' floatingLabelText='Insert some text' className='input' />
                        <RaisedButton label='Download PDF' primary={true} className='button' type='submit' />
                    </form>
                </div>
            </div>
        );
    }
};

Meteor.startup(() => {
    render(
        <App />,
        document.getElementById('app')
    );
});