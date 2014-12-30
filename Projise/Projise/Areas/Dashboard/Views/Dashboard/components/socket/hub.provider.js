//Based on https://github.com/JustMaier/angular-signalr-hub
angular.module('projiSeApp').factory('Hub', function ($q, $rootScope, SyncManager) {
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

        Hub.connection.disconnected = function () {
            console.log('disconnected');
        }

        Hub.connection.reconnected = function () {
            console.log('managed to reconnect');
        }

        Hub.connection.reconnecting = function () {
            //console.log('trying to reconnect');
        }

        Hub.connection.stateChanged(function (state) {
            var old = state.oldState,
                current = state.newState,
                states = $.signalR.connectionState;

            switch (current) {
                case states.connecting:
                    //$rootScope.$apply(function () {
                    //    $rootScope.isOnline = false;
                    //})
                    break;
                case states.connected:
                    //console.log('managed to connect');
                    $rootScope.$apply(function () {
                        $rootScope.isOnline = true;
                        SyncManager.sync();
                    })
                    break;
                case states.reconnecting:
                    //console.log('trying to reconnect');
                    $rootScope.$apply(function () {
                        $rootScope.isOnline = false;
                    })
                    break;
                case states.disconnected:
                    //console.log('lost connection to server :(');
                    $rootScope.$apply(function () {
                        $rootScope.isOnline = false;
                    })
                    break;
            }
        })

        Hub.promise = Hub.connection.start();
    };
    return Hub;
})