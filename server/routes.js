import fs from 'fs';
import path from 'path';

Picker.route('/pdf/:filename', (params, req, res, next) => {
    const { filename } = params;

    res.statusCode = 200;
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/pdf');

    const filePath = path.join(process.env.PWD, '.files', filename);
    fs.createReadStream(filePath)
        .pipe(res);
});
