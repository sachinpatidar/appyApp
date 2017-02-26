angular.module('notificationScreen.module', ['notificationScreen.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('notificationScreen', {
        url: '/notificationScreen',
        templateUrl: 'views/notificationScreen.html',
        controller: 'notificationScreen.controller',
    })
});