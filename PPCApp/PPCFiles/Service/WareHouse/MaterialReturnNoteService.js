//-----------------------Master Stores Credit Note ------------------------------
app.factory('MaterialReturnNoteFactory', ['$http', function ($http) {
    var urlBase = 'api/MaterialReturnNote';//http method use

    var MaterialReturnNoteFactory = {};
    MaterialReturnNoteFactory.getAllMaterialReturnNotes = function () {
        return $http({
            url: urlBase + '/GetAllMaterialReturnNotes',
            method: 'GET'
        });
    };

    MaterialReturnNoteFactory.insertData = function (objMaterialReturnNote) {
        return $http.post(urlBase + '/PostMaterialReturnNote', objMaterialReturnNote)
    };
    MaterialReturnNoteFactory.editRecord = function (id, objMaterialReturnNote) {
        return $http.put(urlBase + '/PutMaterialReturnNote?id=' + objMaterialReturnNote.lngId, objMaterialReturnNote)
    };
    MaterialReturnNoteFactory.setMaterialReturnNoteStatus = function (id, objMaterialReturnNote) {
        return $http.put(urlBase + '/PutMaterialReturnNote?lngId=' + objMaterialReturnNote.lngId, objMaterialReturnNote)
    };
    return MaterialReturnNoteFactory;
}]);