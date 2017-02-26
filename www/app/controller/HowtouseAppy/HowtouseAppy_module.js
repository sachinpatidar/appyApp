angular.module('HowtouseAppy.module', ['HowtouseAppy.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('HowtouseAppy', {
        url: '/HowtouseAppy',
        templateUrl: 'views/HowtouseAppy.html',
        controller: 'HowtouseAppy.controller',
    })
});