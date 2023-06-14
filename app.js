(function() {
    'use strict'

    angular.module('MyApp', [])
        .controller('MyAppController', ['$scope', '$filter', MyAppController]);
        
        MyAppController.$inject = ['$scope', '$filter'];

        function MyAppController($scope, $filter) {
            $scope.name = 'Lopes';
            $scope.stateOfBeing = 'hungry';

            $scope.feed = function() {
                $scope.stateOfBeing = 'nohungry';
            };
        }
})();