/**
 * Created with JetBrains WebStorm.
 * User: Stone
 * Date: 15/8/19
 * Time: 21:09
 * To change this template use File | Settings | File Templates.
 */
var dashboard = angular.module('dashboard', ['st-common', 'highcharts-ng', 'ui.grid', 'ui.grid.moveColumns', 'ui.grid.resizeColumns']);


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
        controllerAs: 'dashboardController',
        templateUrl: '/ngDemo/app/dashboard/dashboard.tmpl.html'
    }).state('dashboard.vizContent', {
            abstract: true,
            url: '/dashboard/vizContent',
            templateUrl: '/ngDemo/app/dashboard/dashboard.vizContent.tmpl.html'
    }).state('dashboard.vizContent.json', {
        url: '/dashboard/vizContent/json',
        templateUrl: '/ngDemo/app/dashboard/dashboard.vizContent.json.html',
        controller: 'dashboard.vizContentCtl'

    }).state('dashboard.vizContent.grid', {
        url: '/dashboard/vizContent/grid',
        templateUrl: '/ngDemo/app/dashboard/dashboard.vizContent.grid.html',
        controller: 'dashboard.vizContentCtl',
        controllerAs: 'gridController'
    }).state('dashboard.vizContent.graph', {
        url: '/dashboard/vizContent/graph',
        templateUrl: '/ngDemo/app/dashboard/dashboard.vizContent.graph.html',
        controller: 'dashboard.vizContentCtl',
        controllerAs: 'graphController'
    });

}]);


dashboard.factory('dashboard.data', ['$http', function($http){

    var jsonData = [];
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


    var getData = function(dataType) {

        dataType = dataType || 'json';

        if (dataType === 'json') {

            return jsonData;
        } else if (dataType === 'grid') {




        } else if (dataType === 'd3Chart')  {

        } else if (dataType === 'highCharts')  {


            var result = {data: []};
            jsonData.forEach(function(ele, idx) {

                //ele is an array
                var arr = ele.value;
                var aSeries = [];
                arr.forEach(function(element, index) {
                    aSeries.push(element[0] || 0);
                });

                result.data.push(aSeries);


                return result;
            });
        }

        return jsonData;

    };

    return {
        'setData': setData,
        'getData': getData,
        'requestData': requesetData
    }

}]);

dashboard.factory('dashboard.vizFormat', ['$http', function($http){
//todo provide default grid/graph settings per type.

}]);



//this can be consolidated to dashboard.data
dashboard.factory('dashboard.currentDataset', ['$http', '$stateParams', function($http, $stateParams) {

    //var userId = $stateParams.userId || 0;


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
dashboard.controller('dashboard.controller', ['$scope', 'dashboard.data', 'resolvedDataset',  '$state', '$timeout', '$window', 'Upload',
    function($scope, dataService, resolvedDataset,  $state, $timeout, $window, uploader) {

    var vm = this;

    //member variables.
    vm.displayMode = 'json';
    vm.currrentDatasets = resolvedDataset;
    vm.gridOptions = {data:[], enableColumnResizing: true};
    vm.updateData = fetchAllData;
    vm.updateTemplate = updateTemplate;

    activate();
    ///////////////////////////////////// the inflame separator///////////////////////////////////////////

    $scope.$watch('upFile', function(){
        var file = $scope.upFile;
        file && vm.uploadFile(file);

    });


        vm.uploadFile = function (file) {
        //check file extension


        //check file size.

        uploader.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            fields: {'username': $scope.username},
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    };


    function activate() {

        var currentDataset = vm.currrentDatasets[0];
        var info = vm.datasetInfo = {};

        if (currentDataset) {
            info.name = currentDataset.name;
            info.attrs = currentDataset.units.filter(function(e) {return e.type === 'a'});
            info.metrics = currentDataset.units.filter(function(e) {return e.type === 'm'});
        } else {
            info.attrs = info.metrics = [];
        }
    }

    //manipulate data & template
    function updateTemplate(object) {
        $window.console.log(object);

        var targetState = "dashboard.vizContent." + vm.displayMode;
        $state.go(targetState);

        $timeout(function () {

            $scope.$broadcast('template-updated', object);
        }, 500);

    }

    function fetchAllData(displayMode) {
        $window.console.log("fetch all data called");
        vm.displayMode = displayMode;

        //helper functions:
        var URL,
            parseURL = function (dataType) {
                //faking faking faking faking faking faking faking faking faking faking faking faking
                if (displayMode === 'json' || displayMode === 'grid') {
                    return "/ngDemo/app/asset/json/grid-data1.json";
                }

                return "/ngDemo/app/asset/json/graph-data.json";
                //faking faking faking faking faking faking faking faking faking faking faking faking

            };

        URL = parseURL(displayMode);

        dataService.requestData(URL)
            .then(
            function (response) {
                dataService.setData(response.data);
                vm.jsonData = dataService.getData();
                return response.data;
            },

            function (response) {
                $window.console.log(response);
            }
        ).then(function (data) {
                vm.displayMode = displayMode;

                if (displayMode === 'grid') {
                    vm.gridOptions.data = [];
                    $timeout(function () {

                        vm.gridOptions.data = vm.jsonData;
                        var columnDefs = [];
                        if (vm.jsonData.length) {
                            var oneRowData = vm.jsonData[0],
                                keys = Object.keys(oneRowData);

                            for (var i = 0; i < keys.length; i++) {
                                columnDefs.push({name: keys[i]});
                            }
                        }
                        vm.gridOptions.columnDefs = columnDefs;
                    });
                } else {
                    //todo graph preparation.
                }

                var targetState = "dashboard.vizContent." + displayMode;
                $state.go(targetState);
            }
        );
    }


}]);


//controller: dashboard -> dashboard.vizContent.
dashboard.controller('dashboard.vizContentCtl', ['dashboard.data', '$scope', '$window', '$http', function(dataService, $scope, $window) {

    var vm = this;

    vm.chartTypes = ['bar', 'area', 'line', 'pie'];
    vm.changeType = changeGraphType;
    vm.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        },
            {color: 'red',data: [22, 33, 55, 17, -10]}
        ],
        title: {
            text: 'Demo Chart'
        },

        loading: false
    };

    vm.tryFunc = tryFunc;
    vm.updateTemplate = updateTemplate;


    $scope.$on('template-updated', templateUpdateHandler);


    init(dataService);

    ///////////////////////////////////// the inflame separator///////////////////////////////////////////
    function init(dataService) {
//        var result = dataService.getData('highCharts');
//        //vm.chartConfig.options.data = data;
//
//
//
//        result.forEach(function(ele, idx){
//            vm.chartConfig.options.series.push({'data': ele});
//        });
    }


    function tryFunc(spinnerApi, spinnerService) {
        $window.console.log(spinnerApi);
        $window.console.log(spinnerService);
    }

    /**
     * notify a template update.
     * @param index
     */
    function updateTemplate(index) {

        var promise = $http.post();

        promise.then().then();

        return promise;
    }


    function changeGraphType(type) {
        if (!!type) {
            vm.chartConfig.chartConfig.type = type;
        }
    }

    function templateUpdateHandler(event, obj) {


        $window.console.log('feedback called');

        //$window.console.log(event);
        //$window.console.log(obj);
    }


}]);
