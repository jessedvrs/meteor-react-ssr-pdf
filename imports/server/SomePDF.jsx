import React, { Component } from 'react';
import fs from 'fs';

const illuminatiPath = Assets.absoluteFilePath('img/illuminati.jpg');
const illuminatiFile = fs.readFileSync(illuminatiPath);
const illuminatiBase64 = new Buffer(illuminatiFile).toString('base64');

export default class SomePDF extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.content}</h1>
                <p>Illuminati Confirmed</p>
                <img src={`data:image/jpeg;base64,${illuminatiBase64}`} />
            </div>
        );
    }
};
