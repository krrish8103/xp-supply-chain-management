//-----------------------Master WorkOrder ------------------------------
app.factory('ProductionPlanFactory', ['$http', function ($http) {
    var urlBase = 'api/ProductionPlan';//http method use

    var ProductionPlanFactory = {};
    ProductionPlanFactory.getAllProductionPlan = function () {
        return $http({
            url: urlBase + '/GetAllProductionPlans',
            method: 'GET'
        });
    };

    //masterWorkOrderFactory.insertData = function (objWorkOrder) {
    //    return $http.post(urlBase + '/PostWorkOrder', objWorkOrder)
    //};
    //masterWorkOrderFactory.editRecord = function (id, objWorkOrder) {
    //    return $http.put(urlBase + '/PutWorkOrder?id=' + objWorkOrder.lngId, objWorkOrder)
    //};
    return ProductionPlanFactory;
}]);