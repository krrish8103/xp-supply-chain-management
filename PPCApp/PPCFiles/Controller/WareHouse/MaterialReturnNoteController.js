
//------------------------------Material Return Note Controller---------------------------------------
app.controller('MaterialReturnNoteController', ['$rootScope', '$scope', '$modal', 'MaterialReturnNoteFactory', '$location', 'userModel', 'tempModel', 'messageModel', '$base64',
    function ($rootScope, $scope, $modal, MaterialReturnNoteFactory, $location, userModel, tempModel, messageModel, $base64) {
        function initialize() {
            $scope.materialreturnNote = {};
            $scope.allmaterialreturnNote = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            userModel.editRow = {};
            userModel.editMode = false;

        };

        initialize();
        //var flag = 0;
        var self = this;
        self.expandAll = function (expanded) {
            $scope.$broadcast('onExpandAll', { expanded: expHanded });
        };
     
        getAllMaterialReturnNotes();
        function getAllMaterialReturnNotes() {                   //get data from session
            MaterialReturnNoteFactory.getAllMaterialReturnNotes()
            .success(function (data) {
                momentDate = moment(data.datCreatedDate, "DD-MM-YYYY HH:mm");
                $scope.materialreturnNote.datCreatedDate = momentDate;
                $scope.allmaterialreturnNote = data;
                $scope.dispmaterialreturnNote = [].concat($scope.allmaterialreturnNote);
            })
            .error(function (error) {
                swal(messageModel.messages[0].Message);
            });
        };

        $scope.AddMaterialReturnNoteClick = function () {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.materialreturnNote = {};
            $location.path('/MaterialReturnNoteAddEdit').replace();
        };
        $scope.CancelMaterialReturnNoteClick = function () {
            $location.path('/home').replace();
        };
        $scope.editMaterialReturnNoteClick = function (MaterialReturnNote) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = MaterialReturnNote;
            $location.path('/MaterialReturnNoteAddEdit').replace();
        };

        $scope.setDocStatusToWorkingDraft = function (MaterialReturnNote) {
            bootbox.confirm({
                message: "Change document status to Working Draft, Are you sure?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        MaterialReturnNote.lngDocStatus = 1;
                        MaterialReturnNoteFactory.setMaterialReturnNoteStatus(MaterialReturnNote.lngId, MaterialReturnNote)
                      .success(function (data) {
                          getAllMaterialReturnNotes();

                      })
                      .error(function (error) {
                          //Error Message
                          showInfoPanel(true, 'Error occured! Please Try Again!!!');
                      });
                    }
                }
            }
					);
        }

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
            getAllMaterialReturnNotes();
        };
    }
]);


//app.controller('maintainWorkOrderController', ['$rootScope', '$scope', '$modal', 'masterWorkOrderFactory', '$location', 'userModel', '$base64', 'messageModel', 'masterOperationsMaterialFactory', 'masterItemFactory', 'masterUnitOfMeasureFactory', 'masterBOMLevelFactory', 'masterFactory', 'masterDepartmentFactory', 'masterLookUpFactory',
//    function ($rootScope, $scope, $modal, masterWorkOrderFactory, $location, userModel, $base64, messageModel, masterOperationsMaterialFactory, masterItemFactory, masterUnitOfMeasureFactory, masterBOMLevelFactory, masterFactory, masterDepartmentFactory, masterLookUpFactory) {
//        function initialize() {
//            $scope.workOrder = {};
//            $scope.allWorkOrder = {};
//            $scope.isError = false;
//            $scope.isSuccess = false;
//            $scope.SuccessErrorMessage = "";
//            $scope.isEditMode = false;

//            $scope.workOrder.intDiagramId = -1;
//            $scope.gridItems = [];
//            $scope.addIconToolTip = "Please select WO Item first";


//        };
//        initialize();
//        $scope.getItemInfo = function () {
//            masterItemFactory.getItemById($scope.workOrder.lngItemId)
//            .success(function (data) {
//                if (data.length > 0) {
//                    $scope.item = data[0];
//                    $scope.itemDrawing = $scope.item.tblMasterDrawings;

