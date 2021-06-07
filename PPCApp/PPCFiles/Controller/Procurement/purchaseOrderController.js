//------------------------------masterpurchaseorderController---------------------------------------
app.controller('purchaseOrderController', ['$rootScope', '$scope', '$modal', 'masterPurchaseOrderFactory', '$location', 'userModel', 'tempModel', 'messageModel', '$base64',
    function ($rootScope, $scope, $modal, masterPurchaseOrderFactory, $location, userModel, tempModel, messageModel, $base64) {
        function initialize() {
            $scope.purchaseorder = {};
            $scope.allPurchaseorder = {};
            $scope.dispPurchaseorder = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            userModel.editRow = {};
            userModel.editMode = false;

        };

        initialize();
        

        $scope.AddPurchaseOrderClick = function () {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.purchaseorder = {};
            $location.path('/purchaseOrderAddEdit').replace();
        };
        $scope.AddPurchaseOrderAdvancedClick = function () {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.purchaseorder = {};
            $location.path('/purchaseOrderAddEditAdvanced').replace();
        };
        $scope.CancelQuotationClick = function () {
            $location.path('/home').replace();
        };
        $scope.editQuotationClick = function (Quotation) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = Quotation;
            $location.path('/purchaseOrderAddEdit').replace();
        };

        //var viewContactModal = $modal({ scope: $scope, template: 'viewCustomerContact.html', animation: 'am-flip-x', show: false, backdrop: false });
        //$scope.viewContact = function (customer) {
        //    $scope.contact = [];
        //    for (var i = 0; i < customer.Contacts.length; i++) {
        //        $scope.contact.push(customer.Contacts[i]);
        //    }
        //    viewContactModal.$promise.then(viewContactModal.show);
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
        $scope.clearFilter = function () {
            initialize();
            getAllQuotation();
        };
        getAllPurchaseOrders();
        function getAllPurchaseOrders(){
            masterPurchaseOrderFactory.getAllPurchaseOrder()
              .success(function (data) {
                  $scope.allPurchaseorder = data;
                  $scope.dispPurchaseOrder = [].concat($scope.allPurchaseorder);
              })
              .error(function (error) {
                  bootbox.alert("Error Occored!!! Please try again!!!");
              });
        }
    }
]);

