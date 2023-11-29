const express = require('express');
const morgan = require('morgan');

const apiRoutes = require('./routes/api.routes');

const app = express();

app.use(morgan('dev'));
app.use(apiRoutes);

app.listen(3000);
console.log('Server on port: 3000');