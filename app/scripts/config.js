
/**
 * eCommerce - Responsive Admin Theme
 *
 * eCommerce theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider) {
    //$qProvider.errorOnUnhandledRejections(false);
    $stateProvider
        .state('dashboard', {
            name: 'dashboard',
            url: "/dashboard",
            templateUrl: "views/dashboard/dashboard.html",
            controller: 'dashboardCtrl',
            title: 'Dashboard'
        })
        .state('homepage', {
            name: 'homepage',
            url: "/",
            templateUrl: "views/homeScreen/homeScreen.html",
            controller: 'homeCtrl',
            title: 'Home'
        })
    $urlRouterProvider.otherwise("/");
}
angular
    .module('eCommApp')
    .config(config)
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
        console.log('$rootScope.$state -----------------',$rootScope.$state )
});
