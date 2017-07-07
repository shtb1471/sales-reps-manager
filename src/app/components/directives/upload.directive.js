(function() {
    'use strict';
    //  <div xx-upload xx-file-url="modal.document.fileUrl" xx-file-name="modal.document.fileName"></div>
    angular
        .module('gongrenOps')
        .directive('xxUpload', xxUpload);

    /** @ngInject */
    function xxUpload() {
        var directive = {
            restrict: 'A',
            replace: true,
            scope: {
                xxFileUrl: "=",
                xxFileName: "="
            },
            templateUrl: 'app/components/directives/upload.html',
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
                url: "/api/accUserfile/insert/file",
                isHTML5: true,
                alias: "docfile",
                removeAfterUpload: true,
                autoUpload: true,
                headers: {},
                queueLimit: 1,
                formData: [{}]
            });
            vm.uploading = false

            if (typeof(vm.ngModel) === undefined) {
                vm.ngModel = ""
            }

            $scope.uploader.onBeforeUploadItem = function(item) {
                // blockUI.start();
                vm.xxFileName = ""
                vm.xxFileUrl = ""
                vm.uploading = true
            };

            $scope.uploader.onProgressAll = function(progress) {}

            $scope.uploader.onSuccessItem = function(item, response, status, headers) {
                // blockUI.stop();
                if (status == 200) {
                    vm.xxFileName = item.file.name
                    vm.xxFileUrl = response.data[0]
                }
                vm.uploading = false
            }
            $scope.uploader.onErrorItem = function(item, response, status, headers) {
                vm.uploading = false
            }

        }
    }
})();
