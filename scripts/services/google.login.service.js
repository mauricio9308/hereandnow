/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').factory('GoogleLoginService', GoogleLoginService);

    //Declaration of the factory
    GoogleLoginService.$inject = ['$q'];
    /**
     * Service in charge of the Google Login Management
     * */
    function GoogleLoginService($q){

        // Public API
        return {
            googleLogin: googleLogin
        };

        /**
         * Executes the google login sequence
         * */
        function googleLogin(){
            /* requesting the firebase authentication */
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });


            if(firebase){
                alert('Firebase set');
            }else{
                alert('Firebase not set');
            }
        }
    }

}(firebase));