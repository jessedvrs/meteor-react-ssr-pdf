import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from '/imports/client/App';

Meteor.startup(() => {
    render(
        <App />,
        document.getElementById('app')
    );
});
