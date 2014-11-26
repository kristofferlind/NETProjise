/* global io */

/**
 * @ngdoc service
 * @name  Socket
 * @todo  add namespacing (io.for(projectId)) to decrease traffic and make sure more projects can be active at once.
 * @description Manages socket operations.
 */
angular.module('projiSeApp')
    .factory('socket', function(socketFactory) {
    'use strict';

    // Websockets on openshift
    // var ioSocket = io('http://projise-klind.rhcloud.com:8000/', {
    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io(null, {
        // Send auth token on connection, you will need to DI the Auth service above
        // 'query': 'token=' + Auth.getToken()
    });

    var socket = socketFactory({
        ioSocket: ioSocket
    });

    return {
        socket: socket,

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
        syncUpdates: function(modelName, array, isSprintBacklog, cb) {
            cb = cb || angular.noop;

            /**
             * Syncs item creation/updates on 'model:save'
             */
            socket.on(modelName + ':save', function(item) {
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
                            _.remove(array, {_id: item._id});
                        } else {
                            array.splice(index, 1, item);
                            event = 'updated';
                        }
                    } else {
                        array.push(item);
                    }

                    cb(event, item, array);
                }
            });

            /**
             * Syncs removed items on 'model:remove'
             */
            socket.on(modelName + ':remove', function(item) {
                var event = 'deleted';
                _.remove(array, {
                    _id: item._id
                });
                cb(event, item, array);
            });
        },

        /**
         * @ngdoc function
         * @name  unsyncUpdates
         * @param modelName
         * @description Removes listeners for a models updates on the socket
         */
        unsyncUpdates: function(modelName) {
            socket.removeAllListeners(modelName + ':save');
            socket.removeAllListeners(modelName + ':remove');
        }
    };
});
