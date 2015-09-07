/**
 * Created with JetBrains WebStorm.
 * User: Stone
 * Date: 9/1/15
 * Time: 22:09
 * To change this template use File | Settings | File Templates.
 */

(function () {
    'use strict';
    angular.module('st-common', []);
})();



//todo add directive live template.

(function () {
    'use strict';


    angular.module('st-common').directive('stTestable',  function() {

      return {
        restrict: 'EA',
        replace: true,
        scope: {
          onLoad: '&?'
        },

        template: '<div>wa haha</div>',


        controller: function($scope) {

            var api = {

                fun1: function(){alert("x")},
                fun2: function(){alert("y")}
            },

            spinnerService = {
                x: 123,
                y: 345
            };


            if ($scope.onLoad) {
                $scope.onLoad({
                    spinnerService: spinnerService,
                    spinnerApi: api
                });
            }

        }

    }
    }
);






})();
