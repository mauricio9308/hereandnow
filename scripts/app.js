(function() {
  'use strict';

  var initialWeatherForecast = {
    key: 'newyork',
    label: 'New York, NY',
    currently: {
      time: 1453489481,
      summary: 'Clear',
      icon: 'partly-cloudy-day',
      temperature: 52.74,
      apparentTemperature: 74.34,
      precipProbability: 0.20,
      humidity: 0.77,
      windBearing: 125,
      windSpeed: 1.52
    },
    daily: {
      data: [
        {icon: 'clear-day', temperatureMax: 55, temperatureMin: 34},
        {icon: 'rain', temperatureMax: 55, temperatureMin: 34},
        {icon: 'snow', temperatureMax: 55, temperatureMin: 34},
        {icon: 'sleet', temperatureMax: 55, temperatureMin: 34},
        {icon: 'fog', temperatureMax: 55, temperatureMin: 34},
        {icon: 'wind', temperatureMax: 55, temperatureMin: 34},
        {icon: 'partly-cloudy-day', temperatureMax: 55, temperatureMin: 34}
      ]
    }
  };

  //Declaration of the application module
  var angularApp = angular.module('alertSystem', ['ngMaterial', 'ngStorage']);

  // Setting application configuration
  angular
      .module('alertSystem')
      .config(applicationConfigFunction);

  //Setting the dependencies for the configuration function
  applicationConfigFunction.$inject = ['$locationProvider', '$mdThemingProvider'];

  /**
   * Function in charge of the configuration of the modules of the web app
   * */
  function applicationConfigFunction($locationProvider, $mdThemingProvider) {
    // Setting html 5 location routing
    $locationProvider.html5Mode(true).hashPrefix('!');

    /* setting the angular material custom theme */
    $mdThemingProvider.theme('default').primaryPalette('red');
  }


  if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
