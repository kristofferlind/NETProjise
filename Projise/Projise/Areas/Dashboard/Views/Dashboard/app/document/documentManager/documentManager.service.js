/**
 * @ngdoc service
 * @module DocumentManager
 * @name  DocumentManager
 * @description Service for managing documents
 */
angular.module('projiSeApp').factory('DocumentManager', function($http, $q, $modal, $state, socket) {
    'use strict';

    //Fetch metadata for all documents on load
    $http.get('/api/documents').success(function(documentManager) {
        //Update public array
        DocumentManager.all = angular.copy(documentManager);

        //Set up sync for public array (updates on documentMeta:save/remove)
        socket.syncUpdates('document', DocumentManager.all);
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
                templateUrl: 'Areas/Dashboard/Views/Dashboard/app/document/documentManager/create/create.html',
                controller: 'documentCreateController'
            });

            //Make post on result from modal
            createModal.result.then(function(newDocument) {
                $http.post('/api/documents', newDocument);
            });
        },

        /** Open document in editor */
        /**
         * Open document in editor
         * @param documentMeta document metadata
         */
        edit: function(document) {

            //Fetch, set and view data for active document
            DocumentManager.show(document).then(function() {

                //Open document editor
                $state.go('dashboard.document.editor');
            });
        },

        /** Fetch, set and show chosen document */
        show: function(documentMeta) {
            //Defer, sometimes we'll need to know when it's done
            var deferred = $q.defer();

            var doc = _.find(DocumentManager.all, { _id: documentMeta._id });

            DocumentManager.activeDocument = angular.copy(documentMeta);
            DocumentManager.activeDocumentData = angular.copy(doc);

            deferred.resolve();
            console.log()

            //DocumentManager.activeDocument = angular.copy(documentMeta);
            //$http.get('/api/documentsData/' + documentMeta._id).success(function(documentData) {
            //    DocumentManager.activeDocumentData = angular.copy(documentData);
            //    deferred.resolve();
            //});

            return deferred.promise;
        },

        /** Edit document metadata, opens modal and posts changes on submit */
        update: function(documentMeta) {

            //Open modal
            var editModal = $modal.open({
                templateUrl: 'Areas/Dashboard/Views/Dashboard/app/document/documentManager/edit/edit.html',
                controller: 'documentEditController',
                resolve: {
                    documentMeta: function() {
                        return documentMeta;
                    }
                }
            });

            //Make post on submit
            editModal.result.then(function(editedDocument) {
                $http.put('/api/documents', editedDocument);
            });
        },

        /** Updates document body */
        updateData: function(documentData) {
            $http.put('/api/documents/', documentData);
        },

        /** Deletes document */
        delete: function(documentMeta) {
            $http.delete('/api/documents/' + documentMeta._id);
        }
    };

    return DocumentManager;
});
