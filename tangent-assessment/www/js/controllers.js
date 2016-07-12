var app = angular.module('controllers', []);
//home state controller
app.controller('homeCtrl', function($scope, currentIteration){



  var iterationScope = "current";
  var iteration = null;
  $scope.categories = {};
  $scope.categories.planned = [];
  $scope.categories.inProgress = [];
  $scope.categories.test = [];
  $scope.categories.done = [];
  $scope.showError = false;
  $scope.error = "Can not get the current iteration right now. Please try again later.";

  var showModal = function(){
    $('#loadingModal').modal('show');
  }

  var hideModal = function(){
    $('#loadingModal').modal('hide')
  };

  var determineCategories = function(stories){

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

  var setIterationNumber = function(number){
    $scope.iterationNumber = number;
  };

  var setIteration= function(data){
    iteration = data;
  };
  //show modal
  showModal();
  //get the current iteration
  currentIteration.getCurrentIteration(iterationScope).then(function(iterationData){
      //set Iteration
      setIteration(iterationData.data[0]);
      //set iterationNumber
      setIterationNumber(iteration.number);
      //group the iteration stories into categories
      determineCategories(iteration.stories);
      //hide modal when data is loaded
      hideModal();
  })
  //handle error 404
  .catch(function(){
    $scope.showError = true;
  });

});
