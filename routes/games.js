var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {autoreconnect: true});
db = new Db('gamesdb', server, {w:1, safe:true});

db.open(function(err, db){
    //console.log(db);
	if(!err){
		console.log('Connected to iCheckGames(gamesdb) DB');
        //todo: currently this doesn't worka as expected
		db.collection('games', function(err, collection){
            //console.log(collection);
            //populateDb();
			if(err){
				console.log("The 'games' collection doesn't exist. Creating it with sample data.");
				populateDb();
			}
		});

	}
});

exports.findById = function(req, res){
	var id = req.params.id;
	console.log('Retreiving game: '+ id);

	db.collection('games', function(err, collection){
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item){
            res.send(item);
        });
    });
};

exports.findAll = function(req, res){
	console.log('Retreiving all game');

	db.collection('games', function(err, collection){
        collection.find().toArray(function(err, items){
            res.send(items);
        });
    });
};

exports.addGame = function(req, res) {
    var wine = req.body;
    console.log('Adding game: ' + JSON.stringify(game));
    db.collection('wines', function(err, collection) {
        collection.insert(game, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};
exports.updateGame = function(req, res){
	var id = req.params.id;
	console.log('Updating game: '+ id);

	db.collection('games', function(err, collection){
        collection.update({'_id':new BSON.ObjectID(id)}, game, function(err, result){
            if (err) {
                console.log('Error updating game: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(game);
            }
        });
    });
};

exports.deleteGame = function(req, res) {
    var id = req.params.id;
    console.log('Deleting game: ' + id);
    db.collection('games', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};



/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDb = function() {
    console.log('populate DB');
    var games = [
        {
            title: 'DmC Devil May Cry',
            genre: 'Action',
            developer: 'Ninja Theory',
            publisher: 'Capcom',
            release_date: 'Jan 25, 2013',
            description: 'DMC',
            picture: 'dmc-devil-may-cry.jpg'
        },
        {
            title: "Assassin's Creed - III",
            genre: 'Action',
            developer: '',
            publisher: 'Ubisoft',
            release_date: 'Oct 30, 2012',
            description: 'AC3',
            picture: 'assassin-s-creed-iii.jpg'
        },
        {
            title: 'Call of Duty - Black Ops II',
            genre: 'Shooter',
            developer: 'Treyarch',
            publisher: 'Activision',
            release_date: 'Nov 13, 2012',
            description: 'COD-BO 2',
            picture: 'call-of-duty-black-ops-ii.jpg'
        },
        {
            title: 'Far Cry 3',
            genre: 'First person Shooter',
            developer: 'Ubisoft Montreal',
            publisher: 'Ubisoft',
            release_date: 'Dec 4, 2012',
            description: 'FC3',
            picture: 'far-cry-3-the-lost-expeditions.jpg'
        },
        {
            title: 'God of War 3',
            genre: 'Action',
            developer: 'Sony Santa Monica',
            publisher: 'Sony Computer Entertainment America',
            release_date: 'Dec 3, 2012',
            description: 'GOW-3',
            picture: 'god-of-war-iii.jpg'
        },
        {
            title: 'Hitman - Absolution',
            genre: 'Action',
            developer: 'IO Interactive',
            publisher: 'Square Enix',
            release_date: 'Nov 20, 2012',
            description: 'Hitman',
            picture: 'hitman-absolution.jpg'
        },
        {
            title: 'Max Payne 3',
            genre: 'Action',
            developer: 'Rockstar Studios',
            publisher: 'Rockstar Games',
            release_date: 'June 1, 2012',
            description: 'Max Payne',
            picture: 'max-payne-3.jpg'
        },
        {
            title: 'Sleeping dogs',
            genre: 'Action',
            developer: 'United Front Games',
            publisher: 'Square Enix',
            release_date: 'Aug 14, 2012',
            description: 'Sleeping Dogs',
            picture: 'sleeping-dogs-2.jpg'
        }
    ];
 
    db.createCollection('games',{safe:true}, function(err, collection) {
        console.log('Creating game collection');
        collection.insert(games, function(err, result) {
            console.log('Inserting sample data');
        });

    });
 
};