//Declaring app level module

angular.modeule('iCheckGames', []).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/index',
				controller: IndexCtrl
			}).
			when('/addGame', {
				templateUrl: '/partials/addGame',
				controller: AddGameCtrl
			}).
			when('/readGame/:id', { 
				templateUrl: 'partials/readGame',
				controller: ReadGameCtrl
			}).
			when('/editGame/:id', {
				templateUrl: 'partials/editGame',
				controller: EditGameCtrl
			}).
			when('/deleteGame/:id', {
				templateUrl: 'partials/deleteGame',
				controller: DeleteGameCtrl
			}).
			otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true); //Makes use of HTML push/pop History api
	}]);