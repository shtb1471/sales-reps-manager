(function() {
    'use strict';
    //  <div xx-tar-import  xx-import-status="status"></div>
    angular
        .module('gongrenOps')
        .directive('xxTarImport', xxTarImport);

    /** @ngInject */
    function xxTarImport() {
        var directive = {
            restrict: 'A',
            replace: true,
            scope: {
                xxImportStatus: "="
            },
            templateUrl: 'app/components/directives/tarImport.html',
            controller: ["$element", "$attrs", "$scope", "FileUploader", "blockUI", tarUploadController],
            link: ["$element", "$attrs", "$scope", "FileUploader", "blockUI", tarUploadLink],
            controllerAs: "option",
            bindToController: true
        };

        return directive;

        function tarUploadLink($element, $attrs, $scope, FileUploader, blockUI) {
            var vm = this;
        }

        function tarUploadController($element, $attrs, $scope, FileUploader, blockUI) {
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
                    resourseType:2
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
