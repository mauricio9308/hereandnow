/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').controller('LoginDialogController', LoginDialogController);

    //Injection of the dependencies
    LoginDialogController.$inject = ['GoogleLoginService', '$rootScope'];

    /**
     * Controller dialog for the login sequence
     * */
    function LoginDialogController(GoogleLoginService, $rootScope){
        var vm = this;

        //Error message if any
        vm.errorMessage = undefined;

        vm.loaded ={display:'block'};

        /**
         * Triggers the login process for the application
         * */
        vm.loginWithGooglePlus = function(){
            //Removing the error message
            vm.errorMessage = undefined;

            GoogleLoginService.googleLogin().then(function( result ){
                /* success authenticating the user */

                //Removing the login dialog
                toggleLoginDialog( false /* show */);

                //Removing the login dialog
                $rootScope.$emit('toggleReportDialog', false);
            }).catch(function( rejectReason ){
                /* we just set the error message */
                vm.errorMessage = rejectReason;
            });
        };

        /**
         * Continues without a session
         * */
        vm.continueWithoutSession = function(){
            //Removing the login dialog
            toggleLoginDialog( false /* show */);

            //Emit the message of the login dialog
            $rootScope.$emit('toggleReportDialog', false);
        };

        /**
         * Function for open the report dialog
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
    }

}());