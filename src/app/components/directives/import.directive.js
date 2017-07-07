(function() {
    'use strict';
    //  <div xx-upload xx-file-url="modal.document.fileUrl" xx-file-name="modal.document.fileName"></div>
    angular
        .module('gongrenOps')
        .directive('xxImport', xxImport);

    /** @ngInject */
    function xxImport() {
        var directive = {
            restrict: 'A',
            replace: true,
            scope: {
                xxImportStatus: "="
            },
            templateUrl: 'app/components/directives/import.html',
            controller: ["$element", "$attrs", "$scope", "FileUploader", "blockUI", xxUploadController],
            link: ["$element", "$attrs", "$scope", "FileUploader", "blockUI", xxUploadLink],
            controllerAs: "option",
            bindToController: true
        };

        return directive;

        function xxUploadLink($element, $attrs, $scope, FileUploader, blockUI) {
            var vm = this;
        }

        function xxUploadController($element, $attrs, $scope, FileUploader, blockUI) {
            var vm = this
            $scope.uploader = new FileUploader({
                url: "/api/company/add/companyByExcell",
                isHTML5: true,
                alias: "docfile",
                removeAfterUpload: true,
                autoUpload: false,
                headers: {},
                queueLimit: 1,
                formData: [{}]
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
