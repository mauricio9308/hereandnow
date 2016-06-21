/**
 * Created by mauriciolara on 6/21/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').factory('ToastService', ToastService);

    ToastService.$inject = ['$mdToast'];

    function ToastService( $mdToast ){

        //Public API
        return {
            showMessage : showMessage
        };

        /**
         * Shows a simple toast message
         * */
        function showMessage( message ){
            $mdToast.show(
                $mdToast.simple()
                    .textContent( message ) //Building the toast with the given message
                    .position('bottom right')
                    .hideDelay( 3000 /* default hide time */)
            );
        }
    }
}());