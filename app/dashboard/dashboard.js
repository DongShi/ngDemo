/**
 * Created with JetBrains WebStorm.
 * User: Stone
 * Date: 15/8/19
 * Time: 21:09
 * To change this template use File | Settings | File Templates.
 */
var dashboard = angular.module('dashboard', ['guan-common', 'highcharts-ng', 'ui.grid', 'ui.grid.moveColumns', 'ui.grid.resizeColumns']);


dashboard.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


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


dashboard.factory('dashboard.data', ['$http', function ($http) {

    var jsonData = [];
    var currentURL = "";
    var requesetData = function (url) {
        return $http.get(url);
    };

    var getURLs = function (urlType) {
        //todo fetch urls from backend.
    };

    var setData = function (data) {
        jsonData = data;
    };


    var getData = function (dataType) {

        dataType = dataType || 'json';

        if (dataType === 'json') {

            return jsonData;
        } else if (dataType === 'grid') {


        } else if (dataType === 'd3Chart') {

        } else if (dataType === 'highCharts') {


            var result = {data: []};
            jsonData.forEach(function (ele, idx) {

                //ele is an array
                var arr = ele.value;
                var aSeries = [];
                arr.forEach(function (element, index) {
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


//this can be consolidated to dashboard.data
dashboard.factory('dashboard.currentDataset', ['$http', '$stateParams', function ($http, $stateParams) {

    //var userId = $stateParams.userId || 0;


    //just testing for now.
    var getDataSet = function () {
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


dashboard.factory('dashboard.graphStyle', function () {

    return {
        'getOptions': _getOptions,
        'getFormatting': _getFormatting
    };

    function _getOptions(type, data) {

        var result = {};
        var defaultABLOptions = {
            options: {
                chart: {
                    type: 'bar'
                }
            },

            series: [
                {data: [10, 15, 12, 8, 7]},
                {color: 'red', data: [22, 33, 55, 17, -10]}
            ],

            title: {
                text: 'Demo Chart ABL'
            },

            xAxis: {

                lineWidth: 1
            },


            yAxis: {

                lineWidth: 1
            },

            loading: false
        };

        var defaultBubbleScatterOptions = {
            options: {
                chart: {
                    type: 'bubble',
                    height: 600,
                    animation: {
                        duration: 850,
                        easing: 'linear'
                    }
                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                }
            },

            series: [{
                data: [
                    {x: 9, y: 81, z: 13, name: "鱼香茄子"},
                    {x: 98, y: 5, z: 39, name: "酱爆茄子"},
                    {x: 51, y: 50, z: 23, name: "酸菜鱼"},
                    {x: 41, y: 22, z: -36, name: "口水鱼"},
                    {x: 58, y: 24, z: -30, name: "小黄鱼"},
                    {x: 78, y: 37, z: -16, name: "番茄鱼"},
                    {x: 55, y: 56, z: 3, name: "马鲛鱼"},
                    {x: 18, y: 45, z: 20, name: "糖醋里脊"},
                    {x: 42, y: 44, z: -22, name: "水煮肉片"},
                    {x: 3, y: 52, z: 9, name: "蚂蚁上树"},
                    {x: 31, y: 18, z: 47, name: "脆皮鸭"},
                    {x: 79, y: 91, z: 13, name: "茶香鸡"},
                    {x: 93, y: 23, z: -27, name: "宋嫂鱼羹"},
                    {x: 44, y: 83, z: -28, name: "东坡肉"}
                ],

                displayNegative: true,
                //negativeColor: Highcharts.getOptions().colors[1]
                // zThreshold: 0
            }]
            ,

            title: {
                text: '金牛瘦狗'
            },

            xAxis: {
                plotLines: [{
                    color: 'red',
                    width: 2,
                    value: 50,
                    label: {
                        text: '销售基准线',
                        style: {
                            color: 'blue',
                            fontWeight: 'bold'
                        }
                    }
                }],
                lineWidth: 1,
                min: -5,
                max: 110
            },


            yAxis: {
                plotLines: [{
                    color: 'red',
                    width: 2,
                    value: 55,
                    label: {
                        text: '利润基准线',
                        style: {
                            color: 'blue',
                            fontWeight: 'bold'
                        }
                    }
                }],
                lineWidth: 1,
                min: -5,
                max: 140
            },

            loading: false
        };

        type = angular.lowercase(type);
        switch (type) {
            case 'bar':
            case 'line':
            case 'area':
                angular.merge(result, defaultABLOptions);
                if (data) {
                    result.series = [data];
                }
                break;
            case 'scatter':
            case 'bubble' :
                angular.merge(result, defaultBubbleScatterOptions);
                break;
            default :
                angular.merge(result, defaultABLOptions);
                break;


        }

        result.options.chart.type = type || 'bar';
        return result;


    }

    function _getFormatting(type) {

    }

});


//controller: dashboard.
dashboard.controller('dashboard.controller', ['$scope', 'dashboard.data', 'resolvedDataset', '$state', '$timeout', '$window', 'Upload',
    function ($scope, dataService, resolvedDataset, $state, $timeout, $window, uploader) {

        var vm = this;

        //member variables.
        vm.displayMode = 'json';
        vm.currrentDatasets = resolvedDataset;
        vm.gridOptions = {data: [], enableColumnResizing: true};
        vm.updateData = fetchAllData;
        vm.updateTemplate = updateTemplate;
        vm.uploadFile = uploadFile;
        vm.hidePlaceholder = _hidePlaceholder;

        activate();
        ///////////////////////////////////// the inflame separator///////////////////////////////////////////

        $scope.$watch('upFile', function () {
            var file = $scope.upFile;
            file && vm.uploadFile(file);
        });


        function uploadFile(file) {
            //todo check file extension

            //todo check file size.

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
        }

        function activate() {

            var currentDataset = vm.currrentDatasets[0];
            var info = vm.datasetInfo = {};

            if (currentDataset) {
                info.name = currentDataset.name;
                info.attrs = currentDataset.units.filter(function (e) {
                    return e.type === 'a'
                });
                info.metrics = currentDataset.units.filter(function (e) {
                    return e.type === 'm'
                });
            } else {
                info.attrs = info.metrics = [];
            }


            _initDropzones();
        }

        function _hidePlaceholder(key) {
            if (!!key) {
                key = key + 'Axis';
                var dz = vm.dropzones[key];
                return dz && dz.units && dz.units.length > 0;
            }

            return false;

        }

        function _initDropzones() {


            var zonesId = ['xAxis', 'yAxis'];
            var zonesNames = ['横轴', '纵轴'];
            var dropzones = vm.dropzones = {};

            //$scope.testlist = ['example1', 'example2'];

            zonesId.forEach(function (ele, idx) {
                dropzones[ele] = {

                    "name": zonesNames[idx],
                    "units": [],
                    "API": {}

                }

            });

        }


        //manipulate data & template
        function updateTemplate(object) {
            $window.console.log(object);

            var targetState = "dashboard.vizContent." + vm.displayMode;
            $state.go(targetState);

            $timeout(function () {
                $scope.$broadcast('template-updated', object);
            }, 50);

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
dashboard.controller('dashboard.vizContentCtl', ['dashboard.data', 'dashboard.graphStyle', '$scope', '$window', '$interval',
    function (dataService, graphStyleService, $scope, $window, $interval) {

        var vm = this;

        vm.chartTypes = ['bar', 'area', 'line', 'pie', 'bubble'];
        vm.selectedType = 'bar';
        vm.onGraphTypeChanged = _changeGraphType;
        vm.animateGraph = _animate;
        vm.printGraph = _print;
        vm.shareGraph = _share;


        //regiester event listeners.
        $scope.$on('template-updated', templateUpdateHandler);

        //activiation.
        activate(dataService);

        ///////////////////////////////////// the inflame separator///////////////////////////////////////////
        function activate(dataService) {

            _changeGraphType('bar');

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

        function _changeGraphType(type) {
            type = type || vm.selectedType;
            var graphStyle = {};
            if (!!type) {

                //todo use graphStyleService
                var graphStyle = graphStyleService.getOptions(type);


                //todo combine derived graphStyle
            }

            vm.chartConfig = graphStyle;
            return graphStyle;

        }


        function templateUpdateHandler(event, obj) {


            $window.console.log('feedback called');

            //$window.console.log(event);
            //$window.console.log(obj);
        }

        function _animate() {

            //todo: use ajax to get data from backend.
            if (!!(vm.chartConfig && vm.chartConfig.series) === false) {
                return;
            }

            var trim = function (now, min, max) {
                now = Math.min(now, max);
                now = Math.max(now, min);
                return now;
            };

            var animateData = function (allData) {


                var X = "x", Y = "y", Z = "z",
                    i, sereisData, step = 10;

                for (i in allData) {
                    //[{data: [{x,y,z}, {x, y, z}]}, {data}, {data}]
                    sereisData = allData[i].data;
                    if (!!sereisData === false) {
                        continue;
                    }

                    var rand = Math.random();
                    var signX = rand > 0.6 ? 1 : (rand < 0.3 ? -1 : 0);
                    var signY = rand > 0.4 ? 1 : (rand < 0.2 ? -1 : 0);

                    sereisData.forEach(function (e, idx) {

                        var valX = sereisData[idx][X],
                            valY = sereisData[idx][Y],
                            valZ = sereisData[idx][Z];

                        sereisData[idx][X] = trim(valX + signX * step, 0, 100);
                        sereisData[idx][Y] = trim(valY + signY * step, 0, 120);
                        sereisData[idx][Z] = trim(valZ * (1.5 - rand), 0, 60);

                    });
                }

            }

            var allSeries = vm.chartConfig.series;
            if (allSeries) {
                $interval(function () {
                    animateData(allSeries);
                }, 1000, 40);

            }


        }

        function _print() {

            //todo: detect chart status.

            var chartInstance = vm.chartConfig && vm.chartConfig.getHighCharts();
            if (chartInstance) {
                chartInstance.print();
            }
        }

        function _share() {

        }


    }]);
