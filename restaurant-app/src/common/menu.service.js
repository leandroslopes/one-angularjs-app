(function () {
    "use strict";

    angular.module("common")
        .service("MenuService", MenuService);

    MenuService.$inject = ["$http", "ApiPath"];
    function MenuService($http, ApiPath) {
        
        var service = this;

        service.getCategories = function () {
            
            return $http
                .get(ApiPath + "/categories.json")
                .then(function (response) {
                    return response.data;
                });
        };

        service.getMenuItems = function (category) {

            var categoryJSON = "";

            categoryJSON = category + ".json";

            return $http
                .get(ApiPath + "/menu_items/" + categoryJSON)
                .then(function (response) {
                    return response.data;
                });
        };

        service.getMenuItem = function (menuItem) {

            var menuItemArray = menuItem.toUpperCase().split("");
            
            return $http
                .get(ApiPath + 
                    "/menu_items/" + menuItemArray[0] + 
                    "/menu_items/" + menuItemArray[1] + ".json")
                .then(function (response) {
                    
                    return response.data;
                });
        }
    }
})();