(function () {
  "use strict";
  
  angular.module("MenuApp")
  .config(RoutesConfig);
  
  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
  
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');
  
    // *** Set up UI states ***
    $stateProvider
  
    // Home page
    .state("home", {
      url: '/',
      templateUrl: "src/menuapp/templates/home.template.html"
    })
  
    // Premade list page
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menuapp/templates/main-categories.template.html',
      controller: 'MainCategoriesController as mainCategories',
      resolve: {
        items: ["MenuDataService", function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    
    .state('items', {
      url: '/items/{shortName}',
      templateUrl: 'src/menuapp/templates/menu-items.template.html',
      controller: 'MenuItemsController as menuItems',
      params: {
        shortName: null
      }
    });
  }
  
  })();