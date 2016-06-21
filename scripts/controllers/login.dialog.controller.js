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

        /**
         * Triggers the login process for the application
         * */
        vm.loginWithGooglePlus = function(){
            GoogleLoginService.googleLogin();
        };
    }

}());