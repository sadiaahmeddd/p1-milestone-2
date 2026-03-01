const fs = require('fs');
const path = require('path');

  // FINAL CHANGE: Helper that serves files from /public and always sets
 
const getFile = (response, headOnly, filename, contentType) => {
  const filePath = path.join(__dirname, '..', 'public', filename);

  try {
    const file = fs.readFileSync(filePath);

    response.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': file.length,
    });

    if (!headOnly) {
      response.write(file);
    }
    response.end();
  } catch (err) {
    const payload = JSON.stringify({ error: 'Static file not found.' });
    response.writeHead(404, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
    });
    if (!headOnly) response.write(payload);
    response.end();
  }
};

module.exports = { getFile };