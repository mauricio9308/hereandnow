/**
 * Created by mauriciolara on 6/21/16.
 */
(function () {
    'use strict';

    angular.module('alertSystem').controller('ReportDetailDialogController', ReportDetailDialogController);

    //Setting the dependencies
    ReportDetailDialogController.$inject = ['report', 'LevelColorsService', '$mdDialog'];

    function ReportDetailDialogController(report, LevelColorsService, $mdDialog) {
        var vm = this;

        //Passing the reference of the loaded
        vm.report = report;

        /* loading flag */
        var isLoading = false;

        /* at first we fetch the information for the given report */
        function fetchReportInfo() {
            // TODO fetch this info
        }

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

            console.log(url);

            return url;
        };

        /**
         * Cancels the report creation process
         * */
        vm.cancel = function () {
            $mdDialog.cancel();
        };

    }

}(firebase));