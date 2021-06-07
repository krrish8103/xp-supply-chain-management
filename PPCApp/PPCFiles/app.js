var app = angular.module('PPCApp', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap.dropdown', 'ps.inputTime', 'ngGrid', 'mgcrea.ngStrap', 'smart-table', 'base64', 'angular-loading-bar', 'blockUI', 'ngAnimate', 'ngIdle', 'chart.js', 'monospaced.elastic', 'AxelSoft', 'ngResource', 'ui.toggle','ridge-speedometer','ngCookies', 'ngSanitize', 'ngStorage', 'ngLodash']);

app.controller('testController', ['$scope',
    function ($scope) {
        $scope.test = "Sri Tech";
    }]);

app.controller('homeController', ['$scope',
    function ($scope) {
        $scope.test = "Sri Technologies";
    }]);


app.controller("BaseCtrl", function ($scope) {
    $scope.labels = ["February", "March", "April", "May"];
    $scope.data = [300, 500, 200, 100];
});

app.controller("BaseCtrl1", function ($scope) {

    $scope.labels = ["Grinding", "Milling", "Turning", "Fabrication", "Assembly", "Painting", "Polishing"];
    $scope.series = ['KW', 'Current KW'];
    $scope.options = { legend: { display: true } };
    $scope.data = [
     // [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)],
      [240,120,300,250,175,200,275],
      [Math.floor(Math.random() * 240), Math.floor(Math.random() * 150), Math.floor(Math.random() * 300), Math.floor(Math.random() * 250), Math.floor(Math.random() * 175), Math.floor(Math.random() * 200), Math.floor(Math.random() * 300)]
    ];


    setInterval(myTimer, 5000);

    function myTimer() {
        $scope.data = [
     [240, 120, 300, 250, 175, 200, 275],
      [Math.floor(Math.random() * 240), Math.floor(Math.random() * 150), Math.floor(Math.random() * 300), Math.floor(Math.random() * 250), Math.floor(Math.random() * 175), Math.floor(Math.random() * 200), Math.floor(Math.random() * 300)]
        ];
    }

    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
            yAxes: [
              {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left'
              },
              {
                  id: 'y-axis-2',
                  type: 'linear',
                  display: true,
                  position: 'right'
              }
            ]
        }
    };
});
app.controller("BaseCtrl2", function ($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    setInterval(myTimer, 15000);
  //  $scope.options = { legend: { display: true } };
    function myTimer() {
        $scope.data = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    }
});
app.controller("BaseCtrl3", function ($scope) {
    $scope.labels = ['PR-1', 'PR-2', 'PR-3', 'PR-4', 'PR-5', 'PR-6', 'PR-7'];
    $scope.series = ['Set Temperature', 'Actual Temperature'];
    $scope.options = { legend: { display: true } };

    setInterval(myTimer, 1000);

    function myTimer() {
        $scope.data = [
       [65, 59, 80, 81, 56, 55, 60],
       [Math.random() * (75.00 - 65.00) + 60.00, Math.random() * (69.00 - 59.00) + 55.00, Math.random() * (90.00 - 80.00) + 75.00, Math.random() * (91.00 - 81.00) + 76.00, Math.random() * (66.00 - 56.00) + 51.00, Math.random() * (65.00 - 55.00) + 50.00, Math.random() * (70.00 - 60.00) + 55.00]
        ];
    }

    $scope.colors = ['#2eb8b8', '#ff3300'];
});

app.controller("Umesh", function ($scope) {
    $scope.labels = ['PR-1'];
    $scope.series = ['Level'];
    $scope.options = { legend: { display: true } };

    setInterval(myTimer, 1000);

    function myTimer() {
        $scope.data = [
       
       [Math.random() * (75.00 - 65.00) + 60.00]
        ];
    }

    $scope.colors = ['#2eb8b8'];
});


//app.controller("BaseCtrl3", function ($scope) {
//    $scope.labels = ['PR-1', 'PR-2', 'PR-3', 'PR-4', 'PR-5', 'PR-6', 'PR-7','PR-8'];
//    $scope.series = ['Set Temperature', 'Actual Temperature'];
//    $scope.options = { legend: { display: true } };
   
//    setInterval(myTimer, 100);

