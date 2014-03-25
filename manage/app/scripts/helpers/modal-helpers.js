/*global define */
(function() {
    'use strict';
    define(['lodash'], function(_) {
        return {
            UnAuthorized: function($modal, options) {
                options = options || {};
                return $modal(_.extend({
                    title: 'UNAUTHORIZED ACCESS',
                    content: 'Unauthorized access to API. It looks like your authentication tokens are invalid. Please try logging out and back in again.',
                    container: 'body',
                    template: 'views/custom-modal.html'
                }, options));
            },
            UnexpectedError: function($modal, options) {
                options = options || {
                    status: '?'
                };
                return $modal(_.extend({
                    title: 'UNEXPECTED ERROR (' + options.status + ')',
                    container: 'body',
                    template: 'views/custom-modal.html'
                }, options));
            },
            SuccessfulRequest: function($modal, options) {
                options = options || {};
                return $modal(_.extend({
                    content: 'This may take a few seconds. We\'ll let you know when it\'s done.',
                    container: 'body',
                    template: 'views/custom-modal.html',
                    backdrop: 'static', // disable mouse clicks for now since I can't wrap them or supply a callback
                    keyboard: false
                }, options));
            },
            makeOnError: function(modal, callback) {
                return function onError(resp) {
                    if (resp.status === 403) {
                        modal.$scope.title = '<i class="text-danger fa fa-exclamation-circle"></i> Unauthorized Access';
                        modal.$scope.content = 'Try logging out and back in again.';
                    } else {
                        modal.$scope.title = 'Unexpected Error ' + resp.status;
                        modal.$scope.content = '<pre>' + resp.data + '</pre>';
                    }
                    modal.$scope._hide = function() {
                        modal.$scope.$hide();
                    };
                    modal.$scope.disableClose = false;
                    modal.$scope.$show();
                    if (_.isFunction(callback)) {
                        callback.call(undefined);
                    }
                };
            }
        };
    });
})();
