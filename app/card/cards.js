/**
 * Created with JetBrains WebStorm.
 * User: Stone
 * Date: 15/8/19
 * Time: 22:25
 * To change this template use File | Settings | File Templates.
 */

var cardsModule = angular.module('cards', []);




cardsModule.controller('cardCtrl', ['card.service', function(cardService) {
    var vm = this;

    vm.cardList = cardService.getAll();
    vm.maxToShow = 100;
    vm.cardLayout = 'list';
    vm.deleteCard = _deleteCard;
    vm.updateCard = _updateCard;
    //////////////////////////


    function _deleteCard(id) {

    }

    function _updateCard(id, options) {

    }

    function findById(id) {

    }


}]);


cardsModule.factory('card.service', ['$http', '$stateParams', function($http, $stateParams) {

      var userId = $stateParams.user || 0;

      var baseURL = '/card/';
      var cardList = [];
      var service = {

          get: getCard,
          update: updateCard,
          delete: deleteCard,
          getAll: getAllCards
      };

      return service;

    /////////////////////////////
    function getCard(id) {
        if (id >= 0 && id < cardList.length) {
            return cardList[id];

        }
    }

    function getAllCards() {

    }

    function updateCard(id, options) {

    }

    function deleteCard(idx) {
        cardList.splice(idx, 1);
    }

    function ajaxFactory(method, options) {

    }


}]);




