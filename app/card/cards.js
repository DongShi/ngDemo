/**
 * Created with JetBrains WebStorm.
 * User: Stone
 * Date: 15/8/19
 * Time: 22:25
 * To change this template use File | Settings | File Templates.
 */

var cards = angular.module('cards', []);



cards.factory('card.service', ['$http', function($http) {

      var userId = $stateParams.user || 0;
      var URL = '/card/' + userId;
      var cardList = [];



      var result = $http.get(URL).then(function(responese) {


      });


      return {
          getCards: function(){
              return cardList;
          },

          getOneCard: function(id) {
              if (id >= 0 && id < cardList.length) {
                  return cardList[id];

              }
          },

          removeOneCard: function(idx) {
              cardList.splice(idx, 1);
          }
      };




}]);




