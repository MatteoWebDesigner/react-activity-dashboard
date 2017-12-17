let express = require('express');
let history = require('connect-history-api-fallback');
let proxy = require('http-proxy-middleware');

let app = express();

app.use('/api', proxy({target: 'http://localhost:3001'}));
app.use(history());

app.use(express.static('build'))

app.listen(3000, () => console.log('app running on http://localhost:3000!'));