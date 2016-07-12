describe('Pivotal-angular', function(){

  beforeEach(function(){
    module('pivotalAngular');
  });

  var $scope;
  var $q;
  var deferred;
  var currentIteration;
  var $controller;
  var createController;

  beforeEach(inject(function($injector){
    // exception for UI router
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.expectGET("templates/home.html").respond();
    //get currentIteration service
    currentIteration = $injector.get('currentIteration');
    //get the controller
    $controller = $injector.get('$controller');
    //get the root scope
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    // $q service to create a mock instance of defer
    $q = $injector.get('$q');
    deferred = $q.defer();
    // return the deferred promise
    spyOn(currentIteration, 'getCurrentIteration').and.returnValue(deferred.promise);
    //set scope to homeCtrl scope
    createController = function() {
       return $controller('homeCtrl', {'$scope' :$scope });
     };

  }));

    it('should be able to set iteration number', function(){
      createController();
      $scope.setIterationNumber(1);
      expect($scope.iterationNumber).not.toBe(undefined);
      expect($scope.iterationNumber).toBe(1);
    });

    it('should be able to set iteration', function(){

      var data = ["test", "this", "array"];
      createController();
      $scope.setIteration(data);
      expect($scope.iteration).not.toBe(undefined);
      expect($scope.iteration).toBe(data);
      expect($scope.iteration.length).toBeGreaterThan(0);
    });

    it('should be able to determine categories', function(){

      var data = [
        {current_state: 'unstarted'},
        {current_state: 'started'},
        {current_state: 'finished'},
        {current_state: 'accepted'}
      ];
      createController();
      $scope.determineCategories(data);
      expect($scope.categories.planned).not.toBe(undefined);
      expect($scope.categories.inProgress).not.toBe(undefined);
      expect($scope.categories.test).not.toBe(undefined);
      expect($scope.categories.done).not.toBe(undefined);
      expect($scope.categories.planned[0]).toBe(data[0]);
      expect($scope.categories.inProgress[0]).toBe(data[1]);
      expect($scope.categories.test[0]).toBe(data[2]);
      expect($scope.categories.done[0]).toBe(data[3]);
    });

});
