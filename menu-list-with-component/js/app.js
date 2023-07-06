(function() {
    'use strict'

    angular.module('NarrowItDownComponentApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .component('foundItems', {
            templateUrl: 'tableList.html',
            controller: FoundItemsComponentController,
            bindings: {
                items: '<',
                onRemove: '&'
            }
        })
        .component('loadingSpinner', {
            templateUrl: 'loadingSpinner.html',
            controller: LoadingSpinnerController
        })
        .constant('APIBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com');

        LoadingSpinnerController.$inject = ['$rootScope'];
        function LoadingSpinnerController($rootScope) {

            var $ctrl = this;

            $rootScope.$on('narrowItDown:processing', function (event, data) {
                
                if (data.on) 
                    $ctrl.showSpinner = true;
                else
                    $ctrl.showSpinner = false;
            });
        }

        FoundItemsComponentController.$inject = [];
        function FoundItemsComponentController() {

            var $ctrl = this;

            $ctrl.remove = function(myIndex) {

                $ctrl.onRemove({ index: myIndex });
            }

            $ctrl.$onInit = function() {
                console.log('onInit');
            }

            $ctrl.$onChanges = function(chanceObject) {
            }

            $ctrl.$postLink = function() {
            }
        }

        NarrowItDownController.$inject = ['MenuSearchService', '$rootScope', '$timeout'];
        function NarrowItDownController(MenuSearchService, $rootScope, $timeout) {
            
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

                    $rootScope.$broadcast('narrowItDown:processing', {on: true});

                    $timeout(function () {

                        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                    
                        promise
                        .then(function(result) {
                            
                            narrowItDown.list = result;

                            if (narrowItDown.list.length === 0)
                                narrowItDown.hasItem = true;

                        }).finally(function (params) {
                            
                            $rootScope.$broadcast('narrowItDown:processing', {on: false});
                        });

                    }, 5000);
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