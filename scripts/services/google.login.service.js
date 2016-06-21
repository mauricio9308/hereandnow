/**
 * Created by mauriciolara on 6/20/16.
 */
(function () {
    'use strict';

    angular.module('alertSystem').factory('GoogleLoginService', GoogleLoginService);

    //Declaration of the factory
    GoogleLoginService.$inject = ['$q', '$localStorage', '$firebaseAuth'];
    /**
     * Service in charge of the Google Login Management
     * */
    function GoogleLoginService($q, $localStorage, $firebaseAuth) {
        var fbAuth = $firebaseAuth();

        // Public API
        return {
            googleLogin: googleLogin,
            logout: logout
        };

        /**
         * Executes the google login sequence
         * */
        function googleLogin() {
            return fbAuth.$signInWithPopup("google")
                .then(function (authData) {
                    console.log('logged in as', authData);
                    $localStorage.accessToken = authData.credential.accessToken;

                    //We store the user information
                    $localStorage.user = {
                        displayName: authData.user.displayName,
                        email: authData.email,
                        photoURL: authData.photoURL,
                        uid: authData.uid
                    };

                    return authData;
                }).catch(function (error) {
                    console.log("Authentication failed:", error);
                    throw error;
                });
        }

        /**
         * Just log outs the user of the API
         * */
        function logout() {
            fbAuth.$signOut();
            var logoutDefer = $q.defer();

            /* we destroy any reference of the user */
            $localStorage.$reset();
        }
    }

}());