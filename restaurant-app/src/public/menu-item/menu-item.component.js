(function () {
    "use strict";
  
    angular.module("public")
        .component("menuItem", {
            templateUrl: "src/public/menu-item/menu-item.html",
            bindings: {
                menuItem: '<'
            },
            controller: MenuItemController
        });

    MenuItemController.$inject = ["ApiPath", "ApiPathImages"];
    function MenuItemController(ApiPath, ApiPathImages) {

        var $ctrl = this;

        $ctrl.basePath = ApiPath;
        $ctrl.basePathImages = ApiPathImages;
    }

  })();