//    function myTimer() {
//    $scope.data = [
//      [65, 59, 80, 81, 56, 55, 40,75],
//       [Math.random() * (75.00 - 65.00) + 60.00, Math.random() * (69.00 - 59.00) + 55.00, Math.random() * (90.00 - 80.00) + 75.00, Math.random() * (91.00 - 81.00) + 76.00, Math.random() * (66.00 - 56.00) + 51.00, Math.random() * (65.00 - 55.00) + 50.00, Math.random() * (50.00 - 40.00) + 35.00, Math.random() * (50.00 - 40.00) + 35]
//    ];
//    }
//    $scope.colors = ['#2eb8b8', '#ff3300'];

//    //ChartJsProvider.setOptions({ colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
//});

app.controller("BaseCtrl4", function ($scope) {
    $scope.labels = ['Critical', 'High', 'Medium', 'Low', ];
    $scope.series = ['Record Count'];
   // $scope.options = { legend: { display: true } };
    $scope.data = [
      [75, 63, 59, 79]
    ];
    $scope.datasetOverride = [
           {
               fill: true,
               backgroundColor: [
              "#db2e2e",
              "#f4bc42",
              "#9999ff",
              "#004466"
               ]
           }];
});

app.controller("BaseCtrl5", function ($scope) {
    $scope.labels = ['New', 'Contacting', 'On Hold', 'Waiting', 'Researching', 'Escalated'];
    $scope.series = ['Record Count'];
    $scope.data = [
      [75, 63, 59, 79, 81, 54]
    ];
    $scope.datasetOverride = [
             {
                 fill: true,
                 backgroundColor: [
                "#9999ff",
                "#9999ff",
                "#9999ff",
                 "#9999ff",
                "#9999ff",
                "#9999ff"
                 ]
             }];
});

app.controller("BaseCtrl6", function ($scope) {
    $scope.labels = ['Portal', 'Web', 'Phone', 'Email'];
    $scope.series = ['Record Count'];
    $scope.data = [
      [75, 63, 59, 79]
    ];
    $scope.datasetOverride = [
             {
                 fill: true,
                 backgroundColor: [
                "#9999ff",
                "#9999ff",
                "#9999ff",
                "#9999ff"
                 ]
             }];
});

app.controller("BaseCtrl7", function ($scope) {
    $scope.labels = ["June2011"];
    $scope.data = [300, 500, 200];
    $scope.options = { legend: { display: true } };
});

app.controller("BaseCtrl8", function ($scope, $interval) {
    $scope.val = 0;
    $interval(function () { $scope.val = $scope.val + 7 }, 1500, 12)
    $scope.setVal = function () {
        $scope.val = $scope.tmpVal
    }
});

app.controller("myController", function ($scope) {
    //$scope.SalesMarketing = false;

    //$scope.openSales = function (obj)
    //{
    //    $scope.SalesMarketing = true;
    //};
    $scope.show = 1;
});


