/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').controller('LoginDialogController', LoginDialogController);

    //Injection of the dependencies
    LoginDialogController.$inject = ['GoogleLoginService'];

    /**
     * Controller dialog for the login sequence
     * */
    function LoginDialogController(GoogleLoginService){
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
                toggleLoginDialog( false /* show */)
            }).catch(function( rejectReason ){
                /* we just set the error message */
                vm.errorMessage = rejectReason;
            });
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