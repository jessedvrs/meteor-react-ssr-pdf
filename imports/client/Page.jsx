import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

export default class Page extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        Meteor.call('create-pdf', event.target.elements.text.value, (err, filename) => {
            if (filename) {
                location.href = Meteor.absoluteUrl(`pdf/${filename}`);
            }
        });

        event.target.reset();
    }

    render() {
        return (
            <div className='demo--page'>
                <h1>Cool PDF Machine</h1>
                <div className='demo--single-input-form'>
                    <form onSubmit={this.onSubmit}>
                        <TextField name='text' className='input' />
                        <RaisedButton label='Download PDF' primary={true} className='button' type='submit' />
                    </form>
                </div>
            </div>
        );
    }
};
