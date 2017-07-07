(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('detCustomerListCommonController', detCustomerListCommonController);

    /** @ngInject */
    function detCustomerListCommonController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;
        vm.serviceTags = []
        vm.$stateParams = $stateParams;
        vm.companyLevel = false;
        //TODO:这一段代码不能随便修改    start
        vm.commL = commDict;
        var l_uri = xxCacheSrv.mkKey($state.current.name, $state.params);
        vm.query = xxCacheSrv.get(l_uri);

        $scope.$on("$destroy", function() {
            xxCacheSrv.put(l_uri, vm.query);
        });
        //TODO:这一段代码不能随便修改    end
        // 获取所属行业select值 接口
        var datas = $resource("/api/company/query/sysGencodeList");
        datas.get({}, function(response) {
            if (response.code == 0) {
                vm.sysGencodeList = response.data[0];
            }
        })

        function lastOperationTime() {
            //TODO: 当前接口用于获取id值，为线索客户，目标客户，合作客户的列表显示最后操作时间做判断   end
            var datas = $resource("/api/assign/update/assignUpdateDate")
            datas.get({
                id: vm.listDatas.id
            }, function(response) {
                if (response.code == 0) {
                    // console.log(response);
                }
            })
        }
        vm.goBackPage = function() {
            $state.go($stateParams.from + '.list')
        }
        $scope.$on("detCustomerListStateParams", function(evt, msg) {
            $stateParams = msg;
            vm.stateInfo = msg;
            vm.query = {
                companyId: $stateParams.id,
                id: $stateParams.sourceId
            }
            var datas = $resource("/api/company/query/resourceInfo")
            datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    vm.listDatas = response.data[0];
                    if (vm.listDatas.companyType != 1) {
                        vm.companyLevel = true;
                    }
                    if (vm.listDatas.serviceTag) {
                        vm.serviceTags = vm.listDatas.serviceTag.split('/')
                    }
                    $scope.$broadcast('detCustomerListGetUserListCompanyId', {
                        companyId: vm.listDatas.companyId,
                        userId: vm.listDatas.entCompanyVo.id,
                        contactId: vm.listDatas.accContactsVo.id,
                        resourceId: vm.listDatas.id
                    });
                }
            })
        })

        vm.srvTagIn = function(id) {
            var flag = false;
            for (var idx = 0; idx < vm.serviceTags.length; idx++) {
                if (id == vm.serviceTags[idx]) {
                    flag = true;
                    break;
                }
            }
            return flag
        }

        vm.calling = function(url) {
            $.ajax({
                url: url,
                dataType: "jsonp",
                success: function(msg) {}
            });
        }
        vm.serviceTagChoice = function(id) {
            var flag = true;
            for (var idx = 0; idx < vm.serviceTags.length; idx++) {
                if (id * 1 == vm.serviceTags[idx] * 1) {
                    vm.serviceTags.splice(idx, 1)
                    flag = flag && false;
                }
            }

            if (flag) {
                vm.serviceTags.push(id)
            }
            // vm.choiceType();
            getCompanyInfo();
        }

        vm.choiceType = function(val) {
            vm.listDatas.companyType = val;

            if (val == 1) {
                vm.companyLevel = false
            } else {
                vm.companyLevel = true;
            }
            getCompanyInfo();
        }

        vm.choiceLevel = function(val) {

            vm.listDatas.companyLevel = val;
            getCompanyInfo();
        }

        function getCompanyInfo() {
            var datas = $resource("/api/company/update/resourceInfo")
            datas.get({
                    id: vm.listDatas.id,
                    companyId: $stateParams.id,
                    companyLevel: vm.listDatas.companyLevel,
                    companyType: vm.listDatas.companyType,
                    serviceTag: vm.serviceTags.join('/')
                }, function(response) {
                    if (response.code == 0) {
                        // console.log(response);
                    }
                })
                //定义最后操作时间方法  lastOperationTime
            lastOperationTime();
        }

        vm.editDocument = function(row) {
                ModalService.showModal({
                    templateUrl: "app/modules/detCustomerList/editSource.html",
                    controller: "editDetailsController",
                    controllerAs: "modal",
                    inputs: {
                        info: angular.copy(row)
                    }
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(result) {
                        if (result) {
                            var datas = $resource("/api/company/update/company");
                            datas.save({
                                id: result.datas.id,
                                name: result.datas.name,
                                companyWebsite: result.datas.companyWebsite,
                                industry: result.datas.industry,
                                scale: result.datas.scale,
                                property: result.datas.property,
                                address: result.datas.address,
                                shortDesc: result.datas.shortDesc,
                                companyId: result.datas.companyId,
                                user: result.datas.user,
                                mobile: result.datas.mobile,
                                phone: result.datas.phone,
                                email: result.datas.email,
                                job: result.datas.job,
                                qq: result.datas.qq,
                                weixin: result.datas.weixin,
                                ext: result.datas.ext
                            }, function(response) {
                                if (response.code == 0) {
                                    $state.reload();
                                }
                            })
                        }
                    });
                }).catch(function(error) {
                    // error contains a detailed error message.
                });
            }
            //设置空号接口
          vm.setEmpty = function() {
            var datas = $resource("/api/company/moveTo/Empty")
            datas.save({
                    id: $stateParams.id,
                    isNullPhone:1
                }, function(response) {
                    if (response.code == 0) {
                        $state.reload();
                    }
                })
                //定义最后操作时间方法  lastOperationTime
            lastOperationTime();
        }
    }
})();
