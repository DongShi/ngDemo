'use strict';
//
///* App Module */
//

//demo
var showcaseApp = angular.module('showcaseApp', ["ui.router", "dashboard", "ngFileUpload"]);

//pre-configuration.
showcaseApp.run(
    [ '$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
    }]
);


//constants, if any.
showcaseApp.constant('_ALERT_CONFIG_', {Max: 10});



//configurate routing & state.
showcaseApp.config(  ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.when('', '/index')
        .otherwise('/index');

    $stateProvider.state(
        'index', {
            url : '/index',
            template:"Hello world <a ui-sref='dashboard'> go to dashboard </a>"
        }
    ).state('cards', {
            url : '/cards',
            templateUrl: '/ngDemo/app/card/cards.html'
//            template:"Hello cards <a ui-sref='connectors'> go to connectors</a>"
        }
    ).state('connectors', {
            url : '/connectors',
            template:"Hello connectors <a ui-sref='index'> go to index</a>"
        }
    );



}]);

