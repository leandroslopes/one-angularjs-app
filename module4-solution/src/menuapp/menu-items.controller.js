(function () {
    "use strict";
  
    angular
      .module("MenuApp")
      .controller("MenuItemsController", MenuItemsController);
  
    MenuItemsController.$inject = ["$stateParams", "MenuDataService"];
    function MenuItemsController($stateParams, MenuDataService) {

      var menuItems = this;
      
      var shortName = '';

      shortName = $stateParams.shortName;

      menuItems.categoryName = '';
      menuItems.items = [];

      MenuDataService.getItemsForCategory(shortName)
        .then(function (result) {
          
          var menuItemsResult = [];
          var categoryNameResult = '';

          categoryNameResult = result.category.name;
          menuItemsResult = result.menu_items;

          menuItems.categoryName = categoryNameResult;
          menuItems.items = menuItemsResult;
        });
    }

  })();
  