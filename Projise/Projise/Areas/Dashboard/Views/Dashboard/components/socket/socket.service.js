/* global io */

/**
 * @ngdoc service
 * @name  Socket
 * @todo  add namespacing (io.for(projectId)) to decrease traffic and make sure more projects can be active at once.
 * @description Manages socket operations.
 */
angular.module('projiSeApp')
    .factory('socket', ['$q', 'Hub', '$rootScope', 'Notify', function($q, Hub, $rootScope, Notify) {
        'use strict';

        //$scope = $rootScope.new();

        var socket = {
            /**
             * @ngdoc function
             * @name  syncUpdates
             * @param {String} modelName
             * @param {Array} array
             * @param {Function} cb
             * @description Register listeners to sync an array with updates on a model
             *
             * Takes the array we want to sync, the model name that socket updates are sent from,
             * and an optional callback function after new items are updated.
             */
            syncUpdates: function (modelName, array, isSprintBacklog, cb) {
                cb = cb || angular.noop;

                /**
                 * Syncs item creation/updates on 'model:save'
                 */
                var lastChange = 0;

                var isSkippedNotification = (modelName === 'document' || modelName === 'user' || modelName === 'task' || modelName === 'message' || isSprintBacklog === true);


                var reSync = function () {
                    //run client operations saved since going offline(

                    //Dont do resync? signalr solves for reconnections.. might need it for longer disconnections
                        //start sync from lastchange, fetching everything that happened on the server since going offline
                        //possible to send this on the actual reconnect event?
                };

                $rootScope.$on('socket:save:' + modelName, function (event, data) {
                    handleSave(data);
                });

                var onChange = function (operation, type, item, operationId) {
                    //lastOperation = operationId;

                    if (modelName == type) {
                        switch (operation) {
                            case "save":
                                handleSave(item);
                                break;
                            case "remove":
                                handleRemove(item);
                                break;
                            default:
                                console.log("error:", operation);
                        }
                    }
                };

                var handleSave = function (item) {
                    var oldItem;

                    if (item === null) {
                        return;
                    }
                    if (!_.isArray(array)) {

                        if (!array) {
                            angular.copy(item, array);
                            cb('updated', item, array);
                        }
                        if (!_.isArray(item) && !_.isArray(array)) {
                            if (array._id === item._id) {
                                angular.copy(item, array);
                                cb('updated', item, array);
                            }
                        }
                    } else {
                        oldItem = _.find(array, {
                            _id: item._id
                        });
                        var index = array.indexOf(oldItem);
                        var event = 'created';

                        if (oldItem) {
                            if (modelName === 'story' && oldItem.sprintId && !item.sprintId && isSprintBacklog === true) {
                                $rootScope.$apply(function () {
                                    _.remove(array, { _id: item._id });
                                })
                            } else {
                                //a bit of a hack, change isn't applied if $digest cycle is already running, do it twice to make sure =/
                                //maybe apply should always be done without stuff inside, and the change done before?
                                array.splice(index, 1, item);
                                $rootScope.$apply(function () {
                                    array.splice(index, 1, item);
                                })
                                event = 'updated';
                            }
                        } else {
                            if (!isSprintBacklog || (isSprintBacklog && item.sprintId)) {
                                $rootScope.$apply(function () {
                                    array.push(item);
                                })
                            }
                        }

                        cb(event, item, array);
                    }
                    if (!isSkippedNotification && !item.notSynced) {
                        Notify.success(modelName + ': ' + item.name + ' ' + event);
                    }
                }

                var handleRemove = function (item) {
                    var event = 'deleted';
                    $rootScope.$apply(function () {
                        _.remove(array, {
                            _id: item._id
                        });
                    });
                    cb(event, item, array);
                    if (!isSkippedNotification && !item.notSynced) {
                        Notify.success(modelName + ': ' + item.name + ' ' + event)
                    }
                }

                var handleError = function (error) {
                    //console.error(error);
                }

                var hub = new Hub('projectHub', {
                    listeners: {
                        'onChange': onChange
                        //'reconnecting': onReconnecting,
                        //'reconnected': onReconnected,
                        //'disconnected': onDisconnected
                    },
                    errorHandler: handleError
                })
            },

            /**
             * @ngdoc function
             * @name  unsyncUpdates
             * @param modelName
             * @description Removes listeners for a models updates on the socket
             */
            unsyncUpdates: function (modelName) {
                console.log("not implemented");
                //socket.removeAllListeners(modelName + ':save');
                //socket.removeAllListeners(modelName + ':remove');
            }
        };

        return socket;
    }]);
