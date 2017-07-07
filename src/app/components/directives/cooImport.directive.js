(function() {
    'use strict';
    //  <div xx-coo-import  xx-import-status="status"></div>
    angular
        .module('gongrenOps')
        .directive('xxCooImport', xxCooImport);

    /** @ngInject */
    function xxCooImport() {
        var directive = {
            restrict: 'A',
            replace: true,
            scope: {
                xxImportStatus: "="
            },
            templateUrl: 'app/components/directives/leaImport.html',
            controller: ["$element", "$attrs", "$scope", "FileUploader", "blockUI", cooUploadController],
            link: ["$element", "$attrs", "$scope", "FileUploader", "blockUI", cooUploadLink],
            controllerAs: "option",
            bindToController: true
        };

        return directive;

        function cooUploadLink($element, $attrs, $scope, FileUploader, blockUI) {
            var vm = this;
        }

        function cooUploadController($element, $attrs, $scope, FileUploader, blockUI) {
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
                    resourseType: 3
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
