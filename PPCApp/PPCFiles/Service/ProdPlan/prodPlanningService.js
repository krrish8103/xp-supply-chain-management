app.factory('masterFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterFactory = {};
    masterFactory.getserverdatetime = function () {
        return $http({
            url: urlBase + '/GetServerDateTime',
            method: 'GET'
        });
    };
       
    return masterFactory;
}
]);
app.factory('masterUnitOfMeasureFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterUnitOfMeasureFactory = {};
    masterUnitOfMeasureFactory.getAllUOM = function () {
        return $http({
            url: urlBase + '/GetAllUnitOfMeasure',
            method: 'GET'
        });
    };

    masterUnitOfMeasureFactory.insertData = function (uom) {
        return $http.post(urlBase + '/PostUnitOfMeasure', uom)
    };
    masterUnitOfMeasureFactory.editRecord = function (id, uom) {
        return $http.put(urlBase + '/PutUnitOfMeasure?id=' + uom.Id, uom)
    };
    return masterUnitOfMeasureFactory;
}
]);

app.factory('masterItemDrawingFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterItemDrawingFactory = {};
    masterItemDrawingFactory.getAllItemDrawing = function (itemId) {
        return $http({
            url: urlBase + '/GetAllItemDrawing',
            params: {
                itemId: itemId,                
            },
            method: 'GET'
        });
    };    

    masterItemDrawingFactory.insertData = function (itemDrawing) {
        return $http.post(urlBase + '/PostItemDrawing', itemDrawing)
    };
    masterItemDrawingFactory.editRecord = function (id, item) {
        return $http.put(urlBase + '/PutItemDrawing?id=' + itemDrawing.Id, itemDrawing)
    };
    return masterItemDrawingFactory;
}
]);

app.factory('masterItemFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterItemFactory = {};
    masterItemFactory.getItemById = function (itemId) {
        return $http({
            url: urlBase + '/GetItemById',
            params: {
                itemId: itemId,
            },
            method: 'GET'
        });
    };

    masterItemFactory.getAllItem = function () {
        return $http({
            url: urlBase + '/GetAllItem',
            method: 'GET'
        });
    };

    masterItemFactory.insertData = function (item) {
        return $http.post(urlBase + '/PostItem', item)
    };
    masterItemFactory.editRecord = function (id, item) {
        return $http.put(urlBase + '/PutItem?id=' + item.Id, item)
    };
    return masterItemFactory;
}
]);

//-----------------------Master Tax ------------------------------
app.factory('masterTaxFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterTaxFactory = {};
    masterTaxFactory.getAllTax = function () {
        return $http({
            url: urlBase + '/GetAllTax',
            method: 'GET'
        });
    };

    masterTaxFactory.insertData = function (objtax) {
        return $http.post(urlBase + '/PostTax', objtax)
    };
    masterTaxFactory.editRecord = function (id, objtax) {
        return $http.put(urlBase + '/PutTax?id=' + objtax.Id, objtax)
    };
    return masterTaxFactory;
}]);


//-----------------------Master Vendor ------------------------------
app.factory('masterVendorFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterVendorFactory = {};
    masterVendorFactory.getAllVendor = function () {
        return $http({
            url: urlBase + '/GetAllVendor',
            method: 'GET'
        });
    };

    masterVendorFactory.insertData = function (objvendor) {
        return $http.post(urlBase + '/PostVendor', objvendor)
    };
    masterVendorFactory.editRecord = function (id, objvendor) {
        return $http.put(urlBase + '/PutVendor?id=' + objvendor.Id, objvendor)
    };
    return masterVendorFactory;
}]);
//-------------------------------------------------------------------

//-----------------------Master Department ------------------------------
app.factory('masterDepartmentFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterDepartmentFactory = {};
    masterDepartmentFactory.getAllDepartment = function () {
        return $http({
            url: urlBase + '/GetAllDepartment',
            method: 'GET'
        });
    };

    masterDepartmentFactory.insertData = function (objDepartment) {
        return $http.post(urlBase + '/PostDepartment', objDepartment)
    };
    masterDepartmentFactory.editRecord = function (id, objDepartment) {
        return $http.put(urlBase + '/PutDepartment?id=' + objDepartment.Id, objDepartment)
    };
    return masterDepartmentFactory;
}]);
//-------------------------------------------------------------------

