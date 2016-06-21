/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').controller('BuildReportDialogController', BuildReportDialogController);

    /* injecting the report message */
    BuildReportDialogController.$inject = ['ReportsService', 'level', 'LevelColorsService',
        '$mdDialog', '$localStorage'];

    /**
     * Controller in charge of the report creation
     * */
    function BuildReportDialogController( ReportsService, level, LevelColorsService,
                                          $mdDialog, $localStorage){
        var vm = this;

        // Setting the report information holder
        vm.report = {
            //We make only level 2 or less alert kinds public by default (Message and lost)
            isAnonymous : ( level <= 2 ? false : true )
        };

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
        vm.submit = function(){
            /* we build the user data to be sent */
            var userData = {
                authorUid: $localStorage.user.uid,
                date: new Date(),
                description: vm.report.description,
                isAnonymous: vm.report.isAnonymous,
                level: level,
                latitude: 20,
                longitude: 20
            };

            /* we send the data to the Firebase API */
            ReportsService.addReport( userData );
        };

        /**
         * Cancels the report creation process
         * */
        vm.cancel = function(){
            $mdDialog.cancel();
        };
    }

}(firebase));