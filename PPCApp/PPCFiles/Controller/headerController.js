app.controller('refreshController', ['$scope', '$location', 'loginService',
    function ($scope, $location, loginService) {

        $scope.authentication = loginService.authentication;
        $scope.tokenRefreshed = false;
        $scope.tokenResponse = null;

        $scope.refreshToken = function () {

            authService.refreshToken().then(function (response) {
                $scope.tokenRefreshed = true;
                $scope.tokenResponse = response;
            },
            function (err) {
                $location.path('/login');
            });
        };
    }]);

app.controller('headerController', ['$rootScope', '$scope','$base64', '$location', '$modal', 'loginService', 'userModel', 'userFactory', 'refreshTokenFactory','clientFactory',
     'Keepalive', '$interval',
        function ($rootScope, $scope,$base64, $location, $modal, loginService, userModel, userFactory, refreshTokenFactory,clientFactory,
        Keepalive, $interval) {
            var j = 0;
            $scope.changetime = 300;
            $scope.minute = 5;
            $scope.second = 60;
            var tick = function () {
                if (userModel.UserOutTime != null) {
                    $scope.clock = Date.now();
                    $scope.dateObj = moment($scope.clock).format("DD-MM-YYYY");
                    var objUserOutTime = $scope.dateObj + " " + userModel.UserOutTime;
                    var c = moment(objUserOutTime).subtract(5, 'minute');
                    var a = moment(c).add(1, 'second');

                    var d = moment(objUserOutTime).subtract(1, 'minute');
                    var b = moment(d).add(1, 'second');

                    if (moment($scope.clock).format("HH:mm:ss") == moment(a).format("HH:mm:ss")) {

                        bootbox.alert({ title: "Time out Alert!", text: "Your working session is going to be end in 5 minutes. Please Finish your works before : " + userModel.UserOutTime + "", timer: 40000, showConfirmButton: true });
                        j = 1;
                    }
                    if (j == 1) {
                        //$scope.changetime--;
                        $scope.second--;
                        if ($scope.second == 0) {
                            $scope.minute--;
                            $scope.second = 60;
                        }
                    }

                    if (moment($scope.clock).format("HH:mm:ss") == moment(b).format("HH:mm:ss")) {

                        bootbox.alert({ title: "Time out Alert!", text: "Your working session is going to be end in 1 minutes. Please Finish your works before : " + userModel.UserOutTime + "", timer: 30000, showConfirmButton: true });
                    }

                    if (moment($scope.clock).format("HH:mm:ss") == moment(objUserOutTime).format("HH:mm:ss")) {

                        refreshTokenFactory.deleteRefreshToken(loginService.authentication.refreshTokenId)
                       .success(function (data) {
                           var i;
                           i = 0;
                       })
                       .error(function (error) {
                           var i;
                           i = 0;
                       });

                        loginService.authentication.isLoggedin = false;
                        loginService.authentication.userName = '';                        
                        loginService.authentication.userId = 0;
                        loginService.authentication.loginId = 0;
                        
                        loginService.logOut();
                        $location.path('/login').replace();
                    }

                }
            }

            tick();
            $interval(tick, 1000);




            //var userlogoutmodel = $modal({ scope: $scope, template: 'Usertimedout-dialog.html', show: false });
            /////////////////////

            $scope.showmenu = false;
            var idelmodel = $modal({ scope: $scope, template: 'timedout-dialog.html', show: false });
            function closeModals() {
                if (idelmodel) {
                    idelmodel.$promise.then(idelmodel.hide);
                }
            };

            $scope.$on('IdleStart', function () {
                idelmodel.$promise.then(idelmodel.show);
            });

            $scope.$on('IdleEnd', function () {
                closeModals();
                

            });

            $scope.$on('IdleTimeout', function () {
                closeModals();
                loginService.logOut();
                $location.path('/login');
            });

            $rootScope.$on('$routeChangeSuccess', function (e, current, previous) {
                $scope.userName = loginService.authentication.userName;
                if (loginService.authentication.isLoggedin) {
                    $scope.loggedInUser = userModel.currentUserDetails.LastName + ', ' + userModel.currentUserDetails.FirstName//loginService.authentication.username;
                    //$scope.showLoggedInMenu = loginService.authentication.enableMenu;
                    $scope.showLoggedInMenu = true;                    
                    //$scope.userType = loginService.authentication.usertype;
                    if (userModel.userMenus == null || userModel.userMenus.length == 0) {
                        getUserMenus();
                    }
                    else {
                        $scope.userMenus = userModel.userMenus;
                    }
                }
                else {

                    $scope.showLoggedInMenu = false;
                    $scope.loggedInUser = '-1';
                    $scope.userMenus = null;
                    userModel.userMenus = [];
                    $location.path("/login").replace();
                }
            });

            $scope.checkChildren = function (menu) {
                if (menu.hasChildren == false) {
                    setSelectedMenuId(menu);
                }
            };
            
            function setSelectedMenuId(menu) {
                //getUserPermissionByMenuId(menu);
                $location.path("/"+ menu.Route).replace();
            };
            $scope.isExpandMenu = true;
            $scope.collapseExpandMenuBar = function (flag) {
                $scope.isExpandMenu = flag;
            };


            function getUserMenus() {
                userFactory.getUserMenus(loginService.authentication.loginId)
                 .success(function (data) {
                     userModel.userMenus = data;
                     $scope.userMenus = userModel.userMenus;
                 })
                 .error(function (error) {
                     bootbox.alert("Error on getting menus");//messageModel.messages[0].Message);
                     loginService.logOut();
                     $location.path('/login');
                 });
            };


            $scope.checkLength = function (pwd) {
                if (pwd) {

                    if (pwd.length < 8) {
                        $('#password').focus();
                        bootbox.alert('Password must be minimum 8 charecter');
                        $scope.forpwd.checkpassword = '';
                    }
                }
            };
            
            $scope.Logout = function () {
                refreshTokenFactory.deleteRefreshToken(loginService.authentication.refreshTokenId)
                .success(function (data) {
                    var i;
                    i = 0;
                })
                .error(function (error) {
                    var i;
                    i = 0;
                });

                loginService.authentication.isLoggedin = false;
                loginService.authentication.username = '';
                loginService.authentication.firstname = '';
                loginService.authentication.lastname = '';
                loginService.authentication.userid = 0;
                loginService.authentication.enableMenu = false;
                
                loginService.logOut();
                $location.path('/login').replace();
            };

            $scope.clientInfo = {};
            $scope.clientImage = null;
            //if (userModel.clientInfo == null || userModel.clientInfo.length == 0) {
            //    getClientInfo();
            //}
            //else {
            //    $scope.clientInfo = userModel.clientInfo;
            //}
            getClientInfo();
            function getClientInfo() {                   //get data from session
                clientFactory.getClientInfo()
                .success(function (data) {
                    userModel.clientInfo = data;
                    $scope.clientInfo = userModel.clientInfo;
                    $scope.clientImage=$base64.decode($scope.clientInfo.Logo);
                })
                .error(function (error) {
                    //bootbox.alert("Error Occored!!! Please try again!!!");
                    bootbox.alert("Client Info Failed");
                });
            };
        }
]);