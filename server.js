var express = require('express'),
	routes = require('./js/routes'),
	api = require('./js/routes/api.js');

var app = express();

//App settings
app.set('views', __dirname + '/views');//Set views directory location
app.set('view engine', 'jade');//Defines the usade of Jade as the template engine
app.use(express.logger('dev'));//Express logger logs incoming requests to the console

// Routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//app.get('/', api.findAll );
app.get('/games', api.findAll );
app.get('/games/:id', api.findById);
app.post('/games', api.addGame );
app.put('/games/:id', api.editGame);
//app.delete('/games/:id', games.deleteGame);

app.listen(5008);
console.log('listening on http:/127.0.0.1:8005');