//'use strict';
//
///* App Module */
//
//var phonecatApp = angular.module('phonecatApp', [
//  'ngRoute',
//  'phonecatAnimations',
//
//  'phonecatControllers',
//  'phonecatFilters',
//  'phonecatServices'
//]);
//
//phonecatApp.config(['$routeProvider',
//  function($routeProvider) {
//    $routeProvider.
//      when('/phones', {
//        templateUrl: 'partials/phone-list.html',
//        controller: 'PhoneListCtrl'
//      }).
//      when('/phones/:phoneId', {
//        templateUrl: 'partials/phone-detail.html',
//        controller: 'PhoneDetailCtrl'
//      }).
//      otherwise({
//        redirectTo: '/phones'
//      });
//  }]);


//
////declaration.
//var phoneCatApp = angular.module('phonecatApp',   ['ngRoute', 'phonecatControllers', 'phonecatFilters', 'phonecatService']);
//
////config
//phoneCatApp.config(
//    ['$routeProvider', function($routeProvider) {
//        $routeProvider.when('/phones',
//            {
//                templateUrl: "partials/phone-list.html",
//                controller: "PhoneListCtrl"
//            }
//        ).when( '/phones/:phoneId',
//            {
//                templateUrl: 'partials/phone-detail.html',
//                controller: "PhoneDetailCtrl"
//            }
//        ).otherwise(
//            {
//                redirectTo: '/phones'
//            }
//        );
//    }]
//);
//



//demo
var showcaseApp = angular.module('showcaseApp', ["ui.router"]);

//pre-configuration.
showcaseApp.run(
    [ '$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
    }]
);

//configurate routing & state.
showcaseApp.config(  ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.when('', '/index')
        .otherwise('/index');

    $stateProvider.state(
        'index', {
            url : '/index',
            template:"Hello world <a ui-sref='dashboard'> go to dashboard </a>"
        }
    ).state('dashboard', {
            url : '/dashboard',
            //template:"Hello dashboard <a ui-sref='cards'> go to cards </a>"
            templateUrl: '/src/dashboard/dashboard.tmpl.html'
        }
    ).state('cards', {
            url : '/cards',
            template:"Hello cards <a ui-sref='connectors'> go to connectors</a>"

        }
    ).state('connectors', {
            url : '/connectors',
            template:"Hello connectors <a ui-sref='index'> go to index</a>"

        }
    );



}]);

