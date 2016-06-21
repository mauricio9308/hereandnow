/**
 * Created by mauriciolara on 6/21/16.
 */
(function(){
    'use strict';

    //Declaring the module
    angular.module('alertSystem').controller('SelectEventReportController', SelectEventReportController);

    /* injecting the dependencies */
    SelectEventReportController.$inject = ['$mdDialog', '$scope', '$mdMedia', 'level', '$rootScope', 'LevelColorsService'];

    /**
     * Controller for adding a given report to the actual location
     * */
    function SelectEventReportController($mdDialog, $scope, $mdMedia, level, $rootScope, LevelColorsService) {
        var vm = this;

        /* holders for the selections */
        vm.danger_selection = undefined;
        vm.caution_selection = undefined;

        //Holder for the level reference
        vm.level = level;

        /**
         * Getting the reference of the given report level color
         * */
        vm.getReportLevelColor = function(){
            return LevelColorsService.getLevelColor( level );
        };

        /**
         * Callback for the pass of the next step of the report creation
         * */
        vm.continueCreation = function (ev) {
            /* validating the selection */
            if( level === 4 && vm.danger_selection === undefined ){
                return; // We cannot continue
            }else{
                // Handling level 3
                if( level === 3 && vm.caution_selection === undefined ){
                    return; // We cannot continue
                }
            }

            //Getting the event
            var event = ( level === 4 ? vm.danger_selection : vm.caution_selection );

            /* create a dialog for the creation of a report */
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md'));
            $mdDialog.show({
                controller: 'BuildReportDialogController as vm',
                templateUrl: 'dialogs/build.report.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    level: level,
                    event: event
                },
                clickOutsideToClose: false,
                fullscreen: useFullScreen
            });

            /* we close this dialog */
            $mdDialog.cancel();
        };

        /**
         * Cancelling the creation process
         * */
        vm.cancel = function(){
            /* closing the cycle */
            $mdDialog.cancel();

            // Sending the close of the report dialog
            $rootScope.$emit('toggleReportDialog', false);
        };

    }

    
}());