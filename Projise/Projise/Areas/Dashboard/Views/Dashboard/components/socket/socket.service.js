/* global io */

/**
 * @ngdoc service
 * @name  Socket
 * @todo  add namespacing (io.for(projectId)) to decrease traffic and make sure more projects can be active at once.
 * @description Manages socket operations.
 */
angular.module('projiSeApp')
    .factory('socket', function($q, Hub, $rootScope) {
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

                var onChange = function (operation, type, item) {
                    if (modelName == type) {
                        console.log(type, ": ", item);
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
                                array.splice(index, 1, item);
                                event = 'updated';
                            }
                        } else {
                            $rootScope.$apply(function () {
                                array.push(item);
                            })
                        }

                        cb(event, item, array);
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
                }


                var hub = new Hub('projectHub', {
                    listeners: {
                        'onChange': onChange
                    }
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
    });
