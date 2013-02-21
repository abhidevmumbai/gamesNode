var AppRouter = Backbone.Router.extend({
	routes:{
		"": "home",
		"login": "login",
		"games":"list",
		"games/page/:page":"list",
		"games/add":"addGame",
		"games/:id":"gameDetails",
		"about":"about"
	},
	initialize: function(){
		this.headerView = new HeaderView();
		$('.header').html(this.headerView.el);
	},
	home: function(){
		if(!this.HomeView){
			this.homeView = new HomeView();
		}
		$('#content').html(this.homeView.el);
	},
	login: function(){
		if(!this.LoginView){
			this.loginView = new LoginView();
		}
		$('#content').html(this.loginView.el);
	},
	list: function(page){
		var p = page ? parseInt(page,10) : 1;
		var gameList = new GameCollection();
		gameList.fetch({success: function(){
			$('#content').html(new GameListView({model: gameList, page: p}).el);
		}});
	},
	gameDetails: function(id){
		var game = new Game({_id:id});
		game.fetch({
			success:function(){
				$('#content').html(new GameView({model:game}).el);
			}
		});
	},
	addGame: function(){
		var game = new Game();
		$('#content').html(new GameView({model:game}).el);
	},
	about: function(){
		if(!this.AboutView){
			this.aboutView = new AboutView();
		}
		$('#content').html(this.aboutView.el);
	}
});


utils.loadTemplate(['HomeView','LoginView', 'HeaderView', 'GameView', 'GameListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});