//--------------LookUp Master Category
app.controller('masterLookupCategory', ['$rootScope', '$scope', '$modal', 'masterLookupCategoryFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterLookupCategoryFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.LookupCategory = {};
            $scope.allLookupCategory = {};
            $scope.dispLookupCategory = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            //$scope.exportKeys = ["Code", "Description"];
            //$scope.exportHeaders = ["Code", "Description"];
        };

        initialize();
        var flag = 0;

        getAllLookupCategory();
        function getAllLookupCategory() {                   //get data from session
            masterLookupCategoryFactory.getAllLookupCategory()
            .success(function (data) {
                $scope.allLookupCategory = data;
                $scope.dispLookupCategory = [].concat($scope.allLookupCategory);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        $scope.editLookupCategoryClick = function (objLookupCategory) {
            resetInfoPanel();
            $scope.editMode = true;
            $scope.LookupCategory = objLookupCategory;
            openAddEditLookupCategory();
        };

        $scope.cancelLookupCategoryClick = function () {
            $location.path('/home').replace();
        };



        $scope.$on('modal.hide', function () {
            initialize();
            getAllLookupCategory();
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
    }
]);

app.controller('maintainLookupCategoryController', ['$rootScope', '$scope', '$modal', '$location', 'userModel', 'messageModel', 'masterLookupCategoryFactory',
function ($rootScope, $scope, $modal, $location, userModel, messageModel, masterLookupCategoryFactory) {
    function initialize() {
        $scope.LookupCategory = {};
        //$scope.allLookup = {};
        $scope.isError = false;
        $scope.isSuccess = false;
        $scope.SuccessErrorMessage = "";
    };

    initialize();
    var flag = 0;

    $scope.reset = function (userForm) {
        $scope.submitted = false;
        resetInfoPanel();
        $scope.LookupCategory = {};
        $scope.userForm.$setPristine();
    }

    $scope.saveClick = function (form) {
        resetInfoPanel();
        $scope.submitted = true;
        $scope.userForm = form;
        if ($scope.userForm.$valid) {
            //checkLookUps();
            if ($scope.editMode == true) {
                editRecord();
            }
            else {
                insertData();
                $scope.reset();
            }

        }
        else {
            showInfoPanel(true, 'Please fill form carefully!!');
        }

    };

    $scope.cancelClick = function () {
        this.$hide();
        initialize();
        //  getAllLookups();
    };

    function insertData() {
        if (flag != 1) {
            //$scope.LookUps.AddedBy = userModel.currentUserDetails.Id
            masterLookupCategoryFactory.insertData($scope.LookupCategory)
            .success(function (data) {
                showInfoPanel(false, 'Look up Added Successfully.');
            })
            .error(function (error) {
                showInfoPanel(true, 'Error occured! Please Try Again!!!');
            });
        }
        else {
            showInfoPanel(true, 'Look up already exist!');
        };
    };


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
}
]);
//--------------------Look Up data
app.controller('masterLookUpController', ['$rootScope', '$scope', '$modal', 'masterLookUpFactory', '$location', 'userModel', 'messageModel', 'masterLookupCategoryFactory',
    function ($rootScope, $scope, $modal, masterLookUpFactory, $location, userModel, messageModel, masterLookupCategoryFactory) {
        function initialize() {
            $scope.LookUps = {};
            $scope.LookUpMasterId = -1;
            $scope.allLookUps = {};
            $scope.dispLookUps = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.exportKeys = ["strCode", "strDescription"];
            $scope.exportHeaders = ["Code", "Description"];
        };

        initialize();
        var flag = 0;

        getAllLookupCategory();
        function getAllLookupCategory() {                   //get data from session
            masterLookupCategoryFactory.getAllLookupCategory()
            .success(function (data) {
                $scope.allLookupCategory = data;
                $scope.dispLookupCategory = [].concat($scope.allLookupCategory);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };





        $scope.getAllLookUps = function () {                   //get data from session
            masterLookUpFactory.getAllLookUps($scope.LookUpMasterId)
            .success(function (data) {
                $scope.allLookUps = data;
                $scope.dispLookUps = [].concat($scope.allLookUps);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddLookupCategoryClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            $scope.LookupCategory = {};
            openAddEditLookupCategory();
        };
        var addEditLookupCategoryModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstLookupCategoryAdd.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditLookupCategory() {
            addEditLookupCategoryModal.$promise.then(addEditLookupCategoryModal.show);
        };

        $scope.AddLookupClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            userModel.editMode = false;
            $scope.LookUps = {};
            openAddEditLookup();
        };
        $scope.editLookupClick = function (lookups) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = lookups;
            openAddEditLookup();
        };

        $scope.cancelLookupClick = function () {
            $location.path('/home').replace();
        };

        var addEditLookUpsModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstLookUpDataAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditLookup() {
            addEditLookUpsModal.$promise.then(addEditLookUpsModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllLookupCategory();
            getAllLookUps($scope.LookUpMasterId);
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
    }
]);

app.controller('maintainLookupController', ['$rootScope', '$scope', '$modal', 'masterLookUpFactory', '$location', 'userModel', 'messageModel', 'masterLookupCategoryFactory',
function ($rootScope, $scope, $modal, masterLookUpFactory, $location, userModel, messageModel, masterLookupCategoryFactory) {
    function initialize() {
        $scope.LookUps = {};
        $scope.isError = false;
        $scope.isSuccess = false;
        $scope.SuccessErrorMessage = "";
        $scope.editMode = false;
    };

    initialize();
    var flag = 0;
    if (userModel.editMode == true) {
        $scope.editMode = true;
        $scope.LookUps = userModel.editRow;
    }
    getAllLookupCategory();
    function getAllLookupCategory() {                   //get data from session
        masterLookupCategoryFactory.getAllLookupCategory()
        .success(function (data) {
            $scope.allLookupCategory = data;
            $scope.dispLookupCategory = [].concat($scope.allLookupCategory);
        })
        .error(function (error) {
            bootbox.alert("Error Occored!!! Please try again!!!");
        });
    };




    $scope.reset = function (userForm) {
        $scope.submitted = false;
        resetInfoPanel();
        $scope.Lookups = {};
        $scope.userForm.$setPristine();
    }

    $scope.saveClick = function (form) {
        resetInfoPanel();
        $scope.submitted = true;
        $scope.userForm = form;
        if ($scope.userForm.$valid) {
            //checkLookUps();
            if ($scope.editMode == true) {
                editRecord();
            }
            else {
                insertData();
                $scope.reset();
            }

        }
        else {
            showInfoPanel(true, 'Please fill form carefully!!');
        }

    };

    $scope.cancelClick = function () {
        this.$hide();
        initialize();
        //  getAllLookups();
    };

    function insertData() {
        if (flag != 1) {
            $scope.LookUps.AddedBy = userModel.currentUserDetails.Id
            masterLookUpFactory.insertData($scope.LookUps)
            .success(function (data) {
                showInfoPanel(false, 'Look up Added Successfully.');
            })
            .error(function (error) {
                showInfoPanel(true, 'Error occured! Please Try Again!!!');
            });
        }
        else {
            showInfoPanel(true, 'Look up already exist!');
        };
    };

    function editRecord() {
        if (flag = 1) {
            $scope.LookUps.blnActive = false;
            masterLookUpFactory.editRecord($scope.LookUps.lngId, $scope.LookUps)
            .success(function (data) {
                showInfoPanel(false, 'Look up Updated Successfully.');
            })
            .error(function (error) {
                //Error Message
                showInfoPanel(true, 'Error occured! Please Try Again!!!');
            });
        }
        else {
            showInfoPanel(true, 'Look up not exists!');
        };
    };

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
}
]);




app.controller('masterUnitOfMeasureController', ['$rootScope', '$scope', '$modal', 'masterUnitOfMeasureFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterUnitOfMeasureFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.UOM = {};
            $scope.allUOM = {};
            $scope.dispUOM = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.exportKeys = ["UOMCode", "UOMDescription"];
            $scope.exportHeaders = ["Code", "Description"];
        };

        initialize();
        var flag = 0;

        getAllUOM();
        function getAllUOM() {                   //get data from session
            masterUnitOfMeasureFactory.getAllUOM()
            .success(function (data) {
                $scope.allUOM = data;
                $scope.dispUOM = [].concat($scope.allUOM);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddUOMClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            $scope.UOM = {};
            openAddEditUOM();
        };
        $scope.editUOMClick = function (uom) {
            resetInfoPanel();
            $scope.editMode = true;
            $scope.UOM = uom;
            openAddEditUOM();
        };
        //$scope.DeleteUOM = function (objExam) {
        //    bootbox.alert({
        //        title: "Confirm Delete ?",
        //        type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55",
        //        confirmButtonText: "Yes!", cancelButtonText: "No!",
        //        closeOnConfirm: false,
        //        closeOnCancel: false
        //    },
        //    function (isConfirm) {
        //        if (isConfirm) {
        //            objExam.Deleted = true;
        //            mstExamFactory.editRecord(objExam.Id, objExam)
        //            .success(function () {
        //                bootbox.alert("Deleted!", "", "success");
        //                getExams()
        //            })
        //            .error(function (error) {
        //                bootbox.alert(messageModel.messages[7].Message);
        //            });
        //        }
        //        else {
        //            bootbox.alert("Cancelled!", "", "error");
        //        }
        //    });
        //};
        $scope.cancelUOMClick = function () {
            $location.path('/home').replace();
        };

        var addEditUOMModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstUnitOfMeasureAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditUOM() {
            addEditUOMModal.$promise.then(addEditUOMModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllUOM();
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
    }
]);
app.controller('maintainUnitOfMeasureController', ['$rootScope', '$scope', '$modal', 'masterUnitOfMeasureFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterUnitOfMeasureFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.allUOM = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
        };

        initialize();
        var flag = 0;

        getAllUOM();
        function getAllUOM() {                   //get data from session
            masterUnitOfMeasureFactory.getAllUOM()
            .success(function (data) {
                $scope.allUOM = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.UOM = {};
            $scope.userForm.$setPristine();
        }

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkUOM();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                    $scope.reset();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.cancelClick = function () {
            this.$hide();
            initialize();
            getAllUOM();
        };

        function insertData() {
            if (flag != 1) {
                $scope.UOM.AddedBy = userModel.currentUserDetails.Id
                masterUnitOfMeasureFactory.insertData($scope.UOM)
                .success(function (data) {
                    showInfoPanel(false, 'Unit of Measure Added Successfully.');
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Unit Of Measure already exist!');
            };
        };

        function editRecord() {
            if (flag = 1) {
                masterUnitOfMeasureFactory.editRecord($scope.UOM.Id, $scope.UOM)
                .success(function (data) {
                    showInfoPanel(false, 'Unit of Measure Updated Successfully.');
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Unit Of Measure not exists!');
            };
        };

        function checkUOM() {
            if ($scope.allUOM.length != 0) {
                for (var i = 0; i < $scope.allUOM.length; i++) {
                    if (angular.uppercase($scope.allUOM[i].UOMCode) == angular.uppercase($scope.UOM.UOMCode)) {// && angular.uppercase($scope.allUOM[i].UOMCode) != angular.uppercase($scope.oldCaste)) {
                        flag = 1;
                        break
                    }
                    else {
                        flag = 0;
                    };
                }
            };
        };

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
    }
]);


app.controller('masterTax', ['$rootScope', '$scope', '$modal', 'masterTaxFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterTaxFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.Tax = {};
            $scope.allTax = {};
            $scope.dispTax = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.exportKeys = ["TaxCode", "TaxDescription"];
            $scope.exportHeaders = ["Code", "Description"];
        };

        initialize();
        var flag = 0;

        getAllTax();
        function getAllTax() {                   //get data from session
            masterTaxFactory.getAllTax()
            .success(function (data) {
                $scope.allTax = data;
                $scope.dispTax = [].concat($scope.allTax);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddTaxClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            $scope.Tax = {};
            openAddEditTax();
        };
        $scope.editTaxClick = function (objtax) {
            resetInfoPanel();
            $scope.editMode = true;
            $scope.Tax = objtax;
            openAddEditTax();
        };

        $scope.cancelTaxClick = function () {
            $location.path('/home').replace();
        };

        var addEditTaxModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstTaxAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditTax() {
            addEditTaxModal.$promise.then(addEditTaxModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllTax();
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
    }
]);

app.controller('maintainTaxController', ['$rootScope', '$scope', '$modal', 'masterTaxFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterTaxFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.allTax = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
        };

        initialize();
        var flag = 0;

        getAllTax();
        function getAllTax() {                   //get data from session
            masterTaxFactory.getAllTax()
            .success(function (data) {
                $scope.allTax = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkTax();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                    $scope.reset();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.Tax = {};
            $scope.userForm.$setPristine();
        }

        $scope.cancelClick = function () {
            this.$hide();
            initialize();
            getAllTax();

        }

        function insertData() {
            if (flag != 1) {
                $scope.Tax.AddedBY = userModel.currentUserDetails.Id
                masterTaxFactory.insertData($scope.Tax)
                .success(function (data) {
                    showInfoPanel(false, 'Tax Added Successfully.');
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Tax already exist!');
            };
        };

        function editRecord() {
            if (flag = 1) {
                masterTaxFactory.editRecord($scope.Tax.Id, $scope.Tax)
                .success(function (data) {
                    showInfoPanel(false, 'Tax Updated Successfully.');
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Tax not exists!');
            };
        };

        function checkTax() {
            if ($scope.allTax.length != 0) {
                for (var i = 0; i < $scope.allTax.length; i++) {
                    if (angular.uppercase($scope.allTax[i].TaxCode) == angular.uppercase($scope.Tax.TaxCode)) {// && angular.uppercase($scope.allTax[i].TaxCode) != angular.uppercase($scope.oldCaste)) {
                        flag = 1;
                        break
                    }
                    else {
                        flag = 0;
                    };
                }
            };
        };

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
    }
]);


//------------------------------masterVendor-------------------------------------------
app.controller('masterVendor', ['$rootScope', '$scope', '$modal', 'masterVendorFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterVendorFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.Vendor = {};
            $scope.allVendor = {};
            $scope.dispVendor = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.exportKeys = ["VendorCode", "VendorDescription"];
            $scope.exportHeaders = ["Vendor Code", "Description"];
        };

        initialize();
        var flag = 0;

        getAllVendor();
        function getAllVendor() {                   //get data from session
            masterVendorFactory.getAllVendor()
            .success(function (data) {
                $scope.allVendor = data;
                $scope.dispVendor = [].concat($scope.allVendor);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddVendorClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            $scope.Vendor = {};
            openAddEditVendor();
        };
        $scope.editVendorClick = function (objVendor) {
            resetInfoPanel();
            $scope.editMode = true;
            $scope.Vendor = objVendor;
            openAddEditVendor();
        };

        $scope.cancelVendorClick = function () {
            $location.path('/home').replace();
        };

        var addEditVendorModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstVendorAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditVendor() {
            addEditVendorModal.$promise.then(addEditVendorModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllVendor();
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
    }
]);

app.controller('maintainVendorController', ['$rootScope', '$scope', '$modal', 'masterVendorFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterVendorFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.allVendor = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";

        };

        initialize();
        var flag = 0;

        getAllVendor();
        function getAllVendor() {                   //get data from session
            masterVendorFactory.getAllVendor()
            .success(function (data) {
                $scope.allVendor = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.Vendor = {};
            $scope.userForm.$setPristine();
        }

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkVendor();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                    $scope.submitted = false;
                    $scope.Vendor = {};
                    $scope.userForm.$setPristine();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.cancelClick = function () {
            this.$hide();
            initialize();
            getAllVendor();

        }

        function insertData() {
            if (flag != 1) {
                $scope.Vendor.AddedBY = userModel.currentUserDetails.Id
                masterVendorFactory.insertData($scope.Vendor)
                .success(function (data) {
                    showInfoPanel(false, 'Vendor Added Successfully.');
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Vendor already exist!');
            };
        };

        function editRecord() {
            if (flag = 1) {
                masterVendorFactory.editRecord($scope.Vendor.Id, $scope.Vendor)
                .success(function (data) {
                    showInfoPanel(false, 'Vendor Updated Successfully.');
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Vendor not exists!');
            };
        };

        function checkVendor() {
            if ($scope.allVendor.length != 0) {
                for (var i = 0; i < $scope.allVendor.length; i++) {
                    if (angular.uppercase($scope.allVendor[i].VendorCode) == angular.uppercase($scope.Vendor.VendorCode)) {// && angular.uppercase($scope.allVendor[i].VendorCode) != angular.uppercase($scope.oldCaste)) {
                        flag = 1;
                        break
                    }
                    else {
                        flag = 0;
                    };
                }
            };
        };

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
    }
]);
//-------------------------------------------------------------------------------------

//------------------------------masterDepartment---------------------------------------
app.controller('masterDepartment', ['$rootScope', '$scope', '$modal', 'masterDepartmentFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterDepartmentFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.Department = {};
            $scope.allDepartment = {};
            $scope.dispDepartment = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.exportKeys = ["DepartmentCode", "DepartmentDescription"];
            $scope.exportHeaders = ["Code", "Description"];
        };

        initialize();
        var flag = 0;

        getAllDepartment();
        function getAllDepartment() {                   //get data from session
            masterDepartmentFactory.getAllDepartment()
            .success(function (data) {
                $scope.allDepartment = data;
                $scope.dispDepartment = [].concat($scope.allDepartment);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddDepartmentClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            $scope.Department = {};
            openAddEditDepartment();
        };
        $scope.editDepartmentClick = function (objDepartment) {
            resetInfoPanel();
            $scope.editMode = true;
            $scope.Department = objDepartment;
            openAddEditDepartment();
        };

        $scope.cancelDepartmentClick = function () {
            $location.path('/home').replace();
        };

        var addEditDepartmentModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstDepartmentAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditDepartment() {
            addEditDepartmentModal.$promise.then(addEditDepartmentModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllDepartment();
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
    }
]);

app.controller('maintainDepartmentController', ['$rootScope', '$scope', '$modal', 'masterDepartmentFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterDepartmentFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.allDepartment = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
        };

        initialize();
        var flag = 0;

        getAllDepartment();
        function getAllDepartment() {                   //get data from session
            masterDepartmentFactory.getAllDepartment()
            .success(function (data) {
                $scope.allDepartment = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.Department = {};
            $scope.userForm.$setPristine();
        }

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkDepartment();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                    $scope.reset();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.cancelClick = function () {
            this.$hide();
            initialize();
            getAllDepartment();

        }

        function insertData() {
            if (flag != 1) {
                $scope.Department.AddedBY = userModel.currentUserDetails.Id
                masterDepartmentFactory.insertData($scope.Department)
                .success(function (data) {
                    showInfoPanel(false, 'Department Added Successfully.');
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Department already exist!');
            };
        };

        function editRecord() {
            if (flag = 1) {
                masterDepartmentFactory.editRecord($scope.Department.Id, $scope.Department)
                .success(function (data) {
                    showInfoPanel(false, 'Department Updated Successfully.');
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Department not exists!');
            };
        };

        function checkDepartment() {
            if ($scope.allDepartment.length != 0) {
                for (var i = 0; i < $scope.allDepartment.length; i++) {
                    if (angular.uppercase($scope.allDepartment[i].DepartmentCode) == angular.uppercase($scope.Department.DepartmentCode)) {// && angular.uppercase($scope.allDepartment[i].DepartmentCode) != angular.uppercase($scope.oldCaste)) {
                        flag = 1;
                        break
                    }
                    else {
                        flag = 0;
                    };
                }
            };
        };

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
    }
]);

//-------------------------------------------------------------------------------------

//------------------------------masterDocumentType---------------------------------------
app.controller('masterDocumentType', ['$rootScope', '$scope', '$modal', 'masterDocumentTypeFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterDocumentTypeFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.DocumentType = {};
            $scope.allDocumentType = {};
            $scope.dispDocumentType = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
        };

        initialize();
        var flag = 0;

        getAllDocumentType();
        function getAllDocumentType() {                   //get data from session
            masterDocumentTypeFactory.getAllDocumentType()
            .success(function (data) {
                $scope.allDocumentType = data;
                $scope.dispDocumentType = [].concat($scope.allDocumentType);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddDocumentTypeClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            $scope.DocumentType = {};
            openAddEditDocumentType();
        };
        $scope.editDocumentTypeClick = function (objDocumentType) {
            resetInfoPanel();
            $scope.editMode = true;
            $scope.DocumentType = objDocumentType;
            openAddEditDocumentType();
        };

        $scope.cancelDocumentTypeClick = function () {
            $location.path('/home').replace();
        };

        var addEditDocumentTypeModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstDocumentTypeAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditDocumentType() {
            addEditDocumentTypeModal.$promise.then(addEditDocumentTypeModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllDocumentType();
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
    }
]);

app.controller('maintainDocumentTypeController', ['$rootScope', '$scope', '$modal', 'masterDocumentTypeFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterDocumentTypeFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.allDocumentType = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
        };

        initialize();
        var flag = 0;

        getAllDocumentType();
        function getAllDocumentType() {                   //get data from session
            masterDocumentTypeFactory.getAllDocumentType()
            .success(function (data) {
                $scope.allDocumentType = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.DocumentType = {};
            $scope.userForm.$setPristine();
        }

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkDocumentType();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                    $scope.reset();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.cancelClick = function () {
            this.$hide();
            initialize();
            getAllDocumentType();

        }

        function insertData() {
            if (flag != 1) {
                $scope.DocumentType.AddedBY = userModel.currentUserDetails.Id
                masterDocumentTypeFactory.insertData($scope.DocumentType)
                .success(function (data) {
                    showInfoPanel(false, 'DocumentType Added Successfully.');
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'DocumentType already exist!');
            };
        };

        function editRecord() {
            if (flag = 1) {
                masterDocumentTypeFactory.editRecord($scope.DocumentType.Id, $scope.DocumentType)
                .success(function (data) {
                    showInfoPanel(false, 'DocumentType Updated Successfully.');
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'DocumentType not exists!');
            };
        };

        function checkDocumentType() {
            if ($scope.allDocumentType.length != 0) {
                for (var i = 0; i < $scope.allDocumentType.length; i++) {
                    if (angular.uppercase($scope.allDocumentType[i].DocumentTypeCode) == angular.uppercase($scope.DocumentType.DocumentTypeCode)) {// && angular.uppercase($scope.allDocumentType[i].DocumentTypeCode) != angular.uppercase($scope.oldCaste)) {
                        flag = 1;
                        break
                    }
                    else {
                        flag = 0;
                    };
                }
            };
        };

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
    }
]);

//-------------------------------------------------------------------------------------

//------------------------------masterItemCategory---------------------------------------
app.controller('masterItemCategory', ['$rootScope', '$scope', '$modal', 'masterItemCategoryFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterItemCategoryFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.ItemCategory = {};
            $scope.allItemCategory = {};
            $scope.dispItemCategory = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.exportKeys = ["Code", "Description"];
            $scope.exportHeaders = ["Code", "Description"];
        };

        initialize();
        var flag = 0;

        getAllItemCategory();
        function getAllItemCategory() {                   //get data from session
            masterItemCategoryFactory.getAllItemCategory()
            .success(function (data) {
                $scope.allItemCategory = data;
                $scope.dispItemCategory = [].concat($scope.allItemCategory);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddItemCategoryClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            $scope.ItemCategory = {};
            openAddEditItemCategory();
        };
        $scope.editItemCategoryClick = function (objItemCategory) {
            resetInfoPanel();
            $scope.editMode = true;
            $scope.ItemCategory = objItemCategory;
            openAddEditItemCategory();
        };

        $scope.cancelItemCategoryClick = function () {
            $location.path('/home').replace();
        };

        var addEditItemCategoryModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstItemCategoryAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditItemCategory() {
            addEditItemCategoryModal.$promise.then(addEditItemCategoryModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllItemCategory();
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
    }
]);

app.controller('maintainItemCategoryController', ['$rootScope', '$scope', '$modal', 'masterItemCategoryFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterItemCategoryFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.allItemCategory = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
        };

        initialize();
        var flag = 0;

        getAllItemCategory();
        function getAllItemCategory() {                   //get data from session
            masterItemCategoryFactory.getAllItemCategory()
            .success(function (data) {
                $scope.allItemCategory = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.ItemCategory = {};
            $scope.userForm.$setPristine();
        }

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkItemCategory();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                    $scope.reset();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.cancelClick = function () {
            this.$hide();
            initialize();
            getAllItemCategory();

        }

        function insertData() {
            if (flag != 1) {
                $scope.ItemCategory.AddedBY = userModel.currentUserDetails.Id
                masterItemCategoryFactory.insertData($scope.ItemCategory)
                .success(function (data) {
                    showInfoPanel(false, 'ItemCategory Added Successfully.');
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'ItemCategory already exist!');
            };
        };

        function editRecord() {
            if (flag = 1) {
                masterItemCategoryFactory.editRecord($scope.ItemCategory.Id, $scope.ItemCategory)
                .success(function (data) {
                    showInfoPanel(false, 'ItemCategory Updated Successfully.');
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'ItemCategory not exists!');
            };
        };

        function checkItemCategory() {
            if ($scope.allItemCategory.length != 0) {
                for (var i = 0; i < $scope.allItemCategory.length; i++) {
                    if (angular.uppercase($scope.allItemCategory[i].Code) == angular.uppercase($scope.ItemCategory.Code)) {// && angular.uppercase($scope.allItemCategory[i].ItemCategoryCode) != angular.uppercase($scope.oldCaste)) {
                        flag = 1;
                        break
                    }
                    else {
                        flag = 0;
                    };
                }
            };
        };

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
    }
]);

//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

//------------------------------masterCustomerSupplierType---------------------------------------
app.controller('masterCustomerSupplierType', ['$rootScope', '$scope', '$modal', 'masterCustomerSupplierTypeFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterCustomerSupplierTypeFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.CustomerSupplierType = {};
            $scope.allCustomerSupplierType = {};
            $scope.dispCustomerSupplierType = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.exportKeys = ["Identifier", "Description"];
            $scope.exportHeaders = ["Code", "Description"];
        };

        initialize();
        var flag = 0;

        getAllCustomerSupplierType();
        function getAllCustomerSupplierType() {                   //get data from session
            masterCustomerSupplierTypeFactory.getAllCustomerSupplierType()
            .success(function (data) {
                $scope.allCustomerSupplierType = data;
                $scope.dispCustomerSupplierType = [].concat($scope.allCustomerSupplierType);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddCustomerSupplierTypeClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            $scope.CustomerSupplierType = {};
            openAddEditCustomerSupplierType();
        };
        $scope.editCustomerSupplierTypeClick = function (objCustomerSupplierType) {
            resetInfoPanel();
            $scope.editMode = true;
            $scope.CustomerSupplierType = objCustomerSupplierType;
            openAddEditCustomerSupplierType();
        };

        $scope.cancelCustomerSupplierTypeClick = function () {
            $location.path('/home').replace();
        };

        var addEditCustomerSupplierTypeModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstCustomerSupplierTypeAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditCustomerSupplierType() {
            addEditCustomerSupplierTypeModal.$promise.then(addEditCustomerSupplierTypeModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllCustomerSupplierType();
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
    }
]);

app.controller('maintainCustomerSupplierTypeController', ['$rootScope', '$scope', '$modal', 'masterCustomerSupplierTypeFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterCustomerSupplierTypeFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.allCustomerSupplierType = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
        };

        initialize();
        var flag = 0;

        getAllCustomerSupplierType();
        function getAllCustomerSupplierType() {                   //get data from session
            masterCustomerSupplierTypeFactory.getAllCustomerSupplierType()
            .success(function (data) {
                $scope.allCustomerSupplierType = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkCustomerSupplierType();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                    $scope.reset();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.CustomerSupplierType = {};
            $scope.userForm.$setPristine();
        }

        $scope.cancelClick = function () {
            this.$hide();
            initialize();
            getAllCustomerSupplierType();

        }

        function insertData() {
            if (flag != 1) {
                $scope.CustomerSupplierType.AddedBY = userModel.currentUserDetails.Id
                masterCustomerSupplierTypeFactory.insertData($scope.CustomerSupplierType)
                .success(function (data) {
                    showInfoPanel(false, 'CustomerSupplierType Added Successfully.');
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'CustomerSupplierType already exist!');
            };
        };

        function editRecord() {
            if (flag = 1) {
                masterCustomerSupplierTypeFactory.editRecord($scope.CustomerSupplierType.Id, $scope.CustomerSupplierType)
                .success(function (data) {
                    showInfoPanel(false, 'CustomerSupplierType Updated Successfully.');
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'CustomerSupplierType not exists!');
            };
        };

        function checkCustomerSupplierType() {
            if ($scope.allCustomerSupplierType.length != 0) {
                for (var i = 0; i < $scope.allCustomerSupplierType.length; i++) {
                    if (angular.uppercase($scope.allCustomerSupplierType[i].Identifier) == angular.uppercase($scope.CustomerSupplierType.Identifier)) {// && angular.uppercase($scope.allCustomerSupplierType[i].Identifier) != angular.uppercase($scope.oldCaste)) {
                        flag = 1;
                        break
                    }
                    else {
                        flag = 0;
                    };
                }
            };
        };

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
    }
]);
//-------------------------------------------------------------------------------------

//------------------------------masterItemController---------------------------------------
app.controller('masterItemController', ['$rootScope', '$scope', '$modal', 'masterItemFactory', '$location', 'userModel', 'tempModel', 'messageModel', 'masterUnitOfMeasureFactory', 'masterItemCategoryFactory', '$base64',
    function ($rootScope, $scope, $modal, masterItemFactory, $location, userModel, tempModel, messageModel, masterUnitOfMeasureFactory, masterItemCategoryFactory, $base64) {
        function initialize() {
            $scope.Item = {};
            $scope.allItem = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.allUOM = [];
            $scope.exportKeys = ["ItemCode", "ItemType", "UOMCode", "Location", "MinStockLevel", "MaxStockLevel"];
            $scope.exportHeaders = ["Item Code", "Item Type", "Unit of measure", "Location", "Min Stock", "Max Stock"];

        };

        initialize();
        var flag = 0;

        getAllItem();
        function getAllItem() {                   //get data from session
            masterItemFactory.getAllItem()
            .success(function (data) {
                $scope.allItem = data;
                $scope.dispItem = [].concat($scope.allItem);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };



        $scope.AddItemClick = function () {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.Item = {};
            $location.path('/mstItemAddEdit').replace();
        };
        $scope.editItemClick = function (Item) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = Item;
            $location.path('/mstItemAddEdit').replace();
        };
        $scope.addEditItemDiagramClick = function (Item) {
            resetInfoPanel();
            userModel.editMode = false;
            tempModel.itemToAddDrawing = Item;
            openAddEditItemDrawingModal();
        };

        var addEditItemDrawingModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstDrawing.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditItemDrawingModal() {
            addEditItemDrawingModal.$promise.then(addEditItemDrawingModal.show);
        };

        var defaultDrawingModal = $modal({ scope: $scope, template: 'defaultDrawing.html', animation: 'am-flip-x', show: false, backdrop: false });
        $scope.openDrawing = function (item) {
            $scope.Item = item;
            $scope.previewDefaultDrawing = $base64.decode($scope.Item.Drawing[0].Drawing);
            defaultDrawingModal.$promise.then(defaultDrawingModal.show);
        };


        $scope.$on('modal.hide', function () {
            //initialize();
            getAllItem();
        });

        getAllUOM();
        function getAllUOM() {                   //get data from session
            masterUnitOfMeasureFactory.getAllUOM()
            .success(function (data) {
                $scope.allUOM = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
        getAllItemCategory();
        function getAllItemCategory() {                   //get data from session
            masterItemCategoryFactory.getAllItemCategory()
            .success(function (data) {
                $scope.allItemCategory = data;
                $scope.dispItemCategory = [].concat($scope.allItemCategory);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

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
        $scope.clearFilter = function () {
            initialize();
            getAllItem();
        };

        $scope.pipeFunction = function (tableState, ctrl) {
            if (!$scope.stCtrl && ctrl) {
                $scope.stCtrl = ctrl;
            }

            if (!tableState && $scope.stCtrl) {
                $scope.stCtrl.pipe();
                return;
            }

            tableState.pagination.start = JSON.parse(localStorage.myTable).pagination.start || 0;
            tableState.pagination.number = JSON.parse(localStorage.myTable).pagination.start || 10;

            // get data
        }

    }
]);
app.controller('maintainItemController', ['$rootScope', '$scope', '$modal', 'masterItemFactory', '$location', 'userModel', 'messageModel', 'masterUnitOfMeasureFactory', 'masterItemCategoryFactory', '$base64',
    function ($rootScope, $scope, $modal, masterItemFactory, $location, userModel, messageModel, masterUnitOfMeasureFactory, masterItemCategoryFactory, $base64) {
        function initialize() {
            $scope.allItem = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            if (userModel.editMode == true) {
                $scope.Item = userModel.editRow;
                $scope.Item.objDrawing = $scope.Item.tblMasterDrawings;
            } else {
                $scope.Item = {};
                $scope.Item.objDrawing = {};
            }
            $scope.Item.tblMasterDrawings = [];
            $scope.editMode = userModel.editMode;
            //if ($scope.Item.tblMasterDrawings != null) {
            //    $scope.PreviewDrawing = $base64.decode($scope.Item.tblMasterDrawings.Drawing);
            //}
        };

        initialize();
        getAllItem();
        function getAllItem() {                   //get data from session
            masterItemFactory.getAllItem()
            .success(function (data) {
                $scope.allItem = data;
                $scope.dispItem = [].concat($scope.allItem);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        var flag = 0;
        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;

            if ($scope.userForm.$valid) {
                checkItem();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.Item = {};
            $scope.userForm.$setPristine();
        }

        $scope.cancelClick = function () {
            $location.path('/mstItem').replace();

        }

        function insertData() {
            if (flag != 1) {
                masterItemFactory.insertData($scope.Item)
                .success(function (data) {
                    if (data != null && data.Id > 0) {
                        showInfoPanel(false, 'Item Added Successfully. The Item Identifier is [' + data.Identifier + ']');
                        $scope.submitted = false;
                        $scope.Item = {};
                        $scope.userForm.$setPristine();
                    } else {
                        showInfoPanel(true, 'Error occured! Please Try Again!!!');
                    }
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Item already exist!');
            };
        };

        function editRecord() {
            if (flag = 1) {
                masterItemFactory.editRecord($scope.Item.Id, $scope.Item)
                .success(function (data) {
                    showInfoPanel(false, 'Item Updated Successfully.');
                    $scope.submitted = false;
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Item not exists!');
            };
        };

        function checkItem() {
            if ($scope.allItem.length != 0) {
                for (var i = 0; i < $scope.allItem.length; i++) {
                    if (angular.uppercase($scope.allItem[i].ItemCode) == angular.uppercase($scope.Item.ItemCode)) {// && angular.uppercase($scope.allItem[i].ItemCode) != angular.uppercase($scope.oldCaste)) {
                        flag = 0;
                        break
                    }
                    else {
                        flag = 0;
                    };
                }
            };
        };

        getAllUOM();
        function getAllUOM() {                   //get data from session
            masterUnitOfMeasureFactory.getAllUOM()
            .success(function (data) {
                $scope.allUOM = data;
                $scope.dispUOM = [].concat($scope.allUOM);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        getAllItemCategory();
        function getAllItemCategory() {                   //get data from session
            masterItemCategoryFactory.getAllItemCategory()
            .success(function (data) {
                $scope.allItemCategory = data;
                $scope.dispItemCategory = [].concat($scope.allItemCategory);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

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

        //$scope.file_changed = function (element) {
        //    var photofile = element.files[0];

        //    if (typeof FileReader !== "undefined") {
        //        var reader = new FileReader();
        //        reader.onload = function (e) {
        //            $scope.$apply(function () {
        //                $scope.Item.objDrawing.Drawing = $base64.encode(e.target.result);
        //                $scope.PreviewDrawing = e.target.result;
        //                $rootScope.imageData = e.target.result;
        //            });
        //        };
        //        reader.readAsDataURL(photofile);
        //    }
        //    else {
        //        fileUpload.uploadFileToUrl(photofile);
        //        $scope.Item.objDrawing.Drawing = $base64.encode($rootScope.imageData);
        //        $scope.PreviewDrawing = $rootScope.imageData;
        //    }
        //};

    }
]);
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

//------------------------------masterItemDrawingController---------------------------------------
app.controller('masterItemDrawingController', ['$rootScope', '$scope', '$base64', '$modal', 'masterItemDrawingFactory', '$location', 'userModel', 'tempModel', 'messageModel',
    function ($rootScope, $scope, $base64, $modal, masterItemDrawingFactory, $location, userModel, tempModel, messageModel) {
        function initialize() {
            $scope.item = tempModel.itemToAddDrawing;
            $scope.itemDrawing = {};
            $scope.allItemDrawing = {};
            $scope.dispAllItemDrawing = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.PreviewDrawing = "";
        };

        initialize();
        var isDrawingExists = 0;

        getAllItemDrawing($scope.item.Id);
        function getAllItemDrawing(itemId) {                   //get data from session
            masterItemDrawingFactory.getAllItemDrawing(itemId)
            .success(function (data) {
                $scope.allItemDrawing = data;
                $scope.dispAllItemDrawing = [].concat($scope.allItemDrawing);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        $scope.editDrawingClick = function (dwg) {
            resetInfoPanel();
            $scope.itemDrawing = angular.copy(dwg);
            $scope.PreviewDrawing = $base64.decode($scope.itemDrawing.Drawing);

        };

        $scope.cancelClick = function () {
            this.$hide();
        }
        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.itemDrawing = {};
            $scope.PreviewDrawing = null;
            $scope.userForm.$setPristine();
        }

        $scope.saveClick = function (form) {
            $scope.itemDrawing.ItemId = $scope.item.Id;
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkItemDrawing();
                insertData();
                //if (isDrawingExists == 1) {
                //    editRecord();
                //}
                //else {
                //    insertData();
                //}

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        function insertData() {
            masterItemDrawingFactory.insertData($scope.itemDrawing)
            .success(function (data) {
                if (data != null && data == 1) {
                    initialize();
                    getAllItemDrawing($scope.item.Id);
                    showInfoPanel(false, 'Drawing Added Successfully.');
                    $scope.PreviewDrawing = null;
                    $scope.submitted = false;
                    $scope.itemDrawing = {};
                    $scope.userForm.$setPristine();

                }
                else if (data != null && data == 2) {
                    initialize();
                    getAllItemDrawing($scope.item.Id);
                    showInfoPanel(false, 'Drawing Updated Successfully.');
                    $scope.PreviewDrawing = null;
                    $scope.submitted = false;
                    $scope.itemDrawing = {};
                    $scope.userForm.$setPristine();
                }
                else {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                }
            })
            .error(function (error) {
                showInfoPanel(true, 'Error occured! Please Try Again!!!');
            });
        };

        function editRecord() {
            if (isDrawingExists = 1) {
                masterItemDrawingFactory.editRecord($scope.itemDrawing.Id, $scope.itemDrawing)
                .success(function (data) {
                    showInfoPanel(false, 'Drawing Updated Successfully.');
                    $scope.PreviewDrawing = null;
                    $scope.submitted = false;
                    $scope.itemDrawing = {};
                    $scope.userForm.$setPristine();

                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Drawing not exists!');
            };
        };

        function checkItemDrawing() {
            if ($scope.allItemDrawing.length != 0) {
                for (var i = 0; i < $scope.allItemDrawing.length; i++) {
                    if (angular.uppercase($scope.allItemDrawing[i].DrawingCode) == angular.uppercase($scope.itemDrawing.DrawingCode)) {// && angular.uppercase($scope.allItem[i].ItemCode) != angular.uppercase($scope.oldCaste)) {
                        isDrawingExists = 1;
                        break
                    }
                    else {
                        isDrawingExists = 0;
                    };
                }
            };
        };


        $scope.file_changed = function (element) {
            var photofile = element.files[0];

            if (typeof FileReader !== "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $scope.$apply(function () {
                        $scope.itemDrawing.Drawing = $base64.encode(e.target.result);
                        $scope.PreviewDrawing = e.target.result;
                        $rootScope.imageData = e.target.result;
                    });
                };
                reader.readAsDataURL(photofile);
            }
            else {
                fileUpload.uploadFileToUrl(photofile);
                $scope.itemDrawing.Drawing = $base64.encode($rootScope.imageData);
                $scope.PreviewDrawing = $rootScope.imageData;
            }
        };
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


    }
]);

//-------------------------------------------------------------------------------------
//------------------------------masterBOMOperation---------------------------------------

app.controller('masterBOMOperationsController', ['$rootScope', '$scope', '$modal', 'masterBOMOperationsFactory', '$location', 'userModel', 'messageModel', 'masterUnitOfMeasureFactory',
    function ($rootScope, $scope, $modal, masterBOMOperationsFactory, $location, userModel, messageModel, masterUnitOfMeasureFactory) {
        function initialize() {
            $scope.bomOperation = {};
            $scope.allBOMOperations = {};
            $scope.dispBOMOperations = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.exportKeys = ["strOperation", "Description", 'intUnit'];
            $scope.exportHeaders = ["Operation", "Description", "Unit"];
        };

        initialize();
        var flag = 0;

        getAllBOMOperation();
        function getAllBOMOperation() {                   //get data from session
            masterBOMOperationsFactory.getAllBOMOperation()
            .success(function (data) {
                $scope.allBOMOperations = data;
                $scope.dispBOMOperations = [].concat($scope.allBOMOperations);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
        getAllUOM();
        function getAllUOM() {                   //get data from session
            masterUnitOfMeasureFactory.getAllUOM()
            .success(function (data) {
                $scope.allUOM = data;
                $scope.dispUOM = [].concat($scope.allUOM);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddBOMOperationsClick = function () {
            resetInfoPanel();
            $scope.editMode = false;
            $scope.bomOperation = {};
            openAddEditBOMOperations();
        };
        $scope.editBOMOperationsClick = function (objBOMOperations) {
            resetInfoPanel();
            $scope.editMode = true;
            $scope.bomOperation = objBOMOperations;
            openAddEditBOMOperations();
        };

        $scope.cancelBOMOperationsClick = function () {
            $location.path('/home').replace();
        };

        var addEditBOMOperationsModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstBOMOperationsAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditBOMOperations() {
            addEditBOMOperationsModal.$promise.then(addEditBOMOperationsModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllBOMOperation();
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
    }
]);

app.controller('maintainBOMOperationController', ['$rootScope', '$scope', '$modal', 'masterBOMOperationsFactory', '$location', 'userModel', 'messageModel', 'masterUnitOfMeasureFactory',
    function ($rootScope, $scope, $modal, masterBOMOperationsFactory, $location, userModel, messageModel, masterUnitOfMeasureFactory) {
        function initialize() {
            $scope.allBOMOperations = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
        };

        initialize();
        var flag = 0;

        getAllBOMOperation();
        function getAllBOMOperation() {                   //get data from session
            masterBOMOperationsFactory.getAllBOMOperation()
            .success(function (data) {
                $scope.allBOMOperations = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
        getAllUOM();
        function getAllUOM() {                   //get data from session
            masterUnitOfMeasureFactory.getAllUOM()
            .success(function (data) {
                $scope.allUOM = data;
                $scope.dispUOM = [].concat($scope.allUOM);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkBOMOperations();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                    $scope.reset();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.bomOperation = {};
            $scope.userForm.$setPristine();
        }

        $scope.cancelClick = function () {
            this.$hide();
            initialize();
            getAllBOMOperations();

        }

        function insertData() {
            if (flag != 1) {
                $scope.bomOperation.AddedBY = userModel.currentUserDetails.Id
                masterBOMOperationsFactory.insertData($scope.bomOperation)
                .success(function (data) {
                    showInfoPanel(false, 'Operation Added Successfully.');
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Operation already exist!');
            };
        };

        function editRecord() {
            if (flag = 1) {
                masterBOMOperationsFactory.editRecord($scope.bomOperation.Id, $scope.bomOperation)
                .success(function (data) {
                    showInfoPanel(false, 'Operation Updated Successfully.');
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Operation not exists!');
            };
        };

        function checkBOMOperations() {
            if ($scope.allBOMOperations.length != 0) {
                for (var i = 0; i < $scope.allBOMOperations.length; i++) {
                    if (angular.uppercase($scope.allBOMOperations[i].strOperation) == angular.uppercase($scope.bomOperation.strOperation)) {// && angular.uppercase($scope.allBOMOperations[i]bomOperationCode) != angular.uppercase($scope.oldCaste)) {
                        flag = 1;
                        break
                    }
                    else {
                        flag = 0;
                    };
                }
            };
        };

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
    }
]);



//------------------------------masterLocation---------------------------------------
app.controller('masterLocation', ['$rootScope', '$scope', '$modal', 'masterLocationFactory', '$location', 'userModel', 'tempModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterLocationFactory, $location, userModel, tempModel, messageModel) {
        function initialize() {
            $scope.Location = {};
            $scope.allLocation = {};
            $scope.dispLocation = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.editMode = userModel.editMode;
            $scope.allCity = [];
            $scope.allUser = [];
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.exportKeys = ["Identifier", "Description"];
            $scope.exportHeaders = ["Identifier", "Description"];
            $scope.allLocationContact = [];
            $scope.dispAllLocationContact = [];
        };

        initialize();
        var flag = 0;

        getAllLocation();
        function getAllLocation() {                   //get data from session
            masterLocationFactory.getAllLocation()
            .success(function (data) {
                $scope.allLocation = data;
                $scope.dispLocation = [].concat($scope.allLocation);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.addEditBinClick = function (Location) {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.Location = Location;
            openAddEditBin();
        };
        var addEditBinModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstBin.html', animation: 'am-flip-x', show: false, backdrop: true });
        function openAddEditBin() {
            addEditBinModal.$promise.then(addEditBinModal.show);
        };






        $scope.AddLocationClick = function () {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.Location = {};
            // $location.path('/mstLocationAddEdit').replace();
            openAddEditLocation();
        };
        var addEditLocationModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstLocationAddEdit.html', animation: 'am-flip-x', show: false, backdrop: true });
        function openAddEditLocation() {
            addEditLocationModal.$promise.then(addEditLocationModal.show);
        };
        $scope.editLocationClick = function (objLocation) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = objLocation;
            //$location.path('/mstLocationAddEdit').replace();
            openAddEditLocation();
        };

        $scope.cancelLocationClick = function () {
            $location.path('/home').replace();
        };

        var showContactModal = $modal({ scope: $scope, template: 'showContact.html', animation: 'am-flip-x', show: false, backdrop: false });
        $scope.showContact = function (Location) {
            resetInfoPanel();
            userModel.editMode = false;
            getAllLocationContact(Location.Id);
            showContactModal.$promise.then(showContactModal.show);
        };


        $scope.$on('modal.hide', function () {
            initialize();
            getAllLocation();
        });

        //$scope.clearFilter = function () {
        //    initialize();
        //    getAllLocation();
        //};

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

        //Get all city 
        getAllCity();
        function getAllCity() {
            masterLocationFactory.getAllCity()
            .success(function (data) {
                $scope.allCity = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        //Get all Users
        getAllUser();
        function getAllUser() {
            masterLocationFactory.getAllUser()
            .success(function (data) {
                $scope.allUser = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        //Get All location contact 
        function getAllLocationContact(LocationId) {                   //get data from session
            masterLocationFactory.getAllLocationContact(LocationId)
            .success(function (data) {
                $scope.allLocationContact = data;
                $scope.dispAllLocationContact = [].concat($scope.allLocationContact);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
    }
]);

app.controller('maintainLocationController', ['$rootScope', '$scope', '$modal', 'masterLocationFactory', '$location', 'userModel', 'messageModel', 'masterCountryStateCityFactory',
function ($rootScope, $scope, $modal, masterLocationFactory, $location, userModel, messageModel, masterCountryStateCityFactory) {
    function initialize() {
        $scope.allLocation = {};
        $scope.allContact = [];
        $scope.contact = [];
        $scope.contact.ContactInfo = [];
        $scope.Location = {};
        $scope.Location.tblMasterLocationContacts = [];
        $scope.isError = false;
        $scope.isSuccess = false;
        $scope.SuccessErrorMessage = "";
        $scope.addCount = 0;
        if (userModel.editMode == true) {
            $scope.Location = userModel.editRow;
            for (var i = 0; i < $scope.Location.LocationContact.length; i++) {
                $scope.obj4 = {
                    Id: $scope.Location.LocationContact[i].Id,
                    EmployeeId: $scope.Location.LocationContact[i].EmployeeId,
                    LocationId: $scope.Location.LocationContact[i].LocationId,
                    IsActive: $scope.Location.LocationContact[i].IsActive,
                    IsDefault: $scope.Location.LocationContact[i].IsDefault,
                    Designation: $scope.Location.LocationContact[i].tblUser.Designation,
                    ContactNo1: $scope.Location.LocationContact[i].tblUser.ContactNo1,
                    ContactNo2: $scope.Location.LocationContact[i].tblUser.ContactNo2
                };
                $scope.contact.push($scope.obj4);
            }
        } else {
            $scope.Location = {};
            $scope.Location.DefaultContact = [];
            $scope.Location.LocationContact = [];
        }
        $scope.editMode = userModel.editMode;
        $scope.allLocationContact = [];
        $scope.allCity = [];
        $scope.allUser = [];

    };

    initialize();
    var flag = 0;

    getAllLocation();
    function getAllLocation() {                   //get data from session
        masterLocationFactory.getAllLocation()
        .success(function (data) {
            $scope.allLocation = data;
        })
        .error(function (error) {
            bootbox.alert("Error Occored!!! Please try again!!!");
        });
    };

    $scope.reset = function (userForm) {
        $scope.submitted = false;
        resetInfoPanel();
        $scope.Location = {};
        $scope.userForm.$setPristine();
    };

    $scope.saveClick = function (form) {
        resetInfoPanel();
        $scope.submitted = true;
        $scope.userForm = form;
        if ($scope.userForm.$valid) {
            checkLocation();
            if ($scope.editMode == true) {
                editRecord();
            }
            else {
                insertData();
            }
        }
        else {
            showInfoPanel(true, 'Please fill form carefully!!');
        }
    };

    $scope.cancelClick = function () {
        this.$hide();
        initialize();
    };

    function insertData() {
        if (flag != 1) {
            $scope.Location.AddedBY = userModel.currentUserDetails.Id
            $scope.Location.tblMasterLocationContacts = $scope.contact;
            if ($scope.contact.length > 0) {
                masterLocationFactory.insertData($scope.Location)
                .success(function (data) {
                    showInfoPanel(false, 'Location Added Successfully. The Location Identifier is [' + data.Identifier + ']');
                    //$scope.Location = {};
                    //$scope.contact = [];
                    //$scope.contact.ContactInfo = [];
                    //$scope.Location.tblMasterLocationContacts = [];
                    $scope.reset();
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'At least one contact is required!!!');
            }
        }
        else {
            showInfoPanel(true, 'Location already exist!');
        };
    };

    function editRecord() {
        if (flag = 1) {
            $scope.Location.tblMasterLocationContacts = $scope.contact;
            masterLocationFactory.editRecord($scope.Location.Id, $scope.Location)
            .success(function (data) {
                showInfoPanel(false, 'Location Updated Successfully.');
            })
            .error(function (error) {
                //Error Message
                showInfoPanel(true, 'Error occured! Please Try Again!!!');
            });
        }
        else {
            showInfoPanel(true, 'Location not exists!');
        };
    };

    function checkLocation() {
        if ($scope.allLocation.length != 0) {
            for (var i = 0; i < $scope.allLocation.length; i++) {
                if (angular.uppercase($scope.allLocation[i].Identifier) == angular.uppercase($scope.Location.Identifier)) {// && angular.uppercase($scope.allLocation[i].LocationCode) != angular.uppercase($scope.oldCaste)) {
                    flag = 1;
                    break
                }
                else {
                    flag = 0;
                };
            }
        };
    };

    $scope.addNewContactRow = function () {
        $scope.obj3 = {
            Id: 0,
            EmployeeId: 0,
            LocationId: 0,
            IsActive: false,
            IsDefault: false,
            Designation: '',
            ContactNo1: '',
            ContactNo2: '',
            Count: $scope.addCount
        };
        $scope.addCount++;
        if ($scope.Location.Id > 0) {
            $scope.obj3.LocationId = $scope.Location.Id;
        }
        $scope.contact.push($scope.obj3);
        $scope.addCount++;
    };
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

    getAllCountry();
    function getAllCountry() {
        masterCountryStateCityFactory.getAllCountry()
        .success(function (data) {
            $scope.allCountry = data;
            $scope.dispCountry = [].concat($scope.allCountry);

            if ($scope.Location.Country > 0) {
                $scope.getStateByCountryId();
            }
        })
        .error(function (error) {
            bootbox.alert("Error Occored!!! Please try again!!!");
        });
    };
    $scope.getStateByCountryId = function () {
        $scope.allState = {};
        $scope.dispState = {};
        masterCountryStateCityFactory.getStatebyCountryId($scope.Location.Country)
              .success(function (data) {
                  $scope.allState = data;
                  $scope.dispState = [].concat($scope.allState);
                  if ($scope.Location.State > 0) {
                      $scope.getCityByStateId();
                  }
              })
              .error(function (error) {
                  bootbox.alert("Error on getting State");
              });
    };
    $scope.getCityByStateId = function () {
        $scope.dispCity = {};
        $scope.allCity = {};
        masterCountryStateCityFactory.getCityByStateId($scope.Location.State)
              .success(function (data) {
                  $scope.allCity = data;
                  $scope.dispCity = [].concat($scope.allCity);
              })
              .error(function (error) {
                  bootbox.alert("Error on getting City");
              });
    };
    //Get all Users
    getAllUser();
    function getAllUser() {
        masterLocationFactory.getAllUser()
        .success(function (data) {
            $scope.allUser = data;
        })
        .error(function (error) {
            bootbox.alert("Error Occored!!! Please try again!!!");
        });
    };


    $scope.getEmployeeDetails = function (obj, index) {
        //Check Duplicacy 
        if ($scope.editMode == false) {
            for (var i = 0; i < $scope.contact.length; i++) {
                if ($scope.contact[i].EmployeeId == obj.EmployeeId && $scope.contact[i].Count !== obj.Count) {
                    $scope.contact[index].EmployeeId = 0;
                    $scope.contact[index].Designation = '';
                    $scope.contact[index].ContactNo1 = '';
                    $scope.contact[index].ContactNo2 = '';
                    $scope.contact[index].IsDefault = false;
                    $scope.contact[index].IsActive = false;
                    return;
                }
            }
        }
        else if ($scope.editMode == true) {
            for (var i = 0; i < $scope.contact.length; i++) {
                if ($scope.contact[i].EmployeeId == obj.EmployeeId && ($scope.contact[i].Id != obj.Id || $scope.contact[i].Count !== obj.Count)) {
                    $scope.contact[index].EmployeeId = 0;
                    $scope.contact[index].Designation = '';
                    $scope.contact[index].ContactNo1 = '';
                    $scope.contact[index].ContactNo2 = '';
                    $scope.contact[index].IsDefault = false;
                    $scope.contact[index].IsActive = false;
                    return;
                }
            }
        }
        //Assign Value on eloyee change
        for (var i = 0; i < $scope.allUser.length; i++) {
            if ($scope.allUser[i].Id == obj.EmployeeId) {
                $scope.contact[index].Designation = $scope.allUser[i].Designation;
                $scope.contact[index].ContactNo1 = $scope.allUser[i].ContactNo1;
                $scope.contact[index].ContactNo2 = $scope.allUser[i].ContactNo2;
                return;
            }
            else {
                $scope.contact[index].Designation = '';
                $scope.contact[index].ContactNo1 = '';
                $scope.contact[index].ContactNo2 = '';
                $scope.contact[index].IsDefault = false;
                $scope.contact[index].IsActive = false;
            }
        }
    };
    //Only one default should be selected 
    $scope.updateSelection = function (position, entities) {
        angular.forEach(entities, function (contact, index) {
            if (position != index)
                contact.IsDefault = false;
        });
    }
}
]);

//-------------------------------------------------------------------------------------
//------------------------------masterBin---------------------------------------

app.controller('masterBinController', ['$rootScope', '$scope', '$modal', 'masterBinFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterBinFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.allBin = {};
            $scope.getAllLocationForBin = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.Bin = {};
            $scope.Bin.LocationId = $scope.Location.Id;
        };

        initialize();
        var flag = 0;

        getAllBin();
        function getAllBin() {                   //get data from session
            masterBinFactory.getAllBin()
            .success(function (data) {
                $scope.allBin = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.Bin = {};
            $scope.userForm.$setPristine();
        }

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkBin();
                if ($scope.editMode == true) {
                    editRecord();
                    $scope.reset();
                }
                else {
                    insertData();
                    $scope.reset();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };
        $scope.editBinClick = function (objBin) {
            resetInfoPanel();
            $scope.editMode = true;
            $scope.Bin = angular.copy(objBin);
        };
        $scope.cancelClick = function () {
            this.$hide();
            initialize();
            getAllBin();

        }

        function insertData() {
            if (flag != 1) {
                $scope.Bin.AddedBY = userModel.currentUserDetails.Id
                masterBinFactory.insertData($scope.Bin)
                .success(function (data) {
                    getAllBin();
                    showInfoPanel(false, 'Bin Added Successfully.');
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Bin already exist!');
            };
        };

        function editRecord() {
            if (flag = 1) {
                masterBinFactory.editRecord($scope.Bin.Id, $scope.Bin)
                .success(function (data) {
                    getAllBin();
                    $scope.editMode = false;
                    showInfoPanel(false, 'Bin Updated Successfully.');
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Bin not exists!');
            };
        };

        function checkBin() {
            if ($scope.allBin.length != 0) {
                for (var i = 0; i < $scope.allBin.length; i++) {
                    if (angular.uppercase($scope.allBin[i].BinIdentifier) == angular.uppercase($scope.Bin.BinIdentifier)) {// && angular.uppercase($scope.allBin[i].BinIdentifier) != angular.uppercase($scope.oldCaste)) {
                        flag = 1;
                        break
                    }
                    else {
                        flag = 0;
                    };
                }
            };
        };

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

        //Get all Location 
        getAllLocationForBin();
        function getAllLocationForBin() {
            masterBinFactory.getAllLocationForBin()
            .success(function (data) {
                $scope.getAllLocationForBin = data;
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
    }
]);

//-------------------------------------------------------------------------------------

//--------------masterCustomerContactController-----------------------
app.controller('masterCustomerContactController', ['$rootScope', '$scope', '$modal', 'masterCustomerFactory', '$location', 'userModel', 'tempModel', 'messageModel', 'masterCustomerSupplierTypeFactory', '$base64',
    function ($rootScope, $scope, $modal, masterCustomerFactory, $location, userModel, tempModel, messageModel, masterCustomerSupplierTypeFactory, $base64) {
        function initialize() {
            $scope.customer = {};
            $scope.allCustomer = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.allCustomerSupplierType = [];
            //$scope.exportKeys = ["CustomerCode", "CustomerType", "UOMCode", "Location", "MinStockLevel", "MaxStockLevel"];
            //$scope.exportHeaders = ["Customer Code", "Customer Type", "Unit of measure", "Location", "Min Stock", "Max Stock"];

        };

        initialize();
        var flag = 0;

        getAllCustomer();
        function getAllCustomer() {                   //get data from session
            masterCustomerFactory.getAllCustomer()
            .success(function (data) {
                $scope.allCustomer = data;
                $scope.dispCustomer = [].concat($scope.allCustomer);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };



        $scope.AddCustomerClick = function () {

            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.customer = {};
            openAddEditCustomer();
            //$location.path('/mstCustomerAddEdit').replace();
        };
        $scope.editCustomerClick = function (Customer) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = customer;
            openAddEditCustomer();
            //$location.path('/mstCustomerAddEdit').replace();
        };

        var addEditCustomerModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstCustomerAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditCustomer() {
            addEditCustomerModal.$promise.then(addEditCustomerModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
        });

        //$scope.addEditCustomerDiagramClick = function (Customer) {
        //    resetInfoPanel();
        //    userModel.editMode = false;
        //    tempModel.CustomerToAddDrawing = Customer;
        //    openAddEditCustomerDrawingModal();
        //};

        //var addEditCustomerDrawingModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstDrawing.html', animation: 'am-flip-x', show: false, backdrop: false });
        //function openAddEditCustomerDrawingModal() {
        //    addEditCustomerDrawingModal.$promise.then(addEditCustomerDrawingModal.show);
        //};

        //var defaultDrawingModal = $modal({ scope: $scope, template: 'defaultDrawing.html', animation: 'am-flip-x', show: false, backdrop: false });
        //$scope.openDrawing = function (Customer) {
        //    $scope.Customer = Customer;
        //    $scope.previewDefaultDrawing = $base64.decode($scope.Customer.Drawing[0].Drawing);
        //    defaultDrawingModal.$promise.then(defaultDrawingModal.show);
        //};


        //$scope.$on('modal.hide', function () {
        //    //initialize();
        //    getAllCustomer();
        //});

        getAllCustomerSupplierType();
        function getAllCustomerSupplierType() {                   //get data from session
            masterCustomerSupplierTypeFactory.getAllCustomerSupplierType()
            .success(function (data) {
                $scope.allCustomerSupplierType = data;
                $scope.dispCustomerSupplierType = [].concat($scope.allCustomerSupplierType);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

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
        $scope.clearFilter = function () {
            initialize();
            getAllCustomer();
        };
    }
]);

//------------------------------masterCustomerController---------------------------------------
app.controller('masterCustomerController', ['$rootScope', '$scope', '$modal', 'masterCustomerFactory', '$location', 'userModel', 'tempModel', 'messageModel', 'masterCustomerSupplierTypeFactory', '$base64',
    function ($rootScope, $scope, $modal, masterCustomerFactory, $location, userModel, tempModel, messageModel, masterCustomerSupplierTypeFactory, $base64) {
        function initialize() {
            $scope.customer = {};
            $scope.allCustomer = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.allCustomerSupplierType = [];
            //$scope.exportKeys = ["CustomerCode", "CustomerType", "UOMCode", "Location", "MinStockLevel", "MaxStockLevel"];
            //$scope.exportHeaders = ["Customer Code", "Customer Type", "Unit of measure", "Location", "Min Stock", "Max Stock"];

        };

        initialize();
        var flag = 0;

        getAllCustomer();
        function getAllCustomer() {                   //get data from session
            masterCustomerFactory.getAllCustomer()
            .success(function (data) {
                $scope.allCustomer = data;
                $scope.dispCustomer = [].concat($scope.allCustomer);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddCustomerClick = function () {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.customer = {};
            //openAddEditCustomer();
            $location.path('/mstCustomerAddEdit').replace();
        };
        $scope.editCustomerClick = function (customer) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = customer;
            //openAddEditCustomer();
            $location.path('/mstCustomerAddEdit').replace();
        };

        var addEditCustomerModal //= $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstCustomerAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditCustomer() {
            addEditCustomerModal.$promise.then(addEditCustomerModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllCustomer();
        });

        //$scope.addEditCustomerDiagramClick = function (Customer) {
        //    resetInfoPanel();
        //    userModel.editMode = false;
        //    tempModel.CustomerToAddDrawing = Customer;
        //    openAddEditCustomerDrawingModal();
        //};

        //var addEditCustomerDrawingModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstDrawing.html', animation: 'am-flip-x', show: false, backdrop: false });
        //function openAddEditCustomerDrawingModal() {
        //    addEditCustomerDrawingModal.$promise.then(addEditCustomerDrawingModal.show);
        //};

        var viewContactModal = $modal({ scope: $scope, template: 'viewCustomerContact.html', animation: 'am-flip-x', show: false, backdrop: false });
        $scope.viewContact = function (customer) {
            $scope.contact = [];
            for (var i = 0; i < customer.Contacts.length; i++) {
                $scope.contact.push(customer.Contacts[i]);
            }
            viewContactModal.$promise.then(viewContactModal.show);
        };


        //$scope.$on('modal.hide', function () {
        //    //initialize();
        //    getAllCustomer();
        //});

        getAllCustomerSupplierType();
        function getAllCustomerSupplierType() {                   //get data from session
            masterCustomerSupplierTypeFactory.getAllCustomerSupplierType()
            .success(function (data) {
                $scope.allCustomerSupplierType = data;
                $scope.dispCustomerSupplierType = [].concat($scope.allCustomerSupplierType);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

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
        $scope.clearFilter = function () {
            initialize();
            getAllCustomer();
        };
    }
]);

app.controller('maintainCustomerController', ['$rootScope', '$scope', '$modal', 'masterCustomerFactory', '$location', 'userModel', 'messageModel', 'masterCustomerSupplierTypeFactory', 'masterCountryStateCityFactory', 'masterDepartmentFactory',
    function ($rootScope, $scope, $modal, masterCustomerFactory, $location, userModel, messageModel, masterCustomerSupplierTypeFactory, masterCountryStateCityFactory, masterDepartmentFactory) {
        function initialize() {
            $scope.allCustomer = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.allContact = [];
            $scope.contact = [];
            $scope.customer = [];
            $scope.customer.tblMasterCustomerContacts = [];
            $scope.addCount = 1;
            $scope.customer.City = -1;
            $scope.customer.ShippingCity = -1;
            $scope.customer.Country = -1;
            $scope.customer.ShippingCountry = -1;
            $scope.customer.State = -1;
            $scope.customer.ShippingState = -1;


            if (userModel.editMode == true) {
                $scope.customer = userModel.editRow;
                if ($scope.customer.ShippingAddressLine1 == $scope.customer.AddressLine1 && $scope.customer.ShippingAddressLine2 == $scope.customer.AddressLine1 && $scope.customer.ShippingCountry == $scope.customer.Country && $scope.customer.ShippingState == $scope.customer.State && $scope.customer.ShippingCity == $scope.customer.City && $scope.customer.ShippingZip == $scope.customer.Zip) {
                    $scope.isSameAsCompanyAddress = true;
                } else {
                    $scope.isSameAsCompanyAddress = false;
                }

                for (var i = 0; i < $scope.customer.CustomerContact.length; i++) {

                    $scope.contact.push($scope.customer.CustomerContact[i]);
                }

            } else {
                $scope.conditionDeleted = true;
                $scope.customer = {};
                $scope.isSameAsCompanyAddress = true;
                $scope.customer.Country = 113;
                $scope.customer.ShippingCountry = 113;
            }
            $scope.editMode = userModel.editMode;
        };

        initialize();
        getAllCustomer();
        getAllCountry();
        function getAllCustomer() {                   //get data from session
            masterCustomerFactory.getAllCustomer()
            .success(function (data) {
                $scope.allCustomer = data;
                $scope.dispCustomer = [].concat($scope.allCustomer);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        var isCustomerExists = 0;
        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkCustomer();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.customer = {};
            $scope.userForm.$setPristine();
        }
        $scope.setShippingAddress = function () {
            if ($scope.isSameAsCompanyAddress == true) {
                $scope.customer.ShippingAddressLine1 = $scope.customer.AddressLine1;
                $scope.customer.ShippingAddressLine2 = $scope.customer.AddressLine2;
                $scope.customer.ShippingCountry = $scope.customer.Country;
                $scope.customer.ShippingZip = $scope.customer.Zip;

                if ($scope.customer.Country != undefined && $scope.customer.State != undefined) {
                    $scope.getShippingStateByCountryId();
                    $scope.customer.ShippingState = $scope.customer.State;
                }
                else {
                    $scope.customer.ShippingState = "";
                }

                if ($scope.customer.State != undefined && $scope.customer.City != undefined) {
                    $scope.getShippingCityByStateId();
                    $scope.customer.ShippingCity = $scope.customer.City;
                }
                else {
                    $scope.customer.ShippingCity = "";
                }

            }
        }
        $scope.cancelClick = function () {
            $location.path('/mstCustomers').replace();
        }

        function insertData() {
            if (isCustomerExists == false) {
                $scope.customer.tblMasterCustomerContacts = $scope.contact;
                masterCustomerFactory.insertData($scope.customer)
                .success(function (data) {
                    if (data != null && data.Id > 0) {
                        showInfoPanel(false, 'customer Added Successfully. The customer Identifier is [' + data.Identifier + ']');
                        $scope.submitted = false;
                        $scope.customer = {};
                        $scope.userForm.$setPristine();
                    } else {
                        showInfoPanel(true, 'Error occured! Please Try Again!!!');
                    }
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'customer already exist!');
            };
        };

        function editRecord() {
            if (isCustomerExists == true) {
                $scope.customer.tblMasterCustomerContacts = $scope.contact;
                masterCustomerFactory.editRecord($scope.customer.Id, $scope.customer)
                .success(function (data) {
                    showInfoPanel(false, 'customer Updated Successfully.');
                    $scope.submitted = false;
                    $scope.Item = {};
                    $scope.userForm.$setPristine();
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'customer not exists!');
            };
        };

        function checkCustomer() {
            if ($scope.allCustomer.length != 0) {
                for (var i = 0; i < $scope.allCustomer.length; i++) {
                    if ($scope.customer.LegalName.length > 0 && (angular.uppercase($scope.allCustomer[i].LegalName) == angular.uppercase($scope.customer.LegalName))) {
                        isCustomerExists = true;
                        break
                    }
                    else {
                        isCustomerExists = false;
                    };
                }
            };
        };

        getAllCustomerSupplierType();
        function getAllCustomerSupplierType() {
            masterCustomerSupplierTypeFactory.getAllCustomerSupplierType()
            .success(function (data) {
                $scope.allCustomerSupplierType = data;
                $scope.dispCustomerSupplierType = [].concat($scope.allCustomerSupplierType);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        function getAllCountry() {
            masterCountryStateCityFactory.getAllCountry()
            .success(function (data) {
                $scope.allCountry = data;
                $scope.dispCountry = [].concat($scope.allCountry);

                if ($scope.customer.Country > 0) {
                    $scope.getStateByCountryId();
                }
                if ($scope.customer.ShippingCountry > 0) {
                    $scope.getShippingStateByCountryId();
                }
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
        $scope.getStateByCountryId = function () {
            $scope.allState = {};
            $scope.dispState = {};
            masterCountryStateCityFactory.getStatebyCountryId($scope.customer.Country)
                  .success(function (data) {
                      $scope.allState = data;
                      $scope.dispState = [].concat($scope.allState);
                      if ($scope.customer.State > 0) {
                          $scope.getCityByStateId();
                      }
                  })
                  .error(function (error) {
                      bootbox.alert("Error on getting State");
                  });
        };
        $scope.getCityByStateId = function () {
            $scope.dispCity = {};
            $scope.allCity = {};
            masterCountryStateCityFactory.getCityByStateId($scope.customer.State)
                  .success(function (data) {
                      $scope.allCity = data;
                      $scope.dispCity = [].concat($scope.allCity);
                  })
                  .error(function (error) {
                      bootbox.alert("Error on getting City");
                  });
        };
        $scope.getShippingStateByCountryId = function () {
            $scope.allShippingState = {};
            $scope.dispShippingState = {};
            masterCountryStateCityFactory.getStatebyCountryId($scope.customer.ShippingCountry)
                  .success(function (data) {
                      $scope.allShippingState = data;
                      $scope.dispShippingState = [].concat($scope.allShippingState);
                      if ($scope.customer.ShippingState > 0) {
                          $scope.getShippingCityByStateId();
                      }
                  })
                  .error(function (error) {
                      bootbox.alert("Error on getting State");
                  });
        }
        $scope.getShippingCityByStateId = function () {
            $scope.allShippingCity = {};
            $scope.dispShippingCity = {};
            masterCountryStateCityFactory.getCityByStateId($scope.customer.ShippingState)
                  .success(function (data) {
                      $scope.allShippingCity = data;
                      $scope.dispShippingCity = [].concat($scope.allShippingCity);
                  })
                  .error(function (error) {
                      bootbox.alert("Error on getting City");
                  });
        }

        getAllDepartment();
        function getAllDepartment() {                   //get data from session
            masterDepartmentFactory.getAllDepartment()
            .success(function (data) {
                $scope.allDepartment = data;
                $scope.dispDepartment = [].concat($scope.allDepartment);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

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


        $scope.checkUncheckDefault = function (objCustomerContact, index) {
            if (objCustomerContact.IsDefault) {
                for (var i = 0; i < $scope.contact.length ; i++) {
                    $scope.contact[i].IsDefault = false;
                }
                objCustomerContact.IsDefault = true;
            }
        }


        $scope.addNewContactRow = function () {
            $scope.obj3 = {
                Id: 0,
                Name: '',
                Designation: '',
                Phone: '',
                Mobile1: '',
                Mobile2: '',
                Email: $scope.AddCount,
                Department: '',
                TIN: '',
                CustomerId: ''
            };
            if ($scope.customer.Id > 0) {
                $scope.obj3.CustomerId = $scope.customer.Id;
            }
            $scope.contact.push($scope.obj3);
            $scope.addCount++;
        };
        $scope.removeRow = function (index, objrow) {
            if (objrow.Id == "") {
                $scope.allContact.splice(index, 1);
            }

        };
    }
]);


//------------------------------masterOperationsMaterialController---------------------------------------
app.controller('masterOperationsMaterialController', ['$rootScope', '$scope', '$modal', 'masterOperationsMaterialFactory', '$location', 'userModel', 'tempModel', 'messageModel', '$base64',
    function ($rootScope, $scope, $modal, masterOperationsMaterialFactory, $location, userModel, tempModel, messageModel, $base64) {
        function initialize() {
            $scope.operationsMaterial = {};
            $scope.allOperationsMaterial = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            userModel.editRow = {};
            userModel.editMode = false;

        };

        initialize();
        //var flag = 0;

        getAllBOMOperationMaterial();
        function getAllBOMOperationMaterial() {                   //get data from session
            masterOperationsMaterialFactory.getAllBOMOperationMaterial()
            .success(function (data) {
                momentDate = moment(data.datCreatedOn, "DD-MM-YYYY HH:mm");
                $scope.operationsMaterial.datCreatedOn = momentDate;
                $scope.allOperationsMaterial = data;
                $scope.dispOperationsMaterial = [].concat($scope.allOperationsMaterial);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddBOMOperationMaterialClick = function () {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.operationsMaterial = {};
            $location.path('/mstBOMOperationsMaterialAddEdit').replace();
        };
        $scope.CancelBOMOperationMaterialClick = function () {
            $location.path('/home').replace();
        };
        $scope.editoperationsMaterialClick = function (operationsMaterial) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = operationsMaterial;
            $location.path('/mstBOMOperationsMaterialAddEdit').replace();
        };

        $scope.setDocStatusToWorkingDraft = function (operationsMaterial) {
            bootbox.confirm({
                message: "Change document status to Working Draft, Are you sure?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        operationsMaterial.lngDocStatus = 1;
                        masterOperationsMaterialFactory.setBOMOperationMaterialStatus(operationsMaterial.lngId, operationsMaterial)
                      .success(function (data) {
                          getAllBOMOperationMaterial();

                      })
                      .error(function (error) {
                          //Error Message
                          showInfoPanel(true, 'Error occured! Please Try Again!!!');
                      });
                    }
                }
            }
					);

           
        };
        $scope.setDocStatusToCompleted = function (operationsMaterial) {
            bootbox.confirm({
                message: "Change document status to Completed, Are you sure?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        operationsMaterial.lngDocStatus = 2;
                        masterOperationsMaterialFactory.setBOMOperationMaterialStatus(operationsMaterial.lngId, operationsMaterial)
                      .success(function (data) {
                          getAllBOMOperationMaterial();
                      })
                      .error(function (error) {
                          //Error Message
                          showInfoPanel(true, 'Error occured! Please Try Again!!!');
                      });
                    }
                }
            }
					);
        };

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
        $scope.clearFilter = function () {
            initialize();
            getAllBOMOperationMaterial();
        };
    }
]);


app.controller('maintainOperationsMaterialController', ['$rootScope', '$scope', '$modal', 'masterOperationsMaterialFactory', '$location', 'userModel', '$base64', 'messageModel', 'masterItemFactory', 'masterUnitOfMeasureFactory', 'masterBOMLevelFactory', 'masterFactory', 'masterBOMOperationsFactory',
    function ($rootScope, $scope, $modal, masterOperationsMaterialFactory, $location, userModel, $base64, messageModel, masterItemFactory, masterUnitOfMeasureFactory, masterBOMLevelFactory, masterFactory,masterBOMOperationsFactory) {
        function initialize() {
            $scope.operationsMaterial = {};
            $scope.allOperationsMaterial = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.isEditMode = false;

            $scope.operationsMaterial.intDiagramId = -1;
            $scope.gridItems = [];
            $scope.gridOperations = [];
            $scope.addIconToolTip = "Please select BOM Item first";;
        };
        initialize();
        $scope.getItemInfo = function () {
            masterItemFactory.getItemById($scope.operationsMaterial.lngItemId)
            .success(function (data) {
                if (data.length > 0) {
                    $scope.item = data[0];
                    $scope.itemDrawing = $scope.item.tblMasterDrawings;

                    if ($scope.itemDrawing.length > 0) {
                        $scope.operationsMaterial.ActiveDiagram = $scope.itemDrawing.filter(function (dwg) {
                            return (dwg.Active == true);
                        });
                        if ($scope.operationsMaterial.ActiveDiagram.length > 0) {
                        $scope.operationsMaterial.intDiagramId = $scope.operationsMaterial.ActiveDiagram[0].Id;
                        $scope.previewDrawing = $base64.decode($scope.operationsMaterial.ActiveDiagram[0].Drawing);
                        $scope.previewDrawingIdentifier = $scope.operationsMaterial.ActiveDiagram[0].Identifier;
                        }
                    } else {
                        $scope.itemDrawing = [];
                        $scope.operationsMaterial.intDiagramId = 0;
                        $scope.previewDrawing = '';
                        $scope.previewDrawingIdentifier = '';
                    }
                    if ($scope.operationsMaterial.lngItemId > 0) {
                        $scope.addIconToolTip = "Add Items";
                    } else {
                        $scope.addIconToolTip = "Please select BOM Item first";
                    }
                }

            })
            .error(function (error) {
                bootbox.alert('Failed to get item info');
            });
        };
        if (userModel.editMode == true) {
            $scope.isEditMode = userModel.editMode;
            $scope.operationsMaterial = userModel.editRow;
            $scope.getItemInfo();

            for (var i = 0; i < $scope.operationsMaterial.tblBillOfMaterialDetails.length; i++) {
                $scope.obj = {
                    lngId: $scope.operationsMaterial.tblBillOfMaterialDetails[i].lngId,
                    lngBOMId: $scope.operationsMaterial.lngId,
                    lngItemId: $scope.operationsMaterial.tblBillOfMaterialDetails[i].lngItemId,
                    lngQuantity: $scope.operationsMaterial.tblBillOfMaterialDetails[i].lngQuantity,
                    lngLevelId: $scope.operationsMaterial.tblBillOfMaterialDetails[i].lngLevelId,
                    strNote: $scope.operationsMaterial.tblBillOfMaterialDetails[i].strNote,
                    partNo: $scope.operationsMaterial.tblBillOfMaterialDetails[i].tblMasterItem.PartNumber,
                    itemdesc: $scope.operationsMaterial.tblBillOfMaterialDetails[i].tblMasterItem.ItemName,
                    uom: $scope.operationsMaterial.tblBillOfMaterialDetails[i].tblMasterUnitOfMeasure.UOMCode,
                    dwgName: ''
                };
                if ($scope.operationsMaterial.tblBillOfMaterialDetails[i].tblMasterDrawings.length > 0) {
                    $scope.obj.dwgName = $scope.operationsMaterial.tblBillOfMaterialDetails[i].tblMasterDrawings[0].Identifier;
                }
                $scope.gridItems.push($scope.obj);
            }
            for (var i = 0; i < $scope.operationsMaterial.tblBOMOperations.length; i++) {
                $scope.obj1 = {
                    lngId: $scope.operationsMaterial.tblBOMOperations[i].lngId,
                    lngOperationId: $scope.operationsMaterial.tblBOMOperations[i].lngOperationId,
                    lngBOMId: $scope.operationsMaterial.lngId,
                    decValue: $scope.operationsMaterial.tblBOMOperations[i].decValue,
                    unit: $scope.operationsMaterial.tblBOMOperations[i].tblMasterUnitOfMeasure.UOMCode,
                };
                $scope.gridOperations.push($scope.obj1);
            }
        } else {
            getServerDateTime();
        }
        getAllItem();

        if ($scope.operationsMaterial.lngItemId > 0) {
            $scope.addIconToolTip = "Add Items";
        } else {
            $scope.addIconToolTip = "Please select BOM Item first";
        }

        getAllBOMLevel();
        function getAllBOMLevel() {                   //get data from session
            masterBOMLevelFactory.getAllBOMLevel()
            .success(function (data) {
                $scope.allBOMLevel = data;
                $scope.dispBOMLevel = [].concat($scope.allBOMLevel);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
        getAllBOMOperation();
        function getAllBOMOperation() {                   //get data from session
            masterBOMOperationsFactory.getAllBOMOperation()
            .success(function (data) {
                $scope.allBOMOperations = data;
                $scope.dispBOMOperations = [].concat($scope.allBOMOperations);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
        function getServerDateTime() {               // Use for Get DataBase Server DateTime...
            masterFactory.getserverdatetime()
            .success(function (data) {
                if (!$scope.editMode) {
                    momentDate = moment(data, "DD-MM-YYYY HH:mm");
                    $scope.operationsMaterial.datCreatedOn = momentDate;
                }
            })
           .error(function (error) {
               bootbox.alert("Error Occored!!! Please try again!!!");
           });
        };
        function getAllItem() {                   //get data from session
            masterItemFactory.getAllItem()
            .success(function (data) {
                $scope.allItem = data;
                $scope.dispItem = [].concat($scope.allItem);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
        var defaultDrawingModal = $modal({ scope: $scope, template: 'defaultDrawing.html', animation: 'am-flip-x', show: false, backdrop: true });
        $scope.openDrawing = function (item) {
            defaultDrawingModal.$promise.then(defaultDrawingModal.show);
        };

        $scope.addNewItemRow = function () {
            $scope.obj3 = {
                lngId: 0,
                lngBOMId: 0,
                lngItemId: 0,
                lngQuantity: '',
                lngLevelId: '',
                strNote: '',
                partNo: '',
                itemdesc: '',
                uom: '',
                dwgName: ''
            };
            if ($scope.operationsMaterial.lngId > 0) {
                $scope.obj3.lngBOMId = $scope.operationsMaterial.lngId
            }
            $scope.gridItems.push($scope.obj3);
            $scope.addCount++;
        };

        //Add new Operation row
        $scope.addNewOperationRow = function () {
            $scope.obj4 = {
                lngId: 0,
                lngOperationId: 0,
                lngBOMId: 0,
                decValue: '',
                unit: ''
            };
            if ($scope.operationsMaterial.lngId > 0) {
                $scope.obj4.lngBOMId = $scope.operationsMaterial.lngId
            }
            $scope.gridOperations.push($scope.obj4);
            $scope.addCount++;
        };

        $scope.autoExpand = function (e) {
            var element = typeof e === 'object' ? e.target : document.getElementById(e);
            var scrollHeight = element.scrollHeight - 60; // replace 60 by the sum of padding-top and padding-bottom
            element.style.height = scrollHeight + "px";
        };

        function expand() {
            $scope.autoExpand('TextArea');
        }

        $scope.getItemDetails = function (objItem, index) {
            var isDuplicate = 0;
            for (var i = 0; i < $scope.gridItems.length; i++) {
                if ($scope.gridItems[i].lngItemId == objItem.lngItemId) {
                    isDuplicate = isDuplicate + 1;
                }
            }
            if (isDuplicate > 1) {
                $scope.gridItems[index].lngItemId = 0;
                $scope.gridItems[index].partNo = '';
                $scope.gridItems[index].itemdesc = '';
                $scope.gridItems[index].uom = '';
                $scope.gridItems[index].dwgName = '';
                return;
            }


            for (var i = 0; i < $scope.dispItem.length; i++) {
                if ($scope.dispItem[i].Id == objItem.lngItemId) {
                    $scope.gridItems[index].partNo = $scope.dispItem[i].PartNumber;
                    $scope.gridItems[index].itemdesc = $scope.dispItem[i].ItemDescription;
                    $scope.gridItems[index].uom = $scope.dispItem[i].UOMCode;
                    $scope.gridActiveDrawing = $scope.dispItem[i].Drawing.filter(function (dwg) {
                        return (dwg.Active == true);
                    });
                    if ($scope.gridActiveDrawing.length > 0) {
                        $scope.gridItems[index].dwgName = $scope.gridActiveDrawing[0].Identifier;
                    } else {
                        $scope.gridItems[index].dwgName = '';
                    }

                    return
                }
                else {
                    $scope.gridItems[index].partNo = '';
                    $scope.gridItems[index].itemdesc = '';
                    $scope.gridItems[index].uom = '';
                    $scope.gridItems[index].dwgName = '';

                }

            }

        }
        $scope.getOperationDetails = function (objOperation, index) {
            var isDuplicateOperation = 0;
            for (var i = 0; i < $scope.gridOperations.length; i++) {
                if ($scope.gridOperations[i].lngOperationId == objOperation.lngOperationId) {
                    isDuplicateOperation = isDuplicateOperation + 1;
                }
            }
            if (isDuplicateOperation > 1) {
                $scope.gridOperations[index].lngId = 0;
                $scope.gridOperations[index].lngOperationId = 0;
                $scope.gridOperations[index].lngBOMId = 0;
                $scope.gridOperations[index].decValue = '';
                $scope.gridOperations[index].unit = '';
                return;
            }


            for (var i = 0; i < $scope.dispBOMOperations.length; i++) {
                if ($scope.dispBOMOperations[i].lngId == objOperation.lngOperationId) {
                    $scope.gridOperations[i].unit = $scope.dispBOMOperations[i].tblMasterUnitOfMeasure.UOMCode;
                    return
                }
                else {
                    $scope.gridOperations[index].unit = '';
                }
            }
        };

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                $scope.operationsMaterial.tblBillOfMaterialDetails = $scope.gridItems;//[];
                $scope.operationsMaterial.tblBOMOperations = $scope.gridOperations;
                masterOperationsMaterialFactory.insertData($scope.operationsMaterial)
                .success(function (data) {
                    if (data != null && data.lngId > 0) {
                        if (userModel.editMode == false) {
                            showInfoPanel(false, 'Operation material Added Successfully. The Operation material Identifier is [' + data.strBOMNumber + ']');
                        } else {
                            showInfoPanel(false, 'Operation material updated Successfully.');
                        }

                        $scope.submitted = false;
                        $scope.customer = {};
                        $scope.userForm.$setPristine();
                    } else {
                        showInfoPanel(true, 'Error occured! Please Try Again!!!');
                    }
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });


            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };
        $scope.cancelClick = function () {
            $location.path('/mstBOMOperationsMaterial').replace();
        };
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

    }
]);


//------------------------------masterEmployeeController---------------------------------------
app.controller('masterEmployeeController', ['$rootScope', '$scope', '$modal', 'masterEmployeeFactory', '$location', 'userModel', 'tempModel', 'messageModel', '$base64',
    function ($rootScope, $scope, $modal, masterEmployeeFactory, $location, userModel, tempModel, messageModel, $base64) {
        function initialize() {
            $scope.Employee = {};
            $scope.allEmployee = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            userModel.editRow = {};
            userModel.editMode = false;
            //$scope.exportKeys = ["EmployeeCode", "EmployeeType", "UOMCode", "Location", "MinStockLevel", "MaxStockLevel"];
            //$scope.exportHeaders = ["Employee Code", "Employee Type", "Unit of measure", "Location", "Min Stock", "Max Stock"];

        };

        initialize();
        var flag = 0;

        getAllEmployee();
        function getAllEmployee() {                   //get data from session
            masterEmployeeFactory.getAllEmployee()
            .success(function (data) {
                $scope.allEmployee = data;
                $scope.dispEmployee = [].concat($scope.allEmployee);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.AddEmployeeClick = function () {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.Employee = {};
            //openAddEditEmployee();
            $location.path('/mstEmployeeAddEdit').replace();
        };
        $scope.editEmployeeClick = function (Employee) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = Employee;
            //openAddEditEmployee();
            $location.path('/mstEmployeeAddEdit').replace();
        };

        var addEditEmployeeModal //= $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstEmployeeAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditEmployee() {
            addEditEmployeeModal.$promise.then(addEditEmployeeModal.show);
        };

        $scope.$on('modal.hide', function () {
            initialize();
            getAllEmployee();
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
        $scope.clearFilter = function () {
            initialize();
            getAllEmployee();
        };
    }
]);

app.controller('maintainEmployeeController', ['$rootScope', '$scope', '$modal', 'masterEmployeeFactory', '$location', 'userModel', 'messageModel', 'masterCountryStateCityFactory', 'masterDepartmentFactory',
    function ($rootScope, $scope, $modal, masterEmployeeFactory, $location, userModel, messageModel, masterCountryStateCityFactory, masterDepartmentFactory) {
        function initialize() {
            $scope.allEmployee = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.allContact = [];
            $scope.contact = [];
            $scope.Employee = [];
            $scope.Employee.tblMasterEmployeeContacts = [];
            $scope.addCount = 1;
            $scope.Employee.City = -1;
            $scope.Employee.ShippingCity = -1;
            $scope.Employee.Country = -1;
            $scope.Employee.ShippingCountry = -1;
            $scope.Employee.State = -1;
            $scope.Employee.ShippingState = -1;


            if (userModel.editMode == true) {
                $scope.Employee = userModel.editRow;
                if ($scope.Employee.ShippingAddressLine1 == $scope.Employee.AddressLine1 && $scope.Employee.ShippingAddressLine2 == $scope.Employee.AddressLine1 && $scope.Employee.ShippingCountry == $scope.Employee.Country && $scope.Employee.ShippingState == $scope.Employee.State && $scope.Employee.ShippingCity == $scope.Employee.City && $scope.Employee.ShippingZip == $scope.Employee.Zip) {
                    $scope.isSameAsCompanyAddress = true;
                } else {
                    $scope.isSameAsCompanyAddress = false;
                }

                for (var i = 0; i < $scope.Employee.EmployeeContact.length; i++) {

                    $scope.contact.push($scope.Employee.EmployeeContact[i]);
                }

            } else {
                $scope.conditionDeleted = true;
                $scope.Employee = {};
                $scope.isSameAsCompanyAddress = true;
                $scope.Employee.Country = 113;
                $scope.Employee.ShippingCountry = 113;
            }
            $scope.editMode = userModel.editMode;
        };

        initialize();
        getAllEmployee();
        getAllCountry();
        function getAllEmployee() {                   //get data from session
            masterEmployeeFactory.getAllEmployee()
            .success(function (data) {
                $scope.allEmployee = data;
                $scope.dispEmployee = [].concat($scope.allEmployee);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        var isEmployeeExists = 0;
        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                checkEmployee();
                if ($scope.editMode == true) {
                    editRecord();
                }
                else {
                    insertData();
                }

            }
            else {
                showInfoPanel(true, 'Please fill form carefully!!');
            }

        };

        $scope.reset = function (userForm) {
            $scope.submitted = false;
            resetInfoPanel();
            $scope.Employee = {};
            $scope.userForm.$setPristine();
        }
        $scope.setShippingAddress = function () {
            if ($scope.isSameAsCompanyAddress == true) {
                $scope.Employee.ShippingAddressLine1 = $scope.Employee.AddressLine1;
                $scope.Employee.ShippingAddressLine2 = $scope.Employee.AddressLine2;
                $scope.Employee.ShippingCountry = $scope.Employee.Country;
                $scope.Employee.ShippingZip = $scope.Employee.Zip;

                if ($scope.Employee.Country != undefined && $scope.Employee.State != undefined) {
                    $scope.getShippingStateByCountryId();
                    $scope.Employee.ShippingState = $scope.Employee.State;
                }
                else {
                    $scope.Employee.ShippingState = "";
                }

                if ($scope.Employee.State != undefined && $scope.Employee.City != undefined) {
                    $scope.getShippingCityByStateId();
                    $scope.Employee.ShippingCity = $scope.Employee.City;
                }
                else {
                    $scope.Employee.ShippingCity = "";
                }

            }
        }
        $scope.cancelClick = function () {
            $location.path('/mstEmployees').replace();
        }

        function insertData() {
            if (isEmployeeExists == false) {
                $scope.Employee.tblMasterEmployeeContacts = $scope.contact;
                masterEmployeeFactory.insertData($scope.Employee)
                .success(function (data) {
                    if (data != null && data.Id > 0) {
                        showInfoPanel(false, 'Employee Added Successfully. The Employee Identifier is [' + data.Identifier + ']');
                        $scope.submitted = false;
                        $scope.Employee = {};
                        $scope.userForm.$setPristine();
                    } else {
                        showInfoPanel(true, 'Error occured! Please Try Again!!!');
                    }
                })
                .error(function (error) {
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Employee already exist!');
            };
        };

        function editRecord() {
            if (isEmployeeExists == true) {
                $scope.Employee.tblMasterEmployeeContacts = $scope.contact;
                masterEmployeeFactory.editRecord($scope.Employee.Id, $scope.Employee)
                .success(function (data) {
                    showInfoPanel(false, 'Employee Updated Successfully.');
                    $scope.submitted = false;
                    $scope.Item = {};
                    $scope.userForm.$setPristine();
                })
                .error(function (error) {
                    //Error Message
                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
                });
            }
            else {
                showInfoPanel(true, 'Employee not exists!');
            };
        };

        function checkEmployee() {
            if ($scope.allEmployee.length != 0) {
                for (var i = 0; i < $scope.allEmployee.length; i++) {
                    if ($scope.Employee.LegalName.length > 0 && (angular.uppercase($scope.allEmployee[i].LegalName) == angular.uppercase($scope.Employee.LegalName))) {
                        isEmployeeExists = true;
                        break
                    }
                    else {
                        isEmployeeExists = false;
                    };
                }
            };
        };

        getAllEmployeeSupplierType();
        function getAllEmployeeSupplierType() {
            masterEmployeeSupplierTypeFactory.getAllEmployeeSupplierType()
            .success(function (data) {
                $scope.allEmployeeSupplierType = data;
                $scope.dispEmployeeSupplierType = [].concat($scope.allEmployeeSupplierType);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };


        function getAllCountry() {
            masterCountryStateCityFactory.getAllCountry()
            .success(function (data) {
                $scope.allCountry = data;
                $scope.dispCountry = [].concat($scope.allCountry);

                if ($scope.Employee.Country > 0) {
                    $scope.getStateByCountryId();
                }
                if ($scope.Employee.ShippingCountry > 0) {
                    $scope.getShippingStateByCountryId();
                }
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };
        $scope.getStateByCountryId = function () {
            $scope.allState = {};
            $scope.dispState = {};
            masterCountryStateCityFactory.getStatebyCountryId($scope.Employee.Country)
                  .success(function (data) {
                      $scope.allState = data;
                      $scope.dispState = [].concat($scope.allState);
                      if ($scope.Employee.State > 0) {
                          $scope.getCityByStateId();
                      }
                  })
                  .error(function (error) {
                      bootbox.alert("Error on getting State");
                  });
        };
        $scope.getCityByStateId = function () {
            $scope.dispCity = {};
            $scope.allCity = {};
            masterCountryStateCityFactory.getCityByStateId($scope.Employee.State)
                  .success(function (data) {
                      $scope.allCity = data;
                      $scope.dispCity = [].concat($scope.allCity);
                  })
                  .error(function (error) {
                      bootbox.alert("Error on getting City");
                  });
        };
        $scope.getShippingStateByCountryId = function () {
            $scope.allShippingState = {};
            $scope.dispShippingState = {};
            masterCountryStateCityFactory.getStatebyCountryId($scope.Employee.ShippingCountry)
                  .success(function (data) {
                      $scope.allShippingState = data;
                      $scope.dispShippingState = [].concat($scope.allShippingState);
                      if ($scope.Employee.ShippingState > 0) {
                          $scope.getShippingCityByStateId();
                      }
                  })
                  .error(function (error) {
                      bootbox.alert("Error on getting State");
                  });
        }
        $scope.getShippingCityByStateId = function () {
            $scope.allShippingCity = {};
            $scope.dispShippingCity = {};
            masterCountryStateCityFactory.getCityByStateId($scope.Employee.ShippingState)
                  .success(function (data) {
                      $scope.allShippingCity = data;
                      $scope.dispShippingCity = [].concat($scope.allShippingCity);
                  })
                  .error(function (error) {
                      bootbox.alert("Error on getting City");
                  });
        }

        getAllDepartment();
        function getAllDepartment() {                   //get data from session
            masterDepartmentFactory.getAllDepartment()
            .success(function (data) {
                $scope.allDepartment = data;
                $scope.dispDepartment = [].concat($scope.allDepartment);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

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


        $scope.checkUncheckDefault = function (objEmployeeContact, index) {
            if (objEmployeeContact.IsDefault) {
                for (var i = 0; i < $scope.contact.length ; i++) {
                    $scope.contact[i].IsDefault = false;
                }
                objEmployeeContact.IsDefault = true;
            }
        }


        $scope.addNewContactRow = function () {
            $scope.obj3 = {
                Id: 0,
                Name: '',
                Designation: '',
                Phone: '',
                Mobile1: '',
                Mobile2: '',
                Email: $scope.AddCount,
                Department: '',
                TIN: '',
                EmployeeId: ''
            };
            if ($scope.Employee.Id > 0) {
                $scope.obj3.EmployeeId = $scope.Employee.Id;
            }
            $scope.contact.push($scope.obj3);
            $scope.addCount++;
        };
        $scope.removeRow = function (index, objrow) {
            if (objrow.Id == "") {
                $scope.allContact.splice(index, 1);
            }

        };
    }
]);


//-------------------------------------------- Material Indent -----------------------------------------------------------------

app.controller('IndentController', ['$rootScope', '$scope', '$modal', 'indentFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, indentFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.Indent = {};
            $scope.allIndent = {};
            $scope.dispIndent = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            //     $scope.exportKeys = ["TaxCode", "TaxDescription"];
            //    $scope.exportHeaders = ["Code", "Description"];
        };

        initialize();
        var flag = 0;

        GetAllIndent();
        function GetAllIndent() {                   //get data from session
            indentFactory.GetAllIndent()
            .success(function (data) {
                $scope.allIndent = data;
                $scope.dispIndent = [].concat($scope.allIndent);
            })
            .error(function (error) {
                swal(messageModel.messages[0].Message);
            });
        };

        $scope.AddIndentClick = function () {
            //  resetInfoPanel();
            userModel.editMode = false;
            userModel.Indent = {};
            $location.path('/IndentAddEdit').replace();
        };
        $scope.editIndentClick = function (objIndent) {
            //  resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = objIndent;
            $location.path('/IndentAddEdit').replace();
        };

        $scope.cancelIndentClick = function () {
            $location.path('/home').replace();
        };

        $scope.setDocStatusToWorkingDraft = function (Indent) {
            bootbox.confirm({
                message: "Change document status to Working Draft, Are you sure?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        Indent.lngDocStatus = 1;
                        indentFactory.setIndentStatus($scope.Indent.lngId, $scope.Indent)
                      .success(function (data) {
                          GetAllIndent();

                      })
                      .error(function (error) {
                          //Error Message
                          showInfoPanel(true, 'Error occured! Please Try Again!!!');
                      });
                    }
                }
            }
					);

        };

        $scope.setDocStatusToCompleted = function (Indent) {
            bootbox.confirm({
                message: "Change document status to Completed, Are you sure?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        Indent.lngDocStatus = 2;
                        indentFactory.setIndentStatus(Indent.lngId, Indent)
                      .success(function (data) {
                          GetAllIndent();

                      })
                      .error(function (error) {
                          //Error Message
                          showInfoPanel(true, 'Error occured! Please Try Again!!!');
                      });
                    }
                }
            }
					);
        };

    }
]);

//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------- Maintain Indent Controller ------------------------------------------------------
app.controller('maintainIndentController', ['$rootScope', '$scope', '$modal', 'indentFactory', '$location', 'userModel', '$base64', 'messageModel', 'masterItemFactory', 'masterUnitOfMeasureFactory', 'masterFactory', 'masterDepartmentFactory',
    function ($rootScope, $scope, $modal, indentFactory, $location, userModel, $base64, messageModel, masterItemFactory, masterUnitOfMeasureFactory, masterFactory, masterDepartmentFactory) {
        function initialize() {
            $scope.Indent = {};
            $scope.allIndent = {};
            $scope.allDepartment = {};
            $scope.addCount = 0;
            //   $scope.item = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.dispDepartment = {};
            $scope.gridItems = [];
            $scope.addIconToolTip = "Please select Indent first";
            $scope.Indent.tblIndentItems = [];
            $scope.isEditMode = false;

        };
        initialize();

        getAllDepartment();
        function getAllDepartment() {                   //get data from session
            masterDepartmentFactory.getAllDepartment()
               .success(function (data) {
                   $scope.allDepartment = data;
                   $scope.dispDepartment = [].concat($scope.allDepartment);
               })
            .error(function (error) {
                swal(messageModel.messages[0].Message);
            });
        };



        if (userModel.editMode == true) {
            $scope.isEditMode = userModel.editMode;
            $scope.Indent = userModel.editRow;
            // $scope.getItemInfo();

            for (var i = 0; i < $scope.Indent.tblIndentItems.length; i++) {
                $scope.obj = {
                    lngId: $scope.Indent.tblIndentItems.lngId,
                    lngIndentId: $scope.Indent.tblIndentItems.lngIndentId,
                    lngItemId: $scope.Indent.tblIndentItems[i].lngItemId,
                    PartNo: $scope.Indent.tblIndentItems[i].tblMasterItem.PartNumber,
                    ItemDesc: $scope.Indent.tblIndentItems[i].tblMasterItem.ItemName,
                    Buffer: $scope.Indent.tblIndentItems[i].tblMasterItem.Buffer,
                    UOM: $scope.Indent.tblIndentItems[i].tblMasterUnitOfMeasure.UOMCode,
                    intQty: $scope.Indent.tblIndentItems[i].intQty,
                    strNote: $scope.Indent.tblIndentItems[i].strNote,
                    datExpected: $scope.Indent.tblIndentItems[i].datExpected
                };
                $scope.gridItems.push($scope.obj);
            }
        } else {
            getServerDateTime();
        }
        getAllItem();

        if ($scope.Indent.lngItemId > 0) {
            $scope.addIconToolTip = "Add Items";
        } else {
            $scope.addIconToolTip = "Please select Item first";
        }



        function getServerDateTime() {               // Use for Get DataBase Server DateTime...
            masterFactory.getserverdatetime()
            .success(function (data) {
                if (!$scope.editMode) {
                    momentDate = moment(data, "DD-MM-YYYY HH:mm");
                    $scope.Indent.AddedOn = momentDate;
                    $scope.Indent.datIndentDate = momentDate;
                    $scope.Indent.AddedBy = userModel.currentUserDetails.Id;
                    $scope.Indent.lngDocStatus = 1;
                }
            })
           .error(function (error) {
               swal(messageModel.messages[0].Message);
           });
        };
        function getAllItem() {                   //get data from session
            masterItemFactory.getAllItem()
            .success(function (data) {
                $scope.allItem = data;
                $scope.dispItem = [].concat($scope.allItem);
            })
            .error(function (error) {
                swal(messageModel.messages[0].Message);
            });
        };

        $scope.addNewItemRow = function () {
            $scope.obj3 = {
                lngId: 0,
                lngIndentId: 0,
                lngItemId: 0,
                PartNo: '',
                ItemDesc: '',
                Buffer: 0,
                UOM: '',
                intQty: 0,
                strNote: '',
                datExpected: '',
                Count: $scope.addCount

            };
            if ($scope.Indent.lngId > 0) {
                $scope.obj3.lngIndentId = $scope.Indent.lngId
            }
            $scope.gridItems.push($scope.obj3);
            $scope.addCount++;
        };
        //$scope.removeRow = function (index, objrow) {
        //    if (objrow.Id == "") {
        //        $scope.allContact.splice(index, 1);
        //    }
        //};

        $scope.autoExpand = function (e) {
            var element = typeof e === 'object' ? e.target : document.getElementById(e);
            var scrollHeight = element.scrollHeight - 60; // replace 60 by the sum of padding-top and padding-bottom
            element.style.height = scrollHeight + "px";
        };

        function expand() {
            $scope.autoExpand('TextArea');
        }

        $scope.getItemDetails = function (objItem, index) {
            var isDuplicate = 0;
            for (var i = 0; i < $scope.gridItems.length; i++) {
                if ($scope.gridItems[i].lngItemId == objItem.lngItemId) {
                    isDuplicate = isDuplicate + 1;
                }
            }
            if (isDuplicate > 1) {
                $scope.gridItems[index].lngItemId = 0;
                $scope.gridItems[index].PartNo = '';
                $scope.gridItems[index].ItemDesc = '';
                $scope.gridItems[index].UOM = '';

                return;
            }


            for (var i = 0; i < $scope.dispItem.length; i++) {
                if ($scope.dispItem[i].Id == objItem.lngItemId) {
                    $scope.gridItems[index].PartNo = $scope.dispItem[i].PartNumber;
                    $scope.gridItems[index].ItemDesc = $scope.dispItem[i].ItemDescription;
                    $scope.gridItems[index].UOM = $scope.dispItem[i].UOMCode;


                    return
                }
                else {

                    $scope.gridItems[index].PartNo = '';
                    $scope.gridItems[index].ItemDesc = '';
                    $scope.gridItems[index].UOM = '';
                    $scope.gridItems[index].intQty = '';
                    $scope.gridItems[index].Buffer = '';
                    $scope.gridItems[index].strNote = '';
                    $scope.gridItems[index].datExpected = '';

                }

            }

        }

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            //    if ($scope.userForm.$valid) {
            $scope.Indent.tblIndentItems = $scope.gridItems;
            if ($scope.gridItems.length > 0) {
                indentFactory.insertData($scope.Indent)
                    .success(function (data) {
                        if (data != null && data.lngId > 0) {
                            if (userModel.editMode = false) {
                                showInfoPanel(false, 'Indent added Successfully. New Indent Identifier is [' + data.strIndentNumber + ']');
                            } else {
                                showInfoPanel(false, 'Indent updated Successfully.');
                            }

                            $scope.submitted = false;
                            $scope.customer = {};
                            $scope.userForm.$setPristine();
                        } else {
                            showInfoPanel(true, 'Error occured! Please Try Again!!!');
                        }
                    })
                    .error(function (error) {
                        showInfoPanel(true, 'Error occured! Please Try Again!!!');
                    });
            }
            else {
                showInfoPanel(true, 'At least one Item is required!!!');
            }




            //  }
            //   else {
            //       showInfoPanel(true, 'Please fill form carefully!!');
            //   }

        };
        $scope.cancelClick = function () {
            $location.path('/Indent').replace();
        };

        $scope.setDocStatusToApproved = function (form) {
            bootbox.confirm({
                message: "Change document status to Approved, Are you sure?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        $scope.Indent.lngDocStatus = 3;
                        $scope.Indent.intApprovedBy = userModel.currentUserDetails.Id;
                        indentFactory.setIndentStatus($scope.Indent.lngId, $scope.Indent)
                      .success(function (data) {
                          showInfoPanel(false, 'Document status Changed to Approved');

                      })
                      .error(function (error) {
                          //Error Message
                          showInfoPanel(true, 'Error occured! Please Try Again!!!');
                      });
                    }
                }
            });
        };



        $scope.setDocStatusToWorkingDraft = function () {
            bootbox.confirm({
                message: "Change document status to Working Draft, Are you sure?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        $scope.Indent.lngDocStatus = 1;
                        $scope.Indent.intApprovedBy = null;
                        $scope.Indent.intApprovedDate = null;
                        indentFactory.setIndentStatus($scope.Indent.lngId, $scope.Indent)
                      .success(function (data) {
                          showInfoPanel(false, 'Document status Changed to Working Draft');

                      })
                      .error(function (error) {
                          //Error Message
                          showInfoPanel(true, 'Error occured! Please Try Again!!!');
                      });
                    }
                }
            }
                     );
        };


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

    }
]);


//------------------------------ Document Numbering Pattern---------------------------------------
app.controller('masterDocumentNumberingPattern', ['$rootScope', '$scope', '$modal', 'DocumentNumberPatternFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, DocumentNumberPatternFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.Documents = {};
            $scope.allDocuments = {};
            $scope.dispDocuments = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
          
        };

        initialize();
        var flag = 0;

        getAllDocuments();
        function getAllDocuments() {                   //get data from session
            DocumentNumberPatternFactory.getAllDocuments()
            .success(function (data) {
                $scope.allDocuments = data;
                $scope.dispDocuments = [].concat($scope.allDocuments);
            })
            .error(function (error) {
                swal(messageModel.messages[0].Message);
            });
        };
        $scope.editDocumentClick = function (objDocuments) {
            resetInfoPanel();


            userModel.editMode = true;
            userModel.editRow = objDocuments;
            openAddEditDocuments();



            //$scope.editMode = true;
            //$scope.Department = objDepartment;
            //openAddEditDepartment();

        };

        $scope.cancelDocumentsClick = function () {
            $location.path('/home').replace();
        };

        var addEditDocumentsModal = $modal({ scope: $scope, template: 'PPCFiles/View/Master/mstDocumentPatternAddEdit.html', animation: 'am-flip-x', show: false, backdrop: false });
        function openAddEditDocuments() {
            addEditDocumentsModal.$promise.then(addEditDocumentsModal.show);
        };

        
        $scope.$on('modal.hide', function () {
            initialize();
            getAllDocuments();
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
    }
]);
//----------------------------------------------------------------------------------------------------------
  //------------------------------Maintain Document Numbering Pattern---------------------------------------

            app.controller('maintainDocumentNumberingPattern', ['$rootScope', '$scope', '$modal', 'DocumentNumberPatternFactory', '$location', 'userModel', 'messageModel',
                function ($rootScope, $scope, $modal, DocumentNumberPatternFactory, $location, userModel, messageModel) {
                    function initialize() {

                        $scope.isError = false;
                        $scope.isSuccess = false;
                        $scope.SuccessErrorMessage = "";

                        $scope.Documents = {};
                        $scope.allDocuments = {};
                        $scope.dispDocuments = [];

                        //------Umesh
                        getAllDocuments();
                        function getAllDocuments() {                   //get data from session
                            DocumentNumberPatternFactory.getAllDocuments()
                            .success(function (data) {
                                $scope.allDocuments = data;
                                $scope.dispDocuments = [].concat($scope.allDocuments);
                            })
                            .error(function (error) {
                                swal(messageModel.messages[0].Message);
                            });
                        };
                        //-----End Umesh



                        if (userModel.editMode == true) {

                         

                                $scope.Documents.lngId = userModel.editRow.lngId;
                                $scope.Documents.lngMenuId = userModel.editRow.lngMenuId;
                                $scope.Documents.Length = userModel.editRow.Length;
                                $scope.Documents.Prefix = userModel.editRow.Prefix;
                                $scope.Documents.Suffix = userModel.editRow.Suffix;
                                $scope.Documents.Seedvalue = userModel.editRow.SeedValue;
                                $scope.Documents.DocumentName = userModel.editRow.DocumentName;
                         

                        } else {
                            $scope.Documents = {};

                        }
                        $scope.editMode = userModel.editMode;
                    };

                    initialize();
                    $scope.saveClick = function (form) {
                        resetInfoPanel();
                        $scope.submitted = true;
                        $scope.userForm = form;
                        if ($scope.userForm.$valid) {

                            if ($scope.editMode == true) {
                                editRecord();
                            }

                        }
                        else {
                            showInfoPanel(true, 'Please fill form carefully!!');
                        }

                    };

                    $scope.reset = function (userForm) {
                        $scope.submitted = false;
                        resetInfoPanel();
                        $scope.Documents = {};
                        $scope.userForm.$setPristine();
                    }

                    $scope.cancelClick = function () {
                        this.$hide();
                        initialize();
                    }

                    function editRecord() {
                        if ($scope.editMode == true) {
                            DocumentNumberPatternFactory.editRecord($scope.Documents.lngId, $scope.Documents)
                            .success(function (data) {
                                showInfoPanel(false, 'Document Numbering Pattern Updated Successfully.');
                                $scope.submitted = false;
                                $scope.userForm.$setPristine();
                            })
                            .error(function (error) {
                                //Error Message
                                showInfoPanel(true, 'Error occured! Please Try Again!!!');
                            });
                        }
                        else {
                            showInfoPanel(true, 'Document Numbering Pattern not exists!');
                        };
                    };



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


                }
            ]);
//------------------------------MachineCOntroller---------------------------------------
            app.controller('machineLogController', ['$rootScope', '$scope', '$modal', '$location', '$interval', 'masterMachineLogFactory', 'userModel', 'messageModel', '$localStorage', 'socket', 'lodash', '$interval',
                function ($rootScope, $scope, $modal, $location, $interval, masterMachineLogFactory, userModel, messageModel, $localStorage, socket, lodash, $interval) {
                    function initialize() {
                        $scope.allMachineLog = {};
                        $scope.isError = false;
                        $scope.isSuccess = false;
                        $scope.SuccessErrorMessage = "";
                        $scope.pump1 = [];
                        $scope.pump2 = [];
                        $scope.pump3 = [];
                        $scope.pump1Toggle = true;
                        $scope.pump2Toggle = true;
                        $scope.pump3Toggle = true;
                        $scope.svgvaluex = 1000;
                        $scope.svgvaluey = 500;

                        $scope.test = "Test";
                       
                    };

                    initialize();

                    socket.emit('get-users');
                    socket.on('message', function (data) {
                        $scope.pump1 = data.recordset[0];
                        $scope.pump2 = data.recordset[1];
                        $scope.pump3 = data.recordset[2];
                    });
                    var flag = 0;

                    //getAllMachineLog();
                   // $interval(getAllMachineLog, 1000);
                    function setvalue() {
                        $scope.test = Math.floor(Math.random() * 100);

                    }


                    function getAllMachineLog() {                   //get data from session


                        masterMachineLogFactory.getAllMachineLog()
                        .success(function (data) {
                            $scope.allMachineLog = {};
                            $scope.pump1 = [];
                            $scope.pump2 = [];
                            $scope.pump3 = [];
                            $scope.allMachineLog = data;
                            $scope.pump1.push(data[0]);
                            $scope.pump2.push(data[1]);
                            $scope.pump3.push(data[2]);
                            setObejectValue();
                        })
                        .error(function (error) {

                        });
                    };

                    //setInterval(setObejectValue(), 3000);
                    //setObejectValue();
                    $scope.switchPump = function (pump) {
                        if (pump == 'Pump1') {
                        $scope.obj1 = {
                                lngID: $scope.pump1.lngID,
                                strMachineName: $scope.pump1.strMachineName,
                                blnStatus: $scope.pump1Toggle,
                                decSetTemp: $scope.pump1.decSetTemp,
                                decCurrentTemp: $scope.pump1.decCurrentTemp,
                                decFlowGPM: $scope.pump1.decFlowGPM,
                                decCurrentKWUsage: $scope.pump1.decCurrentKWUsage,
                            datOperationDate : null 

                        };
                        $scope.pump4 = [];
                        $scope.pump4.push($scope.obj1);

                        editRecord($scope.pump4[0]);
                        }

                    }

                    function setObejectValue(pump) {
                        if (pump == 'Pump1') {
                            $scope.obj1 = {
                                lngID: $scope.pump1.lngID,
                                strMachineName: $scope.pump1.strMachineName,
                                blnStatus: $scope.pump1Toggle,
                                decSetTemp: $scope.pump1.decSetTemp,
                                decCurrentTemp: $scope.pump1.decCurrentTemp,
                                decFlowGPM: $scope.pump1.decFlowGPM,
                                decCurrentKWUsage: $scope.pump1.decCurrentKWUsage,
                            datOperationDate: null

                        };
                            $scope.pump4 = [];
                            $scope.pump4.push($scope.obj1);

                            editRecord($scope.pump4);
                        }
                       

                        //$scope.obj2 = {
                        //    lngID: $scope.pump2[0].lngID,
                        //    strMachineName: $scope.pump2[0].strMachineName,
                        //    blnStatus: $scope.pump2[0].blnStatus,
                        //    decSetTemp: $scope.pump2[0].decSetTemp,
                        //    decCurrentTemp: Math.floor(Math.random() * 100),
                        //    decFlowGPM: Math.floor(Math.random() * 1000),
                        //    decCurrentKWUsage: Math.floor(Math.random() * 4000),
                        //    datOperationDate: null

                        //};
                        //$scope.pump5 = [];
                        //$scope.pump5.push($scope.obj2);
                        //editRecord($scope.pump5[0]);

                        //$scope.obj3 = {
                        //    lngID: $scope.pump3[0].lngID,
                        //    strMachineName: $scope.pump3[0].strMachineName,
                        //    blnStatus: $scope.pump3[0].blnStatus,
                        //    decSetTemp: $scope.pump3[0].decSetTemp,
                        //    decCurrentTemp: Math.floor(Math.random() * 100),
                        //    decFlowGPM: Math.floor(Math.random() * 1000),
                        //    decCurrentKWUsage: Math.floor(Math.random() * 4000),
                        //    datOperationDate: null

                        //};
                        //$scope.pump6 = [];
                        //$scope.pump6.push($scope.obj3);

                        //editRecord($scope.pump6[0]);

                    }


                    $scope.reset = function (userForm) {
                        $scope.submitted = false;
                        resetInfoPanel();
                        $scope.allMachineLog = {};
                        $scope.userForm.$setPristine();
                    }

                    $scope.saveClick = function (form) {
                        resetInfoPanel();
                        $scope.submitted = true;
                        $scope.userForm = form;
                        if ($scope.userForm.$valid) {
                            editRecord();

                        }
                        else {

                        }

                    };

                    function editRecord(pump) {

                        masterMachineLogFactory.editRecord(pump.lngID, pump)
                           .success(function (data) {

                           })
                    };


                }
            ]);

            app.factory('socket', ['$rootScope', function ($rootScope) {
                var socket = window.io.connect('http://localhost:3000');
                //var myIoSocket = window.io.connect('http://localhost:9006');
                return {
                    on: on,
                    emit: emit
                };

                function on(eventName, callback) {
                    socket.on(eventName, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            callback.apply(socket, args);
                        });
                    });
                }

                function emit(eventName, data, callback) {
                    socket.emit(eventName, data, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback.apply(socket, args);
                            }
                        });
                    });
                }
                return socket;
            }
            ]);