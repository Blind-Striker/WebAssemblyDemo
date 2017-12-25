const express = require('express');
const app = express();
const path = require('path');

express.static.mime.define({'application/wasm': ['wasm']});

app.use(express.static('public'))

//app.get('/', (req, res) => res.send('Hello World!'));

app.get('/', express.static(path.join(__dirname, 'public')))


app.listen(3000, () => console.log('Example app listening on port 3000!'));