'use strict';
app.controller('loginController', ['$rootScope', '$scope', '$location', '$modal', 'userFactory', 'loginService', 'userModel', 'masterColorCodesFactory',
    function ($rootScope, $scope, $location, $modal, userFactory, loginService, userModel, masterColorCodesFactory) {

       


        $scope.getUserByNamePassword = function (uname, pwd) {
            $scope.loginData = {};
            $scope.loginData.isLoggedin = false;
            $scope.loginData.userName = uname;
            $scope.loginData.password = pwd;
            $scope.loginData.useRefreshTokens = true;
            $scope.loginData.userId = 0;
            $scope.loginData.loginId = 0;

            loginService.login($scope.loginData).then(function (response) {
                userFactory.getLoginInfoByNamePassword(uname, pwd)
                .success(function (data) {
                    if (data == '1') {
                        bootbox.alert('Login not permitted this time');
                    }
                    else
                        if (data != null) {
                            $scope.loginData.isLoggedin = true;
                            userModel.currentUserLoginInfo = data.tblLoginInfo[0];
                            userModel.currentUserDetails = data
                            loginService.authentication.userid = userModel.currentUserDetails.Id;
                            loginService.authentication.loginId = userModel.currentUserLoginInfo.LoginId;
                            getColorCodes();
                            if (userModel.currentUserDetails.Id == 1) {
                                $location.path('/home').replace();
                            }
                            else if (userModel.currentUserDetails.Id == 2) {
                                $location.path('/machineDashboard').replace();
                            }
                            else if (userModel.currentUserDetails.Id == 3) {
                                $location.path('/plantViewDashboard').replace();
                            }
                            else {
                                $location.path('/home').replace();
                            }
                        }
                        else {
                            bootbox.alert('User not found');
                            $scope.loginData.userName = '';
                            $scope.loginData.password = '';
                            loginService.logOut();
                            $location.path('/login').replace();
                        }

                })
                .error(function (error) {
                    bootbox.alert("Unable to retrieving data!");
                    $scope.loginData.userName = '';
                    $scope.loginData.password = '';
                    loginService.logOut();
                    $location.path('/login').replace();
                });
            },
             function (err) {
                 bootbox.alert(err.error_description);
             });
        };

        //Get Color Codes

        function getColorCodes() {
            masterColorCodesFactory.getAllColorCodes()
           .success(function (data) {
               userModel.colorCodes = data;
           })
           .error(function (error) {
               swal(messageModel.messages[0].Message);
           });
        }

}]);