angular.module('personalDetail.module', ['personalDetail.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('personalDetail', {
        url: '/personalDetail',
        templateUrl: 'views/personalDetail.html',
        controller: 'personalDetail.controller',
    })
});