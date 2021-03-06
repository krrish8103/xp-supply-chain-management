(function () {
   
    app.controller('DemoController', ['$scope', '$timeout', '$q', function ($scope, $timeout, $q) {
        $scope.fruits = ['apple', 'orange', 'mango', 'grapefruit', 'banana', 'melon'];
        $scope.setToMango = function () {
            $scope.fruit = 'mango';
        };

        $scope.state = 'AL';
        $scope.states = [
            { id: 'AL', name: 'Alabama' },
            { id: 'AK', name: 'Alaska' },
            { id: 'AS', name: 'American Samoa' },
            { id: 'AZ', name: 'Arizona' },
            { id: 'AR', name: 'Arkansas' },
            { id: 'CA', name: 'California' },
            { id: 'CO', name: 'Colorado' },
            { id: 'CT', name: 'Connecticut' },
            { id: 'DE', name: 'Delaware' },
            { id: 'DC', name: 'District Of Columbia' },
            { id: 'FM', name: 'Federated States Of Micronesia' },
            { id: 'FL', name: 'Florida' },
            { id: 'GA', name: 'Georgia' },
            { id: 'GU', name: 'Guam' },
            { id: 'HI', name: 'Hawaii' },
            { id: 'ID', name: 'Idaho' },
            { id: 'IL', name: 'Illinois' },
            { id: 'IN', name: 'Indiana' },
            { id: 'IA', name: 'Iowa' },
            { id: 'KS', name: 'Kansas' },
            { id: 'KY', name: 'Kentucky' },
            { id: 'LA', name: 'Louisiana' },
            { id: 'ME', name: 'Maine' },
            { id: 'MH', name: 'Marshall Islands' },
            { id: 'MD', name: 'Maryland' },
            { id: 'MA', name: 'Massachusetts' },
            { id: 'MI', name: 'Michigan' },
            { id: 'MN', name: 'Minnesota' },
            { id: 'MS', name: 'Mississippi' },
            { id: 'MO', name: 'Missouri' },
            { id: 'MT', name: 'Montana' },
            { id: 'NE', name: 'Nebraska' },
            { id: 'NV', name: 'Nevada' },
            { id: 'NH', name: 'New Hampshire' },
            { id: 'NJ', name: 'New Jersey' },
            { id: 'NM', name: 'New Mexico' },
            { id: 'NY', name: 'New York' },
            { id: 'NC', name: 'North Carolina' },
            { id: 'ND', name: 'North Dakota' },
            { id: 'MP', name: 'Northern Mariana Islands' },
            { id: 'OH', name: 'Ohio' },
            { id: 'OK', name: 'Oklahoma' },
            { id: 'OR', name: 'Oregon' },
            { id: 'PW', name: 'Palau' },
            { id: 'PA', name: 'Pennsylvania' },
            { id: 'PR', name: 'Puerto Rico' },
            { id: 'RI', name: 'Rhode Island' },
            { id: 'SC', name: 'South Carolina' },
            { id: 'SD', name: 'South Dakota' },
            { id: 'TN', name: 'Tennessee' },
            { id: 'TX', name: 'Texas' },
            { id: 'UT', name: 'Utah' },
            { id: 'VT', name: 'Vermont' },
            { id: 'VI', name: 'Virgin Islands' },
            { id: 'VA', name: 'Virginia' },
            { id: 'WA', name: 'Washington' },
            { id: 'WV', name: 'West Virginia' },
            { id: 'WI', name: 'Wisconsin' },
            { id: 'WY', name: 'Wyoming' }
        ];

        $scope.reset = function () {
            $scope.state = undefined;
        };

        $scope.isCustomEnabled = true;
        $scope.custom = ['Item 1', 'Item 2', 'Item 3'];
        $scope.customOptions = {
            displayText: 'This text is modifyable',
            emptyListText: 'Oops! The list is empty',
            emptySearchResultText: 'Sorry, couldn\'t find "$0"'
        };

        $scope.growable = ['Item 1', 'Item 2', 'Item 3'];
        $scope.growableOptions = {
            displayText: 'Select or add a new item...',
            addText: 'Add new item',
            onAdd: function (text) {
                var newItem = 'Item ' + text;
                $scope.growable.push(newItem);
                return newItem;
            }
        };

        $scope.searchAsync = function (term) {
            // No search term: return initial items
            if (!term) {
                return ['Item 1', 'Item 2', 'Item 3'];
            }
            var deferred = $q.defer();
            $timeout(function () {
                var result = [];
                for (var i = 1; i <= 3; i++) {
                    result.push(term + ' ' + i);
                }
                deferred.resolve(result);
            }, 300);
            return deferred.promise;
        };

        $scope.people = [
            { name: 'John Doe', phone: '555-123-456', picture: 'http://www.saintsfc.co.uk/images/common/bg_player_profile_default_big.png' },
            { name: 'Axel Zarate', phone: '888-777-6666', picture: 'https://avatars0.githubusercontent.com/u/4431445?s=60' },
            { name: 'Walter White', phone: '303-111-2222', picture: 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg' }
        ];

        $scope.nestedItemsLevel1 = ['Item 1', 'Item 2', 'Item 3'];
        $scope.level1Options = {
            onSelect: function (item) {
                var items = [];
                for (var i = 1; i <= 5; i++) {
                    items.push(item + ': ' + 'Nested ' + i);
                }
                $scope.nestedItemsLevel2 = items;
            }
        };

        $scope.nestedItemsLevel2 = [];
    }]);

})();