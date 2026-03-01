const http = require('http');
const fs = require('fs');
const { URL } = require('url');

const api = require('./src/apiResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// load dataset 
const raw = fs.readFileSync(__dirname + '/src/pokedex.json');
const pokedexData = JSON.parse(raw);
api.init(pokedexData);

const isHead = (req) => req.method === 'HEAD';


 // FINAL: Serve static files from /public

const serveStatic = (response, filePath, contentType, headOnly) => {
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
    const payload = JSON.stringify({ error: 'File not found' });

    response.writeHead(404, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
    });

    if (!headOnly) response.write(payload);
    response.end();
  }
};

const onRequest = (request, response) => {
  const parsedUrl = new URL(request.url, `http://${request.headers.host}`);
  const pathname = parsedUrl.pathname;
  const query = Object.fromEntries(parsedUrl.searchParams.entries());
  const headOnly = isHead(request);

  
  // STATIC FILES 

  if (request.method === 'GET' || request.method === 'HEAD') {
    switch (pathname) {
      case '/':
      case '/client.html':
        return serveStatic(
          response,
          __dirname + '/public/client.html',
          'text/html; charset=utf-8',
          headOnly
        );

      case '/docs':
      case '/docs.html':
        return serveStatic(
          response,
          __dirname + '/public/docs.html',
          'text/html; charset=utf-8',
          headOnly
        );

      case '/style.css':
        return serveStatic(
          response,
          __dirname + '/public/style.css',
          'text/css; charset=utf-8',
          headOnly
        );

      case '/client.js':
        return serveStatic(
          response,
          __dirname + '/public/client.js',
          'application/javascript; charset=utf-8',
          headOnly
        );

      default:
        break;
    }
  }

 
  // GET + HEAD API ENDPOINTS
  
  if (request.method === 'GET' || request.method === 'HEAD') {
    switch (pathname) {
      case '/api/pokemon':
        return api.getPokemon(request, response, headOnly, query);

      case '/api/pokemonById':
        return api.getPokemonById(request, response, headOnly, query);

      case '/api/pokemonByNum':
        return api.getPokemonByNum(request, response, headOnly, query);

      case '/api/types':
        return api.getTypes(request, response, headOnly);

      default:
        return api.notFound(request, response, headOnly);
    }
  }

 
  // POST API ENDPOINTS
 
  if (request.method === 'POST') {
    switch (pathname) {
      case '/api/addPokemon':
        return api.addPokemon(request, response);

      case '/api/editPokemon':
        return api.editPokemon(request, response);

      default:
        return api.notFound(request, response, false);
    }
  }

  // Fallback
  return api.notFound(request, response, false);
};

http.createServer(onRequest).listen(port);
console.log(`Listening on http://localhost:${port}`);