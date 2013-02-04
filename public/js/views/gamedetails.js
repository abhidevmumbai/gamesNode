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
        "click .save": "beforeSave",
        "click .delete": "deleteGame"
	},
	change: function(event){
		// Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
	},

	beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveGame();
        return false;
    },
    saveGame: function(){
		var _this = this;
		console.log('before save');
		this.model.save(null, {
			success: function(model){
				_this.render();
				app.navigate('games/'+ model.id, false);
				utils.showAlert('Success!', 'Game saved successfully', 'alert-success');
				console.log('Game saved successfully');
			},
			error: function(){
				console.log('Some error occured while saving the game');
				utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
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