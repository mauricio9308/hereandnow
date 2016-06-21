/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){

    angular.module('alertSystem').controller('ReportsController', ReportsController);

    ReportsController.$inject = ['LevelColorsService', '$mdDialog', '$firebaseArray'];

    function ReportsController(LevelColorsService, $mdDialog, $firebaseArray) {
        var vm = this;

        function load(){
            //Setting the reference for the reports reference
            var reportsReference = firebase.database().ref().child('reports');
            vm.reports = $firebaseArray(reportsReference);

            /* we add the color parsing to each of the objects */
            for( var i = 0, total = vm.reports.length; i < total; i ++ ){
                //Parsing the color of the alert level
                var reportLevel = vm.reports[i].level;
                vm.reports[i].color = LevelColorsService.getLevelColor( reportLevel );
                vm.reports[i].levelName = LevelColorsService.getLevelName( reportLevel );
            }
        }
        load();

        /**
         * Getting the report color for the event
         * */
        vm.getReportColor = function( report ){
            return LevelColorsService.getLevelColor( report.level );
        };


        /**
         * Getting the report level name for the event
         * */
        vm.getReportCategory = function( report ){
            return LevelColorsService.getLevelName( report.level );
        };

        /**
         * Callback function for the click on a given report
         * */
        vm.onReportClick = function( ev, report ){
            console.log('click on report: ' + JSON.stringify( report ));

            /* create a dialog for the creation of a report */
            $mdDialog.show({
                controller: 'ReportDetailDialogController as vm',
                templateUrl: 'dialogs/report.detail.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    report: report
                },
                clickOutsideToClose: false,
                fullscreen: false
            });
        };

    }
}(firebase))