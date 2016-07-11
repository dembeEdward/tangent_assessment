var app = angular.module('controllers', []);
//home state controller
app.controller('homeCtrl', function($scope, currentIteration){

  //load modal
  $('#loadingModal').modal('show');

  var iterationScope = "current";
  var iteration = null;
  $scope.planned = [];
  $scope.inProgress = [];
  $scope.test = [];
  $scope.done = [];
  $scope.showError = false;
  $scope.show404 = false;
  $scope.error = null;
  //get the current iteration
  currentIteration.getCurrentIteration(iterationScope).then(function(iterationData){

      iteration = iterationData;
      //console.log(iteration);
      //group the iteration stories into categories
    //console.log(iteration.stories);
      if(iteration.stories.length > 0){
        //set iterationNumber
        $scope.iterationNumber = iteration.number;

        for(var x=0; x<iteration.stories.length; x++){
          if(iteration.stories[x].current_state == "unstarted"){
            $scope.planned.push(iteration.stories[x]);
          }else if(iteration.stories[x].current_state == "started"){
            $scope.inProgress.push(iteration.stories[x]);
          }else if(iteration.stories[x].current_state == "finished"){
            $scope.test.push(iteration.stories[x]);
          }else if(iteration.stories[x].current_state == "accepted"){
            $scope.done.push(iteration.stories[x]);
          }
        }
      }
      //handle status that is not 200
      if(iteration == []){
        $scope.showError = true;
      }

      //hide modal when data is loaded
      $('#loadingModal').modal('hide')
  })
  //handle error 404
  .catch(function(error){
    $scope.show404 = true;
    $scope.error = error;
  });

});
