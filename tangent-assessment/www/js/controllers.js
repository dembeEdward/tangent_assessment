var app = angular.module('controllers', []);
//home state controller
app.controller('homeCtrl', function($scope, currentIteration){

  var iterationScope = "current";
  $scope.categories = {};
  $scope.categories.planned = [];
  $scope.categories.inProgress = [];
  $scope.categories.test = [];
  $scope.categories.done = [];
  $scope.showError = false;

  var showModal = function(){
    $('#loadingModal').modal('show');
  };

  var hideModal = function(){
    $('#loadingModal').modal('hide');
  };

  $scope.determineCategories = function(stories){

    if(stories.length > 0){

      for(var x=0; x<stories.length; x++){
        if(stories[x].current_state == "unstarted"){
          $scope.categories.planned.push(stories[x]);
        }else if(stories[x].current_state == "started"){
          $scope.categories.inProgress.push(stories[x]);
        }else if(stories[x].current_state == "finished"){
          $scope.categories.test.push(stories[x]);
        }else if(stories[x].current_state == "accepted"){
          $scope.categories.done.push(stories[x]);
        }
      }
    }
  };

  $scope.setIterationNumber = function(number){
    $scope.iterationNumber = number;
  };

  $scope.setIteration = function(data){
    $scope.iteration = data;
  };

  //get the current iteration
  currentIteration.getCurrentIteration(iterationScope).then(function(iterationData){
    //show modal
      showModal();
      //set Iteration
      $scope.setIteration(iterationData.data[0]);
      //set iterationNumber
      $scope.setIterationNumber($scope.iteration.number);
      //group the iteration stories into categories
      $scope.determineCategories($scope.iteration.stories);
      //hide modal when data is loaded
      hideModal();
  })
  //handle error
  .catch(function(){
    $scope.showError = true;
    $scope.error = "Can not get the current iteration right now. Please try again later.";
  });

});
