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
                        return '#326BAB';
                    case LEVEL_MESSAGE:
                        return '#3F9848';
                    case LEVEL_WARNING:
                        return '#E5B340';
                    case LEVEL_ALERT:
                        return '#C33E38'
                }
            },
            getLevelName : function( level ){
                switch( level ){
                    case LEVEL_LOST:
                        return 'Assist';
                    case LEVEL_MESSAGE:
                        return 'Report';
                    case LEVEL_WARNING:
                        return 'Caution';
                    case LEVEL_ALERT:
                        return 'Danger'
                }
            }
        }
    }

}());