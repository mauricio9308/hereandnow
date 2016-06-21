/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){

    var app = angular.module('alertSystem')
    app.controller('ReportsController', ReportsController);
    ReportsController.$inject = ['LevelColorsService', '$firebaseArray'];
   
    function ReportsController(LevelColorsService, $firebaseArray) {
        var vm = this;
        var ref = firebase.database().ref().child("reports");
        vm.reports = new ColorFactory(ref);
    }
}(firebase))