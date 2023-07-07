(function () {
  "use strict";

  angular.module("data")
    .service("MenuDataService", MenuDataService);

  MenuDataService.$inject = ["$q", "$http"];
  function MenuDataService($q, $http) {
    
    var service = this;

    service.getAllCategories = function () {

        return $http({
            method: "GET",
            url: ("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json")
        }).then(function (result) {
            
            var categories = [];

            categories = result.data;
            
            return categories;

        }).catch(function(error) {
            console.log(error);
        });
    };

    service.getItemsForCategory = function (categoryShortName) {

        var categoryJSON = "";

        categoryJSON = categoryShortName + ".json";

        return $http({
            method: "GET",
            url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + categoryJSON)
        }).then(function (result) {

            var menuItems = [];

            menuItems = result.data;

            return menuItems;

        }).catch(function(error) {
            console.log(error);
        });
    };
  }
  
})();
