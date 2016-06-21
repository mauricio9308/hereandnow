/**
 * Created by ivancho on 6/20/16.
 */
(function () {
	'use strict';

    //Declaring the module
    angular.module('alertSystem').factory('LocationWatcher', LocationWatcher);

    LocationWatcher.$inject = ['$localStorage'];

    function LocationWatcher($localStorage){

    	return {
            bindLocationUpdate: bindLocationUpdate
        };

        function bindLocationUpdate(){
			navigator.geolocation.watchPosition(function(position) {
				if(firebase){
					var userID = $localStorage.user.uid;
					firebase.database().ref("/users/" + userID + "/location/").set({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				}else{
					alert('Firebase not set');
				}
			});
		}

    }
}(firebase));