app.controller('maintainPurchaseOrderAdvancedController', ['$rootScope', '$scope', '$modal', 'masterPurchaseOrderFactory', '$location', 'userModel', '$base64', 'indentFactory', 'DragDropHandler', 'masterQuotationFactory', 'masterSupplierFactory', 'masterItemFactory',
function ($rootScope, $scope, $modal, masterPurchaseOrderFactory, $location, userModel, $base64, indentFactory, DragDropHandler, masterQuotationFactory, masterSupplierFactory, masterItemFactory) {
    function initialize() {
        $scope.purchaseorder = {};
        $scope.allpurchaseorder = {};
        $scope.allIndent = [];
        $scope.isError = false;
        $scope.isSuccess = false;
        $scope.SuccessErrorMessage = "";
        userModel.editRow = {};
        userModel.editMode = false;
        $scope.indentDropZone = [];
        $scope.PODropZone = [];
        $scope.items = [];
        $scope.step = 1;
        $scope.addCaption = "Next";
        $scope.showBtnPervious = false;
        $scope.objItemStep2 = [];
        $scope.objItemStep3 = [];
        $scope.chkAll = [];
        $scope.chkAll.chkQuotAll = false;
        $scope.chkAll.chkPOAll = false;
        $scope.chkAll.chkUSAll = false;
        $scope.objPurchaseOrder = {};
        $scope.dispObjPurchaseOrder = [];
        $scope.submitted = true;
        GetAllIndent();
        getQuotationForPurchaseOrder();
        getAllSupplier();
    };
    initialize();
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
    $scope.cancelPOClick = function () {
        if ($scope.step != 1 && $scope.step != 4) {
            bootbox.confirm({
                message: "You are in step " + $scope.step + " , Do you want to leave this screen?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        $location.path('/home').replace();
                    }
                }
            });
        } else {
            $location.path('/home').replace();
        }
        
    };

    $scope.moveObject = function (from, to, fromList, toList) {
        var item = $scope.items[fromList][from];
        DragDropHandler.addObject(item, $scope.items[toList], to);
        $scope.items[fromList].splice(from, 1);
    }

    $scope.createObject = function (object, to, list) {
        $scope.objitem = {
            datExpected: object.datExpected,
            intQty: object.intQty,
            intReceivedQty: object.intReceivedQty,
            lngId: object.lngId,
            lngIndentId: object.lngIndentId,
            strIndentNumber: object.strIndentNumber,
            lngItemId: object.lngItemId,
            strNote: object.strNote,
            strItemName: object.tblMasterItem.Identifier + ' - ' + object.tblMasterItem.ItemName
        };
        //var newItem = [];
        //newItem.push($scope.objitem)

        var newItem = angular.copy($scope.objitem);
        //newItem.id = Math.ceil(Math.random() * 1000);
        DragDropHandler.addObject(newItem, $scope.items, to);

        for (var i = 0; i < $scope.allIndent.length; i++) {
            for (var j = 0; j < $scope.allIndent[i].tblIndentItems.length; j++) {
                if ($scope.allIndent[i].tblIndentItems[j].lngIndentId == $scope.objitem.lngIndentId && $scope.allIndent[i].tblIndentItems[j].lngId == $scope.objitem.lngId) {
                    $scope.allIndent[i].tblIndentItems[j].isDroppedInItemTray = true;

                }
            }
        }


    };
    $scope.moveAllItemsToItemTray = function (object) {

        for (var i = 0; i < object.length; i++) {
            $scope.objitem = {
                datExpected: object[i].datExpected,
                intQty: object[i].intQty,
                intReceivedQty: object[i].intReceivedQty,
                lngId: object[i].lngId,
                lngIndentId: object[i].lngIndentId,
                strIndentNumber: object[i].strIndentNumber,
                lngItemId: object[i].lngItemId,
                strNote: object[i].strNote,
                strItemName: object[i].tblMasterItem.Identifier + ' - ' + object[i].tblMasterItem.ItemName

            };
            var isItemExists = false;
            if ($scope.items.length > 0) {
                for (var a = 0; a < $scope.items.length; a++) {
                    if ($scope.items[a].lngId == $scope.objitem.lngId) {
                        isItemExists = true;
                    }
                }
            }
            if (!isItemExists) {
                $scope.items.push($scope.objitem);
            }

            for (var m = 0; m < $scope.allIndent.length; m++) {
                for (var j = 0; j < $scope.allIndent[m].tblIndentItems.length; j++) {
                    if ($scope.allIndent[m].tblIndentItems[j].lngIndentId == $scope.objitem.lngIndentId && $scope.allIndent[m].tblIndentItems[j].lngId == $scope.objitem.lngId) {
                        $scope.allIndent[m].tblIndentItems[j].isDroppedInItemTray = true;
                    }
                }
            }
        }



    }

    
    function GetAllIndent() {
        indentFactory.GetAllIndentForPO()
        .success(function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].tblIndentItems.length > 0) {
                        $scope.allIndent.push(data[i]);
                    }
                }
                //$scope.allIndent = data;
                for (var i = 0; i < $scope.allIndent.length - 1; i++) {
                    $scope.allIndent[i].datIndentDate = new Date($scope.allIndent[i].datIndentDate);
                }
                $scope.dispIndent = [].concat($scope.allIndent);

                if ($scope.allIndent.length > 0) {
                    for (var i = 0; i < $scope.allIndent.length - 1; i++) {
                        for (var j = 0; j < $scope.allIndent[i].tblIndentItems.length; j++) {
                            $scope.allIndent[i].tblIndentItems[j].isDroppedInItemTray = false;
                            if ($scope.allIndent[i].tblIndentItems[j].intPOQty == null) {
                                $scope.allIndent[i].tblIndentItems[j].intPOQty = 0.00;
                            }
                            if ($scope.allIndent[i].tblIndentItems[j].intprovisionalPOQuantity == null) {
                                $scope.allIndent[i].tblIndentItems[j].intprovisionalPOQuantity = 0.00;
                            }
                        }
                    }
                }
            }
        })
        .error(function (error) {
            bootbox.alert('Error Occured!! Please try again.');
        });
    }

    $scope.deleteItem = function (itemId, lngIndentId, item) {

        for (var i = 0; i < $scope.items.length; i++) {
            if ($scope.items[i].lngId == itemId) {
                $scope.items.splice(i, 1);
            }
        }

        if ($scope.allIndent.length > 0) {
            for (var i = 0; i < $scope.allIndent.length; i++) {
                if ($scope.allIndent[i].lngId == lngIndentId) {
                    for (var j = 0; j < $scope.allIndent[i].tblIndentItems.length; j++) {
                        if ($scope.allIndent[i].tblIndentItems[j].lngId == itemId) {
                            $scope.allIndent[i].tblIndentItems[j].isDroppedInItemTray = false;
                        }
                    }
                }
            }
        }

    };

    
    function getQuotationForPurchaseOrder() {
        masterQuotationFactory.getQuotationForPurchaseOrder()
        .success(function (data) {
            $scope.allQuotation = data;
            $scope.dispQuotation = [].concat($scope.allQuotation);
        })
        .error(function (error) {
            bootbox.alert('Error Occured to retrive Quotation!! Please try again.');
        });
    };
    
    function getAllSupplier() {                   //get data from session
        masterSupplierFactory.getAllSupplier()
        .success(function (data) {
            $scope.allSupplier = data;
            $scope.dispSupplier = [].concat($scope.allSupplier);
            $scope.objSelect = { lngId: '', VendorDescription: '--Select--' };

        })
        .error(function (error) {
            swal(messageModel.messages[0].Message);
        });
    };

    $scope.previousClick = function () {
        $scope.step = $scope.step - 1;
        setButtonCaption();
    }

    $scope.addNewItemRow = function () {
        $scope.objitem = {
            datExpected: '',
            intQty: '',
            intReceivedQty: '',
            lngId: -1,
            lngIndentId: -1,
            strIndentNumber: '',
            lngItemId: -1,
            strNote: '',
            strItemName: '',
            boolQuotationSelected: false,
            QuotationSelect: [],
            intQuotationNumber: -1,
            decQuotationRate: '',
            intQuotationSupplier: -1,
            strQuotationSupplier: '',
            boolPOSelected: false,
            intPONumber: -1,
            decPORate: '',
            intPOSupplier: -1,
            boolUSSelected: true,
            decUSRate: '',
            intUSSupplier: -1,
            USSupplierSelect: [],
            USIndentSelect: [],
            USItemSelect: []
        };
        for (var j = 0; j < $scope.dispSupplier.length; j++) {
            $scope.objitem.USSupplierSelect.push($scope.dispSupplier[j]);
        }

        for (var i = 0; i < $scope.objItemStep2.length; i++) {
            $scope.objUSIndent = {
                Id: $scope.objItemStep2[i].lngIndentId,
                Number: $scope.objItemStep2[i].strIndentNumber
            };
            $scope.isExists = false;
            for (var j = 0; j < $scope.objitem.USIndentSelect.length; j++) {
                if ($scope.objitem.USIndentSelect[j].Id == $scope.objUSIndent.Id) {
                    $scope.isExists = true;
                }
            }
            if ($scope.isExists == false) {
                $scope.objitem.USIndentSelect.push($scope.objUSIndent);
            }
        }
        $scope.objItemStep2.push($scope.objitem);
    };

    $scope.removeRow = function (index, objrow) {
        if (objrow.lngId < 0) {
            $scope.objItemStep2.splice(index, 1);
        }

    };

    function setButtonCaption() {
        if ($scope.step == 1) {
            $scope.addCaption = "Next";
            $scope.showBtnPervious = false;
        } else if ($scope.step == 2) {
            $scope.addCaption = "Next";
            $scope.showBtnPervious = true;
        } else if ($scope.step == 3) {
            $scope.addCaption = "Finish";
            $scope.showBtnPervious = true;
        }
        else if ($scope.step == 4) {
            $scope.addCaption = "Exit";
            $scope.showBtnPervious = false;
        } else if ($scope.step == 5) {
            $scope.addCaption = "Exit";
            $scope.showBtnPervious = false;
        }
    }

    $scope.addPurchaseOrderClick = function (form) {
        $scope.objPurchaseOrder = {};
        $scope.dispObjPurchaseOrder = [];
        if ($scope.step == 1 && $scope.items.length < 1) {
            showInfoPanel(true, "Item Tray is blank. Please put at least one item in Item Tray.");
            return false;
        } else if ($scope.step == 2 && $scope.objItemStep2.length < 1) {
            showInfoPanel(true, "Supplier Tray is blank. Please select at least one supplier.");
            return false;
        } else {
            resetInfoPanel();
        }
        if (!$scope.userForm.$valid) {                    
            showInfoPanel(true, "Please fill form carefully");
            return false;
        }
        if ($scope.step == 1) {
            $scope.step = 2;
        } else if ($scope.step == 2) {
            $scope.step = 3;
        } else if ($scope.step == 3) {
            $scope.step = 4;
        } else if ($scope.step == 4) {
            $scope.step = 5;
        }

        if ($scope.step == 2) {
            setButtonCaption();
            $scope.objItemStep2 = [];
            $scope.objItemStep3 = [];
            for (var i = 0; i < $scope.items.length; i++) {
                $scope.objitem = {
                    datExpected: $scope.items[i].datExpected,
                    intQty: $scope.items[i].intQty,
                    intReceivedQty: $scope.items[i].intReceivedQty,
                    lngId: $scope.items[i].lngId,
                    lngIndentId: $scope.items[i].lngIndentId,
                    strIndentNumber: $scope.items[i].strIndentNumber,
                    lngItemId: $scope.items[i].lngItemId,
                    strNote: $scope.items[i].strNote,
                    strItemName: $scope.items[i].strItemName,
                    boolQuotationSelected: false,
                    QuotationSelect: [],
                    intQuotationNumber: -1,
                    strQuotationNumber: '',
                    decQuotationRate: '',
                    intQuotationSupplier: -1,
                    strQuotationSupplier: '',
                    boolPOSelected: false,
                    recentPOSelect: [],
                    intPONumber: -1,
                    decPORate: '',
                    intPOSupplier: -1,
                    strPOSupplier: '',
                    boolUSSelected: false,
                    decUSRate: '',
                    intUSSupplier: -1,
                    strUSSupplier: '',
                    USSupplierSelect: [],
                    datExpectedDate: [],
                    USIndentSelect: [],
                    USItemSelect: []
                };
                $scope.objitem.datExpectedDate = new Date($scope.items[i].datExpected);
                //Quotation Section
                for (var j = 0; j < $scope.dispQuotation.length; j++) {
                    if ($scope.dispQuotation[j].lngItemId == $scope.objitem.lngItemId) {
                        $scope.objitem.QuotationSelect.push($scope.dispQuotation[j]);
                    }
                }
                for (var k = 0; k < $scope.objitem.QuotationSelect.length; k++) {
                    $scope.objitem.QuotationSelect[k].QuotSupplier = $scope.objitem.QuotationSelect[k].strQuotationNumber + ' (' + $scope.objitem.QuotationSelect[k].SupplierName + ')'
                }
                if ($scope.objitem.QuotationSelect.length > 0) {
                    $scope.objitem.intQuotationNumber = $scope.objitem.QuotationSelect[0].lngId;
                    $scope.objitem.strQuotationNumber = $scope.objitem.QuotationSelect[0].strQuotationNumber;
                    $scope.objitem.strQuotationSupplier = $scope.objitem.QuotationSelect[0].SupplierName;
                    $scope.objitem.intQuotationSupplier = $scope.objitem.QuotationSelect[0].lngSupplierId;
                    $scope.objitem.decQuotationRate = $scope.objitem.QuotationSelect[0].Rate;
                }

                for (var j = 0; j < $scope.dispSupplier.length; j++) {
                    //if ($scope.dispSupplier[j].lngItemId == $scope.objitem.lngItemId) {
                    //    $scope.objitem.USSupplierSelect.push($scope.dispSupplier[j]);
                    //}
                    $scope.objitem.USSupplierSelect.push($scope.dispSupplier[j]);
                }
                if ($scope.objitem.USSupplierSelect.length > 0) {
                    $scope.objitem.intUSSupplier = $scope.objitem.USSupplierSelect[0].lngId;
                    $scope.objitem.strUSSupplier = $scope.objitem.USSupplierSelect[0].Identifier;
                }
                $scope.objItemStep2.push($scope.objitem);
            }
            $scope.dispObjItemStep2 = [].concat($scope.objItemStep2);
            if ($scope.dispObjItemStep2.length < 1) {
                showInfoPanel(true, "Please choose at least one Supplier.");
                previousClick();
                return false;
            }
        }

        if ($scope.step == 3) {
            setButtonCaption();
            $scope.objItemStep3 = [];
            for (var i = 0; i < $scope.objItemStep2.length; i++) {
                $scope.objSupplier = {
                    lngId: -1,
                    lngDocStatus: 1,
                    lngQuoteId: '',
                    lngContractId: '',
                    lngSupplierId: -1,
                    strPONumber: '',
                    datPODate: new Date(),
                    strNote: '',
                    TaxAmount: 0.00,
                    Freight: 0.00,
                    Discount: 0.00,
                    OtherAmount: 0.00,
                    OtherAmountSpecify: '',
                    TotalAmount: 0.00,
                    lngCreatedBy: -1,
                    datCreatedDate: '',
                    lngApprovedBy: '',
                    datApprovedBy: '',
                    lngPurchaseStatus: 0,
                    blnDeleted: 0,
                    strSupplierName: ''
                    
                };

                if ($scope.objItemStep2[i].boolQuotationSelected == true) {
                    $scope.objSupplier.lngSupplierId = $scope.objItemStep2[i].intQuotationSupplier;
                    $scope.objSupplier.strSupplierName = $scope.objItemStep2[i].strQuotationSupplier;
                } else if ($scope.objItemStep2[i].boolPOSelected == true) {
                    $scope.objSupplier.lngSupplierId = $scope.objItemStep2[i].intPOSupplier;
                    $scope.objSupplier.strSupplierName = $scope.objItemStep2[i].intPOSupplier;
                } else if ($scope.objItemStep2[i].boolUSSelected == true) {
                    $scope.objSupplier.lngSupplierId = $scope.objItemStep2[i].intUSSupplier;
                    $scope.objSupplier.strSupplierName = $scope.objItemStep2[i].strUSSupplier;
                }
                if ($scope.objSupplier.lngSupplierId > 0) {
                    if ($scope.objItemStep3.length > 0) {
                        var isSupplierExistsinStep3 = false;
                        for (var j = 0; j < $scope.objItemStep3.length; j++) {
                            if ($scope.objItemStep3[j].lngSupplierId == $scope.objSupplier.lngSupplierId) {
                                isSupplierExistsinStep3 = true;
                            }
                        }
                        if (isSupplierExistsinStep3 == false) {
                            $scope.objItemStep3.push($scope.objSupplier);
                        }
                    } else {
                        $scope.objItemStep3.push($scope.objSupplier);
                    }
                }

            }

            
            if ($scope.objItemStep3.length < 1) {
                showInfoPanel(true, "Please choose at least one Supplier.");
                $scope.previousClick();
                return false;
            }
            //Create Inner Structure

            for (var i = 0; i < $scope.objItemStep3.length; i++) {
                $scope.objItemStep3[i].tblPurchaseOrderDetails = [];
                for (var j = 0; j < $scope.objItemStep2.length; j++) {
                    $scope.objItem = {
                        lngId: -1,
                        lngPOId: -1,
                        lngItemId: -1,
                        strItemName: '',
                        strIndentNumber: '',
                        OrderQty: '',
                        Rate: '',
                        Tax: 18,
                        TaxAmount: '',
                        Amount: '',
                        lngQuoteId_Ref: '',
                        strQuotation: '',
                        lngContractId_Ref: '',
                        lngPOId_Ref: '',
                        strNote: '',
                        datExpectedDate: $scope.objItemStep2[j].datExpectedDate,
                        lngDeliverySchedule: -1,
                        lngIndentId: -1
                    };

                    var intSupplier = -1;
                    var decRate = '';
                    var lngQuoteId_Ref = -1;
                    var strQuotation_Ref = '';
                    var lngPOId_Ref = -1;
                    if ($scope.objItemStep2[j].boolQuotationSelected == true) {
                        intSupplier = $scope.objItemStep2[j].intQuotationSupplier;
                        decRate = $scope.objItemStep2[j].decQuotationRate;
                        lngQuoteId_Ref = $scope.objItemStep2[j].intQuotationNumber;
                        strQuotation_Ref = $scope.objItemStep2[j].strQuotationNumber;

                    } else if ($scope.objItemStep2[j].boolPOSelected == true) {
                        intSupplier = $scope.objItemStep2[j].intPOSupplier;
                        decRate = $scope.objItemStep2[j].decPORate;
                        lngPOId_Ref = $scope.objItemStep2[j].lngPOId_Ref;

                    } else if ($scope.objItemStep2[j].boolUSSelected == true) {
                        intSupplier = $scope.objItemStep2[j].intUSSupplier;
                        decRate = $scope.objItemStep2[j].decUSRate;
                    }

                    if (intSupplier == $scope.objItemStep3[i].lngSupplierId) {
                        $scope.objItem.lngItemId = $scope.objItemStep2[j].lngItemId;
                        $scope.objItem.strItemName = $scope.objItemStep2[j].strItemName;
                        $scope.objItem.strIndentNumber = $scope.objItemStep2[j].strIndentNumber;
                        $scope.objItem.lngIndentId = $scope.objItemStep2[j].lngIndentId;
                        $scope.objItem.OrderQty = $scope.objItemStep2[j].intQty;
                        $scope.objItem.Rate = decRate;
                        $scope.objItem.lngQuoteId_Ref = lngQuoteId_Ref;
                        $scope.objItem.strQuotation = strQuotation_Ref;
                        $scope.objItem.TaxAmount = ($scope.objItem.Rate * $scope.objItem.OrderQty * $scope.objItem.Tax) / 100;
                        $scope.objItem.Amount = ($scope.objItem.Rate * $scope.objItem.OrderQty) + $scope.objItem.TaxAmount;

                        $scope.objItemStep3[i].TaxAmount = $scope.objItemStep3[i].TaxAmount + $scope.objItem.TaxAmount;

                        $scope.objItemStep3[i].tblPurchaseOrderDetails.push($scope.objItem);
                    }
                }
            }

        }
        if ($scope.step == 4) {
            setButtonCaption();
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            insertData();
            //if ($scope.userForm.$valid) {                    
            //    insertData();
            //}
            //else {
            //    if ($scope.step == 4) {
            //        $scope.step = 3;
            //    } else if ($scope.step == 3) {
            //        $scope.step = 2;
            //    } else if ($scope.step == 2) {
            //        $scope.step = 1;
            //    }
            //    showInfoPanel(true, 'Please fill form carefully!!');
            //}
        }
        if ($scope.step == 5) {
            initialize();
        }
    }

    function insertData() {
        $scope.objPurchaseOrder = {};
        $scope.dispObjPurchaseOrder = [];
        
        $scope.objItemStep3.lngCreatedBy = userModel.currentUserDetails.Id
        masterPurchaseOrderFactory.insertData($scope.objItemStep3)
        .success(function (data) {
            masterPurchaseOrderFactory.getAllPurchaseOrdersFromTransactionId(data)
           .success(function (po) {               
               $scope.objPurchaseOrder = po;
               $scope.dispObjPurchaseOrder = [].concat($scope.objPurchaseOrder);
               var message='Purchase Order created Successfully. Your transaction Id is ' + data;
               showInfoPanel(false, message);
           })
           .error(function (error) {
               bootbox.alert("Error Occored!!! Please try again!!!");
           });

        })
        .error(function (error) {
            showInfoPanel(true, 'Error occured! Please Try Again!!!');
        });      
    };
    $scope.getQuotationInfo = function (objStep2, index) {
        if ($scope.objItemStep2[index].lngItemId == objStep2.lngItemId) {
            for (var j = 0; j < $scope.objItemStep2[index].QuotationSelect.length; j++) {
                if ($scope.objItemStep2[index].QuotationSelect[j].lngId == objStep2.intQuotationNumber) {
                    $scope.objItemStep2[index].strQuotationSupplier = $scope.objItemStep2[index].QuotationSelect[j].SupplierName;
                    $scope.objItemStep2[index].intQuotationSupplier = $scope.objItemStep2[index].QuotationSelect[j].lngSupplierId;
                    $scope.objItemStep2[index].decQuotationRate = $scope.objItemStep2[index].QuotationSelect[j].Rate;
                }
            }
        }

    }

    $scope.getUSIndentInfo = function (objStep2, index) {
        if ($scope.objItemStep2[index].lngItemId == objStep2.lngItemId) {
            for (var j = 0; j < $scope.objItemStep2[index].USIndentSelect.length; j++) {
                if ($scope.objItemStep2[index].USIndentSelect[j].Id == objStep2.lngIndentId) {
                    $scope.objItemStep2[index].strIndentNumber = $scope.objItemStep2[index].USIndentSelect[j].Number;
                }
            }

            for (var i = 0; i < $scope.objItemStep2.length; i++) {
                if ($scope.objItemStep2[i].lngIndentId == objStep2.lngIndentId) {
                    //$scope.objItemStep2[index].USItemSelect = [];
                    $scope.objUSItem = {
                        Id: $scope.objItemStep2[i].lngItemId,
                        Name: $scope.objItemStep2[i].strItemName
                    };

                    $scope.isExists = false;
                    for (var j = 0; j < $scope.objItemStep2[index].USItemSelect.length; j++) {
                        if ($scope.objItemStep2[index].USItemSelect[j].Id == $scope.objUSItem.Id) {
                            $scope.isExists = true;
                        }
                    }
                    if ($scope.isExists == false) {
                        $scope.objItemStep2[index].USItemSelect.push($scope.objUSItem);
                    }
                }
            }
        }
    }
    $scope.getUSSupplierInfo = function (objStep2, index) {
        for (var j = 0; j < $scope.objItemStep2[index].USSupplierSelect.length; j++) {
            if ($scope.objItemStep2[index].USSupplierSelect[j].lngId == objStep2.intUSSupplier) {
                $scope.objItemStep2[index].strUSSupplier = $scope.objItemStep2[index].USSupplierSelect[j].Identifier;
            }
        }

    }

    $scope.getUSItemInfo = function (objStep2, index) {
        for (var j = 0; j < $scope.objItemStep2[index].USItemSelect.length; j++) {
            if ($scope.objItemStep2[index].USItemSelect[j].Id == objStep2.lngItemId) {
                $scope.objItemStep2[index].strItemName = $scope.objItemStep2[index].USItemSelect[j].Name;
            }
        }
    }

    $scope.checkCheckAll = function (strSelection) {
        var checkedcount = 0;
        if (strSelection == 'QUOT') {
            for (var i = 0; i < $scope.objItemStep2.length; i++) {
                if ($scope.objItemStep2[i].boolQuotationSelected == true) {
                    checkedcount = checkedcount + 1;
                    $scope.objItemStep2[i].boolPOSelected = false;
                    $scope.objItemStep2[i].boolUSSelected = false;
                }
            }
            if (checkedcount == $scope.objItemStep2.length) {
                $scope.chkAll.chkQuotAll = true;
            }
            else {
                $scope.chkAll.chkQuotAll = false;
            }
        }
        if (strSelection == 'PO') {
            for (var i = 0; i < $scope.objItemStep2.length; i++) {
                if ($scope.objItemStep2[i].boolPOSelected == true) {
                    checkedcount = checkedcount + 1;
                    $scope.objItemStep2[i].boolQuotationSelected = false;
                    $scope.objItemStep2[i].boolUSSelected = false;
                }
            }
            if (checkedcount == $scope.objItemStep2.length) {
                $scope.chkAll.chkPOAll = true;
            }
            else {
                $scope.chkAll.chkPOAll = false;
            }
        }
        if (strSelection == 'US') {
            for (var i = 0; i < $scope.objItemStep2.length; i++) {
                if ($scope.objItemStep2[i].boolUSSelected == true) {
                    checkedcount = checkedcount + 1;
                    $scope.objItemStep2[i].boolQuotationSelected = false;
                    $scope.objItemStep2[i].boolPOSelected = false;
                }
            }
            if (checkedcount == $scope.objItemStep2.length) {
                $scope.chkAll.chkUSAll = true;
            }
            else {
                $scope.chkAll.chkUSAll = false;
            }
        }

    }
    $scope.checkAll = function (strSelection, chkVal) {
        if (strSelection == 'QUOT') {
            if (chkVal == true) {
                $scope.chkAll.chkQuotAll = chkVal;
                $scope.chkAll.chkPOAll = false;
                $scope.chkAll.chkUSAll = false;
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    if ($scope.objItemStep2[i].QuotationSelect.length > 0) {
                        $scope.objItemStep2[i].boolQuotationSelected = true;
                        $scope.objItemStep2[i].boolPOSelected = false;
                        $scope.objItemStep2[i].boolUSSelected = false;
                    }

                }
            }
            else {
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    $scope.objItemStep2[i].boolQuotationSelected = false;
                }
            }
        }
        if (strSelection == 'PO') {
            if (chkVal == true) {
                $scope.chkAll.chkPOAll = true;
                $scope.chkAll.chkQuotAll = false;
                $scope.chkAll.chkUSAll = false;
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    if ($scope.objItemStep2[i].recentPOSelect.length > 0) {
                        $scope.objItemStep2[i].boolPOSelected = true;
                        $scope.objItemStep2[i].boolQuotationSelected = false;
                        $scope.objItemStep2[i].boolUSSelected = false;
                    }

                }
            }
            else {
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    $scope.objItemStep2[i].boolPOSelected = false;
                }
            }
        }
        if (strSelection == 'US') {
            if (chkVal == true) {
                $scope.chkAll.chkUSAll = true;
                $scope.chkAll.chkQuotAll = false;
                $scope.chkAll.chkPOAll = false;
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    if ($scope.objItemStep2[i].USSupplierSelect.length > 0) {
                        $scope.objItemStep2[i].boolUSSelected = true;
                        $scope.objItemStep2[i].boolQuotationSelected = false;
                        $scope.objItemStep2[i].boolPOSelected = false;
                    }
                }
            }
            else {
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    $scope.objItemStep2[i].boolUSSelected = false;
                }
            }
        }
    }


}]);


