angular.module('wormhole.services', [])
    .factory('$wormhole', ['$rootScope', '$window', '$parse', function ($rootScope, $window, $parse) {
        var expose = function (target, source) {
            return function (expression, alias) {
                target = target || $window;
                alias = alias || expression;
                var model = $parse(expression);
                var aliasModel = $parse(alias);
                aliasModel.assign(target, model(source));
            }
        };

        return {
            connect: expose($rootScope, $window),
            expose: expose
        };
    }]);

angular.module('mine.services', []).factory('validationService', [
    '$rootScope',
    function ($rootScope) {
        $rootScope.$on('request:validate', function (e) {
            console.log('received the request:validate event -' +
                'go ahead with validation');
        });
    }
]);
