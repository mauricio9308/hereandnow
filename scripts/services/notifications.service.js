(function () {
    'use strict';

    angular.module('alertSystem').service('NotificationsService', NotificationsService);

    function NotificationsService($q) {
        this.subscriberIdPromiseMgr = $q.defer();
        this.promiseToHaveSubscriberId = this.subscriberIdPromiseMgr.promise;
    }

    NotificationsService.prototype.setSubscriberId = function(subscriberId) {
        this.subscriberId = subscriberId;
        this.subscriberIdPromiseMgr.resolve(this.subscriberId);
    };

}());