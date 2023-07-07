(function () {
    "use strict";
  
    angular.module("MenuApp")
      .component("menuItems", {
      templateUrl: "src/menuapp/templates/menu-items.template.html",
      bindings: {
        items: "<",
      },
    });
  
  })();