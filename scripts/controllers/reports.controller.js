/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){

    angular.module('alertSystem').controller('ReportsController', ReportsController);

    ReportsController.$inject = ['LevelColorsService', '$mdDialog'];

    function ReportsController(LevelColorsService, $mdDialog) {
        var vm = this;

        function load(){
            /* mock objects for the display of the alerts */
            vm.reports = [
                {
                    authorUid: 123,
                    date: "2016-06-10",
                    description: "An event ocurred",
                    isAnonymous : false,
                    level: 1,
                    longitude: 20,
                    latitude: 20
                }
            ];

            /* we add the color parsing to each of the objects */
            for( var i = 0, total = vm.reports.length; i < total; i ++ ){
                //Parsing the color of the alert level
                var reportLevel = vm.reports[i].level;
                vm.reports[i].color = LevelColorsService.getLevelColor( reportLevel );
                vm.reports[i].levelName = LevelColorsService.getLevelName( reportLevel );
            }

            console.log( vm.reports );
            console.log( vm.reports.length );
        }

        load();

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

}(firebase));