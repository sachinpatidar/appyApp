angular.module('translator.module', ['translator.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('translator', {
        url: '/translator',
        templateUrl: 'views/translator.html',
        controller: 'translator.controller as trans',
    })
});