app.config(['$routeProvider', 'KeepaliveProvider', 'IdleProvider', function ($routeProvider, KeepaliveProvider, IdleProvider) {
    IdleProvider.idle(600); //120 seconds : 2 min
    IdleProvider.timeout(900);
    KeepaliveProvider.interval(300);

    $routeProvider.when('/', { templateUrl: 'PPCFiles/View/home.html', controller: 'homeController', access: { isLoginRequired: true } });
    $routeProvider.when('/home', { templateUrl: 'PPCFiles/View/home.html', controller: 'homeController', access: { isLoginRequired: true } });
    $routeProvider.when('/machineDashboard', { templateUrl: 'PPCFiles/View/machineDashboard.html', controller: 'homeController', access: { isLoginRequired: true } });
    $routeProvider.when('/plantViewDashboard', { templateUrl: 'PPCFiles/View/plantViewDashboard.html', controller: 'homeController', access: { isLoginRequired: true } });
    $routeProvider.when('/login', { templateUrl: 'PPCFiles/View/login.html', controller: 'loginController', access: { isLoginRequired: false } });
    $routeProvider.when('/inbox', { templateUrl: 'PPCFiles/View/UserSpecific/inbox.html', controller: 'mailCommunicationController', access: { isLoginRequired: true } });
    $routeProvider.when('/mstLookUps', { templateUrl: 'PPCFiles/View/Master/mstLookUps.html', controller: 'masterLookUpController', access: { isLoginRequired: true } });

    $routeProvider.when('/mstUOM', { templateUrl: 'PPCFiles/View/Master/mstUnitOfMeasure.html', controller: 'masterUnitOfMeasureController', access: { isLoginRequired: true } });
    $routeProvider.when('/mstItem', { templateUrl: 'PPCFiles/View/Master/mstItem.html', controller: 'masterItemController', access: { isLoginRequired: true } });
    $routeProvider.when('/mstItemAddEdit', { templateUrl: 'PPCFiles/View/Master/mstItemAddEdit.html', controller: 'maintainItemController', access: { isLoginRequired: true } });
    $routeProvider.when('/mstTax', { templateUrl: 'PPCFiles/View/Master/mstTax.html', controller: 'masterTax', access: { isLoginRequired: true } });
     $routeProvider.when('/mstVendor', { templateUrl: 'PPCFiles/View/Master/mstVendor.html', controller: 'masterVendor', access: { isLoginRequired: true } });
     $routeProvider.when('/mstDepartment', { templateUrl: 'PPCFiles/View/Master/mstDepartment.html', controller: 'masterDepartment', access: { isLoginRequired: true } });
     $routeProvider.when('/mstDocumentType', { templateUrl: 'PPCFiles/View/Master/mstDocumentType.html', controller: 'masterDocumentType', access: { isLoginRequired: true } });
     $routeProvider.when('/mstItemCategory', { templateUrl: 'PPCFiles/View/Master/mstItemCategory.html', controller: 'masterItemCategory', access: { isLoginRequired: true } });
     $routeProvider.when('/mstCustomerSupplierTyoe', { templateUrl: 'PPCFiles/View/Master/mstCustomerSupplierType.html', controller: 'masterCustomerSupplierType', access: { isLoginRequired: true } });
     $routeProvider.when('/mstCustomers', { templateUrl: 'PPCFiles/View/Master/mstCustomer.html', controller: 'masterCustomerController', access: { isLoginRequired: true } });
     $routeProvider.when('/mstCustomerAddEdit', { templateUrl: 'PPCFiles/View/Master/mstCustomerAddEdit.html', controller: 'maintainCustomerController', access: { isLoginRequired: true } });
     $routeProvider.when('/mstBOMOperationsMaterial', { templateUrl: 'PPCFiles/View/Master/mstBOMOperationsMaterial.html', controller: 'masterOperationsMaterialController', access: { isLoginRequired: true } });
     $routeProvider.when('/mstBOMOperationsMaterialAddEdit', { templateUrl: 'PPCFiles/View/Master/mstBOMOperationsMaterialAddEdit.html', controller: 'maintainOperationsMaterialController', access: { isLoginRequired: true } });
     $routeProvider.when('/mstOperations', { templateUrl: 'PPCFiles/View/Master/mstBOMOperations.html', controller: 'masterBOMOperationsController', access: { isLoginRequired: true } });
     $routeProvider.when('/mstLocation', { templateUrl: 'PPCFiles/View/Master/mstLocation.html', controller: 'masterLocation', access: { isLoginRequired: true } });
     $routeProvider.when('/mstLocationAddEdit', { templateUrl: 'PPCFiles/View/Master/mstLocationAddEdit.html', controller: 'maintainLocationController', access: { isLoginRequired: true } });
     $routeProvider.when('/mstBin', { templateUrl: 'PPCFiles/View/Master/mstBin.html', controller: 'masterBin', access: { isLoginRequired: true } });
     $routeProvider.when('/mstEmployee', { templateUrl: 'PPCFiles/View/Master/mstEmployee.html', controller: 'masterEmployeeController', access: { isLoginRequired: true } });
     $routeProvider.when('/mstEmployeeAddEdit', { templateUrl: 'PPCFiles/View/Master/mstEmployeeAddEdit.html', controller: 'maintainEmployeeController', access: { isLoginRequired: true } });

     $routeProvider.when('/workOrder', { templateUrl: 'PPCFiles/View/ProdPlan/workOrder.html', controller: 'workOrderController', access: { isLoginRequired: true } });
     $routeProvider.when('/workOrderAddEdit', { templateUrl: 'PPCFiles/View/ProdPlan/workOrderAddEdit.html', controller: 'maintainWorkOrderController', access: { isLoginRequired: true } });

     $routeProvider.when('/workOrderIssue', { templateUrl: 'PPCFiles/View/ProdPlan/workOrder.html', controller: 'workOrderController', access: { isLoginRequired: true } });
     $routeProvider.when('/workOrderIssueAddEdit', { templateUrl: 'PPCFiles/View/ProdPlan/workOrderAddEdit.html', controller: 'maintainWorkOrderController', access: { isLoginRequired: true } });

     $routeProvider.when('/Indent', { templateUrl: 'PPCFiles/View/Master/Indent.html', controller: 'IndentController', access: { isLoginRequired: true } });
     $routeProvider.when('/IndentAddEdit', { templateUrl: 'PPCFiles/View/Master/IndentAddEdit.html', controller: 'maintainIndentController', access: { isLoginRequired: true } });
     $routeProvider.when('/ProductionPlan', { templateUrl: 'PPCFiles/View/ProdPlan/ProductionPlan.html', controller: 'ProductionPlanController', access: { isLoginRequired: true } });
     $routeProvider.when('/mstDocumentPattern', { templateUrl: 'PPCFiles/View/Master/mstDocumentPattern.html', controller: 'masterDocumentNumberingPattern', access: { isLoginRequired: true } });
     $routeProvider.when('/mstDocumentPatternAddEdit', { templateUrl: 'PPCFiles/View/Master/mstDocumentPatternAddEdit.html', controller: 'maintainDocumentNumberingPattern', access: { isLoginRequired: true } });

     $routeProvider.when('/quotation', { templateUrl: 'PPCFiles/View/Procurement/quotation.html', controller: 'quotationController', access: { isLoginRequired: true } });
     $routeProvider.when('/quotationAddEdit', { templateUrl: 'PPCFiles/View/Procurement/quotationAddEdit.html', controller: 'maintainQuotationController', access: { isLoginRequired: true } });     

    $routeProvider.when('/purchaseOrder', { templateUrl: 'PPCFiles/View/Procurement/purchaseOrder.html', controller: 'purchaseOrderController', access: { isLoginRequired: true } });
    $routeProvider.when('/purchaseOrderAddEditAdvanced', { templateUrl: 'PPCFiles/View/Procurement/purchaseOrderAddEditAdvanced.html', controller: 'maintainPurchaseOrderAdvancedController', access: { isLoginRequired: true } });
    $routeProvider.when('/purchaseOrderAddEdit', { templateUrl: 'PPCFiles/View/Procurement/purchaseOrderAddEdit.html', controller: 'maintainPurchaseOrderController', access: { isLoginRequired: true } });
    $routeProvider.when('/SupplierEvalExpl', { templateUrl: 'PPCFiles/View/Procurement/SupplierEvalExpl.html', controller: '', access: { isLoginRequired: true } });
    $routeProvider.otherwise({ redirectTo: "/" });
   
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
 
});

app.config(function (stConfig) {
    stConfig.pagination.template = 'PPCFiles/View/pagination.custom.html';
    stConfig.pagination.itemsByPage = 10;
});

app.directive('pageSelect', function () {
    return {
        restrict: 'E',
        template: '<input type="text" class="select-page" ng-model="inputPage" valid-number maxlength="6" ng-change="selectPage(inputPage)">',
        link: function (scope, element, attrs) {
            scope.$watch('currentPage', function (c) {
                scope.inputPage = c;
            });
        }
    }
});
app.run(['$rootScope', '$location', 'loginService','userModel', function ($rootScope, $location, loginService, userModel) {




    $rootScope.$on('$routeChangeStart', function (e, current, previous) {
 userModel.redirectRoute = current.$$route.originalPath;
        if (angular.isDefined(current.access)) {
            if (current.access.isLoginRequired && !loginService.authentication.isLoggedin) {
                $location.path('/login').replace();
            }
        }
    });
}]);

app.directive('focus', function ($timeout) {
    return {
        scope: {
            trigger: '@focus'
        },
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value === "true") {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
        }
    };
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.filter('customFilter', ['$parse', function ($parse) {
    return function (items, filters) {
        var itemsLeft = items.slice();

        Object.keys(filters).forEach(function (model) {
            var value = filters[model],
                getter = $parse(model);

            itemsLeft = itemsLeft.filter(function (item) {
                if (angular.isDefined(getter(item)) && getter(item) != null) {
                    return angular.lowercase(getter(item)).toString().indexOf(angular.lowercase(value)) >= 0;
                }
                else {
                    return false;
                }
            });
        });

        return itemsLeft;
    };


}]);


app.directive('ngCompare', function () {
    return {
        require: 'ngModel',
        link: function (scope, currentEl, attrs, ctrl) {
            var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
            compareEl = angular.element(comparefield);

            //current field key up
            currentEl.on('keyup', function () {
                if (compareEl.val() != "") {
                    var isMatch = currentEl.val() === compareEl.val();
                    ctrl.$setValidity('compare', isMatch);
                    scope.$digest();
                }
            });

            //Element to compare field key up
            compareEl.on('keyup', function () {
                if (currentEl.val() != "") {
                    var isMatch = currentEl.val() === compareEl.val();
                    ctrl.$setValidity('compare', isMatch);
                    scope.$digest();
                }
            });
        }
    }
});

app.directive('decimalNumber', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                var clean = val.replace(/[^0-9\.]/g, '');
                var decimalCheck = clean.split('.');

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});
app.directive('numericOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g, '') : null;

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
app.directive("stResetSearch", function () {
    return {
        require: '^stTable',
        link: function (scope, element, attrs, ctrl) {
            return element.bind('click', function () {
                return scope.$apply(function () {
                    var tableState;
                    tableState = ctrl.tableState();
                    tableState.search.predicateObject = {};
                    tableState.pagination.start = 0;
                    return ctrl.pipe();
                });
            });
        }
    };
});

app.directive('stPersist', function () {
    return {
        require: '^stTable',
        link: function (scope, element, attr, ctrl) {
            var nameSpace = attr.stPersist;

            //save the table state every time it changes
            scope.$watch(function () {
                return ctrl.tableState();
            }, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    localStorage.setItem(nameSpace, JSON.stringify(newValue));
                }
            }, true);

            //fetch the table state when the directive is loaded
            if (localStorage.getItem(nameSpace)) {
                var savedState = JSON.parse(localStorage.getItem(nameSpace));
                var tableState = ctrl.tableState();
                angular.extend(tableState, savedState);
                ctrl.pipe();
            }

        }
    };
});;

