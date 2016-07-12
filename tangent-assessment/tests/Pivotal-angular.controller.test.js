describe('Pivotal-angular', function(){

  beforeEach(module('pivotalAngular'));
  //inject the currentIteration services
  var currentIteration;

  beforeEach(inject(function($service){
    currentIteration = $service('currentIteration', {});
  }));

  it('should have a working currentIteration service', function(){
    currentIteration.toBeDefined();
  });

});
