/**
 * @ngdoc service
 * @module DocumentManager
 * @name  DocumentManager
 * @description Service for managing documents
 */
angular.module('projiSeApp').factory('DocumentManager', function($http, $q, $modal, $state, socket) {
    'use strict';

    //Fetch metadata for all documents on load
    $http.get('/api/documentsMeta').success(function(documentManager) {
        //Update public array
        DocumentManager.all = angular.copy(documentManager);

        //Set up sync for public array (updates on documentMeta:save/remove)
        socket.syncUpdates('documentMeta', DocumentManager.all);
    });

    var DocumentManager = {

        /**
         * @name all
         * @description List of metadata for all documents
         */
        all: [],

        /** Metadata for active document */
        activeDocument: undefined,

        /** Document body for active document */
        activeDocumentData: {},

        /**
         * Create document, opens modal and sends post request on submit
         */
        create: function() {
            //Open modal
            var createModal = $modal.open({
                templateUrl: 'app/document/documentManager/create/create.html',
                controller: 'documentCreateController'
            });

            //Make post on result from modal
            createModal.result.then(function(newDocument) {
                $http.post('/api/documentsMeta', newDocument);
            });
        },

        /** Open document in editor */
        /**
         * Open document in editor
         * @param documentMeta document metadata
         */
        edit: function(documentMeta) {

            //Fetch, set and view data for active document
            DocumentManager.show(documentMeta).then(function() {

                //Open document editor
                $state.go('dashboard.document.editor');
            });
        },

        /** Fetch, set and show chosen document */
        show: function(documentMeta) {
            //Defer, sometimes we'll need to know when it's done
            var deferred = $q.defer();
            DocumentManager.activeDocument = angular.copy(documentMeta);
            $http.get('/api/documentsData/' + documentMeta._id).success(function(documentData) {
                DocumentManager.activeDocumentData = angular.copy(documentData);
                deferred.resolve();
            });

            return deferred.promise;
        },

        /** Edit document metadata, opens modal and posts changes on submit */
        update: function(documentMeta) {

            //Open modal
            var editModal = $modal.open({
                templateUrl: 'app/document/documentManager/edit/edit.html',
                controller: 'documentEditController',
                resolve: {
                    documentMeta: function() {
                        return documentMeta;
                    }
                }
            });

            //Make post on submit
            editModal.result.then(function(editedDocument) {
                $http.post('/api/documentsMeta', editedDocument);
            });
        },

        /** Updates document body */
        updateData: function(documentData) {
            $http.put('/api/documentsData/' + documentData._id, documentData);
        },

        /** Deletes document */
        delete: function(documentMeta) {
            $http.delete('/api/documentsMeta/' + documentMeta._id);
        }
    };

    return DocumentManager;
});
