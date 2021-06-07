//------------------------------masterquotationController---------------------------------------
app.controller('quotationController', ['$rootScope', '$scope', '$modal', 'masterQuotationFactory', '$location', 'userModel', 'tempModel', 'messageModel', '$base64',
    function ($rootScope, $scope, $modal, masterQuotationFactory, $location, userModel, tempModel, messageModel, $base64) {
        function initialize() {
            $scope.quotation = {};
            $scope.allquotation = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            userModel.editRow = {};
            userModel.editMode = false;

        };

        initialize();
        //var flag = 0;

        getAllQuotation();
        function getAllQuotation() {                   //get data from session
            masterQuotationFactory.getAllQuotation()
            .success(function (data) {
                momentDate = moment(data.datCreateDate, "DD-MM-YYYY HH:mm");
                $scope.allQuotation = data;
                $scope.dispQuotation = [].concat($scope.allQuotation);
            })
            .error(function (error) {
                swal(messageModel.messages[0].Message);
            });
        };

        $scope.AddQuotationClick = function () {
            resetInfoPanel();
            userModel.editRow = {};
            userModel.editMode = false;
            $scope.quotation = {};
            $location.path('/quotationAddEdit').replace();
        };
        $scope.CancelQuotationClick = function () {
            $location.path('/home').replace();
        };
        $scope.editQuotationClick = function (Quotation) {
            resetInfoPanel();
            userModel.editMode = true;
            userModel.editRow = Quotation;
            $location.path('/quotationAddEdit').replace();
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
    }
]);

app.controller('maintainQuotationController', ['$rootScope', '$scope', '$modal', 'masterQuotationFactory', '$location', 'userModel', '$base64', 'messageModel', 'masterItemFactory', 'masterUnitOfMeasureFactory', 'masterSupplierFactory', 'masterFactory',
    function ($rootScope, $scope, $modal, masterQuotationFactory, $location, userModel, $base64, messageModel, masterItemFactory, masterUnitOfMeasureFactory, masterSupplierFactory, masterFactory) {
        function initialize() {
            $scope.quotation = {};
            $scope.allQuotation = {};
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.isEditMode = false;
            $scope.quotation.intDiagramId = -1;
            $scope.gridItems = [];
            $scope.addIconToolTip = "Please select WO Item first";
            $scope.gridTotal = 0;
            $scope.IsTaxOnItem = false;
            $scope.IsDiscountOnItem = false;

        };
        initialize();

        if (userModel.editMode == true) {
            $scope.isEditMode = userModel.editMode;
            $scope.quotation = userModel.editRow;

            for (var i = 0; i < $scope.quotation.tblQuotationDetails.length; i++) {
                $scope.obj = {

                    lngId: $scope.quotation.tblQuotationDetails[i].lngId,
                    lngQuotationId: $scope.quotation.lngId,
                    lngItemId: $scope.quotation.tblQuotationDetails[i].lngItemId,
                    Rate: $scope.quotation.tblQuotationDetails[i].Rate,
                    Qty: $scope.quotation.tblQuotationDetails[i].Qty,
                    TaxPercent: $scope.quotation.tblQuotationDetails[i].TaxPercent,
                    TaxAmount: $scope.quotation.tblQuotationDetails[i].TaxAmount,
                    DiscountPercent: $scope.quotation.tblQuotationDetails[i].DiscountPercent,
                    Discount: $scope.quotation.tblQuotationDetails[i].Discount,
                    Total: $scope.quotation.tblQuotationDetails[i].Total,
                    strNote: $scope.quotation.strNote,
                    partNo: $scope.quotation.tblQuotationDetails[i].PartNumber,
                    uom: $scope.quotation.tblQuotationDetails[i].UOMCode
                };
                $scope.gridItems.push($scope.obj);
            }
            calculateGridTotal();
        } else {
            getServerDateTime();
        }

        getAllItem();

        getAllSupplier();

        //getAllWOPhase();
        //function getAllWOPhase() {                   //get data from session
        //    masterLookUpFactory.getAllLookUps(1)//1=WOPhase
        //    .success(function (data) {
        //        $scope.allWOPhase = data;
        //        $scope.dispWOPhase = [].concat($scope.allWOPhase);
        //    })
        //    .error(function (error) {
        //        swal(messageModel.messages[0].Message);
        //    });
        //};




        //getAllDepartment();
        //function getAllDepartment() {                   //get data from session
        //    masterDepartmentFactory.getAllDepartment()
        //    .success(function (data) {
        //        $scope.allDepartment = data;
        //        $scope.dispDepartment = [].concat($scope.allDepartment);
        //    })
        //    .error(function (error) {
        //        swal(messageModel.messages[0].Message);
        //    });
        //};

        function getServerDateTime() {               // Use for Get DataBase Server DateTime...
            masterFactory.getserverdatetime()
            .success(function (data) {
                if (!$scope.editMode) {
                    momentDate = moment(data, "DD-MM-YYYY HH:mm");
                    $scope.quotation.datQuotationDate = momentDate;
                    $scope.quotation.datCreateDate = momentDate;
                    $scope.quotation.lngCreatedBy = userModel.currentUserDetails.Id;
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
                $scope.objSelect = { Id: '', CodeDesc: '--Select--' };
                $scope.dispItem.splice(0, 0, $scope.objSelect);

            })
            .error(function (error) {
                swal(messageModel.messages[0].Message);
            });
        };


        function getAllSupplier() {                   //get data from session
            masterSupplierFactory.getAllSupplier()
            .success(function (data) {
                $scope.allSupplier = data;
                $scope.dispSupplier = [].concat($scope.allSupplier);
                $scope.objSelect = { lngId: '', VendorDescription: '--Select--' };
                $scope.dispSupplier.splice(0, 0, $scope.objSelect);

            })
            .error(function (error) {
                swal(messageModel.messages[0].Message);
            });
        };

        $scope.addNewItemRow = function () {
            $scope.obj3 = {
                lngId: 0,
                lngQuotationId: 0,
                lngItemId: 0,
                Rate: 0,
                Qty: 0,
                TaxPercent: 0,
                TaxAmount: 0,
                DiscountPercent: 0,
                Discount: 0,
                Total: 0,
                strNote: '',
                partNo: '',
                uom: ''

            };
            if ($scope.quotation.lngId > 0) {
                $scope.obj3.lngQuotationId = $scope.quotation.lngId
            }
            $scope.gridItems.push($scope.obj3);
            $scope.addCount++;
        };

        $scope.getItemDetails = function (objItem, index) {
            var isDuplicate = 0;
            for (var i = 0; i < $scope.gridItems.length; i++) {
                if ($scope.gridItems[i].lngItemId == objItem.lngItemId) {
                    isDuplicate = isDuplicate + 1;
                }
            }
            if (isDuplicate > 1) {
                $scope.gridItems[index].lngId = 0,
                $scope.gridItems[index].lngItemId = 0,
                $scope.gridItems[index].Rate = 0,
                $scope.gridItems[index].Qty = 0,
                $scope.gridItems[index].TaxPercent = 0,
                $scope.gridItems[index].TaxAmount = 0,
                $scope.gridItems[index].DiscountPercent = 0,
                $scope.gridItems[index].Discount = 0,
                $scope.gridItems[index].Total = 0,
                $scope.gridItems[index].strNote = '',
                $scope.gridItems[index].partNo = '',
                $scope.gridItems[index].uom = ''
                return;
            }


            for (var i = 0; i < $scope.dispItem.length; i++) {

                if ($scope.dispItem[i].Id == objItem.lngItemId) {
                    $scope.gridItems[index].partNo = $scope.dispItem[i].PartNumber;
                    $scope.gridItems[index].uom = $scope.dispItem[i].UOMCode;
                    return
                }
                else {
                    $scope.gridItems[index].lngId = 0,
                    $scope.gridItems[index].Rate = 0,
                    $scope.gridItems[index].Qty = 0,
                    $scope.gridItems[index].TaxPercent = 0,
                    $scope.gridItems[index].TaxAmount = 0,
                    $scope.gridItems[index].DiscountPercent = 0,
                    $scope.gridItems[index].Discount = 0,
                    $scope.gridItems[index].Total = 0,
                    $scope.gridItems[index].strNote = '',
                    $scope.gridItems[index].partNo = '',
                    $scope.gridItems[index].uom = ''

                }

            }

        }

        $scope.calculateItemTotal = function (objItem, index, field) {

            if (objItem.lngItemId > 0) {
                if (isNaN(objItem.Qty)) {
                    objItem.Qty = 0;
                }

                if (isNaN(objItem.Rate)) {
                    objItem.Rate = 0;
                }
                if (isNaN(objItem.TaxPercent)) {
                    objItem.TaxPercent = 0;
                }
                if (isNaN(objItem.TaxAmount)) {
                    objItem.TaxAmount = 0;
                }
                if (isNaN(objItem.DiscountPercent)) {
                    objItem.DiscountPercent = 0;
                }
                if (isNaN(objItem.Discount)) {
                    objItem.Discount = 0;
                }
                if (isNaN(objItem.Total)) {
                    objItem.Total = 0;
                }

                var taxAmt = 0;
                var taxPer = 0;
                var discAmt = 0;
                var discPer = 0;
                if (field != 'TaxAmount') {
                    taxAmt = (parseFloat(objItem.Qty) * parseFloat(objItem.Rate)) * (parseFloat(objItem.TaxPercent) / 100);
                    $scope.gridItems[index].TaxAmount = parseFloat(taxAmt);
                }

                if (field != 'TaxPercent') {
                    taxPer = (parseFloat(objItem.TaxAmount) / (parseFloat(objItem.Qty) * parseFloat(objItem.Rate))) * 100;
                    $scope.gridItems[index].TaxPercent = parseFloat(taxPer);
                }

                if (field != 'Discount') {
                    discAmt = (parseFloat(objItem.Qty) * parseFloat(objItem.Rate)) * (parseFloat(objItem.DiscountPercent) / 100);
                    $scope.gridItems[index].Discount = parseFloat(discAmt);
                }

                if (field != 'DiscountPercent') {
                    discPer = (parseFloat(objItem.Discount) / (parseFloat(objItem.Qty) * parseFloat(objItem.Rate))) * 100;
                    $scope.gridItems[index].DiscountPercent = parseFloat(discPer);
                }


                var itemTotal = ((parseFloat(objItem.Qty) * parseFloat(objItem.Rate)) - parseFloat(objItem.Discount)) + parseFloat(objItem.TaxAmount);
                $scope.gridItems[index].Total = parseFloat(itemTotal);

            }
            else {
                //ToDO
            }

            calculateGridTotal();

        }

        $scope.calculateNetTotal = function (field) {
            var discAmt = 0;
            var discPer = 0;
            var taxAmt = 0;
            var taxPer = 0;

            if (field != 'TaxAmount') {
                taxAmt = ($scope.gridTotal) * (parseFloat($scope.quotation.TaxPercent) / 100);
                $scope.quotation.TaxAmount = parseFloat(taxAmt);
            }

            if (field != 'TaxPercent') {
                taxPer = (parseFloat($scope.quotation.TaxAmount) / parseFloat($scope.gridTotal)) * 100;
                $scope.quotation.TaxPercent = parseFloat(taxPer);
            }

            if (field != 'Discount') {
                discAmt = ($scope.gridTotal) * (parseFloat($scope.quotation.DiscountPercent) / 100);
                $scope.quotation.DiscountAmount = parseFloat(discAmt);
            }
            if (field != 'DiscountPercent') {
                discPer = (parseFloat($scope.quotation.DiscountAmount) / parseFloat($scope.gridTotal)) * 100;
                $scope.quotation.DiscountPercent = parseFloat(discPer);
            }

            var itemTotal = (parseFloat($scope.gridTotal) - parseFloat($scope.quotation.DiscountAmount)) + parseFloat($scope.quotation.TaxAmount);
            $scope.quotation.TotalAmount = parseFloat(itemTotal);
        }

        function calculateGridTotal() {
            var total = 0;
            for (var i = 0; i < $scope.gridItems.length; i++) {
                if ($scope.gridItems[i].Total != '') {
                    total = parseFloat(total) + parseFloat($scope.gridItems[i].Total);
                }
            }
            $scope.gridTotal = parseFloat(total);
            calculateNetTotal1('');
        }

        function calculateNetTotal1(field) {
            var discAmt = 0;
            var discPer = 0;
            var taxAmt = 0;
            var taxPer = 0;

            if (field != 'TaxAmount') {
                taxAmt = ($scope.gridTotal) * (parseFloat($scope.quotation.TaxPercent) / 100);
                $scope.quotation.TaxAmount = parseFloat(taxAmt);
            }

            if (field != 'TaxPercent') {
                taxPer = (parseFloat($scope.quotation.TaxAmount) / parseFloat($scope.gridTotal)) * 100;
                $scope.quotation.TaxPercent = parseFloat(taxPer);
            }

            if (field != 'Discount') {
                discAmt = ($scope.gridTotal) * (parseFloat($scope.quotation.DiscountPercent) / 100);
                $scope.quotation.DiscountAmount = parseFloat(discAmt);
            }
            if (field != 'DiscountPercent') {
                discPer = (parseFloat($scope.quotation.DiscountAmount) / parseFloat($scope.gridTotal)) * 100;
                $scope.quotation.DiscountPercent = parseFloat(discPer);
            }

            var itemTotal = (parseFloat($scope.gridTotal) - parseFloat($scope.quotation.DiscountAmount)) + parseFloat($scope.quotation.TaxAmount);
            $scope.quotation.TotalAmount = parseFloat(itemTotal);
        }

        $scope.saveClick = function (form) {
            resetInfoPanel();
            $scope.submitted = true;
            $scope.userForm = form;
            if ($scope.userForm.$valid) {
                $scope.quotation.tblQuotationDetails = $scope.gridItems;
                if ($scope.quotation.lngId > 0) {
                    $scope.quotation.lngCreatedBy = userModel.currentUserDetails.Id;
                } else {
                    //$scope.quotation.intLastUpBy = userModel.currentUserDetails.Id;
                }
                masterQuotationFactory.insertData($scope.quotation)
                .success(function (data) {
                    if (data != null && data.lngId > 0) {
                        if (userModel.editMode = false) {
                            showInfoPanel(false, 'Quotation Added Successfully. The Quotation Identifier is [' + data.strQuotationNumber + ']');
                        } else {
                            showInfoPanel(false, 'Quotation updated Successfully.');
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
            $location.path('/quotation').replace();
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