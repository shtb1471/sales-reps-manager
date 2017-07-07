(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .factory('AuthInterceptor', AuthInterceptor)

    /** @ngInject */
    function AuthInterceptor($q) {

        return {
            responseError: function(response) {
                if (response.status == 401) {
                    var userName = localStorage.getItem("CURRENT_USER_NAME")
                    var userAccount = localStorage.getItem("CURRENT_USER_ACCOUNT")
                    swal({
                        title: "登录超时",
                        text: "用户“" + userName + "”您有太长时间没有操作请输入密码重新登录!",
                        type: 'input',
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        showLoaderOnConfirm: true,
                        inputType: 'password',
                        animation: "slide-from-top"
                    }, function(password) {
                        if (password) {
                            $.ajax({
                                type: "POST",
                                url: '/oapi/login',
                                data: {
                                    account: userAccount,
                                    pw: password,
                                    rem: 0,
                                    random: Math.random()
                                },
                                success: function(data, status) {
                                    if (data.code == 0) {
                                        swal({
                                            title: "登录成功",
                                            text: "重新登录成功,请刷新页面",
                                            timer: 3000
                                        }, function() {})
                                    } else {
                                        swal("登录失败", data.msg, "error")
                                    }
                                },
                                error: function(data, status) {
                                    swal("登录失败", "请检查", "error")
                                }
                            })
                        } else {
                            swal.showInputError("请输入密码");
                        }
                    });
                }
                return $q.reject(response);
            }
        };
    }

})();
