(function() {
    'use strict'

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('APIBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com');

        function FoundItemsDirective() {

            var ddo = {
                templateUrl: 'tableList.html',
                scope: {
                    items: '<',
                    onRemove: '&'
                },
                controller: FoundItemsDirectiveController,
                controllerAs: 'list',
                bindToController: true,
            };
            
            return ddo;
        }

        function FoundItemsDirectiveController() {

            var list = this;
        }

        NarrowItDownController.$inject = ['MenuSearchService'];
        function NarrowItDownController(MenuSearchService) {
            
            var narrowItDown = this;

            narrowItDown.searchTerm = '';
            narrowItDown.isSearchTermEmpty = false;
            narrowItDown.hasItem = false;
            narrowItDown.list = [];

            narrowItDown.getListRanking = function() {
                
                var searchTerm = '';

                narrowItDown.list = [];
                narrowItDown.isSearchTermEmpty = false;
                narrowItDown.hasItem = false;
                narrowItDown.hasRemovedAll = false;
                narrowItDown.hasRemovedAll = false;

                searchTerm = narrowItDown.searchTerm;

                if (searchTerm === '') {

                    narrowItDown.isSearchTermEmpty = true;

                } else {

                    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                    
                    promise
                    .then(function(result) {
                        
                        narrowItDown.list = result;

                        if (narrowItDown.list.length === 0)
                            narrowItDown.hasItem = true;
                    });
                }
                
            }

            narrowItDown.removeItem = function(itemIndex) {

                narrowItDown.list.splice(itemIndex, 1);

                if (narrowItDown.list.length === 0)
                    narrowItDown.hasRemovedAll = true;
            }
        }

        MenuSearchService.$inject = ['$http', 'APIBasePath'];
        function MenuSearchService($http, APIBasePath) {

            var menuSearch = this;

            menuSearch.getMatchedMenuItems = function(searchTerm) {
                
                return $http({
                    method: 'GET',
                    url: (APIBasePath + '/menu_items.json')
                }).then(function (result) {
                    
                    var foundItems = [];
                    var menuListResult = {};
                    var searchTermLowerCase = '';

                    searchTermLowerCase = searchTerm.toLowerCase();
                    menuListResult = result.data;
                    
                    for (const key in menuListResult) {

                        menuListResult[key].menu_items.forEach(item => {
                           
                            var descriptionItemLowerCase = item.description.toLowerCase();

                            if (descriptionItemLowerCase.includes(searchTermLowerCase)) {

                                foundItems.push(item);
                            }
                        });
                    }
                    
                    return foundItems;

                }).catch(function(error) {
                    console.log(error.message);
                });
            }
        }

})();