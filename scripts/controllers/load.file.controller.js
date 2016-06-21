(function(){
    'use strict';

    //Declaring the module
    angular.module('alertSystem').factory('uploadPictureController', uploadPictureController);

    function uploadPictureController() {
        return {
            uploadFile: uploadFile,
            guid: guid
        };

        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }
        function uploadFile(onSuccess, onFailure){
            var file = document.querySelector('#uploadfiles').files[0];
            var uuid = guid();
            var storageRef = firebase.storage().ref('/reports/');
            var uploadTask = storageRef.child('images/' + uuid + file.name).put(file);

            uploadTask.on('state_changed', function(snapshot){
                // Observe state change events such as progress, pause, and resume
                // See below for more detail
            }, function(error) {
                // Handle unsuccessful uploads
                onFailure(error)
            }, function() {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                var downloadURL = uploadTask.snapshot.downloadURL;
                onSuccess(downloadURL);
            });
        }
    }
}())