//-----------------------Master DocumentType ------------------------------
app.factory('masterDocumentTypeFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterDocumentTypeFactory = {};
    masterDocumentTypeFactory.getAllDocumentType = function () {
        return $http({
            url: urlBase + '/GetAllDocumentType',
            method: 'GET'
        });
    };

    masterDocumentTypeFactory.insertData = function (objDocumentType) {
        return $http.post(urlBase + '/PostDocumentType', objDocumentType)
    };
    masterDocumentTypeFactory.editRecord = function (id, objDocumentType) {
        return $http.put(urlBase + '/PutDocumentType?id=' + objDocumentType.Id, objDocumentType)
    };
    return masterDocumentTypeFactory;
}]);
//-------------------------------------------------------------------
//-----------------------Master Item Category ------------------------------
app.factory('masterItemCategoryFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterItemCategoryFactory = {};
    masterItemCategoryFactory.getAllItemCategory = function () {
        return $http({
            url: urlBase + '/GetAllItemCategory',
            method: 'GET'
        });
    };

    masterItemCategoryFactory.insertData = function (objItemCategory) {
        return $http.post(urlBase + '/PostItemCategory', objItemCategory)
    };
    masterItemCategoryFactory.editRecord = function (id, objItemCategory) {
        return $http.put(urlBase + '/PutItemCategory?id=' + objItemCategory.Id, objItemCategory)
    };
    return masterItemCategoryFactory;
}]);

//-----------------------Master CustomerSupplierType ------------------------------
app.factory('masterCustomerSupplierTypeFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterCustomerSupplierTypeFactory = {};
    masterCustomerSupplierTypeFactory.getAllCustomerSupplierType = function () {
        return $http({
            url: urlBase + '/GetAllCustomerSupplierType',
            method: 'GET'
        });
    };

    masterCustomerSupplierTypeFactory.insertData = function (objCustomerSupplierType) {
        return $http.post(urlBase + '/PostCustomerSupplierType', objCustomerSupplierType)
    };
    masterCustomerSupplierTypeFactory.editRecord = function (id, objCustomerSupplierType) {
        return $http.put(urlBase + '/PutCustomerSupplierType?id=' + objCustomerSupplierType.Id, objCustomerSupplierType)
    };
    return masterCustomerSupplierTypeFactory;
}]);


app.factory('masterCustomerFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterCustomerFactory = {};
    masterCustomerFactory.getAllCustomer = function () {
        return $http({
            url: urlBase + '/GetAllCustomer',
            method: 'GET'
        });
    };

    masterCustomerFactory.insertData = function (customer) {
        return $http.post(urlBase + '/PostCustomer', customer)
    };
    masterCustomerFactory.editRecord = function (id, customer) {
        return $http.put(urlBase + '/PutCustomer?id=' + customer.Id, customer)
    };
    return masterCustomerFactory;
}
]);


app.factory('masterCountryStateCityFactory', ['$http', function ($http) {
    var urlBase = 'api/CountryStateCity';//http method use

    var masterCountryStateCityFactory = {};
    masterCountryStateCityFactory.getAllCountry = function () {
        return $http({
            url: urlBase + '/GetAllCountry',
            method: 'GET'
        });
    };

    masterCountryStateCityFactory.getStatebyCountryId = function (CountryId) {
        return $http({
            url: urlBase + '/GetState',
            params: { CountryId: CountryId },
            method: 'GET'
        });
    };

    masterCountryStateCityFactory.getCityByStateId = function (StateId) {
        return $http({
            url: urlBase + '/GetCity',
            params: { StateId: StateId },
            method: 'GET'
        });
    };

    masterCountryStateCityFactory.insertCountryData = function (country) {
        return $http.post(urlBase + '/PostCountry', country)
    };
    masterCountryStateCityFactory.editRecord = function (id, customer) {
        return $http.put(urlBase + '/PutCountry?id=' + customer.Id, customer)
    };
    return masterCountryStateCityFactory;
}
]);

app.factory('masterOperationsMaterialFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterOperationsMaterialFactory = {};
    masterOperationsMaterialFactory.getAllBOMOperationMaterial = function () {
        return $http({
            url: urlBase + '/GetAllBOMOperationMaterial',
            method: 'GET'
        });
    };

    masterOperationsMaterialFactory.insertData = function (objOperation) {
        return $http.post(urlBase + '/PostBOMOperationMaterial', objOperation)
    };
    masterOperationsMaterialFactory.editRecord = function (id, objOperation) {
        return $http.put(urlBase + '/PutBOMOperationMaterial?id=' + objOperation.lngId, objOperation)
    };
    return masterOperationsMaterialFactory;
}
]);


//-----------------------Master BOMOperations ------------------------------
app.factory('masterBOMOperationsFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterBOMOperationsFactory = {};
    masterBOMOperationsFactory.getAllBOMOperation = function () {
        return $http({
            url: urlBase + '/GetAllBOMOperation',
            method: 'GET'
        });
    };

    masterBOMOperationsFactory.insertData = function (objOperation) {
        return $http.post(urlBase + '/PostBOMOperation', objOperation)
    };
    masterBOMOperationsFactory.editRecord = function (id, objOperation) {
        return $http.put(urlBase + '/PutBOMOperation?id=' + objOperation.lngId, objOperation)
    };
    return masterBOMOperationsFactory;
}]);

