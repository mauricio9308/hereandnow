/**
 * Created by mauriciolara on 6/20/16.
 */
(function () {
    'use strict';

    //Declaring the module
    angular.module('alertSystem').controller('AddReportDialogController', AddReportDialogController);

    /* injecting the dependencies */
    AddReportDialogController.$inject = ['$mdDialog', '$scope', '$mdMedia'];

    /**
     * Controller for adding a given report to the actual location
     * */
    function AddReportDialogController($mdDialog, $scope, $mdMedia) {
        var vm = this;

        /**
         * Callback for the closing of the report dialog
         * */
        vm.createReport = function (ev, reportKind) {
            /* create a dialog for the creation of a report */
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md'));

            /* setting the next step in the builder */
            var controller = ( reportKind <= 2 ? 'BuildReportDialogController as vm' :
                'SelectEventReportController as vm' );
            var templateUrl = ( reportKind <= 2 ? 'dialogs/build.report.dialog.html'
                : 'dialogs/select.event.report.dialog.html');

            $mdDialog.show({
                controller: controller,
                templateUrl: templateUrl,
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    level: reportKind,
                    event: undefined
                },
                clickOutsideToClose: false,
                fullscreen: useFullScreen
            });

            /* we close the previous dialog */
            toggleReportDialog(false /* show */);
        };

        /**
         * Callback for the close of the report dialog
         * */
        vm.cancelReportCreation = function () {
            //We just close the dialog
            toggleReportDialog(false  /* show */);

            // Sending the close of the report dialog
            $scope.$emit('toggleReportDialog', false);
        };

        /**
         * Function for open the report dialog
         * */
        function toggleReportDialog(show) {

            var dialogElementClasses = document.querySelector('.dialog-container').classList;

            /* triggering the display or not of the dialog */
            if (show) {
                dialogElementClasses.add('dialog-container--visible');
            } else {
                dialogElementClasses.remove('dialog-container--visible');
            }
        }
    }

}());
