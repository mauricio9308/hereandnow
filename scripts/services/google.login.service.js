/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').factory('GoogleLoginService', GoogleLoginService);

    //Declaration of the factory
    GoogleLoginService.$inject = ['$q', '$localStorage'];
    /**
     * Service in charge of the Google Login Management
     * */
    function GoogleLoginService($q, $localStorage){

        // Public API
        return {
            googleLogin: googleLogin,
            logout : logout
        };

        /**
         * Executes the google login sequence
         * */
        function googleLogin(){
            var googleLoginDefer = $q.defer();

            // Setting the Google Auth Provider
            var provider = new firebase.auth.GoogleAuthProvider();

            /* requesting the Firebase authentication */
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                $localStorage.accessToken = result.credential.accessToken;

                //We store the user information
                $localStorage.user = {
                    displayName : result.user.displayName,
                    email: result.email,
                    photoURL : result.photoURL,
                    uid : result.uid
                };

                //Success authenticating the user
                googleLoginDefer.resolve( result );
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                //Loggin the error message
                console.log( errorMessage );
                console.log( errorCode );

                // Rejecting the Google + login
                googleLoginDefer.reject( errorMessage );
            });

            //Returning the google login promise
            return googleLoginDefer.promise;
        }

        /**
         * Just log outs the user of the API
         * */
        function logout(){
            var logoutDefer = $q.defer();

            firebase.auth().signOut().then(function() {
                // Sign-out successful.

                /* we destroy any reference of the user */
                $localStorage.$reset();

                logoutDefer.resolve( true );
            }, function(error) {
                // An error happened, we don't care we just advice the user.
                console.log( error );

                logoutDefer.reject( false );
            });

            //Returning the logout promise
            return logoutDefer.promise;
        }
    }

}(firebase));