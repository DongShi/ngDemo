/**
 * Created with JetBrains WebStorm.
 * User: Stone
 * Date: 15/8/19
 * Time: 21:09
 * To change this template use File | Settings | File Templates.
 */
var dashboard = angular.module('dashboard', ['ui.grid']);


dashboard.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){


    $stateProvider.state('dashboard', {
        url: '/dashboard',
        abstract: true,
        resolve: {
            resolvedDataset: ['dashboard.currentDataset', function (datasetService) {

                //todo need to checkout the user login status and priviledge.

                return datasetService.getDataSet();
            }]
        },
        controller: 'dashboard.controller',
        templateUrl: '/ngDemo/app/dashboard/dashboard.tmpl.html'
    }).state('dashboard.datasetInfo', {
        url: '/',
        controller: 'dashboard.datasetInfoCtl',
        templateUrl: '/ngDemo/app/dashboard/dashboard.datasetInfo.tmpl.html'

    }).state('dashboard.vizContent', {
        url: '/',
        controller: 'dashboard.vizContentCtl',
        templateUrl: '/ngDemo/app/dashboard/dashboard.vizContent.tmpl.html'
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
dashboard.controller('dashboard.controller', ['$scope', 'dashboard.data', 'resolvedDataset', '$state', '$timeout', function($scope, dataService, resolvedDataset, $state, $timeout) {

    //member variables.
    $scope.displayMode = 'json';
    $scope.currrentDataset = resolvedDataset;
    $scope.gridOptions = {data:[]};

    //helper functions:
     var URL,
         parseURL = function(dataType) {
             //faking faking faking faking faking faking faking faking faking faking faking faking
            return "/ngDemo/app/asset/json/grid-data1.json";
             //faking faking faking faking faking faking faking faking faking faking faking faking

        };

    URL = parseURL('json');


    //variables.
    dataService.requestData(URL).success(
        function(data, status, header) {
            dataService.setData(data);
            $scope.jsonData =  dataService.getData();
        }

    ).error(
        function (data, status, header) {
            $window.log(data);
        }
    );


    //methods
    $scope.updateData = function (displayMode) {

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
                $scope.gridOptions.columnDefs = columnDefs
            });
        } else {

        }


        var targetState = "dashboard.vizContent";
        $state.go(targetState);
    }
}]);

//controller: dashboard.datasetInfo.
dashboard.controller('dashboard.datasetInfoCtl', ['$scope', 'dashboard.data', function($scope, dataService) {

}]);

//controller: dashboard.vizContent.
dashboard.controller('dashboard.vizContentCtl', ['$scope', 'dashboard.data', function($scope, dataService) {

    //configuration for json/grid/graph.


}]);



dashboard.directive('panel+table', [function() {


    var linkFn = function(scope, element, attrs, ngModelCtrl) {
        var options = scope.$eval(attrs.options),
            items = options.items;


        var parent = angular.element(element);

        if (items && items.length) {
            var listGroup = $('div').addClass('list-group').appendTo(parent);


            items.forEach(function(ele, idx) {

                var listItem = $('div').addClass('list-group-item');
                listItem.html(ele.name);
                //listItem.dragable();


                listItem.appendTo(listGroup);
            });

        }



    };


    var compileFn = function() {





        return linkFn;
    };


    return {

        scope: {
           items:'@'
        },

        require: 'ngModel',
        link: linkFn
    };


}]);