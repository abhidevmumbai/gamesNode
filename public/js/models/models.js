window.Game = Backbone.Model.extend({
	urlRoot: "/games",
	idAttribute: "_id",
	initialize: function(){
		console.log("Game model init");
	},
	defaults: {
		_id: null,
		title: "",
        genre: "",
        developer: "",
        publisher: "",
        release_date: "N/A",
        description: "",
        picture: 'default.jpg'
	}
});

window.GameCollection = Backbone.Collection.extend({
	model: Game,
	url: "/games"
});