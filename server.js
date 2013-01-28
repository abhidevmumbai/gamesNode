var express = require('express'),
	games = require('./routes/games.js');

var app = express();

app.get('/', games.findAll );
app.get('/games', games.findAll );
app.get('/games/:id', games.findById);
app.post('/games', games.addGame );
app.put('/games/:id', games.updateGame);
//app.delete('/games/:id', games.deleteGame);

app.listen(5000);
console.log('listening on http:/127.0.0.1:8005');