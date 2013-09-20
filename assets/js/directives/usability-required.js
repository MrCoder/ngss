var ngModule = angular.module('ng');

var requiredEnhancement = function(compile) {
    return function (scope, element, attrs, ctrl) {
        console.log(arguments);
        var dependency = attrs['accRequired'];
        if (!dependency) throw "Dependency is mandatory, if it is always required, set it as 'always'.";
        scope.always = true;
        scope.$watch(dependency, function(newValue){
            element.attr('aria-required', newValue);
        });

        var label = $("label[for='" + element.attr('id') + "']");
        if (label) {
            // @ add asterisk to the label of a required input field
            var abbrElement = angular.element('<abbr title="required" class="required-marker"">*</abbr>');
            abbrElement.attr('ng-show', dependency);
            label.append(compile(abbrElement)(scope));
        }
    };
};

ngModule.directive('accRequired', ['$compile', function (compile) {
    var linkFn = function(scope, element, attrs){
        return requiredEnhancement(compile)(scope, element, attrs);
    };
    return {
        restrict: 'A',
        link: linkFn
    };
}]);

// @deprecated
ngModule.directive('required', ['$compile', function (compile) {
    console.log("Enhancing required field with class 'required' is deprecated.");
    console.log("Please consider changing it to acc-required attribute.");
    var linkFn = function(scope, element, attrs){
        attrs['ngRequired'] = 'always';
        return requiredEnhancement(compile)(scope, element, attrs);
    };
    return {
        restrict: 'C',
        link: linkFn
    };
}]);
