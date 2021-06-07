
//------------------------------masterWorkOrderController---------------------------------------
app.controller('workOrderController', ['$rootScope', '$scope', '$modal', 'masterWorkOrderFactory', '$location', 'userModel', 'tempModel', 'messageModel', '$base64',
    function ($rootScope, $scope, $modal, masterWorkOrderFactory, $location, userModel, tempModel, messageModel, $base64) {
        function initialize() {
            $scope.workOrder = {};
            $scope.allWorkOrder = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.isWorkOrderIssueScreen=false;
        };

        initialize();
        
        if (userModel.redirectRoute == "/workOrderIssue") {
            $scope.isWorkOrderIssueScreen = true;
        } 

        getAllWorkOrder();
        function getAllWorkOrder() {                   //get data from session
            masterWorkOrderFactory.getAllWorkOrder()
            .success(function (data) {
                momentDate = moment(data.datCreatedDate, "DD-MM-YYYY HH:mm");
                $scope.workOrder.datCreatedDate = momentDate;
                $scope.allWorkOrder = data;
                $scope.dispWorkOrder = [].concat($scope.allWorkOrder);
            })
            .error(function (error) {
               bootbox.alert("Error Occored!!! Please try again!!!");               
            });
        };

        $scope.AddWorkOrderClick = function () {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.workOrder = {};
            $location.path('/workOrderAddEdit').replace();
        };
        $scope.CancelWorkOrderClick = function () {
            $location.path('/home').replace();
        };
        $scope.editWorkOrderClick = function (WorkOrder) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = WorkOrder;
            if ($scope.isWorkOrderIssueScreen == true) {
                $location.path('/workOrderIssueAddEdit').replace();
            } else {
            $location.path('/workOrderAddEdit').replace();
            }
        };

        //$scope.viewWorkOrderClick = function (WorkOrder) {
        //    resetInfoPanel();
        //    userModel.viewMode = true;
        //    userModel.viewRow = WorkOrder;
        //    $location.path('/workOrderAddEdit').replace();
        //};

        $scope.setDocStatusToWorkingDraft = function (WorkOrder) {
            bootbox.confirm({
                message: "Change document status to Working Draft, Are you sure?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        WorkOrder.lngDocStatus = 1;
                        masterWorkOrderFactory.setWorkOrderStatus(WorkOrder.lngId, WorkOrder)
                      .success(function (data) {
                          getAllWorkOrder();

                      })
                      .error(function (error) {
                          //Error Message
                          showInfoPanel(true, 'Error occured! Please Try Again!!!');
                      });
                    }
                }
            });
        };
        $scope.setDocStatusToCompleted = function (WorkOrder) {
            bootbox.confirm({
                message: "Change document status to Completed, Are you sure?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        WorkOrder.lngDocStatus = 2;
                        masterWorkOrderFactory.setWorkOrderStatus(WorkOrder.lngId, WorkOrder)
                      .success(function (data) {
                          getAllWorkOrder();

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
            getAllWorkOrder();
        };
    }
]);


app.controller('maintainWorkOrderController', ['$rootScope', '$scope', '$modal', '$filter', 'masterWorkOrderFactory', '$location', 'userModel', '$base64', 'messageModel', 'masterOperationsMaterialFactory', 'masterItemFactory', 'masterUnitOfMeasureFactory', 'masterBOMLevelFactory', 'masterFactory', 'masterDepartmentFactory', 'masterLookUpFactory',
    function ($rootScope, $scope, $modal, $filter, masterWorkOrderFactory, $location, userModel, $base64, messageModel, masterOperationsMaterialFactory, masterItemFactory, masterUnitOfMeasureFactory, masterBOMLevelFactory, masterFactory, masterDepartmentFactory, masterLookUpFactory) {
        function initialize() {
            $scope.workOrder = {};
            $scope.allWorkOrder = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.isEditMode = false;

            $scope.workOrder.intDiagramId = -1;
            $scope.gridItems = [];
            $scope.addIconToolTip = "Please select WO Item first";
            $scope.dispItem = [];
            $scope.isWorkOrderIssueScreen = false;
        };

        initialize();
        if (userModel.redirectRoute == "/workOrderIssueAddEdit") {
            $scope.isWorkOrderIssueScreen = true;
        }
        getAllItem();
        $scope.getSuggestions = function (objItem) {
            masterWorkOrderFactory.getSuggestionsToReleaseWorkOrder(objItem.issueQty, objItem.lngItemId)
                    .success(function (data) {
                        if (data.length > 0) {
                            $scope.woIssueItemInfo = [];

                            for (var k = 0; k < data.length; k++) {
                                if ($scope.woIssueItemInfo.length > 0) {
                                    for (var m = 0; m < $scope.woIssueItemInfo.length; m++) {
                                        if ($scope.woIssueItemInfo[m].LocationId != data[k].LocationId) {
                                            $scope.obj3 = {
                                                LocationId: data[k].LocationId,
                                                LocationIdentifier: data[k].LocationIdentifier,
                                                LocationBuffer: data[k].LocationBuffer,
                                                LocationIssueQty: data[k].LocationIssueQty,
                                                bin: []
                                            };
                                            for (var i = 0; i < data.length; i++) {
                                                if ($scope.obj3.LocationId == data[i].LocationId) {
                                                    $scope.obj4 = {
                                                        BinId: data[i].BinId,
                                                        BinIdentifier: data[i].BinIdentifier,
                                                        BinBuffer: data[i].BinBuffer,
                                                        IssueQty: data[i].IssueQty,
                                                        GRNDetailsId:data[i].GRNDetailsId
                                                    };
                                                    $scope.obj3.bin.push($scope.obj4);
                                                }
                                            }

                                            $scope.woIssueItemInfo.push($scope.obj3);
                                        }
                                    }
                                } else {
                                    $scope.obj3 = {
                                        LocationId: data[k].LocationId,
                                        LocationIdentifier: data[k].LocationIdentifier,
                                        LocationBuffer: data[k].LocationBuffer,
                                        LocationIssueQty: data[k].LocationIssueQty,
                                        bin: []
                                    };
                                    for (var i = 0; i < data.length; i++) {
                                        if ($scope.obj3.LocationId == data[i].LocationId) {
                                            $scope.obj4 = {
                                                BinId: data[i].BinId,
                                                BinIdentifier: data[i].BinIdentifier,
                                                BinBuffer: data[i].BinBuffer,
                                                IssueQty: data[i].IssueQty,
                                                GRNDetailsId:data[i].GRNDetailsId
                                            };
                                            $scope.obj3.bin.push($scope.obj4);
                                        }
                                    }
                                    $scope.woIssueItemInfo.push($scope.obj3);
                                }
                            }

                            for (var i = 0; i < $scope.gridItems.length; i++) {
                                if ($scope.gridItems[i].lngItemId == objItem.lngItemId) {
                                    $scope.gridItems[i].issueQty = objItem.issueQty;
                                    $scope.gridItems[i].releaseWOSuggestion = [];
                                    $scope.gridItems[i].releaseWOSuggestion.push($scope.woIssueItemInfo);
                                }
                            }

                            //objItem.releaseWOSuggestion.push($scope.woIssueItemInfo);
                        }

                    })
                    .error(function (error) {
                        bootbox.alert('Failed to get WO Suggestions');
                    });
        };
        
        $scope.getItemInfo = function () {
            masterItemFactory.getItemById($scope.workOrder.lngItemId)
            .success(function (data) {
                if (data.length > 0) {
                    $scope.item = data[0];
                    $scope.itemDrawing = $scope.item.tblMasterDrawings;

                    if ($scope.itemDrawing.length > 0) {
                        $scope.workOrder.ActiveDiagram = $scope.itemDrawing.filter(function (dwg) {
                            return (dwg.Active == true);
                        });
                        if ($scope.workOrder.ActiveDiagram.length > 0) {
                        $scope.workOrder.intDiagramId = $scope.workOrder.ActiveDiagram[0].Id;
                        $scope.previewDrawing = $base64.decode($scope.workOrder.ActiveDiagram[0].Drawing);
                        $scope.previewDrawingIdentifier = $scope.workOrder.ActiveDiagram[0].Identifier;
                        }
                    } else {
                        $scope.itemDrawing = [];
                        $scope.workOrder.intDiagramId = 0;
                        $scope.previewDrawing = '';
                        $scope.previewDrawingIdentifier = '';
                    }


                    if ($scope.isEditMode == true) {
                        if ($scope.workOrder.tblWorkOrderDetails.length > 0) {
                            for (var i = 0; i < $scope.workOrder.tblWorkOrderDetails.length; i++) {
                                $scope.obj = {
                                    lngId: $scope.workOrder.tblWorkOrderDetails[i].lngId,
                                    lngWOId: $scope.workOrder.lngId,
                                    lngItemId: $scope.workOrder.tblWorkOrderDetails[i].lngItemId,
                                    lngQuantity: $scope.workOrder.tblWorkOrderDetails[i].lngQuantity,
                                    intPhase: $scope.workOrder.tblWorkOrderDetails[i].intPhase,
                                    strNote: $scope.workOrder.tblWorkOrderDetails[i].strNote,
                                    partNo: $scope.workOrder.tblWorkOrderDetails[i].tblMasterItem.PartNumber,
                                    itemdesc: $scope.workOrder.tblWorkOrderDetails[i].tblMasterItem.ItemName,
                                    uom: $scope.workOrder.tblWorkOrderDetails[i].tblMasterUnitOfMeasure.UOMCode,
                                    buffer: $scope.workOrder.tblWorkOrderDetails[i].tblMasterItem.Buffer,
                                    procStatus: '',
                                    dwgName: '',
                                    binBuffer: [],
                                    issueQty: 0,
                                    releaseWOSuggestion: []
                                };
                                if ($scope.workOrder.tblWorkOrderDetails[i].tblMasterItem.tblMasterDrawings.length > 0) {
                                    $scope.obj.dwgName = $scope.workOrder.tblWorkOrderDetails[i].tblMasterDrawings[0].Identifier;
                                }
                                $scope.gridItems.push($scope.obj);
                    }
                            for (var j = 0; j < $scope.gridItems.length; j++) {
                                $scope.filterobj = $filter('filter')($scope.dispItem, { Id: $scope.gridItems[j].lngItemId }, true)[0];

                                if ($scope.filterobj && $scope.filterobj.LocationBinBuffer != null) {
                                    $scope.gridItems[j].binBuffer = [];
                                    $scope.gridItems[j].binBuffer = $scope.filterobj.LocationBinBuffer;
                                }
                            }
                        }
                    }
                    masterOperationsMaterialFactory.getOperationsMaterialByItemId($scope.workOrder.lngItemId)
                                        .success(function (data) {
                                            if (data.length > 0) {
                                                $scope.operationMaterials = data[0];
                                            }
                                        })
                                        .error(function (error) {
                                            bootbox.alert('Failed to get operational material details');
                                        });
                } else {
                    masterOperationsMaterialFactory.getOperationsMaterialByItemId($scope.workOrder.lngItemId)
                    .success(function (data) {
                        if (data.length > 0) {
                            $scope.operationMaterials = data[0];
                            $scope.workOrder.decBatchQty = $scope.operationMaterials.decBatchQty;
                            $scope.workOrder.strBOMDescription = $scope.operationMaterials.strBOMDescription;
                                            $scope.workOrder.strBOMNumber = $scope.operationMaterials.strBOMNumber;
                            $scope.workOrder.intBOMId = $scope.operationMaterials.lngId;
                            if ($scope.operationMaterials.tblBillOfMaterialDetails.length > 0) {
                                for (var i = 0; i < $scope.operationMaterials.tblBillOfMaterialDetails.length; i++) {
                                    $scope.obj = {
                                        lngId: 0,
                                        lngWOId: $scope.operationMaterials.lngId,
                                        lngItemId: $scope.operationMaterials.tblBillOfMaterialDetails[i].lngItemId,
                                        lngQuantity: $scope.operationMaterials.tblBillOfMaterialDetails[i].lngQuantity,
                                        intPhase: 0,
                                        strNote: $scope.operationMaterials.tblBillOfMaterialDetails[i].strNote,
                                        partNo: $scope.operationMaterials.tblBillOfMaterialDetails[i].tblMasterItem.PartNumber,
                                        itemdesc: $scope.operationMaterials.tblBillOfMaterialDetails[i].tblMasterItem.ItemName,
                                        uom: $scope.operationMaterials.tblBillOfMaterialDetails[i].tblMasterUnitOfMeasure.UOMCode,
                                        buffer: '',
                                        procStatus: '',
                                                        dwgName: '',
                                                        binBuffer: []
                                    };
                                    if ($scope.operationMaterials.tblBillOfMaterialDetails[i].tblMasterItem.tblMasterDrawings.length > 0) {
                                        $scope.obj.dwgName = $scope.operationMaterials.tblBillOfMaterialDetails[i].tblMasterDrawings[0].Identifier;
                                    }
                                    $scope.gridItems.push($scope.obj);
                                }
                            }
                                            for (var j = 0; j < $scope.gridItems.length; j++) {
                                                $scope.filterobj = $filter('filter')($scope.dispItem, { Id: $scope.gridItems[j].lngItemId }, true)[0];
                                                if ($scope.filterobj && $scope.filterobj.LocationBinBuffer != null) {
                                                    $scope.gridItems[j].binBuffer = [];
                                                    $scope.gridItems[j].binBuffer = $scope.filterobj.LocationBinBuffer;
                                                }
                                            }
                        }
                    })
                    .error(function (error) {
                                        bootbox.alert('Failed to get operational material details');
                    });
                }

            })
            .error(function (error) {
                bootbox.alert('Failed to get item info');
            });
        };
        if (userModel.editMode == true) {
            $scope.isEditMode = userModel.editMode;
            $scope.workOrder = userModel.editRow;
                }
        else {
            getServerDateTime();
        }


        getAllWOPhase();
        function getAllWOPhase() {                   //get data from session
            masterLookUpFactory.getAllLookUps(1)//1=WOPhase
            .success(function (data) {
                $scope.allWOPhase = data;
                $scope.dispWOPhase = [].concat($scope.allWOPhase);
            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };




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

        function getServerDateTime() {               // Use for Get DataBase Server DateTime...
            masterFactory.getserverdatetime()
            .success(function (data) {
                if (!$scope.editMode) {
                    momentDate = moment(data, "DD-MM-YYYY HH:mm");
                    $scope.workOrder.datCreatedDate = momentDate;
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
                $scope.objSelect = { Id: '', CodeDesc: '--Select--' };
                $scope.dispItem.splice(0, 0, $scope.objSelect);
                if (userModel.editMode == true) {
                    $scope.getItemInfo();
                }

            })
            .error(function (error) {
                bootbox.alert("Error Occored!!! Please try again!!!");
            });
        };

        $scope.updateComponantQuantity = function () {
            for (var i = 0; i < $scope.gridItems.length; i++) {
                if ($scope.operationMaterials.tblBillOfMaterialDetails.length > 0) {
                    for (var j = 0; j < $scope.operationMaterials.tblBillOfMaterialDetails.length; j++) {
                        if ($scope.operationMaterials.tblBillOfMaterialDetails[i].lngItemId == $scope.gridItems[i].lngItemId) {
                            $scope.gridItems[i].lngQuantity = (($scope.workOrder.decBatchQty * $scope.operationMaterials.tblBillOfMaterialDetails[i].lngQuantity) / $scope.operationMaterials.decBatchQty);
                        }
                    }
                }
            }
        };

        $scope.saveIssueWorkOrderClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            $scope.woDataToSave = [];
            if ($scope.userForm.$valid) {                
                for (var i = 0; i < $scope.gridItems.length; i++) {
                    

                    for (var j = 0; j < $scope.gridItems[i].releaseWOSuggestion[0].length; j++) {
                        for (var k = 0; k < $scope.gridItems[i].releaseWOSuggestion[0][j].bin.length; k++) {
                            $scope.obj5 = {
                                lngWODetailsId: $scope.gridItems[i].lngId,
                                lngGRNDetailsId: $scope.gridItems[i].releaseWOSuggestion[0][j].bin[k].GRNDetailsId,
                                lngWOID: $scope.gridItems[i].lngWOId,
                                lngItemId: $scope.gridItems[i].lngItemId,
                                totalIssueQty: $scope.gridItems[i].issueQty,
                                lngLocationId: $scope.gridItems[i].releaseWOSuggestion[0][j].LocationId,
                                issueLocationQty: $scope.gridItems[i].releaseWOSuggestion[0][j].LocationIssueQty,
                                lngBinId: $scope.gridItems[i].releaseWOSuggestion[0][j].bin[k].BinId,
                                issueBinQty: $scope.gridItems[i].releaseWOSuggestion[0][j].bin[k].IssueQty
                                
                            }
                            $scope.woDataToSave.push($scope.obj5);
                        }
                        
                    }                    
                }

                $scope.SaveWorkOrderStructure = {};
                $scope.SaveWorkOrderStructure.releaseWorkOrderJSON = angular.toJson($scope.woDataToSave);
                masterWorkOrderFactory.issueItemFromWorkOrder($scope.SaveWorkOrderStructure)
                .success(function (data) {
                    if (data != null && data.length > 0) {
                        if (data[0].RetVal == 101) {
                            showInfoPanel(false, 'Work Order updated Successfully.');
                            $scope.submitted = false;
                            $scope.customer = {};
                            $scope.userForm.$setPristine();
                        } else if (data[0].RetVal == 201) {
                            showInfoPanel(true, data[0].RetMessage);
                        }
                        
                    } else {
                        
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
        $scope.saveWorkOrderClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                $scope.workOrder.tblWorkOrderDetails = $scope.gridItems;
                if ($scope.workOrder.lngId > 0) {
                    $scope.workOrder.intCreatedBy = userModel.currentUserDetails.Id;
                } else {
                    $scope.workOrder.intLastUpBy = userModel.currentUserDetails.Id;
                }
                masterWorkOrderFactory.insertData($scope.workOrder)
                .success(function (data) {
                    if (data != null && data.lngId > 0) {
                        if (userModel.editMode = false) {
                            showInfoPanel(false, 'Work Order Added Successfully. The Work Order Identifier is [' + data.strWONumber + ']');
                        } else {
                            showInfoPanel(false, 'Work Order updated Successfully.');
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

        $scope.setDocStatusToApproved = function (form) {
            bootbox.confirm({
                message: "Change document status to Approved, Are you sure?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        $scope.workOrder.lngDocStatus = 3;
                        $scope.workOrder.intApprovedBy = userModel.currentUserDetails.Id;
                        masterWorkOrderFactory.setWorkOrderStatus($scope.workOrder.lngId, $scope.workOrder)
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
                buttons: {confirm: {label: "OK",className: "btn-primary btn-sm",}, cancel: {label: "Cancel",className: "btn-sm",}},
                callback: function (result) {
                    if (result) {
                        $scope.workOrder.lngDocStatus = 1;
                        $scope.workOrder.intApprovedBy = null;
                        $scope.workOrder.datApprovedDate = null;
                        masterWorkOrderFactory.setWorkOrderStatus($scope.workOrder.lngId, $scope.workOrder)
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

        $scope.cancelClick = function () {
            $location.path('/workOrder').replace();
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


