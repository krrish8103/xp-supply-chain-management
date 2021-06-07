'use strict';
app.controller('mailCommunicationController', ['$rootScope', '$scope', '$modal', 'mailCommunicationFactory', '$location', 'userModel', '$base64',
    function ($rootScope, $scope, $modal, mailCommunicationFactory, $location, userModel, $base64) {
        function initialize() {
            $scope.userid = userModel.currentUserDetails.Id;
            $scope.mail = {};
            $scope.tab = 'inbox';
        }
        initialize();
        getEMails();
        function getEMails() {
            mailCommunicationFactory.getMail($scope.userid, 1)
                .success(function (data) {
                    if (data.length > 0) {
                        $scope.mail = data;
                    }
                })
                .error(function (error) {
                    bootbox.alert('Failed to get Emails');
                });
        }

        $scope.makeTabActive= function (tabname) {
            $scope.tab = tabname;
        };

        $scope.writeMailClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            $scope.UOM = {};
            openWriteEmail();
        };

        var addWriteEmailModal = $modal({ scope: $scope, template: 'PPCFiles/View/UserSpecific/writeMail.html', show: false, backdrop: false,keyboard: false, animation: ' am-fade' });
        function openWriteEmail() {
            addWriteEmailModal.$promise.then(addWriteEmailModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getEMails();
        });
        function showInfoPanel(isError, message) {
            $scope.isSuccess = !isError;
            $scope.isError = isError;
            $scope.SuccessErrorMessage = message;
        }

        function resetInfoPanel() {
            $scope.isSuccess = false;
            $scope.isError = false;
            $scope.SuccessErrorMessage = '';
        }
    }]);