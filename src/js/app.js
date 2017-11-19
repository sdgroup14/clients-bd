(function () {
    'use strict';

    function AppCtrl($scope, $rootScope, $filter, $timeout, $http, $compile) {

        $scope.tagsContainerShow = false;
        $scope.tagsAddShow = true;

        angular.element(document).on('click', function (e) {
            if ($scope.tagsContainerShow) {
                $timeout(function () {
                    $scope.tagsContainerShow = false;
                }, 1);
            }
        });
        angular.element(document).on('click','.choosen-tag-del', function (e) {
            angular.element(e.target).parent().remove();
        });

        $scope.showTagsContainer = function () {
            $timeout(function () {
                $scope.tagsContainerShow = true;
            }, 1);
        };

        var _query;

        $scope.addTagToDb = function () {
            var data = new Object;
            data.tag_name = _query;
            var senddata = '';
            senddata = JSON.stringify(data);

            $http({
                method: 'post',
                data: senddata,
                url: 'http://summit.icreations.agency/db_source/tags.php'
            }).then(function (response) {
                $scope.new_tag = response.data;
                var new_tag_item_html = '<div class="choosen-tag" tag-id="'+$scope.new_tag.id+'"><span>'+$scope.new_tag.name+'</span><div class="choosen-tag-del"></div></div>';
                angular.element(document.querySelector('.inp-tags-result')).append($compile(new_tag_item_html)($scope));
                $scope.searchTags = null;
                $scope.tagsContainerShow = false;
            }, function (error) {
                console.log(error);
            });
        };

        $scope.addTagToForm = function (value, id) {
            var tag_item_html = '<div class="choosen-tag" tag-id="'+id+'"><span>'+value+'</span><div class="choosen-tag-del"></div></div>';
            angular.element(document.querySelector('.inp-tags-result')).append($compile(tag_item_html)($scope));
            $scope.tagsContainerShow = false;
            $scope.searchTags = null;
        }

        $scope.tags = [];

        $scope.$watch("searchTags", function (query) {
            _query = query;
            if (!query) {
                $scope.tagsContainerShow = false;
            } else if (query) {
                $scope.tagsContainerShow = true;
                $http({
                    method: 'get',
                    url: 'http://summit.icreations.agency/db_source/tags.php?get=one&word=' + _query
                }).then(function (response) {
                    $scope.tags = response.data;
                }, function (error) {
                    console.log(error);
                });
            } else {
                return false
            }
        });


        $scope.save = function ($event, company, companyForm){
            $event.preventDefault();
            // if(companyForm.$valid){
            //     console.log(company.title);
            //     console.log(company.site);
            //     console.log(company.country);
            //     console.log(company.email);
            //     console.log(company.desc);
            //     console.log(company);
            // company.tags =
            //     function () {
                    angular.forEach(angular.element(document.querySelector('.choosen-tag')), function(value, key){
                        // var a = angular.element(value);
                        // a.addClass('ss');
                        console.log(value);
                        console.log(key);
                    });
                // }
            // }
        };
    };

    AppCtrl.$inject = ['$scope', '$rootScope', '$filter', '$timeout', '$http', '$compile'];
    angular
        .module('clients_db', [])
        .controller('AppCtrl', AppCtrl);

})();