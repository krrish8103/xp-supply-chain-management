app.factory('mailCommunicationFactory', ['$http', function ($http) {
    var urlBase = 'api/MailCommunication';
    var mailCommunicationFactory = {};

    mailCommunicationFactory.getMail = function (lngUserId, intMailFolder) {
        return $http({
            url: urlBase + '/GetMail',
            params: {
                lngUserId: lngUserId,
                intMailFolder: intMailFolder
            },
            method: 'GET'
        });
    };
    return mailCommunicationFactory;
}]);
