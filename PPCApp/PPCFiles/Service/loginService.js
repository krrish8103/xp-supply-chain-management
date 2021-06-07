'use strict';
app.factory('loginService', ['$http', '$q', 'localStorageService', 'ngAuthSettings',
function ($http, $q, localStorageService,ngAuthSettings) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var loginServiceFactory = {};
    var authentication = {
        isLoggedin: false,
        userName: '',
        useRefreshTokens: true,
        refreshTokenId: '',
        userId: 0,
        loginId: 0
    };

    var _login = function (loginData) {
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        if (loginData.useRefreshTokens) {
            data = data + "&client_id=" + ngAuthSettings.clientId + "&client_secret=" + ngAuthSettings.clientSecret;
        }
        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            if (loginData.useRefreshTokens) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
            }
            else {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
            }

            authentication.isLoggedin = true;
            authentication.userName = loginData.userName;
            authentication.refreshTokenId = response.refresh_token;
            authentication.useRefreshTokens = loginData.useRefreshTokens;
            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {
        localStorageService.remove('authorizationData');
        authentication.userName = "";
        authentication.isLoggedin = false;
        authentication.useRefreshTokens = false;
        authentication.refreshTokenId = '';

    };

    var _fillAuthData = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            authentication.isLoggedin = true;
            authentication.userName = authData.userName;
            authentication.useRefreshTokens = authData.useRefreshTokens;
        }
    }

    var refreshToken = function () {
        var deferred = $q.defer();
        var authData = localStorageService.get('authorizationData');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId + "&client_secret=" + ngAuthSettings.clientSecret;

                localStorageService.remove('authorizationData');

                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            }
        }

        return deferred.promise;
    };



    loginServiceFactory.login = _login;
    loginServiceFactory.logOut = _logOut;
    loginServiceFactory.fillAuthData = _fillAuthData;
    loginServiceFactory.authentication = authentication;
    loginServiceFactory.refreshToken = refreshToken;
    return loginServiceFactory;
}]);


app.factory('refreshTokenFactory', ['$http', function ($http) {
    var urlBase = 'api/refreshTokens';
    var refreshTokenFactory = {};

    refreshTokenFactory.deleteRefreshToken = function (id) {
        return $http({
            url: urlBase + '/DeleteRefreshToken',
            params: { id: id },
            method: 'DELETE'
        });
    };
    return refreshTokenFactory;
}]);


app.factory('userFactory', ['$http', function ($http) {
    var urlBase = 'api/user';
    var userFactory = {};

    userFactory.getusers = function () {
        return $http({
            url: urlBase + '/GetUsers',
            method: 'GET'
        });
    };

    userFactory.getuserbyId = function () {
        return $http({
            url: urlBase + '/GetUser',
            params: { id: id },
            method: 'GET'
        });
    };

    userFactory.getLoginInfoByNamePassword = function (uname, pwd) {
        return $http({
            url: urlBase + '/GetLoginInfo',
            params: { uname: uname, pwd: pwd },
            method: 'GET'
        });
    };

    userFactory.insertData = function (user) {
        return $http.post(urlBase + '/PostUser', user);
    };

    userFactory.editRecord = function (id, user) {
        return $http.put(urlBase + '/PutUser?id=' + user.Id, user);
    };

    userFactory.getUserMenus = function (loginId) {
        return $http({
            url: urlBase + '/GetUserMenus',
            params: { LoginId: loginId },
            method: 'GET'
        });
    };


    return userFactory;
}]);


app.factory('clientFactory', ['$http', function ($http) {
    var urlBase = 'api/client';
    var clientFactory = {};

    clientFactory.getClientInfo = function () {
        return $http({
            url: urlBase + '/GetClient',
            method: 'GET'
        });
    };
    return clientFactory;
}]);