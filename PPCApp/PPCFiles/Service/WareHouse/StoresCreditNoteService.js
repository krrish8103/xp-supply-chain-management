//-----------------------Master Stores Credit Note ------------------------------
app.factory('StoresCreditNoteFactory', ['$http', function ($http) {
    var urlBase = 'api/StoresCreditNote';//http method use

    var StoresCreditNoteFactory = {};
    StoresCreditNoteFactory.getAllStoreCreditNotes = function () {
        return $http({
            url: urlBase + '/GetAllStoreCreditNotes',
            method: 'GET'
        });
    };

    StoresCreditNoteFactory.insertData = function (objStoresCreditNote) {
        return $http.post(urlBase + '/PostStoresCreditNote', objStoresCreditNote)
    };
    StoresCreditNoteFactory.editRecord = function (id, objStoresCreditNote) {
        return $http.put(urlBase + '/PutStoresCreditNote?id=' + objStoresCreditNote.lngId, objStoresCreditNote)
    };
    StoresCreditNoteFactory.setStoresCreditNoteStatus = function (id, objStoresCreditNote) {
        return $http.put(urlBase + '/PutStoresCreditNote?lngId=' + objStoresCreditNote.lngId, objStoresCreditNote)
    };
    return StoresCreditNoteFactory;
}]);