angular.module('AboutUs.module', ['AboutUs.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('AboutUs', {
        url: '/AboutUs',
        templateUrl: 'views/AboutUs.html',
        controller: 'AboutUs.controller',
    })
});