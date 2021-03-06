app.factory('userModel',
    [function () {
        var currentUserLoginInfo = {};
        var currentUserDetails = {};
        var clientInfo = {};
        var userMenus = [];
        var AutoLogoutDuration = {};
        var editMode = false;
        var editRow = {};
        var redirectRoute="";
        var machineLog = {};
        var colorCodes = {};
        return {
            currentUserLoginInfo: currentUserLoginInfo,
            currentUserDetails: currentUserDetails,
            clientInfo:clientInfo,
            userMenus: userMenus,
            AutoLogoutDuration: AutoLogoutDuration,
            editMode: editMode, // Used to get grid row in maintain screen
            editRow: editRow,
            redirectRoute: redirectRoute,
            machineLog: machineLog,
            colorCodes: colorCodes
        };
    }]);

app.factory('tempModel',
    [function () {
        var itemToAddDrawing = {};        
        var editMode = false;
        var editRow = {};
        var isShowContact = {};
        return {
            itemToAddDrawing: itemToAddDrawing,            
            editMode: editMode,
            editRow: editRow, 
            isShowContact : isShowContact
        };
    }]);

app.factory('messageModel',
[function () {

    var messages = [
        //Common Messages for all forms
        { Id: 0, Message: 'Unable to retrieving data!' }        

    ];

    return {
        messages: messages
    };

}]);