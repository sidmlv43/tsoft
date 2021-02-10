const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/testres',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log('DB CONNECTION SUCCESS')
})

app.use(userRoutes);
const port = 3000;

app.listen(port, () => {
    console.log(`app is running at https://localhost:${port}`)
})