app.directive('export', function () {
    return {
        restrict: 'AE',
        scope: {
            data: '=exportData',
            title: '=exportTitle',
            keys: '=exportKeys',
            headers: '=exportHeaders',
            filename: '=exportFilename'
        },
        link: function (scope, el, attrs) {
            el.bind('click', function () {
                var data = scope.data;
                var title = scope.title;
                var keys = scope.keys;
                var headers = scope.headers;
                var filename = scope.filename;

                if (data && !Array.isArray(data)) throwError("Data must be a valid javascript array");
                if (keys && !Array.isArray(keys)) throwError("Keys must be a valid javascript array");
                if (headers && !Array.isArray(headers)) throwError("Headers must be a valid javascript array");

                // Remove any angular added keys
                var json_data = angular.toJson(data);
                data = JSON.parse(json_data);
                if (!data.length) throwError("No data available to export");

                // Get keys & headers to be exported
                if (!keys) {
                    var sample_data = data[0];
                    keys = Object.keys(sample_data);
                }
                if (headers && (headers.length != keys.length)) {
                    throwError("Headers must be the same length as the " + (keys ? "keys" : "data") + " to export");
                } else if (!headers) {
                    headers = convertToUppercase(keys);
                }

                data = filterArrayKeys(data, keys);


                //////////////////////////
                //// Export Functions ////
                //////////////////////////

                var csv = '';
                if (title) {
                    csv += title + '\r\n\n';
                }
                csv += headers.join(",") + '\r\n';

                for (var i = 0; i < data.length; i++) {
                    var row = "";
                    for (var index in data[i]) {
                        row += '"' + data[i][index] + '",';
                    }
                    row.slice(0, row.length - 1);
                    csv += row + '\r\n';
                }

                if (csv == '') {
                    throwError("Invalid Data");
                }

                if (!filename) filename = "ExportCSV " + getDate();
                filename = filename.replace(/ /g, "_");
                var uri = 'data:text/csv;charset=utf-8,' + escape(csv);
                var link = document.createElement("a");
                link.href = uri;
                link.style = "visibility:hidden";
                link.download = filename + ".csv";

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);


                /////////////////////////
                /// Utility Functions ///
                /////////////////////////

                function throwError(message) {
                    throw message;
                    return;
                }

                function filterArrayKeys(array, keys) {
                    var result = [];
                    if (!array.length || !keys.length) return result;
                    for (var i = 0; i < array.length; i++) {
                        var array_object = array[i];
                        var new_object = {};
                        for (var j = 0; j < keys.length; j++) {
                            var key = keys[j];
                            var value = array_object[key];
                            new_object[key] = value;
                        }
                        result.push(new_object);
                    }
                    return result;
                };

                function convertToUppercase(array) {
                    var result = [];
                    for (var i = 0; i < array.length; i++) {
                        var key = array[i];
                        result.push(key.charAt(0).toUpperCase() + key.slice(1));
                    }
                    return result;
                }

                function getDate() {
                    var monthNames = [
                        "January", "February", "March",
                        "April", "May", "June", "July",
                        "August", "September", "October",
                        "November", "December"
                    ];

                    var date = new Date();
                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();

                    return day + ' ' + monthNames[monthIndex] + ' ' + year;
                }
            });
        }
    };
});

