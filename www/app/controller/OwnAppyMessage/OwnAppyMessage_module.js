angular.module('OwnAppyMessage.module', ['OwnAppyMessage.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('OwnAppyMessage', {
        url: '/OwnAppyMessage',
        templateUrl: 'views/OwnAppyMessage.html',
        controller: 'OwnAppyMessage.controller',
    })
});