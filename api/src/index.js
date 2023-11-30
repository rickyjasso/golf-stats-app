const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const apiRoutes = require('./routes/api.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(apiRoutes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
});

app.listen(3000);
console.log('Server on port: 3000');