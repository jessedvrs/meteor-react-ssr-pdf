import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import sass from 'node-sass';
import phantom from 'phantom';
import path from 'path';
import fs from 'fs';

import SomePDF from '/imports/server/SomePDF';

Meteor.methods({
    'create-pdf': (text) => {

        // Get HTML string for the React element
        const reactContent = <SomePDF content={text} />;
        const html = ReactDOMServer.renderToString(reactContent);

        // Get CSS string for the SCSS code
        const css = sass.renderSync({
            file: Assets.absoluteFilePath('SomePDF.scss')
        }).css.toString();

        // Bring together in HTML template
        const fullHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>SomePDF</title>
                <style>${css}</style>
            </head>
            <body>
                ${html}
            </body>
            </html>
        `;

        // Make up a filename
        const timestamp = new Date().getTime();
        const filename = `illuminati_${timestamp}.pdf`;
        const dest = path.join(process.env.PWD, '.files', filename);

        // Generate a PDF using Phantom (synchronously)
        Meteor.wrapAsync((done) => {
            let sitepage;
            let phInstance;

            phantom.create()
                .then(instance => {
                    phInstance = instance;
                    return instance.createPage();
                })
                .then(page => {
                    sitepage = page;
                    page.property('paperSize', {
                        width: '210mm',
                        height: '297mm',
                        margin: '0mm'
                    });
                    page.property('content', fullHtml);

                    return page.property('onLoadFinished');
                })
                .then(result => {
                    return sitepage.render(dest);
                })
                .then(success => {
                    sitepage.close();
                    phInstance.exit();
                    done(null, {
                        filesize: fs.statSync(dest).size
                    });
                })
                .catch(error => {
                    phInstance.exit();
                    done(error);
                });
        })();

        return filename;
    }
});
