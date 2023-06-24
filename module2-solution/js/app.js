(function() {
    'use strict'

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
        
        ToBuyController.$inject = ['ShoppingListCheckOffService'];
        function ToBuyController(ShoppingListCheckOffService) {

            var toBuy = this;
            
            toBuy.items = ShoppingListCheckOffService.getListToBuy();

            toBuy.bought = function(indexItem) {

                ShoppingListCheckOffService.bought(indexItem);
            }
        }

        AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
        function AlreadyBoughtController(ShoppingListCheckOffService) {

            var alreadyBought = this;

            alreadyBought.items = ShoppingListCheckOffService.getListAlreadyBought();
        }

        function ShoppingListCheckOffService() {

            var service = this;
            var toBuy = [
                { name: "cookie", quantity: 10 },
                { name: "rice", quantity: 9 },
                { name: "beans", quantity: 8 },
                { name: "meat", quantity: 7 },
                { name: "salad", quantity: 6 },
                { name: "potato", quantity: 5 },
                { name: "cupcake", quantity:4 },
            ];
            var alreadyBought = [];

            service.getListToBuy = function() {
                return toBuy;
            }

            service.getListAlreadyBought = function() {
                return alreadyBought;
            }

            service.bought = function(indexItem) {

                var item = toBuy.at(indexItem); // Get Element
                
                toBuy.splice(indexItem, 1); // Remove Element

                alreadyBought.push(item); // Add Element
            }
        }
})();