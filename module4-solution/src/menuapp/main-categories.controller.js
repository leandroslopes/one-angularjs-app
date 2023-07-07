(function () {
    "use strict";
  
    angular
      .module("MenuApp")
      .controller("MainCategoriesController", MainCategoriesController);
  
    MainCategoriesController.$inject = ["items"];
    function MainCategoriesController(items) {

      var mainCategories = this;
      
      mainCategories.items = items;
    }

  })();
  