app.run(['customSelectDefaults', function(customSelectDefaults) {
	customSelectDefaults.displayText = '--Select--';
	customSelectDefaults.emptyListText = 'No items found';
	customSelectDefaults.emptySearchResultText = 'No Item Found';
	customSelectDefaults.addText = 'Select';
	customSelectDefaults.searchDelay = 500;
}]);

(function (ChartJsProvider) {
    ChartJsProvider.setOptions({ colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
});
app.directive('expand', function () {
    return {
        restrict: 'A',
        controller: ['$scope', function ($scope) {
            $scope.$on('onExpandAll', function (event, args) {
                $scope.expanded = args.expanded;
            });
        }]
    };
});

app.factory('DragDropHandler', [function () {
    return {
        dragObject: undefined,
        addObject: function (object, objects, to) {
            objects.splice(to, 0, object);
        },
        moveObject: function (objects, from, to) {
            objects.splice(to, 0, objects.splice(from, 1)[0]);
        }
    };
}])

app.directive('draggable', ['DragDropHandler', function (DragDropHandler) {
    return {
        scope: {
            draggable: '='
        },
        link: function (scope, element, attrs) {
            element.draggable({
                connectToSortable: attrs.draggableTarget,
                helper: "clone",
                start: function () {
                    DragDropHandler.dragObject = scope.draggable;
                },
                stop: function () {
                    DragDropHandler.dragObject = undefined;
                }
            });

            element.disableSelection();
        }
    };
}])

//app.directive('droppable', ['DragDropHandler', function(DragDropHandler) {
//        return {
//            scope: {
//                droppable: '=',
//                ngMove: '&',
//                ngCreate: '&'
//            },
//            link: function(scope, element, attrs){
//                element.sortable({
//                  connectWith: ['.draggable','.sortable'],
//                });
//                element.disableSelection();
//                var list = element.attr('id');
//                element.on("sortupdate", function(event, ui) {

//                    var from = angular.element(ui.item).scope().$index;
//                    var to = element.children().index(ui.item);

//                    if (to >= 0 ){
//                      //item is moved to this list
//                        scope.$apply(function(){
//                            if (from >= 0) {
//                              //item is coming from a sortable

//                              if (!ui.sender) {
//                                //item is coming from this sortable
//                                  DragDropHandler.moveObject(scope.droppable, from, to);

//                              } else {
//                                //item is coming from another sortable
//                                scope.ngMove({
//                                    from: from,
//                                    to: to,
//                                    fromList: ui.sender.attr('id'),
//                                    toList: list
//                                });
//                                ui.item.remove();
//                              }
//                            } else {
//                              //item is coming from a draggable
//                                scope.ngCreate({
//                                    object: DragDropHandler.dragObject,
//                                    to: to,
//                                    list: list
//                                });

//                                ui.item.remove();
//                            }
//                        });
//                    }
//                });

//            }
//        };
//    }]);


.directive('droppable', ['DragDropHandler', function (DragDropHandler) {
    return {
        scope: {
            droppable: '=',
            ngMove: '&',
            ngCreate: '&'
        },
        link: function (scope, element, attrs) {
            element.sortable({
                connectWith: ['.draggable', '.sortable'],
            });
            element.disableSelection();
            var list = element.attr('id');
            element.on("sortupdate", function (event, ui) {

                var from = angular.element(ui.item).scope().$index;
                var to = element.children().index(ui.item);

                if (to >= 0) {
                    //item is moved to this list
                    scope.$apply(function () {
                        if (from >= 0) {
                            //item is coming from a sortable

                            if (!ui.sender) {
                                //item is coming from this sortable
                                DragDropHandler.moveObject(scope.droppable, from, to);

                            } else {
                                //item is coming from another sortable
                                scope.ngMove({
                                    from: from,
                                    to: to,
                                    fromList: ui.sender.attr('id'),
                                    toList: list
                                });
                                ui.item.remove();
                            }
                        } else {
                            //item is coming from a draggable
                            scope.ngCreate({
                                object: DragDropHandler.dragObject,
                                to: to,
                                list: list
                            });

                            ui.item.remove();
                        }
                    });
                }
            });

        }
    };
}]);



//app.controller('MainCtrl', ['$scope','lodash',
//function ($scope, lodash) {
//         $scope.message = '';
//     }]);


//app.controller('MainCtrl', ['$scope', '$localStorage', 'socket', 'lodash','$interval', 'userModel', 
//function ($scope, $localStorage, socket, lodash, $interval, userModel) {
//        $scope.message = 'this is from our controller';
//        $scope.messages = [];
//        $scope.users = [];
//        $scope.likes = [];
//        $scope.mynickname = $localStorage.nickname;
//        var nickname = $scope.mynickname;

       
//        //getMachineLog();
//        ////$interval(getMachineLog, 3000);
//        //function getMachineLog() {
//        //    socket.emit('get-users');
//        //}
       
//        socket.emit('get-users');
//        socket.on('message', function (data) {
//            $scope.message = data;
//            console.log(data);
//            userModel.machineLog = data;

//        });
//        socket.on('all-users', function (data) {
//            console.log(data);
//            $scope.users = data;
//            //.filter(function (item) {
//            //    return item.nickname !== nickname;
//            //});
//        });

//        //socket.on('message-received', function (data) {
//        //    $scope.messages.push(data);
//        //});

//        //socket.on('user-liked', function (data) {
//        //    console.log(data);
//        //    $scope.likes.push(data.from);
//        //});

//        //$scope.sendMessage = function (data) {
//        //    var newMessage = {
//        //        message: $scope.message,
//        //        from: $scope.mynickname
//        //    };
//        //    socket.emit('send-message', newMessage);
//        //    $scope.message = '';
//        //    //$scope.messages.push(newMessage);
//        //};

//        //$scope.sendLike = function (user) {
//        //    console.log(user);
//        //    var id = lodash.get(user, 'socketid');
//        //    var likeObj = {
//        //        from: nickname,
//        //        like: id
//        //    };
//        //    socket.emit('send-like', likeObj);
//        //};
//    }]);



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


(function () {

    app.directive("ngRect", ngRect);
    ngRect.$inject = [];
    function ngRect() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                xVinay: '=',
                yAxis: '=',
                rectHeight3: '=',
                rectHeight2: '=',
                rectWidth: '=',
                offsetY: '=',
                offsetG: '=',
                onClick: '&'
            },
            templateUrl: 'PPCFiles/View/rectTemplate.html',
            templateNamespace: 'svg',
            link: function (scope, element, attrs, fn) {
                scope.toggleSwitch = function () {
                    scope.onClick()();
                }
            }
        };
    }
}());

(function () {

    app.directive("ngDefs", ngDefs);
    ngDefs.$inject = [];
    function ngDefs() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                offset: '='
            },
            templateUrl: 'PPCFiles/View/defsTemplate.html',
            templateNamespace: 'svg'
        };
    }
}());

(function () {

    app.directive("ngDemo", ngSvgDemo);

    ngSvgDemo.$inject = [];

    function ngSvgDemo() {
        return {
            restrict: 'E',
            templateUrl: 'PPCFiles/View/demoTemplate.html',
            controller: 'plantViewDashboardController',
            controllerAs: 'ftg'
        };
    }
}());