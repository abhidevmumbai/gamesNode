function IndexCtrl($scope, $http){
	$http.get('api/games').
		success(function(data, status, headers, config){
			$scope.games = data.games;
		});
}

function AddGameCtrl($scope, $http){
	$scope.form = {};
	$scope.addGame = function(){
		$http.post('/api/addGame', $scope.form).
			success(function(data){
				$location.path('/');
			});	
	};
}

function ReadGameCtrl($scope, $http, $routeParams) {
  $http.get('/api/game/' + $routeParams.id).
    success(function(data) {
      $scope.game = data.game;
    });
}

function EditGameCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/game/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.game;
    });
    
  $scope.editGame = function () {
    $http.put('/api/game/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readGame/' + $routeParams.id);
      });
  };
}
 
function DeleteGameCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/game/' + $routeParams.id).
    success(function(data) {
      $scope.game = data.game;
    });
    
  $scope.deleteGame = function () {
    $http.delete('/api/game/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };
  
  $scope.home = function () {
    $location.url('/');
  };
}