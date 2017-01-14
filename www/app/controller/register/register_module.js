angular.module('register.module', ['register.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'register.controller',
    })
});