/**
 * @ngdoc directive
 * @name drag
 * @description Makes an item draggable, saves its data to be able to transfer on drop
 */
angular.module('projiSeApp')

.directive('drag', function() {
    'use strict';
    // Runs during compile
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs) {
            var element = iElm[0];

            //Make element draggable (html attribute)
            element.draggable = true;

            //Execute on drag
            element.addEventListener('dragstart', function(e) {
                var itemData = iAttrs.dragData,
                    itemType = iAttrs.dragType; //For when multiple drag&drops are used in the same page.

                //$scope.eval needed to make itemData an object again
                itemData = $scope.$eval(itemData);

                //Convert itemData to json
                var item = angular.toJson(itemData);

                //Save item on datatransfer (to be able to fetch it on drop)
                e.dataTransfer.setData('json/item', item);
                e.dataTransfer.setData('itemType', itemType);
            });
        }
    };
});

/**
 * @ngdoc directive
 * @name  drop
 * @description Sets element as dropzone, fetches saved data and executes on-drop expression (most likely a function)
 */
angular.module('projiSeApp')


.directive('drop', ['$parse', function($parse) {
    'use strict';
    // Runs during compile
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs) {
            var element = iElm[0];

            //Set element as dropzone
            element.addEventListener('dragover', function(e) {
                //Default is not droppable, therefore prevent default.
                e.preventDefault();
            });

            //Execute on dropping element
            element.addEventListener('drop', function(e) {
                //Collect data
                var itemData = e.dataTransfer.getData('json/item'),
                    onDrop = $parse(iAttrs.onDrop),
                    itemType = e.dataTransfer.getData('itemType'),
                    acceptType = iAttrs.dropType;

                //Make sure itemType is accepted
                if (itemType === acceptType) {
                    //convert json to object
                    var item = angular.fromJson(itemData);

                    //http://stackoverflow.com/questions/17583004/call-an-angularjs-controller-function-from-a-directive-without-isolated-scope
                    onDrop($scope, {
                        $item: item
                    });

                    e.preventDefault();
                }
            });
        }
    };
}]);
