/**
 * @ngdoc service
 * @name  Auth
 * @description Handles authentication
 */
angular.module('projiSeApp')
    .factory('Auth', ['$location', '$rootScope', '$http', 'User', '$cookieStore', '$q', '$state', function($location, $rootScope, $http, User, $cookieStore, $q, $state) {
    'use strict';

    var currentUser = {};
    if ($cookieStore.get('token')) {
        currentUser = User.get();
    }

    var Auth = {

        /**
         * @ngdoc method
         * @name  login
         * @param  {Object}   user     - login info
         * @param  {Function} callback - optional
         * @return {Promise}
         * @description Authenticate user and save token
         */
        login: function(user, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.post('/auth/local', {
                email: user.email,
                password: user.password
            }).
            success(function(data) {
                $cookieStore.put('token', data.token);
                currentUser = User.get();
                deferred.resolve(data);
                return cb();
            }).
            error(function(err) {
                Auth.logout();
                deferred.reject(err);
                return cb(err);
            });

            return deferred.promise;
        },

        /**
         * @ngdoc method
         * @name  logout
         * @param  {Function}
         * @description Delete access token and user info
         */
        logout: function() {
            $cookieStore.remove('token');
            currentUser = {};
            //Reload page
            $location.path('/login');
        },

        /**
         * @ngdoc method
         * @name createUser
         * @param  {Object}   user     - user info
         * @param  {Function} callback - optional
         * @return {Promise}
         * @description Create a new user
         */
        createUser: function(user, callback) {
            var cb = callback || angular.noop;

            return User.save(user,
                function(data) {
                    $cookieStore.put('token', data.token);
                    currentUser = User.get();
                    return cb(user);
                },
                function(err) {
                    Auth.logout();
                    return cb(err);
                }).$promise;
        },

        /**
         * @ngdoc method
         * @name  changePassword
         * @param  {String}   oldPassword
         * @param  {String}   newPassword
         * @param  {Function} callback    - optional
         * @return {Promise}
         * @description Change password
         */
        changePassword: function(oldPassword, newPassword, callback) {
            var cb = callback || angular.noop;

            return User.changePassword({
                id: currentUser._id
            }, {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, function(user) {
                return cb(user);
            }, function(err) {
                return cb(err);
            }).$promise;
        },

        /**
         * @ngdoc method
         * @name  getCurrentUser
         * @return {Object} user
         * @description Gets all available info on authenticated user
         */
        getCurrentUser: function() {
            return currentUser;
        },

        /**
         * @ngdoc method
         * @name  isLoggedIn
         * @return {Boolean}
         * @description Check if a user is logged in
         */
        isLoggedIn: function() {
            return currentUser.hasOwnProperty('role');
        },

        /**
         * @ngdoc method
         * @name  isLoggedInAsync
         * @description Waits for currentUser to resolve before checking if user is logged in
         */
        isLoggedInAsync: function(cb) {
            if (currentUser.hasOwnProperty('$promise')) {
                currentUser.$promise.then(function() {
                    cb(true);
                }).catch(function() {
                    cb(false);
                });
            } else if (currentUser.hasOwnProperty('role')) {
                cb(true);
            } else {
                cb(false);
            }
        },

        /**
         * @ngdoc method
         * @name  isAdmin
         * @return {Boolean}
         * @description Check if a user is an admin
         */
        isAdmin: function() {
            return currentUser.role === 'admin';
        },

        /**
         * @ngdoc method
         * @name  getToken
         * @description Get auth token
         */
        getToken: function() {
            return $cookieStore.get('token');
        }
    };

    return Auth;
}]);
