(function () {
    angular.module('eCommApp', [
        'ui.router'                   // Routing
                       // Bootstrap

    ])
        .run(['$window', '$timeout', '$location', '$rootScope', '$state', '$http',function ($window, $timeout, $location, $rootScope, $state, $http) {

          //  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
            $rootScope.Object = Object;
            $rootScope.loginVar = false;
        }])
})();
