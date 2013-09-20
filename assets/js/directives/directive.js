// Since our ng-app is not named, we need to bind the directive to the 'ng' module
var ngModule = angular.module('ng'); // get a module named 'ng', which is the default module.
ngModule.directive('hello', function(){
  return {
    template: '<span>Hello {{}}</span>',
    link: function(scope, element, attrs){

    }
  }
});