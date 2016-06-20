/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').controller('MainController', MainController);

    //MainController.$inject = [''];

    /**
     * Controller for the Main Screen of the application
     * */
    function MainController(){
        var vm = this;

        /* callback functions for the main toolbar actions */
        vm.addReport = function(){
            toggleReportDialog( true ); // Displaying the dialog
        };

        /**
         * Refreshes the content displayed in the map view
         * */
        vm.refresh = function(){
            alert('Add Function');
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