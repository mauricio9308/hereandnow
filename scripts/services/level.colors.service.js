/**
 * Created by mauriciolara on 6/20/16.
 */
(function(){
    'use strict';

    angular.module('alertSystem').factory('LevelColorsService', LevelColorsService);

    function LevelColorsService(){

        /* DEFINITION OF THE LEVELS OF THE APPLICATION */
        var LEVEL_LOST = 1;
        var LEVEL_MESSAGE = 2;
        var LEVEL_WARNING = 3;
        var LEVEL_ALERT = 4;

        //Public API
        return {
            getLevelColor : function( level ){
                switch( level ){
                    case LEVEL_LOST:
                        return '#3f51b5';
                    case LEVEL_MESSAGE:
                        return '#b9f6ca';
                    case LEVEL_WARNING:
                        return '#ffff8d';
                    case LEVEL_ALERT:
                        return '#CD5C5C'
                }
            },
            getLevelName : function( level ){
                switch( level ){
                    case LEVEL_LOST:
                        return 'Lost';
                    case LEVEL_MESSAGE:
                        return 'Message';
                    case LEVEL_WARNING:
                        return 'Warning';
                    case LEVEL_ALERT:
                        return 'Alert'
                }
            }
        }
    }

}());