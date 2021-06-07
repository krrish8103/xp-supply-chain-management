app.factory('masterPurchaseOrderFactory', ['$http', function ($http) {
    var urlBase = 'api/PurchaseOrder';//http method use

    var masterPurchaseOrderFactory = {};
    
    masterPurchaseOrderFactory.getAllPurchaseOrder = function () {
        return $http({
            url: urlBase + '/GetAllPurchaseOrders',
            method: 'GET'
        });
    };
    masterPurchaseOrderFactory.getAllPurchaseOrdersFromTransactionId = function (transactionId) {
        return $http({
            url: urlBase + '/GetAllPurchaseOrdersFromTransactionId',
            params: {
                transactionId: transactionId,
            },
            method: 'GET'
        });
    };
    masterPurchaseOrderFactory.insertData = function (objPO) {
        return $http.post(urlBase + '/PostPurchaseOrder', objPO)
    };
    masterPurchaseOrderFactory.editRecord = function (id, objPO) {
        return $http.put(urlBase + '/PutPurchaseOrder?id=' + objPO.lngId, objPO)
    };
    
    return masterPurchaseOrderFactory;
}]);