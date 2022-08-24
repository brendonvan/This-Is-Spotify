// CONFIGURE
const express = require('express');
const app = express();
const PORT = 8080;

// IMPORT
const homeController = require('./controllers/home_controller')
const methodOverride = require('method-override');

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use('/', homeController);

// LISTENING
app.listen(PORT, () => { console.log(`Server listening on PORT: ${PORT}`)});