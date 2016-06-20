/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    //Declaring the module
    angular.module('alertSystem').controller('AddReportDialogController', AddReportDialogController);

    /**
     * Controller for adding a given report to the actual location
     * */
    function AddReportDialogController(){
        var vm = this;

        /**
         * Callback for the closing of the report dialog
         * */
        vm.createReport = function(){
            // TODO implement this function
        };

        /**
         * Callback for the close of the report dialog
         * */
        vm.cancelReportCreation = function(){
            //We just close the dialog
            toggleReportDialog( false  /* show */);
        };

        /**
         * Function for open the report dialog
         * */
        function toggleReportDialog( show ){
            var dialogElementClasses = document.querySelector('.dialog-container').classList;

            /* triggering the display or not of the dialog */
            if ( show ) {
                dialogElementClasses.add('dialog-container--visible');
            } else {
                dialogElementClasses.remove('dialog-container--visible');
            }
        }
    }

}());
