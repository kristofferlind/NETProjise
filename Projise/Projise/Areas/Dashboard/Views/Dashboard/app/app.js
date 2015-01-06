'use strict';

/**
 * @name App
 * @description This module handles initiation logic and root routes.
 */
angular.module('projiSeApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'btford.markdown'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
        .otherwise('/');

    $stateProvider.state('dashboard', {
        url: '',
        abstract: true,
        resolve: {
            resolvedSocket: ['socket', function (socket) {
                return socket.checkHub;
            }],
            resolvedSession: ['Session', function (Session) {
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
    $httpProvider.interceptors.push('offlineInterceptor');
}])

.config(['$tooltipProvider', function ($tooltipProvider) {
    $tooltipProvider.options({
        animation: true,
        popupDelay: 450
    });
    $tooltipProvider.setTriggers({
        'mouseenter': 'mouseleave click'
    });
}])

.factory('offlineInterceptor', ['$q', '$rootScope', 'Notify', function ($q, $rootScope, Notify) {
    'use strict';

    var requestInterceptor = {
        response: function (response) {
            //cache data if get request
            if (response.config.method === 'GET' && $rootScope.user && $rootScope.user.activeProject) {
                var key = $rootScope.user.activeProject + ':' + response.config.url;
                localStorage[key] = angular.toJson(response);
            }

            return response;
        },
        responseError: function (response) {
            //try to load data from cache if GET
            var deferred = $q.defer();

            if (response.config.method === 'GET' && !$rootScope.isOnline && $rootScope.user && $rootScope.user.activeProject) {
                var key = $rootScope.user.activeProject + ':' + response.config.url;
                var data = localStorage[key];
                if (data) {
                    deferred.resolve(angular.fromJson(data));
                } else {
                    deferred.reject('no-cache');
                }
            } else {
                deferred.reject();
            }

            //try to update ui and save request if offline (delete never allowed)
            if (!$rootScope.isOnline && (response.config.method === 'POST' || response.config.method === 'PUT') && $rootScope.user && $rootScope.user.activeProject) {
                var modelRe = /api\/(\w+)\//;
                var matches = modelRe.exec(response.config.url);
                var model = matches[1];

                if (matches) {
                    model = model.substr(0, model.length - 1);
                    model = model.replace('ie', 'y');
                    //console.log(model);

                    response.config.data.notSynced = true;

                    $rootScope.$broadcast('socket:save:' + model, response.config.data);
                    var toBeSynced = angular.fromJson(localStorage['toBeSynced']) || [];
                    var syncItem = {
                        method: response.config.method,
                        url: response.config.url,
                        data: response.config.data
                    }
                    toBeSynced.push(syncItem);
                    localStorage['toBeSynced'] = angular.toJson(toBeSynced);
                }
            }

            //Error notifications (if we're online and still get an error)
            if ($rootScope.isOnline) {

                /*
                 * There actually is no need to show normal validation errors, there is no scenario where a user can
                 * view the site but not see the validations that are already in place
                 * But it's a bit interesting to add, and we might need this for validations that can't be done in the client
                 */


                //do a switch based on status?
                //if response.status === 401, throw user to login (is this handled by .net?)
                


                //Is this a validationerror?
                if (response.data.modelState) {
                    var details;

                    var modelErrors = response.data.modelState;
                    for (var prop in response.data.modelState) {
                        var property = modelErrors[prop];
                        for (var err in property) {
                            var error = property[err];
                            //console.log(error);
                            Notify.error(prop + ': ' + error);
                        }
                    }
                }
            }


            return deferred.promise;
        }
    }

    return requestInterceptor;
}]);


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
