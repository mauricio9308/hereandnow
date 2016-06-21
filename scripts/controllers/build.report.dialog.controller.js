/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').controller('BuildReportDialogController', BuildReportDialogController);

    /* injecting the report message */
    BuildReportDialogController.$inject = ['ReportsService', 'level', 'LevelColorsService',
        '$mdDialog', '$localStorage', 'ToastService', '$rootScope', 'event', 'uploadPictureController'];

    /**
     * Controller in charge of the report creation
     * */
    function BuildReportDialogController( ReportsService, level, LevelColorsService,
                                          $mdDialog, $localStorage, ToastService, $rootScope, event, uploadPictureController){

        var vm = this;

        //Loading flag
        vm.isLoading = false;

        // Setting the report information holder
        vm.report = {
            //We make only level 2 or less alert kinds public by default (Message and lost)
            isAnonymous : ( level <= 2 ? false : true )
        };

        console.log('passed event: ' + event);

        /**
         * Getting the reference of the given report level
         * */
        vm.getReportLevelName = function(){
            return LevelColorsService.getLevelName( level );
        };

        /**
         * Getting the reference of the given report level color
         * */
        vm.getReportLevelColor = function(){
            return LevelColorsService.getLevelColor( level );
        };

        /**
         * Submits a new report for the user
         * */
        vm.submit = function( form ){
            if( !vm.report.description ){
                return; //We don't have a description
            }

            //Setting the loading flag
            vm.isLoading = true;

            function sendReport(photoURL){
              /* we obtain the location */
                navigator.geolocation.getCurrentPosition(function ( position ){
                    /* we build the user data to be sent */
                    var userData = {
                        authorUid: $localStorage.user.uid,
                        date: new Date(),
                        description: vm.report.description,
                        isAnonymous: vm.report.isAnonymous,
                        level: level,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    if (photoURL){
                      userData['photoURL'] = photoURL
                    }

                    console.log('Report to be sent');

                    /* we send the data to the Firebase API */
                    ReportsService.addReport( userData );

                    /* we show a successful update */
                    ToastService.showMessage('Éxito al crear reporte');

                    /* we close the dialog */
                    $mdDialog.cancel();

                    //Sending the toggle dialog close message
                    $rootScope.$emit('toggleReportDialog', false);

                    //Removing the loading state
                    vm.isLoading = false;
                });
            }

            if (document.querySelector('#uploadfiles').files[0]){
              uploadPictureController.uploadFile(function(photoURL){
                sendReport(photoURL);
              }, function(error){
                console.log(error);
              });
            } else {
              sendReport(null);
            }
        };

        /**
         * Cancels the report creation process
         * */
        vm.cancel = function(){
            //Sending the toggle dialog close message
            $rootScope.$emit('toggleReportDialog', false);

            $mdDialog.cancel();
        };
    }

}(firebase));