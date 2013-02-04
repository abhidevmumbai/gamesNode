window.GameView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	events: {
        "change": "change",
        "click.save": "beforeSave",
        "click.delete": "deleteGame",
        "drop#picture": "dropHandler"
	},
	change: function(event){
		//Apply change to the model
		var target = event.target;
		var change = {};
		change[target.name] = target.value;
		this.model.set(change);
	},

	beforeSave: function () {
        this.saveGame();
        return false;
    },
    saveGame: function(){
		var _this = this;
		this.model.save(null, {
			success: function(){
				_this.render();
				app.navigate('/games/'+ model.id, false);
				console.log('Game saved successfully');
			},
			error: function(){
				console.log('Some error occured while saving the game');
			}
		});
    },
    deleteGame: function(){
		this.model.destroy({
			success: function(){
				console.log('Game deleted successfully');
				window.history.back();
			}
		});
		return false;
    }

});