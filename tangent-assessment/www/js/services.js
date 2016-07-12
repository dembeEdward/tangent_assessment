var app = angular.module('services', []);

app.service('currentIteration', function($q, $http){
  //get current Iteration
  this.getCurrentIteration = function(scope){
    //use promise for request
    var deferred = $q.defer();

    return $http.get('https://www.pivotaltracker.com/services/v5/projects/442903/iterations?scope=' + scope).success(function(response){
      deferred.resolve(response);
    }).error(function(){
      deferred.reject();
    });
    return deferred.promise;
  };
});
