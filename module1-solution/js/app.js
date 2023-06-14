(function() {
    'use strict'

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', ['$scope', MyAppController]);
        
        MyAppController.$inject = ['$scope'];

        function MyAppController($scope) {
            
            $scope.lunch = '';
            $scope.emptyLunch = false;
            $scope.canEnjoy = false;
            $scope.isMuch = false;
            $scope.hasArrayEmptyElement = false;
            
            $scope.checkLunch = function() {
                
                var lunch = $scope.lunch;

                if (lunch === '') {

                    $scope.canEnjoy = false;
                    $scope.isMuch = false;
                    $scope.hasArrayEmptyElement = false;

                    $scope.emptyLunch = true;

                } else {

                    var arrayLunch = lunch.split(',');                    

                    $scope.hasArrayEmptyElement = arrayLunch.includes("") || arrayLunch.includes(" ");

                    var newArrayLunch = arrayLunch.filter(function (el) {
                        if (el !== "") {
                            return el;
                        }
                    });

                    var newArrayLunch2 = arrayLunch.filter(function (el) {
                        if (el !== " ") {
                            return el;
                        }
                    });

                    if (newArrayLunch2.length <= 3) {

                        $scope.emptyLunch = false;
                        $scope.isMuch = false;

                        $scope.canEnjoy = true;

                    } else if (newArrayLunch2.length > 3) {

                        $scope.emptyLunch = false;
                        $scope.canEnjoy = false;
            
                        $scope.isMuch = true;

                    }
                }

            };

        }
})();