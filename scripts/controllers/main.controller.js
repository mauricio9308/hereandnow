/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').controller('MainController', MainController);

    MainController.$inject = ['$localStorage', '$rootScope'];

    /**
     * Controller for the Main Screen of the application
     * */
    function MainController($localStorage, $rootScope){
        var vm = this;

        /* callback functions for the main toolbar actions */
        vm.addReport = function(){
            toggleReportDialog( true ); // Displaying the dialog
        };

        /**
         * Refreshes the content displayed in the map view
         * */
        vm.refresh = function(){
            alert('Add Function');
        };

        /**
         * Checking if the user is already logged in, if so we hide the login dialog
         * */
        vm.currentUser = $localStorage.user;
        if( vm.currentUser ){
            //We just close the login dialog
            toggleLoginDialog( false  /* show */);
        }


        /**
         * We just listen to the changes of the logged in user
         * */
        $rootScope.$on('UserAuthenticationChanged', function( event ){
            //We update the current user reference
            vm.currentUser = $localStorage.user;

            var isUserAuthenticated = ( vm.currentUser === undefined );
            toggleLoginDialog( !isUserAuthenticated  /* show */);
        });

        /**
         * Function for toggle the login dialog
         * */
        function toggleLoginDialog( show ){
            var dialogElementClasses = document.querySelector('.login-container').classList;

            /* triggering the display or not of the dialog */
            if ( show ) {
                dialogElementClasses.add('login-container--visible');
            } else {
                dialogElementClasses.remove('login-container--visible');
            }
        }


        /**
         * Function for open the report dialog
         * */
        function toggleReportDialog( show ){
            var dialogElementClasses = document.querySelector('.dialog-container').classList;

            /* triggering the display or not of the dialog */
            if ( show ) {
                dialogElementClasses.add('dialog-container--visible');
            } else {
                dialogElementClasses.remove('dialog-container--visible');
            }
        }

    }
}());