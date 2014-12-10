'use strict';

/**
 * @name App
 * @description This module handles initiation logic and root routes.
 */
angular.module('projiSeApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'btford.markdown'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
        .otherwise('/');

    $stateProvider.state('dashboard', {
        url: '',
        abstract: true,
        resolve: {
            resolvedSession: ['Session', function(Session) {
                return Session.promise;
            }]
        },
        views: {
            'header': {
                templateUrl: 'Areas/Dashboard/Views/Dashboard/app/navbar/navbar.html',
                controller: 'NavbarController'
            },
            'panelLeft': {
                templateUrl: 'Areas/Dashboard/Views/Dashboard/app/navpanel/navpanel.html',
                controller: 'NavpanelController'
            },
            'panelRight': {
                templateUrl: 'Areas/Dashboard/Views/Dashboard/app/chatpanel/chatpanel.html',
                controller: 'ChatpanelController'
            }

        }
    });

    //$locationProvider.html5Mode(true);
    //$httpProvider.interceptors.push('authInterceptor');
}])

.config(['$tooltipProvider', function($tooltipProvider) {
    $tooltipProvider.options({
        animation: true,
        popupDelay: 450
    });
    $tooltipProvider.setTriggers({
        'mouseenter': 'mouseleave click'
    });
}])

//.factory('authInterceptor', ['$rootScope', '$q', '$cookieStore', '$location', function($rootScope, $q, $cookieStore, $location) {
//    return {
//        // Add authorization token to headers
//        request: function(config) {
//            config.headers = config.headers || {};
//            if ($cookieStore.get('token')) {
//                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
//            }
//            return config;
//        },

//        // Intercept 401s and redirect you to login
//        responseError: function(response) {
//            if (response.status === 401) {
//                $location.path('/login');
//                // remove any stale tokens
//                $cookieStore.remove('token');
//                return $q.reject(response);
//            } else {
//                return $q.reject(response);
//            }
//        }
//    };
//}])

//.run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {
//    // Redirect to login if route requires auth and you're not logged in
//    $rootScope.$on('$stateChangeStart', function(event, next) {
//        Auth.isLoggedInAsync(function(loggedIn) {
//            if (next.authenticate && !loggedIn) {
//                $location.path('/login');
//            }
//        });
//    });
//}]);
