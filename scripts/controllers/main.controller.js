/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').controller('MainController', MainController);

    MainController.$inject = ['$localStorage', '$rootScope', 'GoogleLoginService', 'ToastService', '$scope'];

    /**
     * Controller for the Main Screen of the application
     * */
    function MainController($localStorage, $rootScope, GoogleLoginService, ToastService, $scope){
        var vm = this;

        //Flag for the report dialog open
        vm.isReportDialogOpen = false;

        /* callback functions for the main toolbar actions */
        vm.addReport = function(){
            toggleReportDialog( true ); // Displaying the dialog
        };

        /**
         * Starts the log out process for the current user
         * */
        vm.logout = function(){
            //We trigger the logout process
            GoogleLoginService.logout().then(function(){
                ToastService.showMessage('Success log in out C:. See you soon!')
            }).catch(function(){
                ToastService.showMessage('There was an error while log in out :C')
            });
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
         * Listening to the open or close of the report dialog
         * */
        $scope.$on('toggleReportDialog', function( event, isShowing ){
            vm.isReportDialogOpen = isShowing;
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
            vm.isReportDialogOpen = show; // We update the visibility of the FAB

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