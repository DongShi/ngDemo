/**
 * Created with JetBrains WebStorm.
 * User: Stone
 * Date: 15/8/19
 * Time: 21:09
 * To change this template use File | Settings | File Templates.
 */
var dashboard = angular.module('dashboard', ['ui.grid', 'ui.grid.moveColumns', 'ui.grid.resizeColumns']);


dashboard.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){


    $stateProvider.state('dashboard', {
        url: '/dashboard',
        resolve: {
            resolvedDataset: ['dashboard.currentDataset', function (datasetService) {

                //todo need to checkout the user login status and priviledge.

                return datasetService.getDataSet();
            }]
        },
        controller: 'dashboard.controller',
        templateUrl: '/ngDemo/app/dashboard/dashboard.tmpl.html'
    }).state('dashboard.vizContent', {
            abstract: true,
            url: '/dashboard/vizContent',
            templateUrl: '/ngDemo/app/dashboard/dashboard.vizContent.tmpl.html',
            controller: 'dashboard.vizContentCtl'
    }).state('dashboard.vizContent.json', {
        url: '/dashboard/vizContent/json',
        templateUrl: '/ngDemo/app/dashboard/dashboard.vizContent.json.html',
        controller: 'dashboard.vizContentCtl'

    }).state('dashboard.vizContent.grid', {
        url: '/dashboard/vizContent/grid',
        templateUrl: '/ngDemo/app/dashboard/dashboard.vizContent.grid.html',
        controller: 'dashboard.vizContentCtl'

    }).state('dashboard.vizContent.graph', {
        url: '/dashboard/vizContent/graph',
        templateUrl: '/ngDemo/app/dashboard/dashboard.vizContent.graph.html',
        controller: 'dashboard.vizContentCtl'

    });

}]);


dashboard.factory('dashboard.data', ['$http', function($http){

    var jsonData = null;
    var currentURL = "";
    var requesetData = function(url) {
        return $http.get(url);
    };

    var getURLs = function(urlType) {
        //todo fetch urls from backend.
    };

    var setData = function(data) {
        jsonData = data;
    };

    return {
        'setData': setData,
        'getData': function() {return jsonData},
        'requestData': requesetData
    }

}]);




//this can be consolidated to dashboard.data
dashboard.factory('dashboard.currentDataset', ['$http', '$stateParams', function($http, $stateParams) {

     var userId = $stateParams.userId || 0;


     //just testing for now.
    var getDataSet = function() {
        //faking faking faking faking faking faking faking faking faking faking faking faking
        var URL = "/ngDemo/app/asset/json/data-template.json";
        //faking faking faking faking faking faking faking faking faking faking faking faking

        return $http.get(URL).then(function (resp) {
            return resp.data;
        });
    };

    return {
       'getDataSet': getDataSet
    }


}]);




//controller: dashboard.
dashboard.controller('dashboard.controller', ['$scope', 'dashboard.data', 'resolvedDataset',  '$state', '$timeout', function($scope, dataService, resolvedDataset,  $state, $timeout) {

    //member variables.
    $scope.displayMode = 'json';
    $scope.currrentDatasets = resolvedDataset;
    $scope.gridOptions = {data:[], enableColumnResizing: true};


    //list of items to be shown on data set panel.
    var currentDataset = $scope.currrentDatasets[0];
    var info = $scope.datasetInfo = {};

    if (currentDataset) {
        info.name = currentDataset.name;
        info.attrs = currentDataset.units.filter(function(e) {return e.type === 'a'});
        info.metrics = currentDataset.units.filter(function(e) {return e.type === 'm'});
    } else {
        info.attrs = info.metrics = [];
    }

    //method
//    $scope.updateData = function (displayMode) {
//       if ($scope.updateDataEx) {
//           $scope.updateDataEx(displayMode);
//       }
//    }

    //configuration for json/grid/graph.
    //methods
    $scope.updateData = function (displayMode) {

        //helper functions:
        var URL,
            parseURL = function(dataType) {
                //faking faking faking faking faking faking faking faking faking faking faking faking
                return "/ngDemo/app/asset/json/grid-data1.json";
                //faking faking faking faking faking faking faking faking faking faking faking faking

            };

        URL = parseURL('json');

        dataService.requestData(URL)
            .then(
            function (response) {
                dataService.setData(response.data);
                $scope.jsonData = dataService.getData();
            },

            function (response) {
                $window.log(response);
            }
        ).then(function (data) {
                $scope.displayMode = displayMode;

                if (displayMode === 'grid') {
                    $scope.gridOptions.data = [];
                    $timeout(function () {

                        $scope.gridOptions.data = $scope.jsonData;
                        var columnDefs = [];
                        if ($scope.jsonData.length) {


                            var oneRowData = $scope.jsonData[0],
                                keys = Object.keys(oneRowData);

                            for (var i = 0; i < keys.length; i++) {
                                columnDefs.push({name: keys[i]});
                            }

                        }
                        $scope.gridOptions.columnDefs = columnDefs;
                        var targetState = "dashboard.vizContent." + displayMode;
                        $state.go(targetState);
                    });
                } else {
                    var targetState = "dashboard.vizContent." + displayMode;
                    $state.go(targetState);
                }
            });
    }


}]);


//controller: dashboard -> dashboard.vizContent.
dashboard.controller('dashboard.vizContentCtl', ['$scope', 'dashboard.data', '$state', '$timeout', function($scope, dataService, $state, $timeout) {



}]);



//dashboard.directive('panel+table', [function() {
//
//
//    var linkFn = function(scope, element, attrs, ngModelCtrl) {
//        var options = scope.$eval(attrs.options),
//            items = options.items;
//
//
//        var parent = angular.element(element);
//
//        if (items && items.length) {
//            var listGroup = $('div').addClass('list-group').appendTo(parent);
//
//
//            items.forEach(function(ele, idx) {
//
//                var listItem = $('div').addClass('list-group-item');
//                listItem.html(ele.name);
//                //listItem.dragable();
//
//
//                listItem.appendTo(listGroup);
//            });
//        }
//    };
//
//
//    var compileFn = function() {
//
//
//
//
//
//        return linkFn;
//    };
//
//
//    return {
//
//        scope: {
//           items:'@'
//        },
//
//        require: 'ngModel',
//        link: linkFn
//    };
//
//
//}]);
