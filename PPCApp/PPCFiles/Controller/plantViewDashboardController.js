//------------------------------plantViewDashboardController---------------------------------------
app.controller('plantViewDashboardController', ['$rootScope', '$scope', '$modal', '$location', '$interval', 'masterMachineLogFactory', 'userModel', 'messageModel', '$localStorage', 'socket', 'lodash', '$interval',
    function ($rootScope, $scope, $modal, $location, $interval, masterMachineLogFactory, userModel, messageModel, $localStorage, socket, lodash, $interval) {
        initialize();
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
            $scope.test = "Test";
            $scope.demo = {};
            init();
            $scope.changeLevels = 0;
            $scope.thresholdHeight2 = 70;
            $scope.thresholdHeight3 = 60;
            $scope.increaseHeight3 = 0;
            $scope.increaseHeight2 = 0;
        };
        function init() {
            $scope.demo.offsetYellow = '50%';
            $scope.demo.offsetGreen = '20%';
            $scope.demo.xAxis = 0;
            $scope.demo.yAxis = 0;
            $scope.demo.rectHeight3 = 100;
            $scope.demo.rectHeight2 = 100;
            $scope.demo.rectWidth = 500;
        }

        function changeDOM() {
            if ($scope.changeLevels == 1) {
                //if ($scope.demo.rectHeight3 < 100) {
                //    if ($scope.increase == 1 && $scope.demo.rectHeight3 < 100) {
                //        $scope.demo.rectHeight3 = $scope.demo.rectHeight3 + 5;
                //    }
                //    else if ($scope.increase == 0) {

                //        $scope.demo.rectHeight3 = $scope.demo.rectHeight3 - 5;
                //    }

                //    if ($scope.demo.rectHeight3 < 70) {
                //        $scope.increase = 1;
                //    }
                //    else {
                //        $scope.increase = 0;
                //    }

                //}


                $scope.demo.rectHeight3 = randomIntFromInterval(1, 100);
                $scope.demo.rectHeight2 = randomIntFromInterval(1, 100);
            }

        }

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        $scope.toggleSwitch = function () {



            var valueoff = document.getElementById('g3122').getAttributeNS(null, 'visibility');
            var valueOn = document.getElementById('gSwitchOn').getAttributeNS(null, 'visibility');


            if (valueoff == 'visible') {
                document.getElementById('g3122').setAttributeNS(null, 'visibility', 'hidden');
                document.getElementById('gSwitchOn').setAttributeNS(null, 'visibility', 'visible');
            }
            else {
                document.getElementById('g3122').setAttributeNS(null, 'visibility', 'visible');
                document.getElementById('gSwitchOn').setAttributeNS(null, 'visibility', 'hidden');
            }

            valueoff = document.getElementById('g3122').getAttributeNS(null, 'visibility');
            valueOn = document.getElementById('gSwitchOn').getAttributeNS(null, 'visibility');

            if (valueOn == 'visible') {
                document.getElementById('myani').beginElement();
                $scope.changeLevels = 1;
                $interval(changeDOM, 1000);
            }
            else {
                document.getElementById('myani').endElement();
                $scope.changeLevels = 0;
            }
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