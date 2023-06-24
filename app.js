(function() {
    'use strict'

    angular.module('MyApp', [])
        .controller('MyAppController', MyAppController)
        .filter('loves', LovesFilter);
        
        MyAppController.$inject = ['$scope', '$filter', 'lovesFilter'];

        function MyAppController($scope, $filter, lovesFilter) {
            $scope.name = 'Lopes';
            $scope.stateOfBeing = 'hungry';
            $scope.cookieCost = .45;

            $scope.feed = function() {
                $scope.stateOfBeing = 'nohungry';
            };

            $scope.sayLovesMessage = function() {
                var msg = 'Leandro likes Kerly!!!';
                //msg = lovesFilter(msg);
                return msg;
            };
        }

        function LovesFilter() {
            return function (input) {
                input = input || "";
                input = input.replace("likes", "loves");
                return input;
            }
        }
})();