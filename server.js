var express = require('express'),
	games = require('./routes/games.js'),
	port = 5003;

var app = express();

app.configure(function () {
    //app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', games.findAll );
app.get('/games', games.findAll );
app.get('/games/:id', games.findById);
app.post('/games', games.addGame );
app.put('/games/:id', games.updateGame);
app.delete('/games/:id', games.deleteGame);

app.listen(port);
console.log('listening on http:/127.0.0.1:'+port);