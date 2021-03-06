(function () {
    'use strict';

    function AppCtrl($scope, $rootScope, $filter, $timeout, $http, $compile, $anchorScroll, $location) {

        $scope.tagsContainerShow = false;
        $scope.titleContainerShow = false;
        // $scope.typeContainerHide= true;
        // $scope.typeContainerShow = false;
        // $favourite = false;
        //

        // $scope.hideTypeContainer = function () {
        //  $scope.typeContainerHide= true;
        // }
        // $scope.showTypeContainer = function (e) {
        //  $scope.typeContainerShow= true;
        // }

        // $scope.divShow = "db-item-types-dropdown-";

        // $scope.show = function(arg) {
        //  // $scope.divShow = $scope.divShow + arg;
        //  console.log($scope.divShow + arg);
        //  return 'db-item-types-dropdown-' + arg
        // }

        // $scope.favorite = function(data) {
        //  //use $http or $resource to update the data in backend
        //  //for example if you used $resource service
        //  // data.favorite = !data.favorite;
        //  // data.$save();
        // };


        $scope.tagsAddShow = true;
        $scope.formVisible = false;

        $scope.showForm = function () {
            $scope.formVisible = !$scope.formVisible;
        }

        // $('body').on('click', '.db-item-types-wrapper', function () {
        //  $('.db-item-types-dropdown').hide();
        //    $(this).find('.db-item-types-dropdown').show();
        // });

// $('body').on('click', '.types-radio-item', function () {
// 	        // $('.db-item-types-dropdown').hide();
// 	$timeout(function () {
// 		$('.db-item-types-dropdown').hide();
// 	}, 1);
//         });


        // $(document).on('click', function(e) {
        //    if (!e.target.closest('.db-item-types-wrapper')) {
        //     $('.db-item-types-dropdown').css('display','none');
        //    }
        // });

        $scope.selectedLabelColor = function (company, label) {

            if (company !== null) {
                if (company.color == label.color) {
                    return 'ffffff'
                }
            }
        };
        $scope.selectedLabelBgColor = function (company, label) {

            if (company !== null) {
                if (company.color == label.color) {
                    return label.color
                }
            }
        };
        // $scope.clickedLabelBgColor = function (company, label) {
        //
        //     if(company !== null) {
        //         if(company.color == label.color) {
        //             console.log(company);
        //             console.log(label);
        //             return label.color
        //         }
        //     }
        // };




        angular.element(document).on('click', function (e) {
            if ($scope.tagsContainerShow) {
                $timeout(function () {
                    $scope.tagsContainerShow = false;
                }, 1);
            }
        });


// angular.element(document).on('click', function (e) {
//                 $timeout(function () {
//                     $('.')
//                 }, 1);
//         });


        // angular.element(document).on('click', function (e) {
        //     // if ($scope.typeContainerShow) {
        //     //     angular.forEach($scope.companyList, function (currentItem) {
        //     //         currentItem.showfull = currentItem === item && !currentItem.showfull;
        //     //     });
        //     // }
        // });



        angular.element(document).on('click', function (e) {
            if ($scope.titleContainerShow) {
                $timeout(function () {
                    $scope.titleContainerShow = false;
                }, 1);
            }
        });


        angular.element(document).on('click', '.choosen-tag-del', function (e) {
            angular.element(e.target).parent().remove();
        });


        angular.element(document).on('click', '.delete-company', function (e) {
            angular.element(e.target).parents('.db-row-content').remove();
        });
        $scope.clipboardCopy = function () {
            // this.company.email;
            // this.company.email
            // document.execCommand('copy');
            var tmpInput = $('<input>');
            tmpInput.val(this.company.email);
            $('body').append(tmpInput);
            tmpInput.select();
            document.execCommand('copy');
            tmpInput.remove();
        }


        $scope.showTagsContainer = function () {
            $timeout(function () {
                $scope.tagsContainerShow = true;
            }, 1);
        };


        $scope.showTitleContainer = function () {
            $timeout(function () {
                $scope.titleContainerShow = true;
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
                var new_tag_item_html = '<div class="choosen-tag" tag-id="' + $scope.new_tag.id + '"><span>' + $scope.new_tag.name + '</span><div class="choosen-tag-del"></div></div>';
                angular.element(document.querySelector('.inp-tags-result')).append($compile(new_tag_item_html)($scope));
                $scope.searchTags = null;
                $scope.tagsContainerShow = false;
            }, function (error) {
                console.log(error);
            });
        };

        $scope.addTagToForm = function (value, id) {
            var tag_item_html = '<div class="choosen-tag" tag-id="' + id + '"><span>' + value + '</span><div class="choosen-tag-del"></div></div>';
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
        $scope.$watch("company.title", function (query) {
            // http://summit.icreations.agency/db_source/contacts.php?get=title&word=словодляпоиска

            _query = query;
            if (!query) {
                $scope.titleContainerShow = false;
            } else if (query) {
                $scope.titleContainerShow = true;
                $http({
                    method: 'get',
                    url: 'http://summit.icreations.agency/db_source/contacts.php?get=title&word=' + _query
                }).then(function (response) {
                    $scope.titles = response.data;
                    console.log($scope.titles);
                }, function (error) {
                    console.log(error);
                });
            } else {
                return false
            }
        });


        $scope.save = function ($event, company, companyForm) {
            $event.preventDefault();
            var tags_arr = [];
            company.tags = (function () {
                angular.forEach(angular.element($('.choosen-tag')), function (item, key) {
                    return tags_arr[key] = item.attributes['tag-id'].value;
                });
                return tags_arr.join(',')
            })();

            var send_company = JSON.stringify(company);


            $http({
                method: 'post',
                data: send_company,
                url: 'http://summit.icreations.agency/db_source/contacts.php'
            }).then(function (response) {
                $scope.new_company_id = response.data;
                ClearMyForm($event, company)
                angular.element(document.querySelector('.db-table-content-box')).scrollTop(0);
                $http({
                    method: 'get',
                    url: 'http://summit.icreations.agency/db_source/contacts.php?get=one&id=' + $scope.new_company_id
                }).then(function (response) {
                    $scope.new_company = response.data;
                    var new_company_html = '<div class="db-row db-row-content" company-id="' + $scope.new_company.id + '" > <div class="db-col"> <div class="db-item-header"><a href="' + $scope.new_company.site + '" target="_blank">' + $scope.new_company.title + '</a></div> <div class="subdivisions"> <div class="sd-it">приложение</div> <div class="sd-it">управление</div> <div class="sd-it">ферма</div> <div class="sd-it">аналитика</div> <div class="sd-it">агро</div> </div> </div> <div class="db-col"> <div class="company-email"> <svg class="icon-svg-email"> <use xlink:href="img/sprite.svg#email" xmlns:xlink="http:/*www.w3.org/1999/xlink"></use>*/ </svg> <span>' + $scope.new_company.email + '</span> </div> <div class="company-project">' + $scope.new_company.type + '</div> </div> <div class="db-col"> <div class="company-country">' + $scope.new_company.country + '</div> <div class="delete-company" ng-click="removeItem(companyList, company)">удалить</div> </div> </div>';
                    angular.element(document.querySelector('.db-table-content-box')).prepend($compile(new_company_html)($scope));
                }, function (error) {
                    console.log(error);
                });

                // "[{'id':33,'name':'софт'},{'id':37,'name':'разработчики'}]"
            }, function (error) {
                console.log(error);
            });
        };

        $scope.clearForm = function ($event, company, companyForm) {
            ClearMyForm($event, company);
	        $scope.formVisible = false;
        };

        $http({
            method: 'get',
            url: 'http://summit.icreations.agency/db_source/contacts.php?get=all'
        }).then(function (response) {
            $scope.companyList = response.data;
            console.log($scope.companyList);
            $scope.getFirstChar = function (str) {
                var new_str;
                if (str) {
                    new_str = str.substr(-999, 2)
                } else {
                    new_str = "KO";
                }
                return new_str
            };

            // $scope.getFirstChar = function (color) {
            //     var new_color = color;
            //     return new_color
            // };


            $scope.expand = function (item) {

                angular.forEach($scope.companyList, function (currentItem) {
                    currentItem.showfull = currentItem === item && !currentItem.showfull;
                });
            };

            // $scope.bodyHideLabels = function () {
            //     $timeout(function () {
            //         angular.forEach($scope.companyList, function (currentItem) {
            //             currentItem.showfull = false;
            //         });
            //     },1111)
            //
            //
            // }

        }, function (error) {
            console.log(error);
        });


     // $scope.hideThis = true;

        $http({
            method: 'get',
            url: 'http://summit.icreations.agency/db_source/labels.php?get=all'
        }).then(function (response) {
            $scope.companyLabels = response.data;

                angular.element(document).on('click', '.types-radio-item', function () {
                $(this).closest('.db-item-types-wrapper').css('backgroundColor', '#' + $(this).find('div').attr('data-color'));
	                var str =$(this).text();
                $(this).closest('.db-item-types-wrapper').find('.db-item-types').text($.trim(str).substr(-999, 2));
                $(this).closest('.db-item-types-wrapper').find('.db-item-types').text($.trim(str).substr(-999, 2));


            });



        }, function (error) {
            console.log(error);
        });


        function ClearMyForm(event, company) {
            event.preventDefault();
            angular.copy({}, company);
            angular.element(document.querySelector('.inp-tags-result')).html('');

        };

        $scope.getDataLabel = function (company, label, item) {
            var label_data = {
                contact_id: company.id,
                label_id: label.id,
                label_name: label.name,
                label_color: label.color
            };
            var send_label_data = JSON.stringify(label_data);
            $http({
                method: 'post',
                data: send_label_data,
                url: 'http://summit.icreations.agency/db_source/labels.php'
            }).then(function (response) {
                console.log(response);
	              console.log(label_data);

	            angular.forEach($scope.companyList, function (currentItem) {
		            currentItem.showfull = currentItem === item && !currentItem.showfull;
	            });

            }, function (error) {
                console.log(error);
            });
        };


    };

    AppCtrl.$inject = ['$scope', '$rootScope', '$filter', '$timeout', '$http', '$compile'];
    angular
        .module('clients_db', [])
        .controller('AppCtrl', AppCtrl);

})();