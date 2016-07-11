var app = angular.module('services', []);

app.service('currentIteration', function($http){
  //get current Iteration
  this.getCurrentIteration = function(scope){

    return $http.get('https://www.pivotaltracker.com/services/v5/projects/442903/iterations?scope=' + scope).then(function(response){

      if(response.status == 200){
        return response.data[0];
      }else{
        return [];
      }
    }).catch(function(error){

      return error;
    });
  };
});
