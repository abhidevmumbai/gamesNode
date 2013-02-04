window.Game = Backbone.Model.extend({
	urlRoot: "/games",
	idAttribute: "_id",
	initialize: function () {
        this.validators = {};

        this.validators.title = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a Game title"};
        };

        this.validators.developer = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter the name of the Developer"};
        };

        this.validators.publisher = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter the name of the Publisher"};
        };

    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
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