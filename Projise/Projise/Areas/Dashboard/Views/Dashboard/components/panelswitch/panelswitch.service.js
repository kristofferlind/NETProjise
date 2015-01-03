
/**
 * @ngdoc service
 * @name  PanelSwitch
 * @description Manages states for panels
 */
angular.module('projiSeApp').factory('PanelSwitch', ['$rootScope', function($rootScope) {
    'use strict';

    var _navpanel = true,
        _chatpanel = true,
        PanelSwitch = {
            navpanel: {
                /**
                 * @ngdoc method
                 * @name  switch
                 * @description Switches state for navpanel
                 */
                switch: function() {
                    _navpanel = !_navpanel;
                    $rootScope.$broadcast('navpanel:switched');
                },
                /**
                 * @ngdoc method
                 * @name  get
                 * @returns {Boolean}
                 * @description Get state of navpanel
                 */
                get: function() {
                    return _navpanel;
                }
            },
            chatpanel: {
                /**
                 * @ngdoc method
                 * @name  switch
                 * @description Switches state for chatpanel
                 */
                switch: function() {
                    _chatpanel = !_chatpanel;
                    $rootScope.$broadcast('chatpanel:switched');
                },
                /**
                 * @ngdoc method
                 * @name  get
                 * @returns {Boolean}
                 * @description Get state of chatpanel
                 */
                get: function() {
                    return _chatpanel;
                }
            }
        };

    return PanelSwitch;
}]);
