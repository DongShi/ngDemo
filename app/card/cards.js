/**
 * Created with JetBrains WebStorm.
 * User: Stone
 * Date: 15/8/19
 * Time: 22:25
 * To change this template use File | Settings | File Templates.
 */

var cardsModule = angular.module('cards',  ['ui.bootstrap']);






cardsModule.controller('cardCtrl', ['card.service', '$modal',  function(cardService, $modal) {
    var vm = this;

    vm.cardList = cardService.getAll();
    vm.maxToShow = 100;
    vm.cardLayout = 'list';
    vm.addCards = _addCards;
    vm.deleteCard = _deleteCard;
    vm.updateCard = _updateCard;
    vm.searchCard = _searchCard;
    vm.tryModal = _tryModal;
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

    function _tryModal() {
        console.log("modal open");
        $modal.open({
            animation: true,
            templateUrl: '/ngDemo/app/card/dataEditor.html',
            //controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
            }
        });
    }


}]);


cardsModule.factory('card.service', ['$http', '$stateParams', function($http, $stateParams) {

      var userId = $stateParams.user || 0;

      var baseURL = '/cards/';
      var service = {

          get: getCard,
          update: updateCard,
          delete: deleteCard,
          getAll: getAllCards
      };

      return service;

    /////////////////////////////
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

        return $http.post(restURL, options);
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

        angular.extend(options, addOn);
    }



}]);