//                    if ($scope.itemDrawing.length > 0) {
//                        $scope.workOrder.ActiveDiagram = $scope.itemDrawing.filter(function (dwg) {
//                            return (dwg.Active == true);
//                        });
//                        $scope.workOrder.intDiagramId = $scope.workOrder.ActiveDiagram[0].Id;
//                        $scope.previewDrawing = $base64.decode($scope.workOrder.ActiveDiagram[0].Drawing);
//                        $scope.previewDrawingIdentifier = $scope.workOrder.ActiveDiagram[0].Identifier;
//                    } else {
//                        $scope.itemDrawing = [];
//                        $scope.workOrder.intDiagramId = 0;
//                        $scope.previewDrawing = '';
//                        $scope.previewDrawingIdentifier = '';
//                    }
//                    if ($scope.workOrder.lngItemId > 0) {
//                        $scope.addIconToolTip = "Add Items";
//                    } else {
//                        $scope.addIconToolTip = "Please select WO Item first";
//                    }

//                    masterOperationsMaterialFactory.getOperationsMaterialByItemId($scope.workOrder.lngItemId)
//                    .success(function (data) {
//                        if (data.length > 0) {
//                            $scope.operationMaterials = data[0];
//                            $scope.workOrder.decBatchQty = $scope.operationMaterials.decBatchQty;
//                            $scope.workOrder.strBOMDescription = $scope.operationMaterials.strBOMDescription;
//                            $scope.workOrder.intBOMId = $scope.operationMaterials.lngId;
//                            if ($scope.operationMaterials.tblBillOfMaterialDetails.length > 0) {
//                                for (var i = 0; i < $scope.operationMaterials.tblBillOfMaterialDetails.length; i++) {
//                                    $scope.obj = {
//                                        lngId: 0,
//                                        lngWOId: $scope.operationMaterials.lngId,
//                                        lngItemId: $scope.operationMaterials.tblBillOfMaterialDetails[i].lngItemId,
//                                        lngQuantity: $scope.operationMaterials.tblBillOfMaterialDetails[i].lngQuantity,
//                                        intPhase: 0,
//                                        strNote: $scope.operationMaterials.tblBillOfMaterialDetails[i].strNote,
//                                        partNo: $scope.operationMaterials.tblBillOfMaterialDetails[i].tblMasterItem.PartNumber,
//                                        itemdesc: $scope.operationMaterials.tblBillOfMaterialDetails[i].tblMasterItem.ItemName,
//                                        uom: $scope.operationMaterials.tblBillOfMaterialDetails[i].tblMasterUnitOfMeasure.UOMCode,
//                                        buffer: '',
//                                        procStatus: '',
//                                        dwgName: ''
//                                    };
//                                    if ($scope.operationMaterials.tblBillOfMaterialDetails[i].tblMasterItem.tblMasterDrawings.length > 0) {
//                                        $scope.obj.dwgName = $scope.operationMaterials.tblBillOfMaterialDetails[i].tblMasterDrawings[0].Identifier;
//                                    }
//                                    $scope.gridItems.push($scope.obj);
//                                }
//                            }
//                        }
//                    })
//                    .error(function (error) {
//                        swal('Failed to get operational material details');
//                    });
//                }

//            })
//            .error(function (error) {
//                swal('Failed to get item info');
//            });
//        };
//        if (userModel.editMode == true) {
//            $scope.isEditMode = userModel.editMode;
//            $scope.workOrder = userModel.editRow;
//            $scope.getItemInfo();

//            for (var i = 0; i < $scope.workOrder.tblWorkOrderDetails.length; i++) {
//                $scope.obj = {
//                    lngId: $scope.workOrder.tblWorkOrderDetails[i].lngId,
//                    lngBOMId: $scope.workOrder.lngId,
//                    lngItemId: $scope.workOrder.tblWorkOrderDetails[i].lngItemId,
//                    lngQuantity: $scope.workOrder.tblWorkOrderDetails[i].lngQuantity,
//                    lngLevelId: $scope.workOrder.tblWorkOrderDetails[i].lngLevelId,
//                    strNote: $scope.workOrder.tblWorkOrderDetails[i].strNote,
//                    partNo: $scope.workOrder.tblWorkOrderDetails[i].tblMasterItem.PartNumber,
//                    itemdesc: $scope.workOrder.tblWorkOrderDetails[i].tblMasterItem.ItemName,
//                    uom: $scope.workOrder.tblWorkOrderDetails[i].tblMasterUnitOfMeasure.UOMCode,
//                    dwgName: ''
//                };
//                if ($scope.workOrder.tblWorkOrderDetails[i].tblMasterDrawings.length > 0) {
//                    $scope.obj.dwgName = $scope.workOrder.tblWorkOrderDetails[i].tblMasterDrawings[0].Identifier;
//                }
//                $scope.gridItems.push($scope.obj);
//            }
//        } else {
//            getServerDateTime();
//        }
//        getAllItem();

