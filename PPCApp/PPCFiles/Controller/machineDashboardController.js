//----------------------------------machineDashboardController------------------------------------------
app.controller('machineDashboardController', ['$rootScope', '$scope', '$modal', '$location', '$interval', 'masterHeatMapFactory', 'userModel', 'messageModel', '$localStorage', 'socket', 'lodash', '$interval',
    function ($rootScope, $scope, $modal, $location, $interval, masterHeatMapFactory, userModel, messageModel, $localStorage, socket, lodash, $interval) {
        function initialize() {
            $scope.overAllProduction = [];
            $scope.shiftViseProduction = [];
            $scope.batchViseProduction = [];
            $scope.dispbatchViseProduction = [];
            $scope.currentShift = 1;
            $scope.isChangeShiftManually = false;
            $scope.currentShiftRecords = [];
            $scope.currentShiftFinishedRec = [];
            $scope.discurrentShiftFinishedRec = [];
            $scope.isError = false;
            $scope.isSuccess = false;
            $scope.SuccessErrorMessage = "";
            $scope.actionColorProduction = '';
            $scope.actionColorEfficiency = '';
            $scope.actionColorUtilization = '';
            $scope.actionColorLogistics = '';
            $scope.currentDate = new Date;
            $scope.activeMachine = 0;
            $scope.activeOperator = 0;
            $scope.colorCodesHeatMap = {};
            $scope.ObjId = 0;
            $scope.actionColorProductionFont = '';
            $scope.actionColorEfficiencyFont = '';
            $scope.actionColorUtilizationFont = '';
            $scope.actionColorLogisticFont = '';
            $scope.isCollapseMachineInfo = [];
        };

        initialize();

        socket.emit('get-users');
        socket.on('message', function (data) {
            $scope.overAllProduction = data.recordsets[0];
            //$scope.actionColorProduction = applySaturationToHexColor(getbasecolor($scope.overAllProduction[0].HeatProductionActualValue, 1), getSaturation($scope.overAllProduction[0].HeatProductionActualValue, 1));
            $scope.objid = 1
            if ($scope.overAllProduction[0].HeatProductionActualValue != undefined) {
                $scope.actionColorProduction = getColorHexCode($scope.overAllProduction[0].HeatProductionActualValue, 100, $scope.objid);
                $scope.actionColorProductionFont = getFontColor($scope.overAllProduction[0].HeatProductionActualValue, 100, $scope.objid);

                $scope.actionColorEfficiency = getColorHexCode($scope.overAllProduction[0].HeatEfficiencyActualValue, 100, $scope.objid);
                $scope.actionColorEfficiencyFont = getFontColor($scope.overAllProduction[0].HeatEfficiencyActualValue, 100, $scope.objid);

                $scope.actionColorUtilization = getColorHexCode($scope.overAllProduction[0].HeatUtilizationActualValue, 100, $scope.objid);
                $scope.actionColorUtilizationFont = getFontColor($scope.overAllProduction[0].HeatUtilizationActualValue, 100, $scope.objid);

                $scope.actionColorLogistics = getColorHexCode($scope.overAllProduction[0].HeatLogisticsActualValue, 100, $scope.objid);
                $scope.actionColorLogisticsFont = getFontColor($scope.overAllProduction[0].HeatLogisticsActualValue, 100, $scope.objid);
            }


            $scope.shiftViseProduction = data.recordsets[1];

            if ($scope.shiftViseProduction.length > 0) {
                if ($scope.isChangeShiftManually == false) {
                    $scope.currentShift = $scope.shiftViseProduction[$scope.shiftViseProduction.length - 1].Shift;
                }
            }

            $scope.shiftViseProduction = $scope.shiftViseProduction.filter(function (csr) {
                return (csr.Shift == $scope.currentShift);
            });

            //Color to shift 

            for (var i = 0; i < $scope.shiftViseProduction.length; i++) {
                $scope.objid = 1
                //$scope.allHeatMap[i].actionColor = applySaturationToHexColor(getbasecolor($scope.allHeatMap[i].decZone1CurrentTemp), getSaturation($scope.allHeatMap[i].decZone1CurrentTemp));
                $scope.shiftViseProduction[i].HeatProductionColorAvg = getColorHexCode($scope.shiftViseProduction[i].ProductionActualValueAvg, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatEfficiencyColorAvg = getColorHexCode($scope.shiftViseProduction[i].EfficiencyActualValueAvg, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatUtilizationColorAvg = getColorHexCode($scope.shiftViseProduction[i].UtilizationActualValueAvg, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatLogisticsColorAvg = getColorHexCode($scope.shiftViseProduction[i].LogisticsActualValueAvg, 100, $scope.objid);

                $scope.shiftViseProduction[i].HeatProductionColorAvgFont = getFontColor($scope.shiftViseProduction[i].ProductionActualValueAvg, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatEfficiencyColorAvgFont = getFontColor($scope.shiftViseProduction[i].EfficiencyActualValueAvg, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatUtilizationColorAvgFont = getFontColor($scope.shiftViseProduction[i].UtilizationActualValueAvg, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatLogisticsColorAvgFont = getFontColor($scope.shiftViseProduction[i].LogisticsActualValueAvg, 100, $scope.objid);

                $scope.objid = 1
                $scope.shiftViseProduction[i].HeatProductionColorMedian = getColorHexCode($scope.shiftViseProduction[i].ProductionActualValueMedian, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatEfficiencyColorMedian = getColorHexCode($scope.shiftViseProduction[i].EfficiencyActualValueMedian, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatUtilizationColorMedian = getColorHexCode($scope.shiftViseProduction[i].UtilizationActualValueMedian, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatLogisticsColorMedian = getColorHexCode($scope.shiftViseProduction[i].LogisticsActualValueMedian, 100, $scope.objid);

                $scope.shiftViseProduction[i].HeatProductionColorMedianFont = getFontColor($scope.shiftViseProduction[i].ProductionActualValueMedian, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatEfficiencyColorMedianFont = getFontColor($scope.shiftViseProduction[i].EfficiencyActualValueMedian, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatUtilizationColorMedianFont = getFontColor($scope.shiftViseProduction[i].UtilizationActualValueMedian, 100, $scope.objid);
                $scope.shiftViseProduction[i].HeatLogisticsColorMedianFont = getFontColor($scope.shiftViseProduction[i].LogisticsActualValueMedian, 100, $scope.objid);
            }

            $scope.batchViseProduction = data.recordsets[2];
            $scope.machine = [];

            for (var i = 0; i < $scope.batchViseProduction.length; i++) {
                $scope.isMachineExists = false;
                for (var j = 0; j < $scope.machine.length; j++) {
                    if ($scope.machine[j].lngMachineId == $scope.batchViseProduction[i].lngMachineId) {
                        $scope.isMachineExists = true;
                    }
                }

                if ($scope.isMachineExists == false) {
                    $scope.obj = {
                        lngMachineId: $scope.batchViseProduction[i].lngMachineId,
                        MachineNo: $scope.batchViseProduction[i].MachineNo,
                        shift: $scope.batchViseProduction[i].Shift,
                        machinInfo: []
                    }
                    $scope.machine.push($scope.obj);

                }

            }

            //Fill data for collapse and expand machine info 
            for (var i = 0; i < $scope.batchViseProduction.length; i++) {
                $scope.isToggleMachineExists = false;
                for (var j = 0; j < $scope.isCollapseMachineInfo.length; j++) {
                    if ($scope.isCollapseMachineInfo[j].lngMachineId == $scope.batchViseProduction[i].lngMachineId) {
                        $scope.isToggleMachineExists = true;
                    }
                }

                if ($scope.isToggleMachineExists == false) {
                    //Create obj for expand or collapse
                    $scope.obj1 = {
                        lngMachineId: $scope.batchViseProduction[i].lngMachineId,
                        isCollapse: false
                    }
                    $scope.isCollapseMachineInfo.push($scope.obj1);

                }

            }



            for (var i = 0; i < $scope.machine.length; i++) {
                for (var j = 0; j < $scope.batchViseProduction.length; j++) {
                    if ($scope.machine[i].lngMachineId == $scope.batchViseProduction[j].lngMachineId) {
                        $scope.machine[i].machinInfo.push($scope.batchViseProduction[j]);
                    }

                }
            }



            $scope.currentShiftRecords = $scope.batchViseProduction.filter(function (csr) {
                return (csr.blnFinished == 0);
            });

            $scope.activeMachine = $scope.currentShiftRecords.length;

            //Active Operators 
            $scope.machineOperator = [];
            for (var i = 0; i < $scope.currentShiftRecords.length; i++) {
                $scope.isActiveOperatorExists = false;
                for (var j = 0; j < $scope.machineOperator.length; j++) {
                    if ($scope.machineOperator[j].lngOperatorId == $scope.currentShiftRecords[i].lngOperatorId) {
                        $scope.isActiveOperatorExists = true;
                    }
                }

                if ($scope.isActiveOperatorExists == false) {
                    $scope.obj = {
                        lngOperatorId: $scope.currentShiftRecords[i].lngOperatorId,
                    }
                    $scope.machineOperator.push($scope.obj);
                }

            }

            $scope.activeOperator = $scope.machineOperator.length

            if ($scope.currentShiftRecords.length > 0) {

            }
            else {
                if ($scope.batchViseProduction.length > 0) {
                    for (var i = $scope.machine.length; i >= 1; i--) {
                        $scope.currentShiftRecords.push($scope.batchViseProduction[($scope.batchViseProduction.length) - i]);
                    }
                }
            }

            //Color Current Machine batch 
            for (var i = 0; i < $scope.currentShiftRecords.length; i++) {
                //$scope.allHeatMap[i].actionColor = applySaturationToHexColor(getbasecolor($scope.allHeatMap[i].decZone1CurrentTemp), getSaturation($scope.allHeatMap[i].decZone1CurrentTemp));
                $scope.currentShiftRecords[i].HeatProductionColor = getColorHexCode($scope.currentShiftRecords[i].HeatProductionActualValue, 100, $scope.objid);
                $scope.currentShiftRecords[i].HeatEfficiencyColor = getColorHexCode($scope.currentShiftRecords[i].HeatEfficiencyActualValue, 100, $scope.objid);
                $scope.currentShiftRecords[i].HeatUtilizationColor = getColorHexCode($scope.currentShiftRecords[i].HeatUtilizationActualValue, 100, $scope.objid);
                $scope.currentShiftRecords[i].HeatLogisticsColor = getColorHexCode($scope.currentShiftRecords[i].HeatLogisticsActualValue, 100, $scope.objid);

                $scope.currentShiftRecords[i].HeatProductionColorFont = getFontColor($scope.currentShiftRecords[i].HeatProductionActualValue, 100, $scope.objid);
                $scope.currentShiftRecords[i].HeatEfficiencyColorFont = getFontColor($scope.currentShiftRecords[i].HeatEfficiencyActualValue, 100, $scope.objid);
                $scope.currentShiftRecords[i].HeatUtilizationColorFont = getFontColor($scope.currentShiftRecords[i].HeatUtilizationActualValue, 100, $scope.objid);
                $scope.currentShiftRecords[i].HeatLogisticsColorFont = getFontColor($scope.currentShiftRecords[i].HeatLogisticsActualValue, 100, $scope.objid);

            }

            $scope.currentShiftFinishedRec = $scope.batchViseProduction.filter(function (csr) {
                return (csr.blnFinished == 1);
            });
            $scope.discurrentShiftFinishedRec = [].concat($scope.currentShiftFinishedRec);

            //Color finished Machine batch 
            for (var i = 0; i < $scope.currentShiftFinishedRec.length; i++) {
                //$scope.allHeatMap[i].actionColor = applySaturationToHexColor(getbasecolor($scope.allHeatMap[i].decZone1CurrentTemp), getSaturation($scope.allHeatMap[i].decZone1CurrentTemp));
                $scope.currentShiftFinishedRec[i].HeatProductionColor = getColorHexCode($scope.currentShiftFinishedRec[i].HeatProductionActualValue, 100, $scope.objid);
                $scope.currentShiftFinishedRec[i].HeatEfficiencyColor = getColorHexCode($scope.currentShiftFinishedRec[i].HeatEfficiencyActualValue, 100, $scope.objid);
                $scope.currentShiftFinishedRec[i].HeatUtilizationColor = getColorHexCode($scope.currentShiftFinishedRec[i].HeatUtilizationActualValue, 100, $scope.objid);
                $scope.currentShiftFinishedRec[i].HeatLogisticsColor = getColorHexCode($scope.currentShiftFinishedRec[i].HeatLogisticsActualValue, 100, $scope.objid);

                $scope.currentShiftFinishedRec[i].HeatProductionColorFont = getFontColor($scope.currentShiftFinishedRec[i].HeatProductionActualValue, 100, $scope.objid);
                $scope.currentShiftFinishedRec[i].HeatEfficiencyColorFont = getFontColor($scope.currentShiftFinishedRec[i].HeatEfficiencyActualValue, 100, $scope.objid);
                $scope.currentShiftFinishedRec[i].HeatUtilizationColorFont = getFontColor($scope.currentShiftFinishedRec[i].HeatUtilizationActualValue, 100, $scope.objid);
                $scope.currentShiftFinishedRec[i].HeatLogisticsColorFont = getFontColor($scope.currentShiftFinishedRec[i].HeatLogisticsActualValue, 100, $scope.objid);
            }


        });

        $scope.changeShift = function (obj) {
            $scope.isChangeShiftManually = true;
            $scope.currentShift = obj;
        };

        $scope.toggleMachineInfo = function (obj) {
            for (var i = 0; i < $scope.isCollapseMachineInfo.length ; i++) {
                if (obj.lngMachineId == $scope.isCollapseMachineInfo[i].lngMachineId) {
                    if ($scope.isCollapseMachineInfo[i].isCollapse == true) {
                        $scope.isCollapseMachineInfo[i].isCollapse = false;
                    }
                    else {
                        $scope.isCollapseMachineInfo[i].isCollapse = true;
                    }

                }
            }
        };


        $scope.viewAllDayProductionClick = function () {
            openMachineInfoModal();
        };

        var viewMachinesModal = $modal({ scope: $scope, template: 'machineInfo-dialog.html', animation: 'am-flip-x', show: false, backdrop: true });
        function openMachineInfoModal() {
            viewMachinesModal.$promise.then(viewMachinesModal.show);
        };


        //Open Popup machine production info 
        $scope.viewProductionInfoClick = function () {
            openProductionInfoModal();
        };

        var viewProductionInfoModal = $modal({ scope: $scope, template: 'productionInfo-dialog.html', animation: 'am-flip-x', show: false, backdrop: true });
        function openProductionInfoModal() {
            viewProductionInfoModal.$promise.then(viewProductionInfoModal.show);
        };

        //Open Popup utilization info 
        $scope.viewUtilizationInfoClick = function () {
            openUtilizationInfoModal();
        };

        var viewUtilizationInfoModal = $modal({ scope: $scope, template: 'utilizationInfo-dialog.html', animation: 'am-flip-x', show: false, backdrop: true });
        function openUtilizationInfoModal() {
            viewUtilizationInfoModal.$promise.then(viewUtilizationInfoModal.show);
        };

        //Open Popup logistics  info 
        $scope.viewLogisticsInfoClick = function () {
            openLogisticsInfoModal();
        };

        var viewLogisticsInfoModal = $modal({ scope: $scope, template: 'logisticsInfo-dialog.html', animation: 'am-flip-x', show: false, backdrop: true });
        function openLogisticsInfoModal() {
            viewLogisticsInfoModal.$promise.then(viewLogisticsInfoModal.show);
        };

        //Open Popup efficiency  info 
        $scope.viewEfficiencyInfoClick = function () {
            openEfficiencyInfoModal();
        };

        var viewEfficiencyInfoModal = $modal({ scope: $scope, template: 'efficiencyInfo-dialog.html', animation: 'am-flip-x', show: false, backdrop: true });
        function openEfficiencyInfoModal() {
            viewEfficiencyInfoModal.$promise.then(viewEfficiencyInfoModal.show);
        };

        //open Active Machines popup
        $scope.viewActiveMachinesClick = function () {
            openActiveMachineInfoModal();
        };

        var viewActiveMachinesModal = $modal({ scope: $scope, template: 'activeMachinesInfo-dialog.html', animation: 'am-flip-x', show: false, backdrop: true });
        function openActiveMachineInfoModal() {
            viewActiveMachinesModal.$promise.then(viewActiveMachinesModal.show);
        };

        //open Active operators 
        $scope.viewActiveOperatorClick = function () {
            openActiveOperatorInfoModal();
        };

        var viewActiveOperatorModal = $modal({ scope: $scope, template: 'activeOperatorInfo-dialog.html', animation: 'am-flip-x', show: false, backdrop: true });
        function openActiveOperatorInfoModal() {
            viewActiveOperatorModal.$promise.then(viewActiveOperatorModal.show);
        };


        function getColorHexCode(actualValue, setValue, objId) {
            var valuePercent = 0;
            var colorHexCode = '#ffffff';
            $scope.colorCodes = [];
            $scope.colorRow = [];

            if (actualValue > 0 && setValue > 0) {
                valuePercent = Math.round((actualValue / setValue) * 100);
            }
            if (valuePercent >= 0) {
                $scope.colorCodes = [].concat(userModel.colorCodes);
                colorRow = $scope.colorCodes.filter(function (cc) {
                    return (cc.Value == valuePercent && cc.ObjId == objId);
                });
            }
            if (colorRow != undefined && colorRow.length > 0) {

                return colorRow[0].HexCode;
            }
            return colorHexCode;
        }

        function getFontColor(actualValue, setValue, objId) {
            var valuePercent = 0;
            var colorHexCode = '#000000';
            $scope.colorCodes = [];
            $scope.colorRow = [];

            if (actualValue > 0 && setValue > 0) {
                valuePercent = Math.round((actualValue / setValue) * 100);
            }
            if (valuePercent >= 0) {
                $scope.colorCodes = [].concat(userModel.colorCodes);
                colorRow = $scope.colorCodes.filter(function (cc) {
                    return (cc.Value == valuePercent && cc.ObjId == objId);
                });
            }
            if (colorRow != undefined && colorRow.length > 0) {
                return colorRow[0].FontColor;
            }
            return colorHexCode;
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
    }
]);