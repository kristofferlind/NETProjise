/**
 * @ngdoc filter
 * @name  toArray
 * @todo  Check if this is even used, if it is. Refactor, it's really hard to follow.
 * @description Rebuilds firebase object(omnibinder) to an array that angular can work with.
    This makes it possible to use angulars builtin filters for order, limit, filter..
 */
angular.module('projiSeApp')
.filter('toArray', function() {
    'use strict';
    return function(input) {
        //Function for checking that input is actually a number
        var isNumber = function(number) {
            //angular.isNumber could also have been used here..
            return !isNaN(parseFloat(number)) && isFinite(number);
        };

        //Do nothing if input is not an object
        if (!angular.isObject(input)) {
            return input;
        }

        //Initialize output as an array
        var output = [];

        //For each property on object (key of obj, input[key])
        for (var key in input) {
            //If $ is first char prop is private and used by firebase
            //Therefore we skip these when building our array
            if (key.substr(0, 1) !== '$') {
                //Set item to value of property (input.item)
                var item = input[key];
                //Save its key on id
                item.Id = key;

                //For each subproperty
                for (var prop in item) {
                    //Set subItem as value of subproperty (input.item.subItem)
                    var subItem = item[prop];
                    //Check if its a number
                    if (isNumber(subItem)) {
                        //Parse into an actual number (saved in firebase as string, which makes ordering odd)
                        subItem = parseInt(subItem, 10);
                        item[prop] = subItem;
                    }
                }
                //Push item to output array
                output.push(item);
            }
        }
        //return transformed array
        return output;
    };
});
