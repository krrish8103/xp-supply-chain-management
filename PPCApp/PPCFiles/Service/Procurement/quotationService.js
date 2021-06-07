//-----------------------Master Quotation ------------------------------
app.factory('masterQuotationFactory', ['$http', function ($http) {
    var urlBase = 'api/Quotation';//http method use

    var masterQuotationFactory = {};
    masterQuotationFactory.getAllQuotation = function () {
        return $http({
            url: urlBase + '/GetAllQuotation',
            method: 'GET'
        });
    };

    masterQuotationFactory.getQuotationForPurchaseOrder = function () {
        return $http({
            url: urlBase + '/GetQuotationForPurchaseOrder',
            method: 'GET'
        });
    };

    masterQuotationFactory.insertData = function (objQuotation) {
        return $http.post(urlBase + '/PostQuotation', objQuotation)
    };
    masterQuotationFactory.editRecord = function (id, objQuotation) {
        return $http.put(urlBase + '/PutQuotation?id=' + objQuotation.lngId, objQuotation)
    };
    return masterQuotationFactory;
}]);