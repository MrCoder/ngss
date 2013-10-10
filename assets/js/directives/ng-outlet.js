// Since our ng-app is not named, we need to bind the directive to the 'ng' module
var ngModule = angular.module('ng'); // get a module named 'ng', which is the default module.
ngModule
    .directive('ngOutlet', function ($window, $parse, $rootScope) {
        return {
            link: function (scope, element, attrs) {
                var variableName = attrs.ngOutlet;
                var model = $parse(variableName);
                model.assign($rootScope, model($window));
            }
        }
    })
    .directive('ngWait', function ($window, $compile, $timeout) {
        return {
            link: function (scope, element, attrs) {
                var persistence = this;
                persistence.recompiled = !!persistence.recompiled;
                scope.$whenReady(function(){
                    console.log('this recompiled?', persistence.recompiled);
                    if (!persistence.recompiled){
                        console.log('re-compiling ...');
                        persistence.recompiled = true;
                        $compile(element)(scope);
                    }
                });
            }

        }
    });