const express = require('express');
const path = require('path')
const morgan = require('morgan');
const { engine } = require("express-handlebars");
const port = 3000;
const route = require('./routes/routerWeb');
const routeMovie = require('./routes/routeMovie');

const connectDB = require('./config/connectDB');
const bodyParser = require('body-parser');
const app = express();

app.engine("hbs", engine({ extname: "hbs" }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

console.log(path.join(__dirname, '/views'));

// app.use(morgan('combined'))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


route(app);
routeMovie(app);

connectDB();


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

