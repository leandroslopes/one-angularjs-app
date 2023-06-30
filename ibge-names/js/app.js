(function() {
    'use strict'

    angular.module('IBGENamesApp', [])
        .controller('RankingFilterController', RankingFilterController)
        .service('DecadesService', DecadesService)
        .service('LocationsService', LocationsService)
        .service('RankingNameService', RankingNameService)
        .directive('myHeader', MyHeader)
        .directive('tableList', TableListDirective)
        .constant('APIBasePath', 'https://servicodados.ibge.gov.br');
        
        function MyHeader() {

            var ddo = {
                template: '<h1>Names Ranking</h1>'
            };

            return ddo;
        }

        function TableListDirective() {

            var ddo = {
                templateUrl: 'tableList.html',
                scope: {
                    items: '<'
                },
                controller: TableListDirectiveController,
                controllerAs: 'list',
                bindToController: true,
                link: TableListDirectiveLink
            };
            
            return ddo;
        }

        // DOM Manipulation
        function TableListDirectiveLink(scope, element, attrs, controller) {
            console.log('scope: ', scope);
            console.log('controller: ', controller);
            console.log('element: ', element); 
        }

        function TableListDirectiveController() {

            var list = this;
            
            list.mariaInList = function() {

                for (var i = 0; i < list.items.length; i++) {
                
                    var name = list.items[i].nome;
    
                    if (name.toLowerCase().indexOf('maria') !== -1) {
                        return true;
                    }                
                }
    
                return false;
            }
        }

        RankingFilterController.$inject = ['DecadesService', 'LocationsService', 'RankingNameService'];
        function RankingFilterController(DecadesService, LocationsService, RankingNameService) {
            
            var rankingFilter = this;

            rankingFilter.decade = '1920';
            rankingFilter.location = '2111300';
            rankingFilter.genre = 'M';

            rankingFilter.decades = DecadesService.getList();
            rankingFilter.locations = [];
            rankingFilter.rankingList = [];

            var promise = LocationsService.getList();
            
            promise
            .then(function(response) {

                var responseData = response.data;
                
                rankingFilter.locations = responseData.map(item => ( {code: item.id, name: item.nome} ));
                
            })
            .catch(function(error) {
                console.log(error);
            });           

            rankingFilter.showFilter = function(typeFilter) {
                
                rankingFilter.rankingList = [];

                if (typeFilter === "decade") {
                    rankingFilter.isDecade = true;

                    rankingFilter.isLocation = false;
                    rankingFilter.isGenre = false;
                } else if (typeFilter === "location") {
                    rankingFilter.isLocation = true;

                    rankingFilter.isDecade = false;
                    rankingFilter.isGenre = false;
                } else if (typeFilter === "genre") {
                    rankingFilter.isGenre = true;

                    rankingFilter.isDecade = false;
                    rankingFilter.isLocation = false;
                }
            }

            rankingFilter.getListRanking = function() {
                
                rankingFilter.rankingList = [];
                var rankingNameFilter = {};

                if (rankingFilter.isDecade) {

                    rankingNameFilter = {
                        decada: rankingFilter.decade
                    };

                } else if (rankingFilter.isLocation) {
                    
                    rankingNameFilter = {
                        localidade: rankingFilter.location
                    };

                } else if (rankingFilter.isGenre) {

                    rankingNameFilter = {
                        sexo: rankingFilter.genre
                    };
                }
                
                var otherPromise = RankingNameService.getRankingList(rankingNameFilter);
                
                otherPromise
                .then(function(response) {

                    var responseData = response.data;
                    
                    var arrayNameRanking = responseData[0].res;

                    rankingFilter.rankingList = arrayNameRanking;
                    
                })
                .catch(function(error) {
                    console.log(error.message);
                });
                
            }
        }

        function DecadesService() {

            var decades = this;

            decades.list = ["1920", "1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000", "2010", "2020"];

            decades.getList = function() {

                return decades.list;
            }
        }

        LocationsService.$inject = ['$http', 'APIBasePath'];
        function LocationsService($http, APIBasePath) {

            var locations = this;

            locations.getList = function() {
                
                var response = $http({
                    method: 'GET',
                    url: (APIBasePath + '/api/v1/localidades/municipios'),
                    params: { orderBy: 'nome' }
                });
                
                return response;
            }
        }

        RankingNameService.$inject = ['$http', 'APIBasePath'];
        function RankingNameService($http, APIBasePath) {

            var rankingName = this;

            rankingName.getRankingList = function(filter) {
                
                var response = $http({
                    method: 'GET',
                    url: (APIBasePath + '/api/v2/censos/nomes/ranking'),
                    params: filter
                });

                return response;
            }
        }

})();