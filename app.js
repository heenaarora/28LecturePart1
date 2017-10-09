(function() {
  'use strict';

  angular.module('ShoppingListCustomDirectiveApp', [])
  .controller('ShoppingListController1', ShoppingListController1)
  .controller('ShoppingListController2', ShoppingListController2)
  .directive('listItemDescription', ListItemDescription)
  .directive('shoppingList', ShoppingList)
  .factory('ShoppingListFactory', ShoppingListFactory);

  function ShoppingList() {
    var ddo = {
      templateUrl: 'shoppingList.html',
      scope: {
        list: '=myList',
        title:'@title'
      }
    };
    return ddo;
  }

  function ListItemDescription() {
    var ddo = {
      template: '{{ item.quantity }} of {{ item.name }}'
    };
    return ddo;
  }

  ShoppingListController1.$inject = ['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory) {
    var list1 = this;
    var shoppingList = ShoppingListFactory();

    list1.items = shoppingList.getItems();

    var origTitle = "Shopping List #1";
    list1.title = origTitle + " :" + list1.items.length ;

    list1.itemName = "";
    list1.itemQuantity = "";

    list1.addItem = function () {
      try {
        shoppingList.addItem(list1.itemName,list1.itemQuantity);
        list1.title = origTitle + " :" + list1.items.length;
      } catch (error) {
        list1.errorMessage = error.message;
      }
    }

    list1.removeItem = function (itemIndex) {
      shoppingList.removeItem(itemIndex);
      list1.title = origTitle + " :" + list1.items.length;
    }

  }


  ShoppingListController2.$inject = ['ShoppingListFactory'];
  function ShoppingListController2(ShoppingListFactory) {
    var list2 = this;
    var shoppingList = ShoppingListFactory(3);

    list2.items = shoppingList.getItems();

    list2.itemName = "";
    list2.itemQuantity = "";

    list2.addItem = function () {
      try {
        shoppingList.addItem(list2.itemName,list2.itemQuantity);
      } catch (error) {
        list2.errorMessage = error.message;
      }
    }

    list2.removeItem = function (itemIndex) {
      shoppingList.removeItem(itemIndex);
    }

  }

  function ShoppingListFactory(){
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
    }
    return factory;
  }

  function ShoppingListService(maxItems) {
    var service = this;
    var items = [];

    service.addItem = function (itemName, itemQuantity) {
      if((maxItems === undefined) ||
      (maxItems !== undefined) && (items.length <maxItems)){
        var item = {
          name: itemName,
          quantity: itemQuantity
        };
        items.push(item);
      }
      else {
        throw new Error("Max items (" + maxItems +") reached.");
      }
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex,1);
    };

    service.getItems = function () {
      return items;
    };

  }

})();
