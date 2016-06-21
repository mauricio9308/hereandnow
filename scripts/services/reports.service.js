/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').factory('ReportsService', ReportsService);

    /**
     * Service in charge of the handling of the reports interaction
     * */
    function ReportsService(){

        //Public API
        return {
            addReport : addReport
        };

        /**
         * Adding the new report information
         * */
        function addReport( reportData ){
            /* creating the key for the new report information */
            var newReportKey = firebase.database().ref().child('reports').push().key;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/reports/' + newReportKey] = reportData;

            return firebase.database().ref().update(updates);
        }

    }

}(firebase));