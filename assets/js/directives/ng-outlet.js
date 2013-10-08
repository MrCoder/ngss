// Since our ng-app is not named, we need to bind the directive to the 'ng' module
var ngModule = angular.module('ng'); // get a module named 'ng', which is the default module.
ngModule
    .directive('ngOutlet', function ($window, $parse) {
        return {
            link: function (scope, element, attrs) {
                var variableName = attrs['ngOutlet'];
                var model = $parse(variableName);
                model.assign(scope, model($window));
            }
        }
    })
    .directive('ngWait', function ($window, $compile, $timeout) {
        return {
            link: function (scope, element, attrs) {
                element.compiled = false;
                $timeout(function(){
                    if (!element.compiled){
                        $compile(element)(scope);
                        element.compiled = true;
                    }
                });
            }

        }
    });