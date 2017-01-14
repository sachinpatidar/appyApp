angular.module('appMenu.module', ['appMenu.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('appMenu', {
        url: '/appMenu',
        templateUrl: 'views/appMenu.html',
        controller: 'appMenu.controller',
    })
});