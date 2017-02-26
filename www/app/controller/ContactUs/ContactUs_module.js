angular.module('ContactUs.module', ['ContactUs.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('ContactUs', {
        url: '/ContactUs',
        templateUrl: 'views/ContactUs.html',
        controller: 'ContactUs.controller',
    })
});