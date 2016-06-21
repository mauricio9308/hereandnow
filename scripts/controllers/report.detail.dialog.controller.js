/**
 * Created by mauriciolara on 6/21/16.
 */
(function () {
    'use strict';

    angular.module('alertSystem').controller('ReportDetailDialogController', ReportDetailDialogController);

    //Setting the dependencies
    ReportDetailDialogController.$inject = ['report', 'LevelColorsService', '$mdDialog', '$window'];

    function ReportDetailDialogController(report, LevelColorsService, $mdDialog, $window) {
        var vm = this;

        //Passing the reference of the loaded
        vm.report = report;

        /* loading flag */
        vm.isLoading = undefined;

        /* at first we fetch the information for the given report */
        function fetchReportInfo() {
            if( report.isAnonymous ){
                vm.isLoading = false; // Nothing else to load
            }else{
                //Setting the loading flag
                vm.isLoading = true;

                /* loading the information of the user */
                var ref = firebase.database().ref('/users/' + report.authorUid);
                ref.on("value", function(user) {
                    if (user.val() == null) {
                        console.log("FATAL: Invalid user id");
                        vm.isLoading = false;
                    }

                    /* success getting the user information */
                    console.log( user.val() );

                    //Setting the reference for the user information
                    vm.report.user = user.val();

                    vm.isLoading = false;
                }, function (errorObject) {
                    console.log("FATAL: The user fetch failed: " + errorObject.code);

                    vm.isLoading = false;
                });
            }
        }
        fetchReportInfo();

        /**
         * Getting the reference of the given report level
         * */
        vm.getReportLevelName = function () {
            return LevelColorsService.getLevelName(report.level);
        };

        /**
         * Getting the reference of the given report level color
         * */
        vm.getReportLevelColor = function () {
            return LevelColorsService.getLevelColor(report.level);
        };


        /**
         * Generates the map url for the report
         * */
        vm.getMapUrl = function () {
            var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + report.latitude + ','
                + report.longitude + '&zoom=14&size=250x150&key='
                + 'AIzaSyBKJf8isx7I4whd_eMe7LxNFDoXZNMwZrg' + '&markers=color:blue%7Clabel:'+ vm.getReportLevelName().charAt(0) +'%7C' + report.latitude
                + ','+ report.longitude;

            return url;
        };

        /**
         * Sends an email to the author of the email
         * */
        vm.sendEmail = function( user ){
            $window.open('mailto:' + user.email + '?Subject=Hello%20from%20Here%20and%20now!', '_blank');
        };

        /**
         * Cancels the report creation process
         * */
        vm.cancel = function () {
            $mdDialog.cancel();
        };

    }

}(firebase));