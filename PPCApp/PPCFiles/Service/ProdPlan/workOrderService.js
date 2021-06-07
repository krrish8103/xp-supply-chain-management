//-----------------------Master WorkOrder ------------------------------
app.factory('masterWorkOrderFactory', ['$http', function ($http) {
    var urlBase = 'api/WorkOrder';//http method use

    var masterWorkOrderFactory = {};
    masterWorkOrderFactory.getAllWorkOrder = function () {
        return $http({
            url: urlBase + '/GetAllWorkOrder',
            method: 'GET'
        });
    };

    masterWorkOrderFactory.getSuggestionsToReleaseWorkOrder = function (qty,itemId) {
        return $http({
            url: urlBase + '/GetSuggestionsToReleaseWorkOrder',
            params: {
                qty: qty,
                itemId: itemId
            },
            method: 'GET'
        });
    };
    masterWorkOrderFactory.insertData = function (objWorkOrder) {
        return $http.post(urlBase + '/PostWorkOrder', objWorkOrder)
    };

    masterWorkOrderFactory.issueItemFromWorkOrder = function (objWorkOrder) {
        return $http.post(urlBase + '/PostIssueItemFromWorkOrder', objWorkOrder)
    };

    masterWorkOrderFactory.editRecord = function (id, objWorkOrder) {
        return $http.put(urlBase + '/PutWorkOrder?id=' + objWorkOrder.lngId, objWorkOrder)
    };
    masterWorkOrderFactory.setWorkOrderStatus = function (id, objWorkOrder) {
        return $http.put(urlBase + '/PutWorkOrderStatus?lngId=' + objWorkOrder.lngId, objWorkOrder)
    };
    return masterWorkOrderFactory;
}]);