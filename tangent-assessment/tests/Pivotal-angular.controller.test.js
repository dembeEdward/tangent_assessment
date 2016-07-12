describe('Pivotal-angular', function(){

  beforeEach(function(){
    module('pivotalAngular');
    //module('services');
    //module('controllers');
    //module('services');
  });
  var currentIteration;

  beforeEach(inject(function($injector){
    currentIteration = $injector.get('currentIteration');
    $rootScope = $injector.get('$rootScope');
  }));

  it('currentIteration service should be defined', function(){
      expect(currentIteration).toBeDefined();
  });

  it('currentIteration service should be working', function(){
    var scope = "current";
    //should not return a null when scope is current
    expect(currentIteration.getCurrentIteration(scope)).not.toBe(null);
    console.log(currentIteration.getCurrentIteration("soso"));
    //should not return a status 200 scope is current
    //expect(currentIteration.getCurrentIteration(scope).status).toBe(200);

  });

});