//-----------------------Master BOMLevel ------------------------------
app.factory('masterBOMLevelFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterBOMLevelFactory = {};
    masterBOMLevelFactory.getAllBOMLevel = function () {
        return $http({
            url: urlBase + '/GetAllBOMLevel',
            method: 'GET'
        });
    };

    masterBOMLevelFactory.insertData = function (objLevel) {
        return $http.post(urlBase + '/PostBOMLevel', objLevel)
    };
    masterBOMLevelFactory.editRecord = function (id, objLevel) {
        return $http.put(urlBase + '/PutBOMLevel?id=' + objLevel.lngId, objLevel)
    };
    return masterBOMLevelFactory;
}]);

//----------------------------------------------------------------------------


//-----------------------Master DocumentType ------------------------------
app.factory('masterDocumentTypeFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterDocumentTypeFactory = {};
    masterDocumentTypeFactory.getAllDocumentType = function () {
        return $http({
            url: urlBase + '/GetAllDocumentType',
            method: 'GET'
        });
    };

    masterDocumentTypeFactory.insertData = function (objDocumentType) {
        return $http.post(urlBase + '/PostDocumentType', objDocumentType)
    };
    masterDocumentTypeFactory.editRecord = function (id, objDocumentType) {
        return $http.put(urlBase + '/PutDocumentType?id=' + objDocumentType.Id, objDocumentType)
    };
    return masterDocumentTypeFactory;
}]);
//-------------------------------------------------------------------

//-----------------------Master Location ------------------------------
app.factory('masterLocationFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterLocationFactory = {};
    masterLocationFactory.getAllLocation = function () {
        return $http({
            url: urlBase + '/GetAllLocation',
            method: 'GET'
        });
    };

    masterLocationFactory.insertData = function (objLocation) {
        return $http.post(urlBase + '/PostLocation', objLocation)
    };
    masterLocationFactory.editRecord = function (id, objLocation) {
        return $http.put(urlBase + '/PutLocation?id=' + objLocation.Id, objLocation)
    };

    masterLocationFactory.getAllCity = function () {
        return $http({
            url: urlBase + '/GetAllCity',
            method: 'GET'
        });
    };

    masterLocationFactory.getAllUser = function () {
        return $http({
            url: urlBase + '/GetAllUser',
            method: 'GET'
        });
    };

    masterLocationFactory.getAllLocationContact = function (LocationId) {
        return $http({
            url: urlBase + '/GetAllLocationContact',
            params: {
                LocationId: LocationId,
            },
            method: 'GET'
        });
    };

    masterLocationFactory.getLocationContactDetails = function (LocationId) {
        return $http({
            url: urlBase + '/GetLocationContactDetails',
            params: {
                LocationId: LocationId,
            },
            method: 'GET'
        });
    };

    return masterLocationFactory;
}]);
//-------------------------------------------------------------------
//-----------------------Master Bin ------------------------------
app.factory('masterBinFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var masterBinFactory = {};
    masterBinFactory.getAllBin = function () {
        return $http({
            url: urlBase + '/GetAllBin',
            method: 'GET'
        });
    };

    masterBinFactory.insertData = function (objBin) {
        return $http.post(urlBase + '/PostBin', objBin)
    };
    masterBinFactory.editRecord = function (id, objBin) {
        return $http.put(urlBase + '/PutBin?id=' + objBin.Id, objBin)
    };

    masterBinFactory.getAllLocationForBin = function () {
        return $http({
            url: urlBase + '/GetAllLocationForBin',
            method: 'GET'
        });
    };
    return masterBinFactory;
}]);
//-------------------------------------------------------------------
//---------------------- Begin Production Plan Factory --------------------------
app.factory('ProductionPlanFactory', ['$http', function ($http) {
    var urlBase = 'api/Master';//http method use

    var ProductionPlanFactory = {};
    ProductionPlanFactory.get = function () {
        return $http({
            url: urlBase + '/GetAllUnitOfMeasure',
            method: 'GET'
        });
    };

    masterUnitOfMeasureFactory.insertData = function (uom) {
        return $http.post(urlBase + '/PostUnitOfMeasure', uom)
    };
    masterUnitOfMeasureFactory.editRecord = function (id, uom) {
        return $http.put(urlBase + '/PutUnitOfMeasure?id=' + uom.Id, uom)
    };
    return masterUnitOfMeasureFactory;
}
]);
//---------------------- End Production Plan Factory --------------------------