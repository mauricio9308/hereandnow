(function() {
  'use strict';

  //Declaration of the application module
  var angularApp = angular.module('alertSystem', ['ngMaterial', 'ngStorage', 'firebase']);

  // Setting application configuration
  angular
      .module('alertSystem')
      .config(applicationConfigFunction)
      .run(applicationRunFunction);

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

  var app = {
    hasRequestPending: false,
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main')
  };
  
  applicationRunFunction.$inject = ['NotificationsService'];

  function applicationRunFunction(NotificationsService) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js').then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(reg) {
        console.log('Service Worker is ready :)', reg);
        reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
          var subscriberId = sub.endpoint.replace('https://android.googleapis.com/gcm/send/', '');
          NotificationsService.setSubscriberId(subscriberId);
        });
      }).catch(function(error) {
        console.log('Service Worker error :(', error);
      });
    }
  }

})();
