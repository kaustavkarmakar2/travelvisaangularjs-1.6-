
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
        .state('signup', {
            name: 'signup',
            url: "/signup",
            templateUrl: "views/signup/signup.html",
            controller: 'signupCtrl',
            title: 'signup'
        })
        .state('login', {
            name: 'login',
            url: "/login",
            templateUrl: "views/login/login.html",
            controller: 'loginCtrl',
            title: 'login'
        })
        .state('formpage', {
            name: 'formpage',
            url: "/formpage",
            templateUrl: "views/form/form.html",
            controller: 'formCtrl',
            title: 'Form'
        })
        .state('dashboardformpage', {
            name: 'dashboardformpage',
            url: "/dashboardformpage",
            templateUrl: "views/dashboardForm/form.html",
            controller: 'dashboardFormCtrl',
            title: 'DashboardForm'
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
