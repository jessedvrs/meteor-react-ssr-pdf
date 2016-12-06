import fs from 'fs';
import path from 'path';

// Expose an endpoint to obtain a file by filename
Picker.route('/pdf/:filename', (params, req, res, next) => {
    const { filename } = params;

    // Set headers
    res.statusCode = 200;
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/pdf');

    // Compose the full filepath
    const filePath = path.join(process.env.PWD, '.files', filename);

    // Pipe a read-stream to the response
    fs.createReadStream(filePath)
        .pipe(res);
});
