app.controller('masterUnitOfMeasureController', ['$rootScope', '$scope', '$modal', 'masterUnitOfMeasureFactory', '$location', 'userModel', 'messageModel',
    function ($rootScope, $scope, $modal, masterUnitOfMeasureFactory, $location, userModel, messageModel) {
        function initialize() {
            $scope.UOM = {};
            $scope.allUOM = {};
            $scope.dispUOM = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.exportKeys = ["UOMCode","UOMDescription"];
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
                    $scope.Item = {};
                    $scope.userForm.$setPristine();
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

app.controller('maintainLocationController', ['$rootScope', '$scope', '$modal', 'masterLocationFactory', '$location', 'userModel', 'messageModel','masterCountryStateCityFactory',
function ($rootScope, $scope, $modal, masterLocationFactory, $location, userModel, messageModel,masterCountryStateCityFactory) {
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
