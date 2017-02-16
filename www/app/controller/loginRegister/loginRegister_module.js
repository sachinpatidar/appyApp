﻿angular.module('loginRegister.module', ['loginRegister.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('loginRegister', {
        url: '/loginRegister',
        templateUrl: 'views/loginRegister.html',
        controller: 'loginRegister.controller',
    }).state('error-page', {
        url: '/erro-rpage',
        templateUrl: 'views/error-page.html',
        
    })
});