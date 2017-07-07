(function() {
    'use strict';
    //  <div xx-lea-import  xx-import-status="status"></div>
    angular
        .module('gongrenOps')
        .directive('xxLeaImport', xxLeaImport);

    /** @ngInject */
    function xxLeaImport() {
        var directive = {
            restrict: 'A',
            replace: true,
            scope: {
                xxImportStatus: "=",
                xxCallBack: "="
            },
            templateUrl: 'app/components/directives/leaImport.html',
            controller: ["$element", "$attrs", "$scope", "FileUploader", "blockUI", leaUploadController],
            link: ["$element", "$attrs", "$scope", "FileUploader", "blockUI", leaUploadLink],
            controllerAs: "option",
            bindToController: true
        };

        return directive;

        function leaUploadLink($element, $attrs, $scope, FileUploader, blockUI) {
            var vm = this;
        }

        function leaUploadController($element, $attrs, $scope, FileUploader, blockUI) {
            var vm = this
            $scope.uploader = new FileUploader({
                url: "/api/company/add/companyByExcell",
                isHTML5: true,
                alias: "docfile",
                removeAfterUpload: true,
                autoUpload: false,
                headers: {},
                queueLimit: 1,
                leaUploadController: 1,
                formData: [{
                    resourseType: 1
                }]
            });
            vm.xxImportStatus = false

            $scope.uploader.onBeforeUploadItem = function(item) {
                vm.xxImportStatus = true
                blockUI.start({
                    message: '导入中...'
                })
            };
            $scope.uploader.onAfterAddingFile = function(item) {
                // vm.xxImportStatus = true
            }

            $scope.uploader.onProgressAll = function(progress) {}

            $scope.uploader.onSuccessItem = function(item, response, status, headers) {
                // blockUI.stop();
                if (status == 200 && response.code == 0) {
                    swal({
                        title: "",
                        text: response.msg,
                        type: "success"
                    }, function() {
                        window.location.reload();
                    });

                } else {
                    swal(response.msg, "", "error");
                }
                blockUI.stop()
                vm.xxImportStatus = false
            }
            $scope.uploader.onErrorItem = function(item, response, status, headers) {
                vm.xxImportStatus = false
            }

        }
    }
})();
