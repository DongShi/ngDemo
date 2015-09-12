/**
 * Created with JetBrains WebStorm.
 * User: Stone
 * Date: 15/8/19
 * Time: 22:25
 * To change this template use File | Settings | File Templates.
 */

var cardsModule = angular.module('cards',  ['ui.bootstrap']);






cardsModule.controller('cardCtrl', ['card.service', '$modal', 'Upload', '$q', function(cardService, $modal, uploader, $q) {
    var vm = this;

    vm.cardList = cardService.getAll();
    vm.maxToShow = 100;
    vm.cardLayout = 'list';
    vm.addCards = _addCards;
    vm.deleteCard = _deleteCard;
    vm.updateCard = _updateCard;
    vm.searchCard = _searchCard;
    vm.uploadAndCreate = _callModal;
    //////////////////////////

    function _deleteCard(id) {
        var idx = findCardById(id);
        if (idx < 0) {
            return;
        }

        cardService.delete(id);
        vm.cardList.splice(idx, 1);
    }

    function _updateCard(id, options) {
        var idx = findCardById(id);
        if (idx < 0) {
            return;
        }

        var theCard = vm.cardList[idx];
        cardService.updateCard(id, options);
        angular.extend(theCard, options);
    }

    function _addCards(cards) {
        for (var i = 0; i < cards.length; i++) {
            var oneCard = cards[i];
            vm.cardList.addCards(oneCard);
        }
    }

    function _searchCard(keyword) {
        vm.filter = keyword;
    }

    function findCardById(id) {
        for (var i = 0; i < vm.cardList.length; i++) {
            var oneCard = vm.cardList[i];
            if (oneCard.id === id) {
                return i;
            }
        }
        return -1;
    }

    function _callModal(file) {
        if (file && !file.$error) {
            console.log('file uploading');
            var promise = _uploadFiles(file);
            promise.then(updateRawCard, function () {
                console.warn('create failed')
            });
        }
    }

    function updateRawCard(cardId) {
        console.log("modal open");
        $modal.open({
            animation: true,
            templateUrl: '/ngDemo/app/card/card.dataEditor.html',
            controller: 'cardEditorCtrl',
            controllerAs: "cardEditor",
            size: 'lg',
            resolve: {
                rawData: cardService.raw(cardId)
            }
        });
    }


    function _uploadFiles(file) {
        //$scope.f = file;
        var defer = $q.defer();
        if (file && !file.$error) {
            uploader.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                fields: {'username': 'foo.bar', 'command' : 'DICube'},
                file: file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
                console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                defer.resolve('123');
            }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
                defer.reject('upload failed');
            });
        } else {
            defer.reject('bad file');
        }

        return defer.promise;
    }
}]);


cardsModule.controller('cardEditorCtrl', cardEditorCtrl);
cardEditorCtrl.$inject = ['$scope', '$modalInstance', 'rawData'];
function cardEditorCtrl($scope, $modalInstance, rawData) {

    var vm = this;
    vm.rawData = rawData;
    vm.ok = function () {
        $modalInstance.close();
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}


//{
//    "comment"
//:
//    "action.t, 0: upload, 1: publish, 2: get md, 3: execute template",
//        "actions"
//:
//    {
//        [
//            {
//                "t": 0
//            },
//            {
//                "t": 1,
//                "column type": ["A", "A", "M", "M"],
//                "nm": "cube name"
//            },
//            {
//                "t": 2,
//                "did": "data set id"
//            },
//            {
//                "t": 3,
//                "did": "data set id",
//                "template": {
//                    "comment": ""
//                    "tid": "template id",
//                    "ats": [
//                        {
//                            "id": "attribute id",
//                            "fm": "forms",
//                            "fmt": "format"
//                        }
//                    ],
//                    "mts": [
//                        {
//                            "id": "metric id",
//                            "fmt": "format"
//                        }
//                    ]
//                },
//                "rst": "grid/graph"
//            }
//        ]
//    }
//}


cardsModule.factory('card.service', ['$http', '$stateParams', function($http, $stateParams) {

      var userId = $stateParams.user || 0;

      var baseURL = '/cards/';
      var service = {
          raw: getRawCard,
          get: getCard,
          update: updateCard,
          delete: deleteCard,
          getAll: getAllCards
      };

      return service;

    /////////////////////////////
    function getRawCard(id) {
        //testing testing.
        var faked = {id: '1234', title: 'abcd', items: [{'title': 'country', 'type': 'A', 'id': '00001'}, {'title': 'state', 'type': 'A', 'id': '10001'}, {'title': 'population', 'type': 'M', 'id': '00002'}]};
        return faked;
        //testing testing.

        if (!!id) {
            return ajaxFactory('get', {'id': id, type : 'column'});
        }

        var faked = {id: '1234', title: 'abcd', items: [{}, {}, {}]};
        return faked;
    }

    function getCard(id) {
        return ajaxFactory('get', {'id': id});
    }

    function getAllCards(userId) {
        return ajaxFactory('get', {'id': -1});
    }

    function createCard() {
        return ajaxFactory('create');
    }

    function updateCard(id, options) {
        return ajaxFactory('update', options);
    }

    function deleteCard(id) {
        return ajaxFactory('delete', {'id': id});
    }

    function ajaxFactory(method, options) {
        var restURL = getRestURL(method);
        decorateOptions(method, options);

        return $http.post(restURL, options);//.error("http request failed" + method + options);
    }

    function getRestURL(actionType) {
        //todo map action into REST urls.
        var restURL = baseURL;
        switch (actionType) {
            case 'create':
                break;
            case 'update':
                break;
            case 'delete':
                break;
            case 'get':
                break;
            default :
                console.alert("unsupported actions");
                break;

        }

        return restURL;
    }

    function decorateOptions(actionType, options) {
        //todo decorate options.
        var addOn = {};
        switch (actionType) {
            case 'create':
                options.t = 0;
                break;
            case 'update':
                options.t = 1;
                break;
            case 'delete':
                break;
            case 'get':
                options.t = 2;
                break;
            default :
                console.alert("unsupported actions");
                break;
        }

        angular.extend(options, addOn);
    }
}]);
