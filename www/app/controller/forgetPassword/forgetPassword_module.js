angular.module('forgetPassword.module', ['forgetPassword.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('forgetPassword', {
        url: '/forgetPassword',
        templateUrl: 'views/forgetPassword.html',
        controller: 'forgetPassword.controller',
    })
});