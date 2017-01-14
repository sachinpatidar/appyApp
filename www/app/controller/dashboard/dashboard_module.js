angular.module('dashboard.module', ['dashboard.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'dashboard.controller',
    })
});