app.controller('maintainPurchaseOrderController', ['$rootScope', '$scope', '$modal', 'masterPurchaseOrderFactory', '$location', 'userModel', '$base64', 'indentFactory', 'DragDropHandler', 'masterQuotationFactory', 'masterSupplierFactory', 'masterItemFactory',
function ($rootScope, $scope, $modal, masterPurchaseOrderFactory, $location, userModel, $base64, indentFactory, DragDropHandler, masterQuotationFactory, masterSupplierFactory, masterItemFactory) {
    function initialize() {
        $scope.purchaseorder = {};
        $scope.allpurchaseorder = {};
        $scope.allIndent = [];
        $scope.isError = false;
        $scope.isSuccess = false;
        $scope.SuccessErrorMessage = "";
        userModel.editRow = {};
        userModel.editMode = false;
        $scope.indentDropZone = [];
        $scope.PODropZone = [];
        $scope.items = [];
        $scope.step = 1;
        $scope.addCaption = "Next";
        $scope.showBtnPervious = false;
        $scope.objItemStep2 = [];
        $scope.objItemStep3 = [];
        $scope.chkAll = [];
        $scope.chkAll.chkQuotAll = false;
        $scope.chkAll.chkPOAll = false;
        $scope.chkAll.chkUSAll = false;
        $scope.objPurchaseOrder = {};
        $scope.dispObjPurchaseOrder = [];
        $scope.submitted = true;
        GetAllIndent();
        getQuotationForPurchaseOrder();
        getAllSupplier();
    };
    initialize();
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
    $scope.cancelPOClick = function () {
        if ($scope.step != 1 && $scope.step != 4) {
            bootbox.confirm({
                message: "You are in step " + $scope.step + " , Do you want to leave this screen?",
                buttons: { confirm: { label: "OK", className: "btn-primary btn-sm", }, cancel: { label: "Cancel", className: "btn-sm", } },
                callback: function (result) {
                    if (result) {
                        $location.path('/home').replace();
                    }
                }
            });
        } else {
            $location.path('/home').replace();
        }

    };

    $scope.moveObject = function (from, to, fromList, toList) {
        var item = $scope.items[fromList][from];
        DragDropHandler.addObject(item, $scope.items[toList], to);
        $scope.items[fromList].splice(from, 1);
    }

    $scope.createObject = function (object, to, list) {
        $scope.objitem = {
            datExpected: object.datExpected,
            intQty: object.intQty,
            intReceivedQty: object.intReceivedQty,
            lngId: object.lngId,
            lngIndentId: object.lngIndentId,
            strIndentNumber: object.strIndentNumber,
            lngItemId: object.lngItemId,
            strNote: object.strNote,
            strItemName: object.tblMasterItem.Identifier + ' - ' + object.tblMasterItem.ItemName
        };
        //var newItem = [];
        //newItem.push($scope.objitem)

        var newItem = angular.copy($scope.objitem);
        //newItem.id = Math.ceil(Math.random() * 1000);
        DragDropHandler.addObject(newItem, $scope.items, to);

        for (var i = 0; i < $scope.allIndent.length; i++) {
            for (var j = 0; j < $scope.allIndent[i].tblIndentItems.length; j++) {
                if ($scope.allIndent[i].tblIndentItems[j].lngIndentId == $scope.objitem.lngIndentId && $scope.allIndent[i].tblIndentItems[j].lngId == $scope.objitem.lngId) {
                    $scope.allIndent[i].tblIndentItems[j].isDroppedInItemTray = true;

                }
            }
        }


    };
    $scope.moveAllItemsToItemTray = function (object) {

        for (var i = 0; i < object.length; i++) {
            $scope.objitem = {
                datExpected: object[i].datExpected,
                intQty: object[i].intQty,
                intReceivedQty: object[i].intReceivedQty,
                lngId: object[i].lngId,
                lngIndentId: object[i].lngIndentId,
                strIndentNumber: object[i].strIndentNumber,
                lngItemId: object[i].lngItemId,
                strNote: object[i].strNote,
                strItemName: object[i].tblMasterItem.Identifier + ' - ' + object[i].tblMasterItem.ItemName

            };
            var isItemExists = false;
            if ($scope.items.length > 0) {
                for (var a = 0; a < $scope.items.length; a++) {
                    if ($scope.items[a].lngId == $scope.objitem.lngId) {
                        isItemExists = true;
                    }
                }
            }
            if (!isItemExists) {
                $scope.items.push($scope.objitem);
            }

            for (var m = 0; m < $scope.allIndent.length; m++) {
                for (var j = 0; j < $scope.allIndent[m].tblIndentItems.length; j++) {
                    if ($scope.allIndent[m].tblIndentItems[j].lngIndentId == $scope.objitem.lngIndentId && $scope.allIndent[m].tblIndentItems[j].lngId == $scope.objitem.lngId) {
                        $scope.allIndent[m].tblIndentItems[j].isDroppedInItemTray = true;
                    }
                }
            }
        }



    }


    function GetAllIndent() {
        indentFactory.GetAllIndentForPO()
        .success(function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].tblIndentItems.length > 0) {
                        $scope.allIndent.push(data[i]);
                    }
                }
                //$scope.allIndent = data;
                for (var i = 0; i < $scope.allIndent.length - 1; i++) {
                    $scope.allIndent[i].datIndentDate = new Date($scope.allIndent[i].datIndentDate);
                }
                $scope.dispIndent = [].concat($scope.allIndent);

                if ($scope.allIndent.length > 0) {
                    for (var i = 0; i < $scope.allIndent.length - 1; i++) {
                        for (var j = 0; j < $scope.allIndent[i].tblIndentItems.length; j++) {
                            $scope.allIndent[i].tblIndentItems[j].isDroppedInItemTray = false;
                            if ($scope.allIndent[i].tblIndentItems[j].intPOQty == null) {
                                $scope.allIndent[i].tblIndentItems[j].intPOQty = 0.00;
                            }
                            if ($scope.allIndent[i].tblIndentItems[j].intprovisionalPOQuantity == null) {
                                $scope.allIndent[i].tblIndentItems[j].intprovisionalPOQuantity = 0.00;
                            }
                        }
                    }
                }
            }
        })
        .error(function (error) {
            bootbox.alert('Error Occured!! Please try again.');
        });
    }

    $scope.deleteItem = function (itemId, lngIndentId, item) {

        for (var i = 0; i < $scope.items.length; i++) {
            if ($scope.items[i].lngId == itemId) {
                $scope.items.splice(i, 1);
            }
        }

        if ($scope.allIndent.length > 0) {
            for (var i = 0; i < $scope.allIndent.length; i++) {
                if ($scope.allIndent[i].lngId == lngIndentId) {
                    for (var j = 0; j < $scope.allIndent[i].tblIndentItems.length; j++) {
                        if ($scope.allIndent[i].tblIndentItems[j].lngId == itemId) {
                            $scope.allIndent[i].tblIndentItems[j].isDroppedInItemTray = false;
                        }
                    }
                }
            }
        }

    };


    function getQuotationForPurchaseOrder() {
        masterQuotationFactory.getQuotationForPurchaseOrder()
        .success(function (data) {
            $scope.allQuotation = data;
            $scope.dispQuotation = [].concat($scope.allQuotation);
        })
        .error(function (error) {
            bootbox.alert('Error Occured to retrive Quotation!! Please try again.');
        });
    };

    function getAllSupplier() {                   //get data from session
        masterSupplierFactory.getAllSupplier()
        .success(function (data) {
            $scope.allSupplier = data;
            $scope.dispSupplier = [].concat($scope.allSupplier);
            $scope.objSelect = { lngId: '', VendorDescription: '--Select--' };

        })
        .error(function (error) {
            swal(messageModel.messages[0].Message);
        });
    };

    $scope.previousClick = function () {
        $scope.step = $scope.step - 1;
        setButtonCaption();
    }

    $scope.addNewItemRow = function () {
        $scope.objitem = {
            datExpected: '',
            intQty: '',
            intReceivedQty: '',
            lngId: -1,
            lngIndentId: -1,
            strIndentNumber: '',
            lngItemId: -1,
            strNote: '',
            strItemName: '',
            boolQuotationSelected: false,
            QuotationSelect: [],
            intQuotationNumber: -1,
            decQuotationRate: '',
            intQuotationSupplier: -1,
            strQuotationSupplier: '',
            boolPOSelected: false,
            intPONumber: -1,
            decPORate: '',
            intPOSupplier: -1,
            boolUSSelected: true,
            decUSRate: '',
            intUSSupplier: -1,
            USSupplierSelect: [],
            USIndentSelect: [],
            USItemSelect: []
        };
        for (var j = 0; j < $scope.dispSupplier.length; j++) {
            $scope.objitem.USSupplierSelect.push($scope.dispSupplier[j]);
        }

        for (var i = 0; i < $scope.objItemStep2.length; i++) {
            $scope.objUSIndent = {
                Id: $scope.objItemStep2[i].lngIndentId,
                Number: $scope.objItemStep2[i].strIndentNumber
            };
            $scope.isExists = false;
            for (var j = 0; j < $scope.objitem.USIndentSelect.length; j++) {
                if ($scope.objitem.USIndentSelect[j].Id == $scope.objUSIndent.Id) {
                    $scope.isExists = true;
                }
            }
            if ($scope.isExists == false) {
                $scope.objitem.USIndentSelect.push($scope.objUSIndent);
            }
        }
        $scope.objItemStep2.push($scope.objitem);
    };

    $scope.removeRow = function (index, objrow) {
        if (objrow.lngId < 0) {
            $scope.objItemStep2.splice(index, 1);
        }

    };

    function setButtonCaption() {
        if ($scope.step == 1) {
            $scope.addCaption = "Next";
            $scope.showBtnPervious = false;
        } else if ($scope.step == 2) {
            $scope.addCaption = "Next";
            $scope.showBtnPervious = true;
        } else if ($scope.step == 3) {
            $scope.addCaption = "Finish";
            $scope.showBtnPervious = true;
        }
        else if ($scope.step == 4) {
            $scope.addCaption = "Exit";
            $scope.showBtnPervious = false;
        } else if ($scope.step == 5) {
            $scope.addCaption = "Exit";
            $scope.showBtnPervious = false;
        }
    }

    $scope.addPurchaseOrderClick = function (form) {
        $scope.objPurchaseOrder = {};
        $scope.dispObjPurchaseOrder = [];
        if ($scope.step == 1 && $scope.items.length < 1) {
            showInfoPanel(true, "Item Tray is blank. Please put at least one item in Item Tray.");
            return false;
        } else if ($scope.step == 2 && $scope.objItemStep2.length < 1) {
            showInfoPanel(true, "Supplier Tray is blank. Please select at least one supplier.");
            return false;
        } else {
            resetInfoPanel();
        }
        if (!$scope.userForm.$valid) {
            showInfoPanel(true, "Please fill form carefully");
            return false;
        }
        if ($scope.step == 1) {
            $scope.step = 2;
        } else if ($scope.step == 2) {
            $scope.step = 3;
        } else if ($scope.step == 3) {
            $scope.step = 4;
        } else if ($scope.step == 4) {
            $scope.step = 5;
        }

        if ($scope.step == 2) {
            setButtonCaption();
            $scope.objItemStep2 = [];
            $scope.objItemStep3 = [];
            for (var i = 0; i < $scope.items.length; i++) {
                $scope.objitem = {
                    datExpected: $scope.items[i].datExpected,
                    intQty: $scope.items[i].intQty,
                    intReceivedQty: $scope.items[i].intReceivedQty,
                    lngId: $scope.items[i].lngId,
                    lngIndentId: $scope.items[i].lngIndentId,
                    strIndentNumber: $scope.items[i].strIndentNumber,
                    lngItemId: $scope.items[i].lngItemId,
                    strNote: $scope.items[i].strNote,
                    strItemName: $scope.items[i].strItemName,
                    boolQuotationSelected: false,
                    QuotationSelect: [],
                    intQuotationNumber: -1,
                    strQuotationNumber: '',
                    decQuotationRate: '',
                    intQuotationSupplier: -1,
                    strQuotationSupplier: '',
                    boolPOSelected: false,
                    recentPOSelect: [],
                    intPONumber: -1,
                    decPORate: '',
                    intPOSupplier: -1,
                    strPOSupplier: '',
                    boolUSSelected: false,
                    decUSRate: '',
                    intUSSupplier: -1,
                    strUSSupplier: '',
                    USSupplierSelect: [],
                    datExpectedDate: [],
                    USIndentSelect: [],
                    USItemSelect: []
                };
                $scope.objitem.datExpectedDate = new Date($scope.items[i].datExpected);
                //Quotation Section
                for (var j = 0; j < $scope.dispQuotation.length; j++) {
                    if ($scope.dispQuotation[j].lngItemId == $scope.objitem.lngItemId) {
                        $scope.objitem.QuotationSelect.push($scope.dispQuotation[j]);
                    }
                }
                for (var k = 0; k < $scope.objitem.QuotationSelect.length; k++) {
                    $scope.objitem.QuotationSelect[k].QuotSupplier = $scope.objitem.QuotationSelect[k].strQuotationNumber + ' (' + $scope.objitem.QuotationSelect[k].SupplierName + ')'
                }
                if ($scope.objitem.QuotationSelect.length > 0) {
                    $scope.objitem.intQuotationNumber = $scope.objitem.QuotationSelect[0].lngId;
                    $scope.objitem.strQuotationNumber = $scope.objitem.QuotationSelect[0].strQuotationNumber;
                    $scope.objitem.strQuotationSupplier = $scope.objitem.QuotationSelect[0].SupplierName;
                    $scope.objitem.intQuotationSupplier = $scope.objitem.QuotationSelect[0].lngSupplierId;
                    $scope.objitem.decQuotationRate = $scope.objitem.QuotationSelect[0].Rate;
                }

                for (var j = 0; j < $scope.dispSupplier.length; j++) {
                    //if ($scope.dispSupplier[j].lngItemId == $scope.objitem.lngItemId) {
                    //    $scope.objitem.USSupplierSelect.push($scope.dispSupplier[j]);
                    //}
                    $scope.objitem.USSupplierSelect.push($scope.dispSupplier[j]);
                }
                if ($scope.objitem.USSupplierSelect.length > 0) {
                    $scope.objitem.intUSSupplier = $scope.objitem.USSupplierSelect[0].lngId;
                    $scope.objitem.strUSSupplier = $scope.objitem.USSupplierSelect[0].Identifier;
                }
                $scope.objItemStep2.push($scope.objitem);
            }
            $scope.dispObjItemStep2 = [].concat($scope.objItemStep2);
            if ($scope.dispObjItemStep2.length < 1) {
                showInfoPanel(true, "Please choose at least one Supplier.");
                previousClick();
                return false;
            }
        }

        if ($scope.step == 3) {
            setButtonCaption();
            $scope.objItemStep3 = [];
            for (var i = 0; i < $scope.objItemStep2.length; i++) {
                $scope.objSupplier = {
                    lngId: -1,
                    lngDocStatus: 1,
                    lngQuoteId: '',
                    lngContractId: '',
                    lngSupplierId: -1,
                    strPONumber: '',
                    datPODate: new Date(),
                    strNote: '',
                    TaxAmount: 0.00,
                    Freight: 0.00,
                    Discount: 0.00,
                    OtherAmount: 0.00,
                    OtherAmountSpecify: '',
                    TotalAmount: 0.00,
                    lngCreatedBy: -1,
                    datCreatedDate: '',
                    lngApprovedBy: '',
                    datApprovedBy: '',
                    lngPurchaseStatus: 0,
                    blnDeleted: 0,
                    strSupplierName: ''

                };

                if ($scope.objItemStep2[i].boolQuotationSelected == true) {
                    $scope.objSupplier.lngSupplierId = $scope.objItemStep2[i].intQuotationSupplier;
                    $scope.objSupplier.strSupplierName = $scope.objItemStep2[i].strQuotationSupplier;
                } else if ($scope.objItemStep2[i].boolPOSelected == true) {
                    $scope.objSupplier.lngSupplierId = $scope.objItemStep2[i].intPOSupplier;
                    $scope.objSupplier.strSupplierName = $scope.objItemStep2[i].intPOSupplier;
                } else if ($scope.objItemStep2[i].boolUSSelected == true) {
                    $scope.objSupplier.lngSupplierId = $scope.objItemStep2[i].intUSSupplier;
                    $scope.objSupplier.strSupplierName = $scope.objItemStep2[i].strUSSupplier;
                }
                if ($scope.objSupplier.lngSupplierId > 0) {
                    if ($scope.objItemStep3.length > 0) {
                        var isSupplierExistsinStep3 = false;
                        for (var j = 0; j < $scope.objItemStep3.length; j++) {
                            if ($scope.objItemStep3[j].lngSupplierId == $scope.objSupplier.lngSupplierId) {
                                isSupplierExistsinStep3 = true;
                            }
                        }
                        if (isSupplierExistsinStep3 == false) {
                            $scope.objItemStep3.push($scope.objSupplier);
                        }
                    } else {
                        $scope.objItemStep3.push($scope.objSupplier);
                    }
                }

            }


            if ($scope.objItemStep3.length < 1) {
                showInfoPanel(true, "Please choose at least one Supplier.");
                $scope.previousClick();
                return false;
            }
            //Create Inner Structure

            for (var i = 0; i < $scope.objItemStep3.length; i++) {
                $scope.objItemStep3[i].tblPurchaseOrderDetails = [];
                for (var j = 0; j < $scope.objItemStep2.length; j++) {
                    $scope.objItem = {
                        lngId: -1,
                        lngPOId: -1,
                        lngItemId: -1,
                        strItemName: '',
                        strIndentNumber: '',
                        OrderQty: '',
                        Rate: '',
                        Tax: 18,
                        TaxAmount: '',
                        Amount: '',
                        lngQuoteId_Ref: '',
                        strQuotation: '',
                        lngContractId_Ref: '',
                        lngPOId_Ref: '',
                        strNote: '',
                        datExpectedDate: $scope.objItemStep2[j].datExpectedDate,
                        lngDeliverySchedule: -1,
                        lngIndentId: -1
                    };

                    var intSupplier = -1;
                    var decRate = '';
                    var lngQuoteId_Ref = -1;
                    var strQuotation_Ref = '';
                    var lngPOId_Ref = -1;
                    if ($scope.objItemStep2[j].boolQuotationSelected == true) {
                        intSupplier = $scope.objItemStep2[j].intQuotationSupplier;
                        decRate = $scope.objItemStep2[j].decQuotationRate;
                        lngQuoteId_Ref = $scope.objItemStep2[j].intQuotationNumber;
                        strQuotation_Ref = $scope.objItemStep2[j].strQuotationNumber;

                    } else if ($scope.objItemStep2[j].boolPOSelected == true) {
                        intSupplier = $scope.objItemStep2[j].intPOSupplier;
                        decRate = $scope.objItemStep2[j].decPORate;
                        lngPOId_Ref = $scope.objItemStep2[j].lngPOId_Ref;

                    } else if ($scope.objItemStep2[j].boolUSSelected == true) {
                        intSupplier = $scope.objItemStep2[j].intUSSupplier;
                        decRate = $scope.objItemStep2[j].decUSRate;
                    }

                    if (intSupplier == $scope.objItemStep3[i].lngSupplierId) {
                        $scope.objItem.lngItemId = $scope.objItemStep2[j].lngItemId;
                        $scope.objItem.strItemName = $scope.objItemStep2[j].strItemName;
                        $scope.objItem.strIndentNumber = $scope.objItemStep2[j].strIndentNumber;
                        $scope.objItem.lngIndentId = $scope.objItemStep2[j].lngIndentId;
                        $scope.objItem.OrderQty = $scope.objItemStep2[j].intQty;
                        $scope.objItem.Rate = decRate;
                        $scope.objItem.lngQuoteId_Ref = lngQuoteId_Ref;
                        $scope.objItem.strQuotation = strQuotation_Ref;
                        $scope.objItem.TaxAmount = ($scope.objItem.Rate * $scope.objItem.OrderQty * $scope.objItem.Tax) / 100;
                        $scope.objItem.Amount = ($scope.objItem.Rate * $scope.objItem.OrderQty) + $scope.objItem.TaxAmount;

                        $scope.objItemStep3[i].TaxAmount = $scope.objItemStep3[i].TaxAmount + $scope.objItem.TaxAmount;

                        $scope.objItemStep3[i].tblPurchaseOrderDetails.push($scope.objItem);
                    }
                }
            }

        }
        if ($scope.step == 4) {
            setButtonCaption();
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            insertData();
            //if ($scope.userForm.$valid) {                    
            //    insertData();
            //}
            //else {
            //    if ($scope.step == 4) {
            //        $scope.step = 3;
            //    } else if ($scope.step == 3) {
            //        $scope.step = 2;
            //    } else if ($scope.step == 2) {
            //        $scope.step = 1;
            //    }
            //    showInfoPanel(true, 'Please fill form carefully!!');
            //}
        }
        if ($scope.step == 5) {
            initialize();
        }
    }

    function insertData() {
        $scope.objPurchaseOrder = {};
        $scope.dispObjPurchaseOrder = [];

        $scope.objItemStep3.lngCreatedBy = userModel.currentUserDetails.Id
        masterPurchaseOrderFactory.insertData($scope.objItemStep3)
        .success(function (data) {
            masterPurchaseOrderFactory.getAllPurchaseOrdersFromTransactionId(data)
           .success(function (po) {
               $scope.objPurchaseOrder = po;
               $scope.dispObjPurchaseOrder = [].concat($scope.objPurchaseOrder);
               var message = 'Purchase Order created Successfully. Your transaction Id is ' + data;
               showInfoPanel(false, message);
           })
           .error(function (error) {
               bootbox.alert("Error Occored!!! Please try again!!!");
           });

        })
        .error(function (error) {
            showInfoPanel(true, 'Error occured! Please Try Again!!!');
        });
    };
    $scope.getQuotationInfo = function (objStep2, index) {
        if ($scope.objItemStep2[index].lngItemId == objStep2.lngItemId) {
            for (var j = 0; j < $scope.objItemStep2[index].QuotationSelect.length; j++) {
                if ($scope.objItemStep2[index].QuotationSelect[j].lngId == objStep2.intQuotationNumber) {
                    $scope.objItemStep2[index].strQuotationSupplier = $scope.objItemStep2[index].QuotationSelect[j].SupplierName;
                    $scope.objItemStep2[index].intQuotationSupplier = $scope.objItemStep2[index].QuotationSelect[j].lngSupplierId;
                    $scope.objItemStep2[index].decQuotationRate = $scope.objItemStep2[index].QuotationSelect[j].Rate;
                }
            }
        }

    }

    $scope.getUSIndentInfo = function (objStep2, index) {
        if ($scope.objItemStep2[index].lngItemId == objStep2.lngItemId) {
            for (var j = 0; j < $scope.objItemStep2[index].USIndentSelect.length; j++) {
                if ($scope.objItemStep2[index].USIndentSelect[j].Id == objStep2.lngIndentId) {
                    $scope.objItemStep2[index].strIndentNumber = $scope.objItemStep2[index].USIndentSelect[j].Number;
                }
            }

            for (var i = 0; i < $scope.objItemStep2.length; i++) {
                if ($scope.objItemStep2[i].lngIndentId == objStep2.lngIndentId) {
                    //$scope.objItemStep2[index].USItemSelect = [];
                    $scope.objUSItem = {
                        Id: $scope.objItemStep2[i].lngItemId,
                        Name: $scope.objItemStep2[i].strItemName
                    };

                    $scope.isExists = false;
                    for (var j = 0; j < $scope.objItemStep2[index].USItemSelect.length; j++) {
                        if ($scope.objItemStep2[index].USItemSelect[j].Id == $scope.objUSItem.Id) {
                            $scope.isExists = true;
                        }
                    }
                    if ($scope.isExists == false) {
                        $scope.objItemStep2[index].USItemSelect.push($scope.objUSItem);
                    }
                }
            }
        }
    }
    $scope.getUSSupplierInfo = function (objStep2, index) {
        for (var j = 0; j < $scope.objItemStep2[index].USSupplierSelect.length; j++) {
            if ($scope.objItemStep2[index].USSupplierSelect[j].lngId == objStep2.intUSSupplier) {
                $scope.objItemStep2[index].strUSSupplier = $scope.objItemStep2[index].USSupplierSelect[j].Identifier;
            }
        }

    }

    $scope.getUSItemInfo = function (objStep2, index) {
        for (var j = 0; j < $scope.objItemStep2[index].USItemSelect.length; j++) {
            if ($scope.objItemStep2[index].USItemSelect[j].Id == objStep2.lngItemId) {
                $scope.objItemStep2[index].strItemName = $scope.objItemStep2[index].USItemSelect[j].Name;
            }
        }
    }

    $scope.checkCheckAll = function (strSelection) {
        var checkedcount = 0;
        if (strSelection == 'QUOT') {
            for (var i = 0; i < $scope.objItemStep2.length; i++) {
                if ($scope.objItemStep2[i].boolQuotationSelected == true) {
                    checkedcount = checkedcount + 1;
                    $scope.objItemStep2[i].boolPOSelected = false;
                    $scope.objItemStep2[i].boolUSSelected = false;
                }
            }
            if (checkedcount == $scope.objItemStep2.length) {
                $scope.chkAll.chkQuotAll = true;
            }
            else {
                $scope.chkAll.chkQuotAll = false;
            }
        }
        if (strSelection == 'PO') {
            for (var i = 0; i < $scope.objItemStep2.length; i++) {
                if ($scope.objItemStep2[i].boolPOSelected == true) {
                    checkedcount = checkedcount + 1;
                    $scope.objItemStep2[i].boolQuotationSelected = false;
                    $scope.objItemStep2[i].boolUSSelected = false;
                }
            }
            if (checkedcount == $scope.objItemStep2.length) {
                $scope.chkAll.chkPOAll = true;
            }
            else {
                $scope.chkAll.chkPOAll = false;
            }
        }
        if (strSelection == 'US') {
            for (var i = 0; i < $scope.objItemStep2.length; i++) {
                if ($scope.objItemStep2[i].boolUSSelected == true) {
                    checkedcount = checkedcount + 1;
                    $scope.objItemStep2[i].boolQuotationSelected = false;
                    $scope.objItemStep2[i].boolPOSelected = false;
                }
            }
            if (checkedcount == $scope.objItemStep2.length) {
                $scope.chkAll.chkUSAll = true;
            }
            else {
                $scope.chkAll.chkUSAll = false;
            }
        }

    }
    $scope.checkAll = function (strSelection, chkVal) {
        if (strSelection == 'QUOT') {
            if (chkVal == true) {
                $scope.chkAll.chkQuotAll = chkVal;
                $scope.chkAll.chkPOAll = false;
                $scope.chkAll.chkUSAll = false;
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    if ($scope.objItemStep2[i].QuotationSelect.length > 0) {
                        $scope.objItemStep2[i].boolQuotationSelected = true;
                        $scope.objItemStep2[i].boolPOSelected = false;
                        $scope.objItemStep2[i].boolUSSelected = false;
                    }

                }
            }
            else {
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    $scope.objItemStep2[i].boolQuotationSelected = false;
                }
            }
        }
        if (strSelection == 'PO') {
            if (chkVal == true) {
                $scope.chkAll.chkPOAll = true;
                $scope.chkAll.chkQuotAll = false;
                $scope.chkAll.chkUSAll = false;
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    if ($scope.objItemStep2[i].recentPOSelect.length > 0) {
                        $scope.objItemStep2[i].boolPOSelected = true;
                        $scope.objItemStep2[i].boolQuotationSelected = false;
                        $scope.objItemStep2[i].boolUSSelected = false;
                    }

                }
            }
            else {
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    $scope.objItemStep2[i].boolPOSelected = false;
                }
            }
        }
        if (strSelection == 'US') {
            if (chkVal == true) {
                $scope.chkAll.chkUSAll = true;
                $scope.chkAll.chkQuotAll = false;
                $scope.chkAll.chkPOAll = false;
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    if ($scope.objItemStep2[i].USSupplierSelect.length > 0) {
                        $scope.objItemStep2[i].boolUSSelected = true;
                        $scope.objItemStep2[i].boolQuotationSelected = false;
                        $scope.objItemStep2[i].boolPOSelected = false;
                    }
                }
            }
            else {
                for (var i = 0; i < $scope.objItemStep2.length; i++) {
                    $scope.objItemStep2[i].boolUSSelected = false;
                }
            }
        }
    }


}]);



