angular.module('MakeSomeoneAppy.module', ['MakeSomeoneAppy.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('MakeSomeoneAppy', {
        url: '/MakeSomeoneAppy',
        templateUrl: 'views/MakeSomeoneAppy.html',
        controller: 'MakeSomeoneAppy.controller',
    })
});