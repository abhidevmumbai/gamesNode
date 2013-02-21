var express = require('express'),
	path = require('path'),
	http = require('http'),
	games = require('./routes/games'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

var app = express();


/*App configuration*/
app.configure(function () {
    app.set('port', process.env.PORT || 3002);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	//app.use("/public", express.static(__dirname + '/public'));
});



/*Setting up Passport for authentication*/
passport.use(new LocalStrategy(
	function(username, password, done){
		console.log(username+' '+password);
		User.findOne({username: username}, function(err, user){
			console.log(user);
			if(err){
				console.log('some error occurred while finding the user in the DB');
				return done(err);
			}
			if(!user){
				console.log('Username not found');
				return done(null, false, {message: 'Incorrect Username.'});
			}
			if(user.password != password){
				console.log('Password incorrect');
				return done(null, false, {message: 'Incorrect password.'});
			}
			return done(null, user);
		});
	}

));
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({_id: id}, function(err, user) {
    done(err, user);
  });
});

/*URL mapping*/
//app.get('/', games.findAll );
app.get('/games', games.findAll );
app.get('/games/:id', games.findById);
app.post('/games', games.addGame );
app.put('/games/:id', games.updateGame);
app.delete('/games/:id', games.deleteGame);

app.post('/user/auth',
	passport.authenticate('local', {
		//successRedirect:'/#games',
		failureRedirect:'/#login',
		//failureFlash: true
	}),
	function(req, res){
		//console.log(req.user.username+ '  flkjdslkfld');
		res.redirect('/#games');
	}
);
app.get('/login', function(req, res){
  res.redirect('/login.html');
});
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/*Create Server*/
//app.listen(port);
//console.log('listening on http:/127.0.0.1:'+port);
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});