//        if ($scope.workOrder.lngItemId > 0) {
//            $scope.addIconToolTip = "Add Items";
//        } else {
//            $scope.addIconToolTip = "Please select BOM Item first";
//        }

//        getAllWOPhase();
//        function getAllWOPhase() {                   //get data from session
//            masterLookUpFactory.getAllLookUps(1)//1=WOPhase
//            .success(function (data) {
//                $scope.allWOPhase = data;
//                $scope.dispWOPhase = [].concat($scope.allWOPhase);
//            })
//            .error(function (error) {
//                swal(messageModel.messages[0].Message);
//            });
//        };




//        getAllDepartment();
//        function getAllDepartment() {                   //get data from session
//            masterDepartmentFactory.getAllDepartment()
//            .success(function (data) {
//                $scope.allDepartment = data;
//                $scope.dispDepartment = [].concat($scope.allDepartment);
//            })
//            .error(function (error) {
//                swal(messageModel.messages[0].Message);
//            });
//        };

//        function getServerDateTime() {               // Use for Get DataBase Server DateTime...
//            masterFactory.getserverdatetime()
//            .success(function (data) {
//                if (!$scope.editMode) {
//                    momentDate = moment(data, "DD-MM-YYYY HH:mm");
//                    $scope.workOrder.datCreatedDate = momentDate;
//                }
//            })
//           .error(function (error) {
//               swal(messageModel.messages[0].Message);
//           });
//        };
//        function getAllItem() {                   //get data from session
//            masterItemFactory.getAllItem()
//            .success(function (data) {
//                $scope.allItem = data;
//                $scope.dispItem = [].concat($scope.allItem);
//                $scope.objSelect = { Id: '', CodeDesc: '--Select--' };
//                $scope.dispItem.splice(0, 0, $scope.objSelect);

//            })
//            .error(function (error) {
//                swal(messageModel.messages[0].Message);
//            });
//        };

//        $scope.updateComponantQuantity = function () {
//            for (var i = 0; i < $scope.gridItems.length; i++) {
//                if ($scope.operationMaterials.tblBillOfMaterialDetails.length > 0) {
//                    for (var j = 0; j < $scope.operationMaterials.tblBillOfMaterialDetails.length; j++) {
//                        if ($scope.operationMaterials.tblBillOfMaterialDetails[i].lngItemId == $scope.gridItems[i].lngItemId) {
//                            $scope.gridItems[i].lngQuantity = (($scope.workOrder.decBatchQty * $scope.operationMaterials.tblBillOfMaterialDetails[i].lngQuantity) / $scope.operationMaterials.decBatchQty);
//                        }
//                    }
//                }
//            }
//        };
//        $scope.saveClick = function (form) {
//            resetInfoPanel();
//            $scope.submitted = true;
//            $scope.userForm = form;
//            if ($scope.userForm.$valid) {
//                $scope.workOrder.tblWorkOrderDetails = $scope.gridItems;
//                masterWorkOrderFactory.insertData($scope.workOrder)
//                .success(function (data) {
//                    if (data != null && data.lngId > 0) {
//                        if (userModel.editMode = false) {
//                            showInfoPanel(false, 'Work Order Added Successfully. The Work Order Identifier is [' + data.strWONumber + ']');
//                        } else {
//                            showInfoPanel(false, 'Work Order updated Successfully.');
//                        }
//                        $scope.submitted = false;
//                        $scope.customer = {};
//                        $scope.userForm.$setPristine();
//                    } else {
//                        showInfoPanel(true, 'Error occured! Please Try Again!!!');
//                    }
//                })
//                .error(function (error) {
//                    showInfoPanel(true, 'Error occured! Please Try Again!!!');
//                });


//            }
//            else {
//                showInfoPanel(true, 'Please fill form carefully!!');
//            }

//        };
//        $scope.cancelClick = function () {
//            $location.path('/workOrder').replace();
//        };
//        function showInfoPanel(isError, message) {
//            $scope.isSuccess = !isError;
//            $scope.isError = isError;
//            $scope.SuccessErrorMessage = message;
//        }

//        function resetInfoPanel() {
//            $scope.isSuccess = false;
//            $scope.isError = false;
//            $scope.SuccessErrorMessage = '';
//        }

//    }
//]);


