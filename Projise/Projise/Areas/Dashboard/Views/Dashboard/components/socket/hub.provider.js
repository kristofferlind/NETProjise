//Based on https://github.com/JustMaier/angular-signalr-hub
angular.module('projiSeApp').factory('Hub', ['$q', '$rootScope', 'SyncManager', '$timeout', function ($q, $rootScope, SyncManager, $timeout) {
    'use strict';

    var connection = null,
        connect = function (options) {
            var connection = null;
            if (options && options.rootPath) {
                connection = $.hubConnection(options.rootPath, { useDefaultPath: false });
            } else {
                connection = $.hubConnection();
            }

            connection.logging = (options && options.logging ? true : false);
            return connection;
        },
        getConnection = function (options) {
            if (connection == null) {
                connection = connect(options);
            }
            return connection;
        };

    var Hub = function(hubName, options) {
        Hub.connection = getConnection(options);
        Hub.proxy = Hub.connection.createHubProxy(hubName);

        Hub.on = function (event, fn) {
            Hub.proxy.on(event, fn);
        };
        Hub.invoke = function (method, args) {
            return Hub.proxy.invoke.apply(Hub.proxy, arguments)
        };
        Hub.disconnect = function () {
            Hub.connection.stop();
        };
        Hub.connect = function () {
            Hub.connection.start();
        };

        if (options && options.listeners) {
            angular.forEach(options.listeners, function (fn, event) {
                Hub.on(event, fn);
            });
        }
        if (options && options.methods) {
            angular.forEach(options.methods, function (method) {
                Hub[method] = function () {
                    var args = $.makeArray(arguments);
                    args.unshift(method);
                    return Hub.invoke.apply(Hub, args);
                };
            });
        }
        if (options && options.queryParams) {
            Hub.connection.qs = options.queryParams;
        }
        if (options && options.errorHandler) {
            Hub.connection.error(options.errorHandler);
        }

        Hub.connection.stateChanged(function (state) {
            var old = state.oldState,
                current = state.newState,
                states = $.signalR.connectionState,
                hasBeenOnline = false,
                hasBeenOffline = false,
                lastDisconnected,
                now = new Date(),
                tooLongSinceConnected;

            if (lastDisconnected) {
                tooLongSinceConnected = now.getTime() - lastDisconnected.getTime() > 25000;
            }

            switch (current) {
                case states.connecting:
                    $timeout(function () {
                        $rootScope.isOnline = false;
                    });
                    break;
                case states.connected:
                    //This is really ugly, but it would work..
                    //var now = new Date();
                    //if (localStorage['lastConnect'] && now.getTime() - angular.fromJson(localStorage['lastConnect']) > 15000) {
                    //    window.location.href = "/Dashboard";      //this would work if we could invalidate resolvedata
                    //}
                    //localStorage['lastConnect'] = angular.toJson(new Date());

                    //console.log('hasBeenOnline', hasBeenOnline);
                    //console.log('hasBeenOffline', hasBeenOffline);
                    //console.log(lastDisconnected);
                    //console.log('toolong', tooLongSinceConnected);
                    //console.log('shouldReload', (!hasBeenOnline && hasBeenOffline) || (hasBeenOnline && lastDisconnected && tooLongSinceConnected));

                    if ((!hasBeenOnline && hasBeenOffline) || (hasBeenOnline && lastDisconnected && tooLongSinceConnected)) {
                        document.location.reload();

                        //This would reload resolves, but not all of them, cant use?
                        //$state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                    }

                    $timeout(function () {
                        hasBeenOnline = true;
                        $rootScope.isOnline = true;
                        SyncManager.sync();
                    })
                    break;
                case states.reconnecting:
                    if (hasBeenOnline && old === states.connected) {
                        lastDisconnected = new Date();
                        hasBeenOffline = true;
                    }

                    $timeout(function () {
                        $rootScope.isOnline = false;
                        Hub.connection.start();
                    })
                    break;
                case states.disconnected:
                    hasBeenOffline = true;
                    $timeout(function () {
                        $rootScope.isOnline = false;
                    });

                    $timeout(function () {
                        Hub.connection.start();
                    }, 5000);

                    break;
            }
        })

        Hub.promise = Hub.connection.start();
    };

    return Hub;
}])