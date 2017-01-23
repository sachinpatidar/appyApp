angular.module('AddOwnAppyMessage.module', ['AddOwnAppyMessage.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('AddOwnAppyMessage', {
        url: '/AddOwnAppyMessage/:eauid?sub?text?msgId',
        templateUrl: 'views/AddOwnAppyMessage.html',
        controller: 'AddOwnAppyMessage.controller',
    })
});